import {
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Delete, Edit } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { editBank } from "../../redux/action/BankAction";
import Swal from "sweetalert2";
import { token } from "../../constant";
// styles
const useStyles = makeStyles((theme) => ({
  table: {
    border: "solid 1px #9b9d9f",
    marginTop: "20px",
  },
  paper: {
    padding: "20px",
    marginTop: "30px",
  },
  tableHead: {
    backgroundColor: "#8a91b9",
  },
}));

const Banks = () => {
  const classes = useStyles();
  const history = useHistory();
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  //   method to get list of bank
  const getBanks = async () => {
    setLoading(true);
    await axios
      .get(`http://rightway-api.genial365.com/api/BankNames/GetData`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        setLoading(false);
        setBanks(response.data);
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
  //
  const editHandler = (bank) => {
    dispatch(editBank(bank)); // to store bank in redux
    history.push("/addBank");
  };

  useEffect(() => {
    getBanks();
  }, []);

  return (
    <>
      {/* button to move to main page */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push("/")}
      >
        {" "}
        Back{" "}
      </Button>

      {/* list of banks */}
      <Paper variant="elevation" elevation={4} className={classes.paper}>
        <Typography variant="h5">Banks List</Typography>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow className={classes.tableHead}>
              <TableCell>SR</TableCell>
              <TableCell>Bank Name</TableCell>
              <TableCell>Branch City</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {banks.length > 0 &&
              banks.map((bank, index) => (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{bank.bank_name}</TableCell>
                  <TableCell>{bank.branch_city}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => editHandler(bank)}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="secondary">
                      <Delete fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {loading && <CircularProgress color="primary" />}
        </div>
        {!loading && banks.length === 0 && <Typography>No Data</Typography> }
      </Paper>
    </>
  );
};

export default Banks;
