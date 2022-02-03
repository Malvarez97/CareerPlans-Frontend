import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSubjects } from "../services/SubjectService.js";
import { makeStyles } from "@material-ui/core";
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { color } from "@mui/system";
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';


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
          materia.color = "red";        }
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
        materia.backgroundImage = 'linear-gradient(0deg, #FFC312, #EE5A24, #00a8ff)';
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
        backgroundColor: "rgb(1,1,1)"
      }}>
        { console.log(db)}
       <Typography  className={classes.text} >
            Interactive Plan 
         </Typography>
        <div>
          { 
            db.map((listitem) => (
            <Grid
              className={classes.year}
              key={listitem.id}
              containerdirection="row"
              justifyContent="center"
              alignItems="center"
              container spacing={2} columns={6}
              >
              { 
                listitem.materias.map((s) => (
                <Card
                  className={classes.subject} key={s.id}
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
                  <CardContent>
                    <Typography
                      className={classes.title}
                      display="flex"
                    >
                      {s.text}
                    </Typography>

                    <Typography variant="body2" component="p" align="rigth" style={{ marginLeft: 110 }} className={classes.title}>
                      Q
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          ))}
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
    marginLeft: "25px",
    border: "4px solid rgba(1, 1, 1)",
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    backgroundSize: '200%',
    borderRadius: 40,
  },
  year: {
    alignContent:"center",
    background: "#3F51B5",
    borderRadius: 10,
    padding:"20px",
    marginBottom:"40px",
    marginTop:"40px",
  },
  text :{
    padding:"20px",
    color:'rgb(255,255,255)'
  },
  title :{
    color:'rgb(255,255,255)'
  }
}));

/*
onMouseOver={() => {selectSubject(s);}}
onMouseLeave={() => {resetSubjects(s);}}
onChange={() => {selectSubject(s);}}
*/
