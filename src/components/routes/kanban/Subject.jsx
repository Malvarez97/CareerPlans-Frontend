import { IconButton, makeStyles, Paper } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteSubject, getPlanById } from "../../services/PlanService.";
import Card from "@mui/material/Card";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import { useParams } from "react-router-dom";
import { getSubjects } from "../../services/SubjectService";
import { SnackbarData } from "../../SnackbarData";

export default function Subject({ item, index,setLastUpdateTimestamp }) {
  const classes = useStyle();
  const { id } = useParams();
  let navigate = useNavigate();
  let history = useNavigate();
  const [changes, setChangesOpen] = useState(false);

  const setChanges = () => {
    setChangesOpen(true);
    console.log("changes se volvio true");
    return;
  };

  const edit = async (e) => {
    setChanges();
    //to={`/interactive-plan/${id}?name=${currentPlan?.name}`}
    console.log(item._id);
    //navigate(`/edit-subject?planId=${id}&subject=${item._id}`);
    /*     history("../edit-subject/" + item._id, {
      card: e,
    }); */
  };

  const goToPreviousPath = (e) => {
    e.preventDefault();
    history(-1);
  };

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
            onClick={() => edit(item)}
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
