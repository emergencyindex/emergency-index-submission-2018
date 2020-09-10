import * as React from "react";
import Typography from "@material-ui/core/Typography";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles"; // , { WithStyles }
import withRoot from "../withRoot";

const styles = theme =>
  createStyles({
    root: {},
    info: { marginTop: theme.spacing.unit * 4 },
    closed: { color: "#f1f", marginBottom: theme.spacing.unit * 4 }
  });

class FormInfo extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography component="p" className={classes.info}>
          We can all benefit from knowing the going rates of payment across our field. Inspired by crowdsourced spreadsheets created by DANC, baristas, museum workers, and adjunct professors, we have created this anonymous and open source spreadsheet with the following objectives:<br></br>
          -transparency within our field<br></br>
          -equal pay rates<br></br>
          -encourage presenters and ensembles to pay a living wage to their contracted artists
        </Typography>
        <Typography component="p" className={classes.info}>
          We acknowledge that many musicians create their own work in addition to being a part of ensembles and freelancing. For the purposes of this survey, we're focusing specifically on artists hired as independent contractors to rehearse/perform in a performance or production for which they are NOT the generative artist.
        </Typography>
        <Typography component="p" className={classes.info}>
          All responses recorded below will be displayed anonymously and publicly on the NMOC Industry Wages Spreadsheet [include link to spreadsheet]
        </Typography>
        <Typography component="p" className={classes.info}>
          If there is anything additional you would like to share anonymously or privately, you can email the NMOC Real Wages Steering Committee at <a href="mailto:newmusicorganizingcaucus@gmail.com">newmusicorganizingcaucus@gmail.com</a>
        </Typography>
        <Typography component="p" className={classes.info}>
          A note on anonymity: This survey does not require any personally identifiable information. Only questions with an asterisk are required (employer info, geographic location,  and hourly wage), so you can choose how much or how little you want to share. 
        </Typography>
        <Typography component="p" className={classes.info}>
          By sharing our experiences, we can help our fellow musician colleagues. Thank you for your generosity. Please share this survey with freelance music colleagues near and far!
        </Typography>
        <Typography component="p" className={classes.info}>
          Created by New Music Organizing Caucus <a href="https://www.newmusicorganizingcaucus.org/"
            target="_blank"
            rel="noopener noreferrer"
          >https://www.newmusicorganizingcaucus.org/</a>
        </Typography>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(FormInfo));
