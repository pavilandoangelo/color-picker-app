import React, { useState } from "react";
import { Grid, makeStyles, Paper, rgbToHex, Slider, withStyles } from "@material-ui/core";
import { blue, green, red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  insidePaper: {
    padding: theme.spacing(5),
    textAlign: 'center',
    backgroundColor: blue[50],
    margin: theme.spacing(3),
    minHeight: "10vh",
  },
}));

const RedSlider = withStyles({
  root: {
    color: red[500],
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const GreenSlider = withStyles({
  root: {
    color: green[500],
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const BlueSlider = withStyles({
  root: {
    color: blue[500],
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default function ColourPickerIndex (props) {
  const [state, setState] = useState({
    red: 120,
    green: 20,
    blue: 210,
  });
  const classes = useStyles();

  const handleSliderChange = (newValue, color) => {
    return setState({
      ...state,
  ...(color === "red" && { red: newValue }),
  ...(color === "green" && { green: newValue }),
  ...(color === "blue" && { blue: newValue }),
    })
  }
  console.log(rgbToHex(`rgb(${state.red}, ${state.green}, ${state.blue})`).toUpperCase())

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh', backgroundColor:  `rgb(${state.red}, ${state.green}, ${state.blue})`}}
      >
        <Grid item xs={8} sm={6} md={4} lg={4} xl={4}>
          <Paper className={classes.paper} elevation={5}>
            <Paper className={classes.insidePaper} elevation={0} style={{ backgroundColor:  `rgb(${state.red}, ${state.green}, ${state.blue})` }} />
            <RedSlider
              valueLabelDisplay="auto"
              value={typeof state.red === "number" ? state.red : 0}
              min={0}
              max={255}
              onChange={(e, newValue) => {
                handleSliderChange(newValue, "red")
              }}
            />
            <GreenSlider
              valueLabelDisplay="auto"
              value={typeof state.red === "number" ? state.green : 0}
              min={0}
              max={255}
              onChange={(e, newValue) => {
                handleSliderChange(newValue, "green")
              }}
            />
            <BlueSlider
              valueLabelDisplay="auto"
              value={typeof state.red === "number" ? state.blue : 0}
              min={0}
              max={255}
              onChange={(e, newValue) => {
                handleSliderChange(newValue, "blue")
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}