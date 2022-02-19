import { IconButton, makeStyles, Paper } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import React, { useState } from "react";
import { deleteSubject } from "../../services/PlanService.";
import Card from "@mui/material/Card";
import ClearIcon from "@mui/icons-material/Clear";
import { useParams } from "react-router-dom";
import { SnackbarData } from "../../SnackbarData";

export default function Subject({ item, index, setLastUpdateTimestamp }) {
  const classes = useStyle();
  const { id } = useParams();

  const removeSubject = async (e) => {
    console.log(e);
    const response = await deleteSubject(id, e._id);
    if (response.status == 200) {
      const snackData = new SnackbarData(
        "Subject deleted succesfully! ",
        "success"
      );
      document.dispatchEvent(
        new CustomEvent("snackMessage", {
          detail: { snackData },
        })
      );
    }
    //history("../plans/" + id, { replace: true });
    setLastUpdateTimestamp(new Date().getTime())
  };

  return (
    <Draggable key={item._id} draggableId={item._id} index={index}>
      {(provided, snapshot) => {
        return (
          <Card
            className={classes.card}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            container
            spacing={2}
            direction="row"
          >
            <div style={{ width: "100%" }}>{item.name}</div>

            <div style={{ display: "inline-block", marginLeft: "10px" }}>
              <IconButton
                className={classes.icon}
                onClick={() => removeSubject(item)}
              >
                <ClearIcon />
              </IconButton>
            </div>
          </Card>
        );
      }}
    </Draggable>
  );
}

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
  },
}));
