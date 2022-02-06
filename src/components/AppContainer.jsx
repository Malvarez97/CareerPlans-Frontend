import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import * as React from "react";
import NavegationBar from "./NavegationBar";
import Footer from "./layouts/Footer";
import Button from "@mui/material/Button";
import Header from "./layouts/Header";
import SnackbarComponent from "./SnackbarComponent";

import { SnackbarData } from "./SnackbarData";

export default function AppContainer({ db, setDb }) {
  /*   const handleMessage = (text, severity) => {
    const snackData = new SnackbarData(text, severity);
    const customEvent = new CustomEvent("snackMessage", {
      detail: { snackData },
    });
    document.dispatchEvent(customEvent);
  }; */

  return (
    <>
      <SnackbarComponent></SnackbarComponent>
      <Header />
      <div style={{ minHeight: "700px" }}>
        <NavegationBar db={db} setDb={setDb} />
      </div>
      <Footer />
    </>
  );
}
