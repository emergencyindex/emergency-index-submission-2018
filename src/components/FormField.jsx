import * as React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles"; // , { WithStyles }
import withRoot from "../withRoot";

const styles = theme =>
  createStyles({
    root: { marginTop: theme.spacing.unit * 4, width: "100%" },
    required: { color: "red" },
    label: { lineHeight: 1.25 },
    help: { color: "#666" }
  });

class FormField extends React.Component {
  render() {
    const { classes, field, idx, handleChange, inputTypeFor } = this.props;
    if(!field){
      return null;
    }
    return (
      <div className={classes.root}>
        <Typography variant="h6" component="h6" className={classes.label}>
          {field.label}{" "}
          {field.required && (
            <span className={classes.required} title="Required">
              *
            </span>
          )}
        </Typography>
        {field.help && (
          <Typography component="p" className={classes.help}>
            {field.help}
          </Typography>
        )}
        <TextField
          value={field.value}
          id={field.id}
          type={inputTypeFor(field.id)}
          className={classes.textField}
          onChange={event => handleChange(event, idx)}
          placeholder="Your Answer"
          InputLabelProps={{
            shrink: true
          }}
          margin="normal"
          required={field.required}
          rowsMax={field.id === "description" ? 32 : 1}
          multiline={field.id === "description"}
          helperText={field.helperText}
          error={field.error}
          fullWidth
        />
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(FormField));
