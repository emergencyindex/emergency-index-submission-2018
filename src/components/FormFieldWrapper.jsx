import * as React from "react";
import Typography from "@material-ui/core/Typography";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles"; // , { WithStyles }
import withRoot from "../withRoot";

const styles = (theme) =>
  createStyles({
    root: { marginTop: theme.spacing.unit * 4, width: "100%" },
    required: { color: "red" },
    label: { lineHeight: 1.25 },
    help: { color: '#666' }
  });

class FormFieldWrapper extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="h6" component="h6" className={classes.label}>
          {this.props.label}{" "}
          {this.props.required && <span className={classes.required} title="Required">*</span>}
        </Typography>
        {this.props.help && (
          <Typography component="p" className={classes.help}>
            {this.props.help}
          </Typography>
        )}
        {this.props.children}
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(FormFieldWrapper));
