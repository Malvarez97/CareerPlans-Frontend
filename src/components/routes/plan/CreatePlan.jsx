import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import Button from "@mui/material/Button";
import { postPlan } from "../../services/PlanService.";

import SaveIcon from "@mui/icons-material/Save";
import { SnackbarData } from "../../SnackbarData";

const initialForm = {
  id: null,
  name: undefined,
  year: undefined,
  description: "",
};

export default function CreatePlan({
  createData,
  updateData,
  dataToEdit,
  setDataToEdit,
}) {
  let navigate = useNavigate();
  let history = useNavigate();
  const [todo, setTodo] = useState(initialForm);

  //Initial render
  useEffect(() => {
    if (dataToEdit) {
      setTodo(dataToEdit);
    } else {
      setTodo(initialForm);
    }
  }, [dataToEdit]);

  //Navegation
  const handleSubmit = (e) => {
    const initialForm = {
      name: todo.name,
      totalYears: todo.year,
      years: [],
    };
    console.log("submitieando");
    const response = postPlan(initialForm);
    console.log(response);

    const snackData = new SnackbarData("Plan created succesfully! ", "success");
    document.dispatchEvent(
      new CustomEvent("snackMessage", {
        detail: { snackData },
      })
    );

    navigate("../plans", { replace: true });
  };

  const goToPreviousPath = (e) => {
    e.preventDefault();
    history(-1);
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target; //destruturing
    setTodo({
      ...todo,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <>
      <div className="container md-5">
        <h2>Study plan</h2>

        <h3>{dataToEdit ? "Edite" : "Create"}</h3>
        <div style={{ float: "left" }}>Name</div>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Plan's name"
            className="form-control mb-2"
            onChange={handleChange}
            value={todo.name}
          />
          <div style={{ float: "left" }}>Year</div>
          <input
            name="year"
            type="number"
            className="form-control mb-2"
            placeholder="0"
            min={1}
            max={9}
            onChange={handleChange}
            value={todo.year}
          />
          <div style={{ float: "left" }}>Description</div>
          <textarea
            name="description"
            className="form-control mb-2"
            placeholder="Ingrese una descripcion"
            onChange={handleChange}
            value={todo.description}
          />

          <Button onClick={goToPreviousPath}> Back </Button>

          <Button
            type="submit"
            disabled={!todo.year || !todo.name}
            variant="contained"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </form>
      </div>
    </>
  );
}
