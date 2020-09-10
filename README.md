# Emergency INDEX Vol. 8 Submission form

view: [https://emergency-index-submission-2018.glitch.me/](https://emergency-index-submission-2018.glitch.me/)  
edit: [https://glitch.com/edit/#!/emergency-index-submission-2018](https://glitch.com/edit/#!/emergency-index-submission-2018)  
github: [https://github.com/emergencyindex/emergency-index-submission-2018](https://github.com/emergencyindex/emergency-index-submission-2018) 

🗣 [Create React App](https://github.com/facebookincubator/create-react-app)  
🗣 [Material-UI](https://material-ui.com/)

## Making changes

* edit the file here in glitch; remember: filez AUTOSAVE!
* Run the command `npm run build` in the console
* * to open glitch console: click **Logs** (button) **>** **Console** (button on the top of the little window that opens at the bottom of the window)

**note about glitch & watch.json:** generally glitch is a hot-reload environment where changes you make automatically get saved and are live. this can be a little troublesome as delay in typing can deploy buggy code. enter the `watch.json` file. this will prevent automatic refresh on the files specified within. anything un-related to the react app (files in the `src/` directory) will need this file "touched" (e.g. changed) to re-deploy the whole site. 

## Helpful information about the files:

#### Files that will probably need to be edited: 

The files inside `src/form/` directory contain most of the text snippets relevant to this form.

* `src/form/FormHeading.jsx` Text for the beginning of the form
* `src/form/FormInfo.jsx` Paragraph text that comes after the heading
* `src/form/ProjectForm.js` Fields for form questions
* `src/form/FormFooter.jsx` Text for the content after the form

ProjectForm includes a number of items for each individual response field that are defined like:

```js
{
  id: "some_field", // lower-case, no spaces or special characters
  label: "SOME FIELD LABEL",
  help: "This text will appear after the label",
  value: "", // place holder for what the user will enter
  required: true, // required or not
  error: false, // place holder for validation results
  validator: blankValidator // function for determining if field is valid
}
```

**NOTE:** if you decide to add/remove response field items then new submissions will not appear correctly (columns will not match up) on the google spreadsheet because the fields get mapped based on the fields in the first response. see: [server.js:143:25](https://glitch.com/edit/#!/emergency-index-submission-2018?path=server.js:143:25) 
```js
const fields = data[0].project_form.items.map( (item, idx) => ({label: item.id, value: `project_form.items.${idx}.value`, default: 'NULL'}) )
```  
#TODO: this code could be improved.  
also, if you remove field items then other parts of the code might break :/  

#### Other files

* `public/index.html` base HTML file 
* `src/components/FormField.jsx` a React component for individual form fields
* `src/App.jsx` main React component and logic for this form
* `src/App.test.js` a really simple test
* `src/index.css` global styles (use sparingly; prefer `createStyles()`)
* `src/index.js` entry point into app
* `src/withRoot.jsx` wrapper for Material-UI styles
* `util/*` misc nodeJS scripts for google & s3 API integrations. mostly just test stuff that isn't otherwise used.
* `.env` secret keyz for Google, s3 bucket, and /submissions access
* `package.json` project data and npm dependencies
* `watch.json` special file for glitch to prevent automatic reloading when files change
* `.gitignore` files that will be omitted from git source control & glitch editor list of files
* `server.js` nodeJS express server for handling HTTP requests

notes about `server.js`  
* serves the React app (located in the `dist/` folder)
* processing image uploads (via `multer` & `image-size` npm module; stored in `/tmp/` then sent to digitalocean s3-compatible storage); validates file type (.tif, .jpg, & .png) and image dimensions (at least 5x7 inches @300 dpi)
* processing submissions (.json files stored in s3 bucket)
* generating CSV (via `json2csv` npm module) for google spreadsheet (fetches all .json files from s3 bucket); CSV can be imported into google sheet like so:

```
=IMPORTDATA("https://emergency-index-submission-2018.glitch.me/submissions?key=WHATEVER_QUERY_KEY_SET_IN_.env")
```

## MISC

### Remixing in Glitch

To make the auto-reload feature work:

* Disable the "Refresh App on Changes" checkbox in your user menu (top right).

### Changes made to the original boilerplate

Changes that were done to better integrate with Glitch:

* The `.env.development` file contains `DANGEROUSLY_DISABLE_HOST_CHECK=true` to fix the "Invalid host header" message that shows up, related to the development server.
* A custom `watch.json` file was added so that the server doesn't restart when you make changes.
* The `start` and `build` scripts in the `package.json` file were changed.
