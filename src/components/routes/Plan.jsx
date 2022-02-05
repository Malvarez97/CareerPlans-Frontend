import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSubjects } from "../services/SubjectService.js";
import { makeStyles } from "@material-ui/core";
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { color } from "@mui/system";


export default function Plan() {
  let history = useNavigate();
  const totalYears = 5;
  const years = [];
  const [db, setDb] = useState([]);
  const classes = useStyle();

  useEffect(async () => {
    var i;
    for (i = 0; i <= totalYears; i++) {
      years.push({ id: i, materias: [] });
    }

    const result = await getSubjects();
    if (result.status === 200) {
      result.data.map((materia) => {
        years.map((año) => {
          if (año.id === materia.year) {
            año.materias.push({
              id: materia._id,
              text: materia.name,
              correlativas: materia.subjects,
              isSelected: false,
              color: "rgba(48 ,58,68)",
            });
          }
        });
      });
      setDb([...years]);
    }
  }, []);

  const selectSubject = (e) => {
    resetSubjects();
    var newDB = db;
    newDB.map((año) => {
      año.materias.map((materia) => {
        if (materia.text === e.text) {
          materia.isSelected = true;
        }
        if (e.correlativas.includes(materia.text)) {
          materia.color = "green";
          materia.bordercolor= "3px solid rgb(123, 194, 198)";
        }
        if (materia.correlativas.includes(e.text)) {
          materia.color = "red";
        }
      });
    });

    setDb([...newDB]);
  };

  const resetSubjects = (e) => {
    //TODO hay una forma mas linda de hacer esto
    var newDB = db;
    newDB.map((año) => {
      año.materias.map((materia) => {
        materia.color = "rgba(48 ,58,68)";
      });
    });
    setDb([...newDB]);
  };

  const goToPreviousPath = (e) => {
    e.preventDefault();
    history(-1);
  };

  return (
    <>
      <div style={{
                          backgroundColor:"rgba(48 ,58,68)",
                        }}>
        <p>Interactive plan</p>
        <p>UNICEN</p>

        <div>
          <ul>
            {db.map((listitem) => (
              <li className={classes.year} key={listitem.id}>
                <Grid 
                containerdirection="row"
                justifyContent="center"
                alignItems="center" >
                <ul>
                  {listitem.materias.map((s) => (
                    <li className={classes.subject} key={s.id}>
                      <Card
                        className={classes.cardSubject}
                        value="check"
                        color="secondary"
                        style={{
                          backgroundColor: s.color,
                        }}
                        selected={s.isSelected}
                        onClick={() => {
                          selectSubject(s);
                        }}
                      >
                        {s.text}
                      </Card>
                    </li>
                  ))}
                </ul>
                </Grid>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

const useStyle = makeStyles((theme) => ({
  subject: {
    display: "inline-block",
    backgroundColor: "rgba(255, 255, 255)",
    margin: "1rem 1rem 1rem 1rem",
  },
  cardSubject: {
    width: "150px",
    height: "80px",
    border: "3px solid rgba(123, 194, 198)",
    backgroundColor :"rgba(48 ,58,68)",
  },
  year: {
    marginLeft: "auto",
    marginRight: "auto",
    listStyleType: "none",
    paddingLeft: "0rem",
    width: "100%",
    margin:"10px",
    background: " rgba(37, 77, 126)",

  },
}));

/*
onMouseOver={() => {selectSubject(s);}}
onMouseLeave={() => {resetSubjects(s);}}
onChange={() => {selectSubject(s);}}
*/
