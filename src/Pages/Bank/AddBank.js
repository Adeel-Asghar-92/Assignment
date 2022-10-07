import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Button,
  Paper,
  Typography,
  MenuItem,
  CircularProgress,
} from "@material-ui/core";
import axios from "axios";
import Swal from "sweetalert2";
import { editBank } from "../../redux/action/BankAction";
import { token } from "../../constant";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "20px",
    marginTop: "30px",
  },
  actionBtnContainer: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const AddBank = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { bank } = useSelector((state) => state.Banks);
  const [formState, setFormState] = useState({
    bank_id: "",
    bank_name: "",
    branch_city: "",
    page_name: "add/edit bank",
  });
  const history = useHistory();

  //   method to save input data in state
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((formState) => ({
      ...formState,
      [name]: value,
    }));
  };
  const [cities, setCities] = useState([]);

  useEffect(() => {
    //   initize the state on edit
    if (bank.bank_id) {
      setFormState((formState) => ({
        ...formState,
        bank_id: bank.bank_id,
        bank_name: bank.bank_name,
        branch_city: bank.branch_city,
      }));
    }
  }, [bank]);

  //   get list of cities
  const getBranchCity = async () => {
    await axios
      .get(`http://rightway-api.genial365.com/api/CityNames/GetData`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        setCities(response.data);
      })
      .catch(function (error) {
        if (error.response) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: `${error.response.data.Message}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  //   For clear text fields and clear redux state.
  const clearState = () => {
    dispatch(editBank({}));
    setFormState((formState) => ({
      ...formState,
      bank_id: "",
      bank_name: "",
      branch_city: "",
    }));
  };
  // method  to submit the form on add/ edit
  const submitHandler = (event) => {
    event.preventDefault();

    axios({
      method: `${bank.bank_id ? "Put" : "Post"}`,
      url: `${process.env.REACT_APP_API_URL}/BankNames/${
        bank.bank_id ? `PutData?id=${bank.bank_id}` : "PostData"
      }`,
      data: formState,
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        debugger;
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${res.data}`,
          showConfirmButton: false,
          timer: 1500,
          // showCloseButton: true
        });
        clearState();
      })
      .catch((error) => {
        if (error.response) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: `${error.response.data.Message}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  useEffect(() => {
    getBranchCity();
  }, []);

  return (
    <div>
      <div className={classes.btnContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/")}
        >
          {" "}
          Back{" "}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push("/banks")}
        >
          {" "}
          Banks{" "}
        </Button>
      </div>
      <Paper variant="elevation" elevation={4} className={classes.paper}>
        <Typography variant="h5">Add/Edit Bank Name</Typography>
        <form onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <TextField
                name="bank_name"
                required
                fullWidth
                label="Bank Name"
                value={formState.bank_name}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <TextField
                name="branch_city"
                fullWidth={true}
                required
                label="Select City"
                onChange={handleChange}
                value={formState.branch_city}
                variant="outlined"
                select
                margin="normal"
              >
                {cities.length > 0 ? (
                  cities.map((option, index) => {
                    return (
                      <MenuItem key={option.city_id} value={option.city_name}>
                        {option.city_name}
                      </MenuItem>
                    );
                  })
                ) : (
                  <CircularProgress
                    size="1rem"
                    style={{ marginLeft: "80px" }}
                  />
                )}
              </TextField>
            </Grid>
            <Grid item lg={12} className={classes.actionBtnContainer}>
              <Button variant="contained" color="default" onClick={clearState}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default AddBank;
