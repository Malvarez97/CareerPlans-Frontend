import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { IconButton, makeStyles } from "@material-ui/core";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { deletePlan } from "../../services/PlanService.";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const CrudTableRow = ({ row, setLastUpdateTimestamp }) => {
  // usando la api de context puedo evitar el paso de las propiedades y hacerlas directamente (mejora)
  const classes = useStyle();

  useEffect(() => {
    setLastUpdateTimestamp(new Date().getTime())
  }, []);

  const handleDelete = async (e) => {
    const response = await deletePlan(e._id)
    setLastUpdateTimestamp(new Date().getTime())
  };
  return (
    <>
      <TableRow
        key={row.name}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          <Link to={`/plans/${row._id}`}>{row.name} </Link>
        </TableCell>
        <TableCell>{row.totalYears}</TableCell>
        <TableCell align="right">
          <Link to={`/interactive-plan/${row._id}`} target={"_blank"}>
            <IconButton className={classes.iconSee}>
              <VisibilityIcon />
            </IconButton>
          </Link>
          <Link to={`/plans/${row._id}`}>
          <IconButton className={classes.icon}>
            <EditIcon />
          </IconButton> 
          </Link>
          <IconButton
            className={classes.iconDelete}
            onClick={() => 
              handleDelete(row)
            
             }
          >
            <ClearIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

const useStyle = makeStyles((theme) => ({
  card: {
    width: "170px",
    height: "40px",
    fontSize: "14px",
    fontWeight: "italic",
    display: "block",
    fontFamily:
      "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif",
    padding: theme.spacing(1, 1, 1, 1),
    display: "flex",
    /* justifyContent: "inherit", */
    boxShadow: "0 1px 0 #091e4240",
    marginRight: "10px",
    color: "rgba(245, 0, 87)",
    "&:hover, &:focus": {
      background: "#3f51b5",
      color: "white",
    },
  },
  icon: {
    textAlign: "center",
    height: 30,
    width: 30,
    padding: theme.spacing(1, 1, 1, 1),
    color: "black",
    "&:hover, &:focus": {
      background: "#3f51b5",
      color: "white",
    },
  },
  iconDelete: {
    textAlign: "center",
    height: 30,
    width: 30,
    padding: theme.spacing(1, 1, 1, 1),
    color: "black",
    "&:hover, &:focus": {
      background: "red",
      color: "white",
    },
  },
  iconSee: {
    textAlign: "center",
    height: 30,
    width: 30,
    padding: theme.spacing(1, 1, 1, 1),
    color: "black",
    "&:hover, &:focus": {
      background: "green",
      color: "white",
    },
  },
}));
