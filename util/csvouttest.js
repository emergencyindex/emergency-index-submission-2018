const aws = require('aws-sdk');
const spacesEndpoint = new aws.Endpoint('sfo2.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});


let keys = [];
  s3.listObjects({Bucket:'emergencyindex', Prefix: 'submissions/'})
  .on('success', function handlePage(item) {
    item.data.Contents.forEach(function(item) {
      if(item.Key.match(/.json/)){
        keys.push(item.Key);
      }
    })
    if(item.hasNextPage()) {
      // another page: handle it
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
           Bucket: 'emergencyindex', 
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
      console.log('promises data:', data);
      const json2csv = require('json2csv').parse;
      const fields = data[0].project_form.items.map( (item, idx) => ({label: item.id, value: `project_form.items.${idx}.value`, default: 'NULL'}) )
      fields.push({label: 'photoUrl', value: 'photoUrl', default: 'NULL'})
      fields.push({label: 'already_submitted', value: 'project_form.already_submitted', default: 'NULL'})
      fields.push({label: 'validationError', value: 'validationError', default: 'NO'})
      
      try {
        // console.log('data:',data)
        const csv = json2csv(data, { fields });
        console.log('CSV:,', csv);
        // res.send(csv);
      } catch (err) {
        console.error('csv err:',err);
        // res.json({error: err});
      }

      
    }).catch( function(err) {
      console.log('caught err', err)
      // res.json({error: err});
    });
    
  }).send();



