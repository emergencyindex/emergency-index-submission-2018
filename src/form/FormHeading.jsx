import * as React from "react";
import Typography from "@material-ui/core/Typography";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles"; // , { WithStyles }
import withRoot from "../withRoot";

const styles = (theme) =>
  createStyles({
    root: { marginBottom: theme.spacing.unit * 4 }
  });

class FormHeading extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h3" component="h3">
          Emergency INDEX
        </Typography>
        <Typography variant="h4" component="h4">
          Vol. 8 Submissions
        </Typography>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(FormHeading));
