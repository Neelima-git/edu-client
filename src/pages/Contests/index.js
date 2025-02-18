import {
  AppBar,
  IconButton,
  Toolbar,
  Box,
  Button,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ContestsList from "./ContestsList";
import contests from "../../data/contestsDetails.json";
const useStyle = makeStyles((theme) => ({
  root: {
    margin: "5px",
  },
  buttoncontainer: {
    marginTop: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    background: "#160050",
  },
  Icon: {
    height: 25,
    width: 25,
  },
  trophyIcon: {
    height: 30,
    width: 30,
  },
  titlecontainer: {
    textAlign: "center",
    marginTop: "5px",
  },
  button: {
    textTransform: "none",
    borderRadius: 5,
    color: "#fff",
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(3),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  contestContainer: {
    marginTop: theme.spacing(3),
  },
}));
const ongoing = contests[0].ongoing;
const upcoming = contests[0].upcoming;
const completed = contests[0].completed;

function Contests() {
  const classes = useStyle();
  const history = useHistory();
  const buttonItems = [
    {
      status: "Ongoing",
    },
    {
      status: "Upcoming",
    },
    {
      status: "Completed",
    },
  ];
  const [status, setStatus] = useState("Active");
  const setStatusFilter = (status) => {
    setStatus(status);
  };
  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar variant="dense">
          <IconButton edge="start" className={classes.backButton} color="inherit" aria-label="menu">
            <ArrowBackIcon onClick={() => history.goBack()} />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.title}>
            Contests & Statistics
          </Typography>
          <IconButton edge="end" className={classes.menuButton} color="inherit">
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs" className={classes.root}>
        <Box className={classes.titlecontainer}>
          <Typography variant="h1">
            Contests
            <span>
              <img src="assets/icon/trophy.png" className={classes.trophyIcon} />
            </span>
          </Typography>
        </Box>
        <Box className={classes.buttoncontainer}>
          <div>
            <Link to="/statistics" style={{ textDecoration: "none" }}>
              <Button className={classes.button} variant="outlined" style={{ color: "#160050" }}>
                My Past Perfomance Statistics &nbsp;{" "}
                <span>
                  <img src="assets/icon/stats.png" className={classes.Icon} />
                </span>
              </Button>
            </Link>
          </div>
          {buttonItems.map((items, index) => (
            <Button
              key={index}
              className={classes.button}
              variant="contained"
              style={{ background: status === items.status ? "#a70202" : "#160050" }}
              onClick={() => setStatusFilter(items.status)}
            >
              <Typography variant="caption">{items.status}</Typography>
            </Button>
          ))}
        </Box>
        <Box className={classes.assignmentContainer}>
          {(() => {
            switch (status) {
              case "Ongoing":
                return ongoing.map((items, index) => (
                  <ContestsList
                    key={index}
                    contestTitle={items.contestTitle}
                    date={items.date}
                    ListTileColor="#EEF7FB"
                    tasktilecolor="#DAE9F0"
                  />
                ));
              case "Upcoming":
                return upcoming.map((items, index) => (
                  <ContestsList
                    key={index}
                    contestTitle={items.contestTitle}
                    date={items.date}
                    ListTileColor="#FEF7EF"
                    tasktilecolor="#F7E6D3"
                  />
                ));
              default:
                return completed.map((items, index) => (
                  <ContestsList
                    key={index}
                    contestTitle={items.contestTitle}
                    date={items.date}
                    ListTileColor="#EBFDF5"
                    tasktilecolor="#C8EEDD"
                  />
                ));
            }
          })()}
        </Box>
      </Container>
    </>
  );
}

export default Contests;
