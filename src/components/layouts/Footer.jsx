import { Grid, IconButton, makeStyles, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./footer.css";

export default function Footer({}) {
  const classes = useStyle();
  return (
    <>
      <div style={{ marginTop: "80px" }}></div>
      <footer className="footer-distributed">
        <div className="footer-left">
          <h3>
            Interactive<span>Plan</span>
          </h3>
        </div>
        <div className="footer-center">
          <div>
            <i className="fa fa-map-marker"></i>
            <p>
              <span>Alvarez, Mauricio Ezequiel</span> 
              <span>Osignaga, Lautaro</span> 
            </p>
          </div>
        </div>

        <div className="footer-right">
          <p className="footer-company-about">
            <span>Trabajo Final Programacion Web </span>
           Plan interactivo de materias para el trabajo final de Programacion Web 
          </p>
        </div>
      </footer>
    </>
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
    minHeight: "50px",
    minWidth: "1000px",
    minHeight: "70px",
  },
  footer: {
    padding: "2rem",
    backgroundColor: "#d5dde6",
    marginTop: "5rem",
    bottom: "0",

    left: "0",
    width: "100%",
    height: "6rem",
    color: "black",
  },
}));
