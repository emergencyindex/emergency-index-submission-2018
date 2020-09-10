import * as React from "react";
import Typography from "@material-ui/core/Typography";
import withRoot from "../withRoot";

class FormFooter extends React.Component {
  render() {
    return (
      <Typography className="wantsToHelp" component="p">
        If you are interested in hosting an Emergency Index-related event or helping 
        with the production of Emergency Index, please email 
        emergency@uglyducklingpresse.org
      </Typography>
    );
  }
}

export default withRoot(FormFooter);
