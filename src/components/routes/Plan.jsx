import React, { useState, useEffect } from "react";
import { useNavigate ,useParams} from "react-router-dom";
import { getSubjects } from "../services/SubjectService.js";
import { makeStyles } from "@material-ui/core";
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { color } from "@mui/system";
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { getPlanById } from "../../components/services/PlanService.";



export default function Plan() {
  let history = useNavigate();
  const { id } = useParams();
  const totalYears =1;
  const [db, setDb] = useState([]);
  const [years, setColumns] = useState([]);
  const classes = useStyle();


  useEffect(async () => {
    const plan = await getPlanById(id);
    setColumns([...plan.data.years]);
    var i;
    for (i = 0; i <= plan.data.years.length-1; i++) {
      years.push(plan.data.years[i]);
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
          materia.color = "green";        }
        if (materia.correlativas.includes(e.text)) {
          materia.color = "red";
        }
      });
    });

    setDb([...newDB]);
  };

  const resetSubjects = (e) => {
    //TODO hay una forma mas linda de hacer esto
    var newDB = years;
    newDB.map((año) => {
      año.materias.map((materia) => {
        materia.color = "blue";
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
        
       <Typography  className={classes.text} >
            Interactive Plan 
         </Typography>
        <div>
          { 
            years.map((listitem) => (
            <Grid
              className={classes.year}
              key={listitem.id}
              containerdirection="row"
              justifyContent="center"
              alignItems="center"
              container spacing={2} columns={6}
              >
              { 
                listitem.items.map((s) => (
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
                      {
                        s.name } 
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
    backgroundcolor:"blue",
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
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
    color:'rgb(1,255,255)'
  }
}));

/*
onMouseOver={() => {selectSubject(s);}}
onMouseLeave={() => {resetSubjects(s);}}
onChange={() => {selectSubject(s);}}
*/
