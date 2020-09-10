// server.js
const express = require('express');
const aws = require('aws-sdk');
const multer = require('multer');
const path = require('path');
const sizeOf = require('image-size');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const spacesEndpoint = new aws.Endpoint('https://dynamodb.us-east-2.amazonaws.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("dist"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/dist/index.html");
});

app.post('/submit', function(req, res, next) {
  // console.log('submit req.body:',req.body);
  const key = `${Date.now().toString()}_${Math.floor(Math.random() * 10000)}`
  s3.upload({
    Bucket: 'nmoc',
    ACL: 'public-read',
    ContentType: 'application/json',
    Key: `submissions/${key}.json`,
    Body: JSON.stringify(req.body)
  },function (err, data) {
  if (err) {
    res.send({success: false, error: "Error: " + err});
  } if (data) {
    res.send({success: true, data: 'Thank You!'});
  }})
});

app.get('/submissions', function(req, res) {
  if (req.query.key != process.env.QUERY_KEY) {
    res.status(404).send('Not found')
    return
  }
  
  let keys = [];
  s3.listObjects({Bucket:'nmoc', Prefix: 'wages/'})
  .on('success', function handlePage(item) {
    item.data.Contents.forEach(function(item) {
      if(item.Key.match(/.json/)){
        keys.push(item.Key);
      }
    })
    if(item.hasNextPage()) {
      // another page? handle it.
      item.nextPage().on('success', handlePage).send();
    }
  }).on('error', function(err) {
      console.warn('o noz error:',err)
  }).on('complete', function() {
    // console.log('complete! keys:', keys);
    let promises = [];
    keys.forEach( function(k) {
      promises.push(
        new Promise(function(resolve, reject) {
          s3.getObject({
           Bucket: 'nmoc', 
           Key: k
          }, function(err, data) {
            if (err){
              console.warn(err, err.stack);
              resolve();
            } else {
              const project_form = JSON.parse(data.Body);
              // console.log('project_form.data', project_form.data)
              if (project_form.data){
                resolve(project_form.data);
              }else{
                resolve();
              }
            }
          });
        })
      );
    });

    Promise.all(promises).then( function(data) {
      const json2csv = require('json2csv').parse;
      const fields = data[0].project_form.items.map( (item, idx) => ({label: item.id, value: `project_form.items.${idx}.value`, default: 'NULL'}) )
      fields.push({label: 'already_submitted', value: 'project_form.already_submitted', default: 'NULL'})
      fields.push({label: 'validationError', value: 'validationError', default: 'NO'})
      fields.push({label: 'date_submitted', value: 'date_submitted', default: 'NULL'})
      try {
        const csv = json2csv(data, { fields });
        res.send(csv);
      } catch (err) {
        console.error('csv err:',err);
        res.json({error: err});
      }
    }).catch( function(err) {
      console.error('caught err', err)
      res.json({error: err});
    });
    
  }).send();

})

// listen for requests :D
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
