'use strict'

require('dotenv').config()
const { google } = require('googleapis')

const scopes = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.metadata',
  // 'https://www.googleapis.com/auth/drive.photos',
  'https://www.googleapis.com/auth/spreadsheets'
]
const jwt = new google.auth.JWT(
  process.env.CLIENT_EMAIL,
  null,
  process.env.PRIVATE_KEY,
  scopes
)
const spreadsheetId = '1hmEYFZlpf0GV1kG2lZophXwzUSKL20v6nDycJVElAcs'
const range = 'Sheet1!A1:Z1'
const folderId = '197tH3AXOSgtHawh4Rmp_dT9k9hjtWafl';
const fileMetadata = {
  'name': 'test',
  parents: [folderId]
};

jwt.authorize((err, response) => {
  google.sheets({
    version: 'v4',
    auth: jwt,
  }).spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [
        [Math.random(), 'foo', 'bar', 'baz', 'bl33p', 'zomg', 'zork'],
      ],
    },
  }, (err, result) => { 
    if(err){
      console.log('o noz! gsheet error!')
      console.log(err)
    }else{
      console.log('gsheet append success!') 
    }
  })
  
  google.drive('v3').files.list({
    pageSize: 10,
    fields: 'nextPageToken, files(id, name, webViewLink)',
    auth: jwt,
  }, (err, res) => {
    if (err) return console.log('The gdrive API returned an error: ' + err);
    const files = res.data.files;
    if (files.length) {
      console.log('Files:');
      files.map((file) => {
        console.log(`${file.name} (${file.id}) ${file.webViewLink}`);
        // console.log(JSON.stringify(file))
      });
    } else {
      console.log('No gdrive files found.');
    }
  });
  
  google.drive('v3').files.create({
    requestBody: {
      title: 'Test',
      mimeType: 'text/plain',
      resource: fileMetadata
    },
    media: {
      mimeType: 'text/plain',
      body: 'Hello World!',
    },
    auth: jwt
  }, (err, result) => { 
    if(err){
      console.log('o noz! gdrive error!')
      console.log(err)
    }else{
      console.log('gdrive  success! result:', result)
      
      
      // google.drive('v3').permissions.create({
      //   resource: [
      //     {
      //       'type': 'user',
      //       'role': 'writer',
      //       'emailAddress': 'edward@edwardsharp.net'
      //     }
      //   ],
      //   fileId: fileId,
      //   fields: 'id',
      // }, function (err, res) {
      //   if (err) {
      //     // Handle error...
      //     console.error('error setting file permissionz', err);
      //   } else {
      //     console.log('Permission ID: ', res.id)
      //   }
      // })
      
    }
  })
  
  
})
