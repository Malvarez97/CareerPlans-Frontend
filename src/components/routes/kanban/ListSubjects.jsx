import { makeStyles, IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import Subject from "../kanban/Subject";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@material-ui/core/Button";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { deleteYear } from "../../services/PlanService.";
import { SnackbarData } from "../../SnackbarData";

export default function ListSubjects({ column, columnId, index, id, data, setLastUpdateTimestamp }) {
  const classes = useStyle();
  let history = useNavigate();
  const [lastUpdateTimestamp2, setLastUpdateTimestamp2] = useState(
    new Date().getTime()
  );

  useEffect(() => {
    setLastUpdateTimestamp2(new Date().getTime())
  }, []);


/*   useEffect(async () => {
    data  = data;
  }, [lastUpdateTimestamp2]); */

  const handleDelete = async (e) => {
    console.log(e);

    const snackData = new SnackbarData("Plan updated succesfully! ", "success");
    const response = await deleteYear(id, e.year)
    setLastUpdateTimestamp(new Date().getTime())
      document.dispatchEvent(
        new CustomEvent("snackMessage", {
          detail: { snackData },
        })
      
    );
  };

  return (
    /*  TODO : use Draggable for the rows */

    <Droppable droppableId={columnId} key={columnId} direction="horizontal">
      {(provided, snapshot) => {
        return (
          <div
            className={classes.quarter}
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              background: snapshot.isDraggingOver ? "lightblue" : "#ebecf0",
            }}
          >
            <IconButton
              onClick={() => handleDelete(column)}
              className={classes.icond}
            >
              <DeleteForeverIcon size="small"></DeleteForeverIcon>
            </IconButton>
            <div
              id=""
              style={{
                display: "flex",
                alignItems: "center",
                width: "80%",
              }}
            >
              {column.items.map((item, index) => {
                return (
                  <>
                    <Subject item={item} key={item._id} index={index} setLastUpdateTimestamp={setLastUpdateTimestamp}></Subject>
                  </>
                );
              })}
            </div>

            {provided.placeholder}

            <Link
              className={classes.link}
              to={`/create-subject?planId=${id}&year=${column.year}`}
            >
              <Button
                className={classes.buttonAdd}
                style={{ textTransform: "none" }}
                startIcon={<AddIcon />}
              >
                Add subject
              </Button>
            </Link>
          </div>
        );
      }}
    </Droppable>
  );
}

const useStyle = makeStyles((theme) => ({
  quarter: {
    width: "300px",
    listStyle: "none",
    borderRadius: "5px",
    fontSize: "1.5rem",
    display: "inline-flex",
    flexDirection: "row",
    minHeight: "200px",
    padding: "10px",
    minWidth: "1000px",
    minHeight: "70px",
  },
  icond: {
    textAlign: "center",
    height: 50,
    width: 50,
    marginRight: "10px",
    color: "black",
    "&:hover, &:focus": {
      background: "#ef4c4c",
      color: "black",
    },
  },
  buttonAdd: {
    textAlign: "center",
    height: "30px",
    fontFamily: "sans-serif",
    width: "100%",
    minWidth: "35px",
    paddingRight: "12px",
    textDecoration: "none",
  },
  link: {
    textDecoration: "none",
  },
}));
