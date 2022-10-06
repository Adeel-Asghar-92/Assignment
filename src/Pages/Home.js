import React, { useEffect } from "react";
import { Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { editBank } from "../redux/action/BankAction";

const useStyles = makeStyles((theme) => ({
  btn: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
  },
  container: {
    padding: "30px",
  },
}));

const Home = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const bank = {};
    dispatch(editBank(bank));
  }, []);

  return (
    <>
      <div className={classes.btn}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/addBank")}
        >
          Add Bank
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/banks")}
        >
          Banks
        </Button>
      </div>
      <Typography variant="h2" color="primary" align="center">
        Assignment
      </Typography>
    </>
  );
};
export default Home;
