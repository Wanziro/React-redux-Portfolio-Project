import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { selectQuote, fetchQuote } from "./quoteSlice";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@material-ui/core";

const styles = {
  div: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: "1rem",
    boxSizing: "border-box",
  },
  text: {
    color: "white",
    fontStyle: "italic",
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

function Quote({ classes }) {}

export default withStyles(styles)(Quote);
