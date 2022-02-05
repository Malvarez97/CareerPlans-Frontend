import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSubjects } from "../services/SubjectService.js";
import { getPlanById } from "../services/PlanService.";
import { makeStyles } from "@material-ui/core";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { color } from "@mui/system";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Plan() {
  let history = useNavigate();
  const totalYears = 5;
  const years = [];
  const years2 = [];
  const [db, setDb] = useState([]);
  const classes = useStyle();
  const { id } = useParams();

  useEffect(async () => {
    var i;
    for (i = 0; i <= totalYears; i++) {
      years.push({ id: i, materias: [] });
    }

    /*     var j;
    for (j = 0; j <= totalYears; i++) {
      years2.push({ id: j, materias: [] });
    } */

    const result = await getSubjects();
    if (result.status === 200) {
      console.log("id = " + id);
      const plan = await getPlanById(id);

      plan.data.years.map((year) => {
        years.map((año) => {
          if (año.id === year.year) {
            year.items.map((materia) => {
              año.materias.push({
                id: materia._id,
                text: materia.name,
                correlativas: materia.subjects,
                isSelected: false,
                color: "#389FB1",
              });
            });
          }
        });
      });

      console.log("years");
      console.log(years);
      console.log("plan");
      console.log(plan.data.years);
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
          materia.color = "rgba(0,255,200,1)"; //green
        }
        if (e.correlativas.includes(materia.text)) {
          materia.color = "rgb(70, 252, 70)"; //green
          /*  materia.bordercolor = "3px solid rgb(123, 194, 198)"; */
        }
        if (materia.correlativas.includes(e.text)) {
          materia.color = "rgb(252, 70, 70)";
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
        materia.color = "#389FB1";
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
      <div>
        <p>Interactive plan</p>
        <p>UNICEN</p>

        <div>
          <ul>
            {db.map((listitem) => (
              <li className={classes.year} key={listitem.id}>
                <Grid
                  containerdirection="row"
                  justifyContent="center"
                  alignItems="center"
                >
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
    backgroundColor: "white",
    margin: "1rem 1rem 1rem 1rem",
  },
  cardSubject: {
    width: "150px",
    height: "80px",
    /*  border: "3px solid rgba(123, 194, 198)", */
    backgroundColor: "white",
  },
  year: {
    marginLeft: "auto",
    marginRight: "auto",
    listStyleType: "none",
    paddingLeft: "0rem",
    width: "100%",
    margin: "10px",
    background: " white",
  },
}));

/*
onMouseOver={() => {selectSubject(s);}}
onMouseLeave={() => {resetSubjects(s);}}
onChange={() => {selectSubject(s);}}
*/
