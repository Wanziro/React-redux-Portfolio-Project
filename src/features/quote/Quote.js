import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { selectQuote, fetchQuote } from "./quoteSlice";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@material-ui/core";

const styles = {
  div: {
    paddingLeft: "10rem",
    paddingRight: "10rem",
    paddingBottom: "3rem",
    boxSizing: "border-box",
  },
  text: {
    color: "white",
    margin: "0",
  },
  author: {
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: "0",
  },
  span: {
    fontSize: "0.9rem",
    fontWeight: "bold",
  },
  a: {
    color: "#ccc",
    marginLeft: "4px",
    verticalAlign: "middle",
  },
  failMessage: {
    color: "white",
    margin: "0",
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

function Quote({ classes }) {
  const quote = useSelector(selectQuote);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuote());
  }, [dispatch]);

  if (quote.loading) {
    return (
      <div className={classes.div}>
        <CircularProgress />
      </div>
    );
  } else if (quote.failedToLoad) {
    return (
      <div className={classes.div}>
        <p className={classes.failMessage}>
          Failed to get the quote. try again later after sometime
        </p>
      </div>
    );
  } else {
    return (
      <div className={classes.div}>
        <p className={classes.text}>"{quote.text}"</p>
        <p className={classes.author}>{quote.author}</p>
      </div>
    );
  }
}

export default withStyles(styles)(Quote);
