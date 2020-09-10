import * as React from "react";
import Typography from "@material-ui/core/Typography";
import withRoot from "../withRoot";

class FormFooter extends React.Component {
  render() {
    return (
      <Typography className="wantsToHelp" component="p">
        If you would like to become involved in the 
        New Music Organizing Caucus, visit: 
        <a href="https://newmusicorganizingcaucus.org"
            target="_blank"
            rel="noopener noreferrer">https://newmusicorganizingcaucus.org</a>
      </Typography>
    );
  }
}

export default withRoot(FormFooter);
