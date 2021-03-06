// server.js
const express = require("express");
const aws = require("aws-sdk");
const multer = require("multer");
const path = require("path");
const sizeOf = require("image-size");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

const spacesEndpoint = new aws.Endpoint("sfo2.digitaloceanspaces.com");
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

const upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "/tmp");
    },
    filename: function(req, file, cb) {
      cb(
        null,
        Date.now() + "_" + file.originalname.replace(/[^A-Za-z0-9\.]/g, "_")
      );
    }
  }),
  fileFilter: function(req, file, cb) {
    const filetypes = /tif|tiff|jpg|jpeg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (!mimetype || !extname) {
      req.fileValidationError =
        "Error: Image upload only supports .tif, .tiff, .jpg, .jpeg, or .png files!";
      return cb(null, false, new Error(req.fileValidationError));
    }
    return cb(null, true);
  }
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("dist"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/dist/index.html");
});

app.post("/photo", upload.single("photo"), function(req, res, next) {
  // const photoFilename = Date.now() + "__" + req.body.photoFileName;
  // console.log("zomg photoFilename:", photoFilename);
  if (req.fileValidationError) {
    res.json({ success: false, error: req.fileValidationError });
  } else {
    const d = sizeOf(req.file.path);
    const isInvalidSize =
      (d.width < 1500 && d.width < 2100) ||
      (d.height < 1500 && d.height < 2100);
    if (isInvalidSize) {
      res.json({
        success: false,
        error:
          "Image needs to be at least 5x7 (1500x2100 pixels) or 7x5 inches (2100x1500 pixels). Your image is " +
          d.width +
          "px wide by " +
          d.height +
          "px tall"
      });
    } else {
      s3.upload(
        {
          Bucket: "emergencyindex",
          ACL: "public-read",
          ContentType: req.file.mimetype,
          Key: `submissions/images/${req.file.filename}`,
          Body: fs.createReadStream(req.file.path)
        },
        function(err, data) {
          if (err) {
            res.json({ success: false, error: "Error: " + err });
          }
          if (data) {
            fs.unlinkSync(req.file.path);
            res.json({ success: true, data: data.Location });
          }
        }
      );
    }
  }
});

app.post("/submit", function(req, res, next) {
  const submitData = req.body.data;
  //console.log("submit submitData:", submitData);
  const title_contributor = submitData.project_form.items.reduce(
    (acc, v) => {
      if (v.id === "title") {
        acc.title = v.value.trim().replace(/([^a-zA-Z0-9])/g, "_");
      }
      if (v.id === "contributor") {
        acc.contributor = v.value.trim().replace(/([^a-zA-Z0-9])/g, "_");
      }
      return acc;
    },
    { title: "", contributor: "" }
  );

  const origPhoto = submitData.photoUrl.replace(
    "https://emergencyindex.sfo2.digitaloceanspaces.com/submissions/images/",
    ""
  );

  const photoFilename = `${Date.now()}__${title_contributor.title}--${
    title_contributor.contributor
  }${path.extname(origPhoto)}`;

  // console.log("photoFilename", photoFilename, "origPhoto:", origPhoto);
  // console.log("copyObject argz:", {
  //   Bucket: "emergencyindex",
  //   CopySource: `/emergencyindex/submissions/images/${origPhoto}`,
  //   Key: `/submissions/images_named/${photoFilename}`
  // });
  s3.copyObject(
    {
      Bucket: "emergencyindex",
      CopySource: `/emergencyindex/submissions/images/${origPhoto}`,
      Key: `submissions/images_named/${photoFilename}`,
      ACL: "public-read"
    },
    function(err, data) {
      if (err) {
        console.log("oh noz error copying file!", err, err.stack); // an error occurred
      } else {
        // console.log("success copyObject", data); // successful response
      }
    }
  );

  submitData.origPhoto = `https://emergencyindex.sfo2.digitaloceanspaces.com/submissions/images/${origPhoto}`;
  submitData.photoUrl = `https://emergencyindex.sfo2.digitaloceanspaces.com/submissions/images_named/${photoFilename}`;

  const key = `${Date.now().toString()}_${Math.floor(Math.random() * 10000)}`;
  s3.upload(
    {
      Bucket: "emergencyindex",
      ACL: "public-read",
      ContentType: "application/json",
      Key: `submissions/${key}.json`,
      Body: JSON.stringify(submitData)
    },
    function(err, data) {
      if (err) {
        res.send({ success: false, error: "Error: " + err });
      }
      if (data) {
        res.send({ success: true, data: "Thank You!" });
      }
    }
  );
});

app.get("/submissions", function(req, res) {
  if (req.query.key != process.env.QUERY_KEY) {
    res.status(404).send("Not found");
    return;
  }

  let keys = [];
  s3.listObjects({ Bucket: "emergencyindex", Prefix: "submissions/" })
    .on("success", function handlePage(item) {
      item.data.Contents.forEach(function(item) {
        if (item.Key.match(/.json/)) {
          keys.push(item.Key);
        }
      });
      if (item.hasNextPage()) {
        // another page? handle it.
        item
          .nextPage()
          .on("success", handlePage)
          .send();
      }
    })
    .on("error", function(err) {
      console.warn("o noz error:", err);
    })
    .on("complete", function() {
      // console.log('complete! keys:', keys);
      let promises = [];
      keys.forEach(function(k) {
        promises.push(
          new Promise(function(resolve, reject) {
            s3.getObject(
              {
                Bucket: "emergencyindex",
                Key: k
              },
              function(err, data) {
                if (err) {
                  console.warn(err, err.stack);
                  resolve();
                } else {
                  // console.log("heyyy data?", data);
                  const project_form = JSON.parse(data.Body);
                  // console.log("project_form", project_form);
                  if (project_form) {
                    resolve(project_form);
                  } else {
                    resolve();
                  }
                }
              }
            );
          })
        );
      });

      Promise.all(promises)
        .then(function(data) {
          const json2csv = require("json2csv").parse;
          // console.log("zomg data[0]?!", data[0]);
          const fields = data[0].project_form.items.map((item, idx) => ({
            label: item.id,
            value: `project_form.items.${idx}.value`,
            default: "NULL"
          }));
          fields.push({
            label: "photoUrl",
            value: "photoUrl",
            default: "NULL"
          });
          fields.push({
            label: "already_submitted",
            value: "project_form.already_submitted",
            default: "NULL"
          });
          fields.push({
            label: "validationError",
            value: "validationError",
            default: "NO"
          });
          fields.push({
            label: "date_submitted",
            value: "date_submitted",
            default: "NULL"
          });
          try {
            const csv = json2csv(data, { fields });
            res.send(csv);
          } catch (err) {
            console.error("csv err:", err);
            res.json({ error: err });
          }
        })
        .catch(function(err) {
          console.error("caught err", err);
          res.json({ error: err });
        });
    })
    .send();
});

// listen for requests :D
const listener = app.listen(process.env.PORT, function() {
  console.log("listening on port " + listener.address().port);
});
