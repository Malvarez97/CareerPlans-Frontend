import { makeStyles } from "@material-ui/core";
import "./footer.css";
import logo from "../resources/unicen.png";

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
          <img src={logo} width="250" heigth="100" />
        </div>
        <div className="footer-center">
          <div>
            <i className="fa fa-map-marker"></i>
            <p>
              <span>Integrantes: </span>
              <span> - Alvarez, Mauricio Ezequiel</span>
              <span> - Osinaga, Lautaro</span>
            </p>
          </div>
        </div>

        <div className="footer-right">
          <p className="footer-company-about">
            <span>Final Project Web - Programming</span>
            Interactive plan of subjects for the final project of Web
            Programming
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
    backgroundColor: "rgba(63, 81, 181, 1.0)",
    marginTop: "5rem",
    bottom: "0",

    left: "0",
    width: "100%",
    height: "6rem",
    color: "black",
  },
}));
