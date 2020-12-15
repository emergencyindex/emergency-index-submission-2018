import * as React from "react";
import Typography from "@material-ui/core/Typography";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles"; // , { WithStyles }
import withRoot from "../withRoot";

const styles = theme =>
  createStyles({
    root: {},
    info: { marginTop: theme.spacing.unit * 4 },
    closed: { color: "#f1f" }
  });
/*
<Typography variant="h4" component="h4" className={classes.closed}>
  This call is closed.
</Typography>
*/
class FormInfo extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Typography component="p" className={classes.info}>
          Emergency INDEX allows you to report and document novel strategies,
          innovations and ideas in a performance-based work you made in 2020. To
          submit a performance for INDEX Vol. 10, please fill out the form
          below.
        </Typography>

        <Typography className={classes.info} component="p">
          If you have questions email us at{" "}
          <a href="mailto:emergency@uglyducklingpresse.org">
            emergency@uglyducklingpresse.org
          </a>
          .
        </Typography>
        <Typography className={classes.info} component="p">
          For examples from previous volumes, see the{" "}
          <a
            href="https://emergencyindex.com/submit-your-performance/"
            target="_blank"
            rel="noopener noreferrer"
          >
            submissions page
          </a>
          .
        </Typography>
        <Typography className={classes.info} component="p">
          The deadline is <b>January 15, 2021 at 11:59pm EST</b>; this deadline
          is strict, and we cannot consider submissions sent after this date.{" "}
          <b>Please submit only one work</b>; authors and collectives who submit
          more than one work will be disqualified.
        </Typography>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(FormInfo));
