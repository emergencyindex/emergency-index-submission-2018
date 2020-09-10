const aws = require('aws-sdk');
const spacesEndpoint = new aws.Endpoint('sfo2.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});


let keys = [];

s3.listObjects({Bucket:'emergencyindex'})
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
  console.log('complete! keys:', keys);
  getData();
}).send();


function getData(){
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
            if (project_form.data && project_form.data.length > 0){
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
  }).catch( function(err) {
    console.log('caught err', err)
  });
}





