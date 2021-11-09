import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { WiCloudy } from "react-icons/wi";
import {
  selectWeather,
  fetchCurrentWeather,
  setLocation,
} from "./weatherSlice";
import { CircularProgress } from "@material-ui/core";

const styles = {
  weatherContainer: {
    display: "flex",
    marginRight: "5rem",
    margiLeft: "5rem",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  temperature: {
    color: "white",
    marginBottom: "0",
    textAlign: "right",
    marginTop: "0",
  },
  description: {
    color: "white",
    textAlign: "right",
    marginTop: ".5rem",
    marginBottom: "0",
    textTransform: "uppercase",
  },
  icon: {
    height: "50px",
    minWidth: "100px",
    backgroundPosition: "center",
  },
  failMessage: {
    color: "white",
    margin: "0",
    border: "1px solid white",
    borderRadius: "5px",
    padding: ".5rem",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  refreshButton: {
    border: "none",
    backgroundColor: "transparent",
    color: "lightcoral",
    fontSize: "1rem",
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
};

function Weather({ classes }) {
  const weather = useSelector(selectWeather);
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        );
      },
      (error) => {
        console.error("Error Code = " + error.code + " - " + error.message);
      }
    );
  }, [dispatch]);

  useEffect(() => {
    if (weather.latitude && weather.longitude) {
      dispatch(
        fetchCurrentWeather({
          latitude: weather.latitude,
          longitude: weather.longitude,
        })
      );
    }
  }, [dispatch, weather.longitude, weather.latitude]);

  if (weather.loading) {
    return (
      <div className={classes.weatherContainer}>
        <CircularProgress />
      </div>
    );
  } else if (weather.failedToLoad) {
    return (
      <div className={classes.weatherContainer}>
        <p className={classes.failMessage}>
          Failed to load weather. try again later after sometime
        </p>
      </div>
    );
  } else {
    return (
      <div className={classes.weatherContainer}>
        <div className={classes.icon}>
          <WiCloudy size={80} color="white" />
        </div>
        <div className={classes.tempDescriptionContainer}>
          <h1 className={classes.temperature}>{weather.temperature}&deg;</h1>
          <p className={classes.description}>{weather.description}</p>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Weather);
