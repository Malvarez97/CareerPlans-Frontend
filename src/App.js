
import React, { useState, useEffect } from 'react';
import { getSubjects } from './components/services/SubjectService.js'
import { postSubject } from './components/services/SubjectService.js'
import NavegationBar from './components/NavegationBar';
import { makeStyles } from "@material-ui/core";
import AppContainer from './components/AppContainer.jsx';


const useStyle = makeStyles((theme) => ({
  App: {
    textAlign: "center",
  },
}));

export default function App() {

  const classes = useStyle();
  const [db, setDb] = useState([])

  useEffect(async () => {

    const result = await getSubjects()
    if (result.status === 200) {
      setDb(result.data);
    }
    /*     console.log('Resultado de la db')
        console.log(result.data) */
  }, []);

  return (
    <div className={classes.App}>
      <AppContainer db={db} setDb={setDb} />
    </div>

  );
}


