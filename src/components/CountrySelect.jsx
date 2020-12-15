import * as React from "react";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import createStyles from "@material-ui/core/styles/createStyles";
import withStyles from "@material-ui/core/styles/withStyles"; // , { WithStyles }
import withRoot from "../withRoot";

const { getNames } = require("country-list");
const states = require("datasets-us-states-names");
const USA = "United States of America";

const styles = theme =>
  createStyles({
    root: { marginTop: theme.spacing.unit * 4, width: "100%" },
    required: { color: "red" },
    label: { lineHeight: 1.25 },
    help: { color: "#666" }
  });

class CountrySelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, idx) {
    event.persist();
    if (event.target.value === USA) {
      console.log("itis ", USA);
    } else {
      this.props.handleChange(event, idx);
    }
  }

  render() {
    const { classes, field, idx } = this.props;
    if (!field) {
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
        <FormControl fullWidth>
          <InputLabel htmlFor="country-select">Your Answer</InputLabel>

          <Select
            id={field.id}
            value={field.value}
            onChange={event => this.handleChange(event, idx)}
            error={field.error}
            required={field.required}
            input={<Input id="country-select" />}
            native
          >
            <option value="" disabled />

            <optgroup label={USA}>
              {states.map((val, idx) => (
                <option value={val} key={`state${idx}`}>
                  {val}
                </option>
              ))}
              <option value="Washington, D.C.">Washington, D.C.</option>
            </optgroup>

            {getNames().map((val, idx) => {
              if (val === USA) {
                return null;
              }
              return (
                <option value={val} key={`country${idx}`}>
                  {val}
                </option>
              );
            })}
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default withRoot(withStyles(styles)(CountrySelect));

/* 
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
        */
