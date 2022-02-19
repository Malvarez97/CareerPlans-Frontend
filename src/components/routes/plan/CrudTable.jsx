import { Link } from "react-router-dom";
import { CrudTableRow } from "./CrudTableRow";
import axios from "axios";

import React, { useState, useEffect } from "react";
/* import { getSubjects } from "../components/services/index.js"; */
import { getPlans } from "../../services/PlanService.";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import { makeStyles, Button } from "@material-ui/core";

function CrudTable({}) {
  const [db, setDb] = useState([]);
  const classes = useStyle();
  const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState(
    new Date().getTime()
  );

  useEffect(() => {
    setLastUpdateTimestamp(new Date().getTime())
  }, []);

  useEffect(async () => {
    console.log('updating')
    //setLastUpdateTimestamp(new Date().getTime())
    const result = await getPlans();
    if (result.status === 200) {
      setDb(result.data);
    }
  }, [lastUpdateTimestamp]);

  return (
    <>
      <div className="container md">
        <h3>Plans</h3>

        <Link className={classes.link} to="/create-plan">
          <Button
            variant="text"
            style={{ color: "black", float: "left" }}
            startIcon={<AddIcon />}
          >
            <label style={{ fontSize: "0.8rem" }}>Add</label>
          </Button>
        </Link>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>years</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {db.length === 0 ? (
                <tr>
                  <td colSpan="3">Sin Datos</td>
                </tr>
              ) : (
                db.map((row) => <CrudTableRow key={row._id} row={row} setLastUpdateTimestamp={setLastUpdateTimestamp}/>)
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default CrudTable;

const useStyle = makeStyles((theme) => ({
  button: {
    textDecoration: "none !important",
    justifyContent: "center",
    width: "20%",
    marginleft: "10 px",
    marginRight: "10px",
    marginTop: "10px",
    marginBottom: "10px",
    height: "50px",
    color: "white",
  },
  link: {
    textDecoration: "none !important",
  },
}));
