import { Grid, IconButton, makeStyles, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LogoutIcon from "@mui/icons-material/Logout";
import { Label } from "@material-ui/icons";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ParkIcon from "@mui/icons-material/Park";
import ListAltIcon from "@mui/icons-material/ListAlt";
export default function Header({}) {
  const classes = useStyle();
  return (
    <>
      <div className={classes.nav}>
        <div className={classes.navItem}>
          <Button
            variant="outlined"
            style={{ color: "white" }}
            startIcon={<LogoutIcon />}
          >
            <label style={{ fontSize: "0.8rem" }}>Log Out</label>
          </Button>
        </div>
        <div className={classes.navItem}>
          <Link className={classes.link} to="/plans">
            <Button
              variant="outlined"
              style={{ color: "white" }}
              startIcon={<ListAltIcon />}
            >
              <label style={{ fontSize: "0.8rem" }}>Plans</label>
            </Button>
          </Link>
        </div>
        <div className={classes.navItem}>
          <Link className={classes.link} to="/plans/99">
            <Button
              variant="outlined"
              style={{ color: "white" }}
              startIcon={<DashboardIcon />}
            >
              <label style={{ fontSize: "0.8rem" }}>Kanban</label>
            </Button>
          </Link>
        </div>
        <div className={classes.navItem}>
          <Link className={classes.link} to="/interactive-plan">
          </Link>
        </div>
      </div>
    </>
  );
}

const useStyle = makeStyles((theme) => ({
  nav: {
    width: "100%",
    height: "60px",
    background: 'rgba(63, 81, 181, 1.0)'
  },
  navItem: {
    padding: "0.8rem 0.1rem",
    width: "130px",
    fontSize: "0.5rem",
    color: "white",
    float: "left",
    textDecoration: "none",
    background: ''
  },
  link: {
    textDecoration: "none",
  },
}));
