import { useState, useEffect } from "react";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

/*
    using snackbar example

    const snackData = new SnackbarData("hello!", "info");
    const customEvent = new CustomEvent("snackMessage", {
      detail: { snackData },
    });
    document.dispatchEvent(customEvent);
*/

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarComponent({}) {
  //const [open, setOpen] = React.useState(false);

  const [snackData, setSnackData] = useState("");

  useEffect(() => {
    document.addEventListener("snackMessage", updateSnackData);
    return () => {
      document.removeEventListener("snackMessage", updateSnackData);
    };
  }, []);

  const updateSnackData = (event) => {
    setSnackData(event.detail.snackData);
  };

  return (
    <>
      {snackData && (
        <Snackbar
          open={!!snackData}
          autoHideDuration={2000}
          onClose={() => setSnackData(null)}
        >
          <MuiAlert
            style={{ minWidth: "300px" }}
            elevation={6}
            variant="filled"
            severity={snackData.severity}
          >
            {snackData.text}
          </MuiAlert>
        </Snackbar>
      )}
    </>
  );
}

/*
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Button variant="outlined" onClick={handleClick}>
          Open success snackbar
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            This is a success message!
          </Alert>
        </Snackbar>
                <Alert severity="error">This is an error message!</Alert>
        <Alert severity="warning">This is a warning message!</Alert>
        <Alert severity="info">This is an information message!</Alert>
        <Alert severity="success">This is a success message!</Alert> 
      </Stack>


*/
