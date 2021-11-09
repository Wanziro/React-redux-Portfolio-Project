import React, { useState, useEffect, useRef } from "react";
import Weather from "../weather/Weather";
import GoalsContainer from "../goalsContainer/GoalsContainer";
import Quote from "../quote/Quote";
import { IconButton, CircularProgress } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { withStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { selectImages, fetchImageUrls } from "./imagesSlice";
import ReactCanvasConfetti from "react-canvas-confetti";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const styles = {
  gridContainer: {
    height: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    flexWrap: "no-wrap",
    justifyContent: "space-between",
    boxSizing: "border-box",
    backgroundSize: "cover",
    minWidth: "320px",
    zIndex: -2,
    paddingTop: "1rem",
  },
  progressContainer: {
    textAlign: "center",
  },
  prevButton: {
    position: "absolute",
    top: "50vh",
    left: "0",
    color: "white",
  },
  nextButton: {
    position: "absolute",
    top: "50vh",
    right: "0",
    color: "white",
  },
  weatherContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  failContainer: {
    color: "white",
    margin: "0 auto",
    borderRadius: "5px",
    padding: ".5rem",
    backgroundColor: "brown",
  },
};

function Image({ classes }) {
  const images = useSelector(selectImages);
  const [imageIndex, setImageIndex] = useState(0);
  const dispatch = useDispatch();
  const confettiEl = useRef(null);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    dispatch(fetchImageUrls());
  }, [dispatch]);

  const handlePrevClick = () => {
    setImageIndex((prevImageIndex) => {
      if (prevImageIndex === 0) {
        return images.images.length - 1;
      } else {
        return prevImageIndex - 1;
      }
    });
  };

  const handleNextClick = () => {
    setImageIndex((prevImageIndex) => {
      if (prevImageIndex === images.images.length - 1) {
        return 0;
      } else {
        return prevImageIndex + 1;
      }
    });
  };

  const rainConfetti = (e) => {
    confettiEl.current.confetti({
      origin: {
        x: e.pageX / width,
        y: e.pageY / height,
      },
    });
  };

  if (images.loading) {
    return (
      <div
        container="true"
        className={classes.gridContainer}
        style={{ backgroundColor: "mintcream" }}
      >
        <div className={classes.weatherContainer}>
          <Weather />
        </div>
        <div className={classes.progressContainer}>
          <CircularProgress />
        </div>
        <Quote />
      </div>
    );
  } else if (images.failedToLoad) {
    return (
      <div
        container="true"
        className={classes.gridContainer}
        style={{ backgroundColor: "rgb(135, 206, 250)" }}
      >
        <div className={classes.weatherContainer}>
          <Weather />
        </div>
        <p className={classes.failContainer}>
          Failed to load images, try again later after some time.
        </p>
        <GoalsContainer rainConfetti={rainConfetti} />
        <ReactCanvasConfetti
          ref={confettiEl}
          style={{
            position: "fixed",
            height: "100vh",
            width: "100vw",
            pointerEvents: "none",
          }}
        />
        <Quote />
      </div>
    );
  } else {
    return (
      <div
        container="true"
        className={classes.gridContainer}
        style={{ backgroundImage: `url(${images.images[imageIndex]})` }}
      >
        <IconButton onClick={handlePrevClick} className={classes.prevButton}>
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton onClick={handleNextClick} className={classes.nextButton}>
          <NavigateNextIcon />
        </IconButton>
        <div className={classes.weatherContainer}>
          <Weather />
        </div>
        <GoalsContainer rainConfetti={rainConfetti} />
        <ReactCanvasConfetti
          ref={confettiEl}
          style={{
            position: "fixed",
            height: "100vh",
            width: "100vw",
            pointerEvents: "none",
          }}
        />
        <Quote />
      </div>
    );
  }
}

export default withStyles(styles)(Image);
