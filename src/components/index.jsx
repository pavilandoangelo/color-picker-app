import React, { useState } from "react";
import { Button, Grid, makeStyles, Paper, rgbToHex, Slide, Slider, Snackbar, withStyles } from "@material-ui/core";
import { blue, green, red } from "@material-ui/core/colors";
import { FileCopy } from "@material-ui/icons";

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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    padding: theme.spacing(2),
    borderRadius: 0,
    border: "2px solid",
    color: "#FFF",
    borderColor: "#FFF"
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
    backgroundColor: "#FFF",
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
    backgroundColor: "#FFF",
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
    backgroundColor: "#FFF",
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

const transistionUp = (props) => {
  return <Slide {...props} direction="up" />;
}

export default function ColourPickerIndex (props) {
  const [state, setState] = useState({
    red: 120,
    green: 20,
    blue: 210,
    open: false,
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

  const pickTextColorBasedOnBgColorSimple = (bgColor, lightColor = "#FFF", darkColor = "#000") => {
    let color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    let r = parseInt(color.substring(0, 2), 16); // hexToR
    let g = parseInt(color.substring(2, 4), 16); // hexToG
    let b = parseInt(color.substring(4, 6), 16); // hexToB
    return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
      darkColor : lightColor;
  }

  const handleCopyColor = () => {
    let el = document.createElement("textarea");
    el.value = hexValue;
    el.setAttribute("readonly", "");
    el.style = {position: "absolute", left: "-9999px"};
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    return setState({...state, open: true});
  }

  const handleClose = () => {
    setState({...state, open: false});
  }

  const hexValue = rgbToHex(`rgb(${state.red}, ${state.green}, ${state.blue})`).toUpperCase();
  const fontAndBorderColor = pickTextColorBasedOnBgColorSimple(hexValue);
  console.log("state >>> ", state);

  return (
    <div className={classes.root}>
      <Snackbar
        open={state.open}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionComponent={transistionUp}
        message="I love snacks"
        key={hexValue}
      />
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
            <Paper className={classes.insidePaper} elevation={0} style={{ backgroundColor:  `rgb(${state.red}, ${state.green}, ${state.blue})` }}>
              <Button
                disableElevation
                size="large"
                variant="text"
                color="primary"
                className={classes.button}
                endIcon={<FileCopy/>}
                style={{ color: `${fontAndBorderColor}`, borderColor: `${fontAndBorderColor}`}}
                onClick={handleCopyColor}
              >
                {hexValue}
              </Button>
            </Paper>
            <RedSlider
              valueLabelDisplay="auto"
              value={typeof state.red === "number" ? state.red : 0}
              min={0}
              max={255}
              onChange={(e, newValue) => {
                handleSliderChange(newValue, "red")
              }}
              className={classes.slider}
            />
            <GreenSlider
              valueLabelDisplay="auto"
              value={typeof state.red === "number" ? state.green : 0}
              min={0}
              max={255}
              onChange={(e, newValue) => {
                handleSliderChange(newValue, "green")
              }}
              className={classes.slider}
            />
            <BlueSlider
              valueLabelDisplay="auto"
              value={typeof state.red === "number" ? state.blue : 0}
              min={0}
              max={255}
              onChange={(e, newValue) => {
                handleSliderChange(newValue, "blue")
              }}
              className={classes.slider}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}