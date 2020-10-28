import React, { Fragment, useState } from "react";
import { Button, Grid, IconButton, makeStyles, Paper, rgbToHex, Slide, Slider, Snackbar, SnackbarContent, withStyles } from "@material-ui/core";
import { blue, green, red } from "@material-ui/core/colors";
import { Close, FileCopy } from "@material-ui/icons";

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
  snackbar: {
    padding: theme.spacing(2),
    borderRadius: 0,
    border: "2px solid",
    color: "#ffaaee",
    borderColor: "#ffaaee"
  },
  madeBy: {
    margin: theme.spacing(2),
  },
  cursorPointer: {
    cursor: "pointer",
  }
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
  const hexValue = rgbToHex(`rgb(${state.red}, ${state.green}, ${state.blue})`).toUpperCase();
  const bgColor = `rgb(${state.red}, ${state.green}, ${state.blue})`;
  const gitHubLink = "https://github.com/pavilandoangelo";


  const handleSliderChange = (newValue, color) => {
    return setState({
      ...state,
      open: false,
  ...(color === "red" && { red: newValue }),
  ...(color === "green" && { green: newValue }),
  ...(color === "blue" && { blue: newValue }),
    })
  }

  const pickTextColorBasedOnBgColor = (bgColor, lightColor = "#FFF", darkColor = "#000") => {
    let color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    let r = parseInt(color.substring(0, 2), 16); // hexToR
    let g = parseInt(color.substring(2, 4), 16); // hexToG
    let b = parseInt(color.substring(4, 6), 16); // hexToB
    return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
      darkColor : lightColor;
  }

  const handleCopyColor = (e) => {
    e.preventDefault();
    let el = document.createElement("textarea");
    el.value = hexValue;
    el.setAttribute("readonly", "");
    el.style = {position: "absolute", left: "-9999px"};
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    return setTimeout(() => {
      return setState({...state, open: true});
    });
  }

  const handleClose = () => {
    return setState({...state, open: false});
  }

  const handleOpenLink = () => {
    window.open(gitHubLink, "_blank")
  }

  const fontAndBorderColor = pickTextColorBasedOnBgColor(hexValue);

  return (
    <div className={classes.root}>
      <Snackbar
        open={state.open}
        autoHideDuration={2000}
        onClose={handleClose}
        TransitionComponent={transistionUp}
        key={hexValue}
      >
        <SnackbarContent
          style={{
            color: `${fontAndBorderColor}`,
            backgroundColor: `${bgColor}`,
            border: `2px solid ${fontAndBorderColor}`,
          }}
          message={
            <span>{"You have copied:"} <b>{hexValue}</b></span>
          }
          action={
            <Fragment>
              <IconButton
                aria-label="close"
                style={{ color: `${fontAndBorderColor}` }}
                onClick={handleClose}
              >
                <Close />
              </IconButton>
            </Fragment>
          }
          elevation={0}
        >
        </SnackbarContent>
      </Snackbar>
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh', backgroundColor: bgColor}}
      >
        <Grid item xs={8} sm={6} md={4} lg={4} xl={4}>
          <Paper className={classes.paper} elevation={5}>
            <Paper className={classes.insidePaper} elevation={0} style={{ backgroundColor:  bgColor }}>
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
            <Paper elevation={0} className={classes.madeBy}>
              <strong className={classes.cursorPointer} onClick={handleOpenLink}>
                {new Date().getFullYear()} - Made with <span role="img" aria-label="heart-icon">❤️ </span>
                by pavilandoangelo
              </strong>
            </Paper>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}