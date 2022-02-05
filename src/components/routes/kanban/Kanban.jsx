import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import { getSubjects } from "../../services/SubjectService.js";
import { getPlanById } from "../../services/PlanService.";
import { addQuarter } from "../../services/PlanService.";
import SaveIcon from '@mui/icons-material/Save';

import ListSubjects from "./ListSubjects";
import { Grid, IconButton, makeStyles, Paper } from "@material-ui/core";
import axios from "axios";

import Button from "@material-ui/core/Button";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useParams } from "react-router-dom";

const onDragEnd = (result, columns, setColumns, setIsModifed) => {
  setIsModifed(true);
  if (!result.destination) return;

  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
  //TODO persist data change in db
};

export default function App({}) {
  const classes = useStyle();
  const [columns, setColumns] = useState([]);
  const [isModifed, setIsModifed] = useState(false);
  const { id } = useParams();

  useEffect(async () => {
    const plans = await getPlanById(id);
    setColumns([...plans.data.years]);
  }, []);

  const saveChanges = async () => {
    console.log("Subjects to save");
    console.log(columns);
  };

  const addColumn = async () => {
    await addQuarter(id);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "row",

        height: "100%",
      }}
    >
      <label>Study Plan Unicen Exactas</label>
      <DragDropContext
        onDragEnd={(result) =>
          onDragEnd(result, columns, setColumns, setIsModifed)
        }
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
              key={columnId}
            >
              <div style={{ margin: 8 }}>
                <ListSubjects
                  columnId={columnId}
                  column={column}
                  index={index}
                  id={id}
                ></ListSubjects>
              </div>
            </div>
          );
        })}
      </DragDropContext>
      <Button
        variant="contained"
        color="primary"
        className={classes.buttonQuarter}
        startIcon={<AddIcon />}
        onClick={addColumn}
      >
        QUARTER
      </Button>
      <Button
        variant="contained"
        color="primary"
        startIcon={<SaveIcon />}
        disabled={!isModifed}
        onClick={saveChanges}
      >
        Save changes
      </Button>
      <Grid sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        <Link className={classes.link} to="/interactive-plan" target={"_blank"}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            startIcon={<VisibilityIcon />}
          >
            View PLAN
          </Button>
        </Link>
        <Link className={classes.link} to="/create-subject"></Link>
      </Grid>
    </div>
  );
}

const useStyle = makeStyles((theme) => ({
  button: {
    textDecoration: "none !important",

    width: "20%",
    marginleft: "10 px",
    marginRight: "10px",
    marginTop: "10px",
    marginBottom: "10px",
    height: "50px",
    color: "white",
  },
  buttonQuarter: {
    textDecoration: "none !important",

    width: "170px",
    marginleft: "10 px",
    marginRight: "10px",
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "-33%",
    color: "white",
  },
  input: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    width: "100%",
    color: "red",
  },
  link: {
    textDecoration: "none !important",
  },
}));
