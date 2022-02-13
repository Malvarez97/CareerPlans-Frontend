import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import "./StylesCustom.css";

export default function CardOption({ s, name, db, setDb }) {
  const classes = useStyle();

  const selectSubject = (e) => {
    var newDB = db;
    newDB.map((año) => {
      año.materias.map((materia) => {
        if (materia.text === e.text) {
          materia.isSelected = materia.isSelected ? false : true;
        }
      });
    });

    setDb([...newDB]);
  };

  return (
    <>
      <div>
        <label className="option_item">
          <input
            type="checkbox"
            className="checkbox"
            onChange={() => {
              selectSubject(s);
            }}
            selected={s.isSelected}
          />

          <div
            className="option_inner facebook"
            style={{
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="tickmark"></div>
            <div> {name}</div>
          </div>
        </label>
      </div>
    </>
  );
}

const useStyle = makeStyles((theme) => ({
  subject: {
    display: "inline-block",
  },
}));
