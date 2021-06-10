import React from "react";
import { post } from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Textfield from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  hidden: {
    display: "none",
  },
});

class CustomerAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      userName: "",
      email: "",
      phone: "",
      fileName: "",
      open: false,
    };
  }

  addCustomer = () => {
    const url = "/api/customers";
    const formData = new FormData();

    formData.append("image", this.state.file);
    formData.append("name", this.state.userName);
    formData.append("email", this.state.email);
    formData.append("phone", this.state.phone);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    return post(url, formData, config);
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.addCustomer().then((response) => {
      console.log(response.data);
      // refresh the whole page
      window.location.reload();
      // refresh states
      // this.props.stateRefresh();
    });
    // empty input box after hit summit button
    this.setState({
      file: null,
      userName: "",
      email: "",
      phone: "",
      fileName: ",",
      open: false,
    });
  };

  handleFileChange = (e) => {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.value,
    });
  };

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  };

  // when click the add button
  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  // when close the add modal
  handleClose = () => {
    this.setState({
      file: null,
      userName: "",
      email: "",
      phone: "",
      fileName: ",",
      open: false,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Add Customer
        </Button>
        {/* Dialog is only opened when open state is true */}
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Add Customer</DialogTitle>
          <DialogContent>
            <input
              className={classes.hidden}
              accept="image/*"
              id="raised-button-file"
              name="file"
              file={this.state.file}
              value={this.state.fileName}
              onChange={this.handleFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="contained"
                color="primary"
                component="span"
                name="file"
              >
                {this.state.fileName === ""
                  ? "Choose profile picture"
                  : this.state.fileName}
              </Button>
            </label>
            <br />
            <Textfield
              label="Name"
              type="text"
              name="userName"
              value={this.state.userName}
              onChange={this.handleValueChange}
            />{" "}
            <br />
            <Textfield
              label="Email"
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleValueChange}
            />{" "}
            <br />
            <Textfield
              label="Phone"
              type="text"
              name="phone"
              value={this.state.phone}
              onChange={this.handleValueChange}
            />{" "}
            <br />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleFormSubmit}
            >
              Add
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleClose}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(CustomerAdd);
