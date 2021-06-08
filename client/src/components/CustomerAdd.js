import React from "react";
import { post } from "axios";

class CustomerAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      userName: "",
      email: "",
      phone: "",
      fileName: "",
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

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <h1>Add Customer</h1>
        Image:{" "}
        <input
          type="file"
          name="file"
          file={this.state.file}
          value={this.state.fileName}
          onChange={this.handleFileChange}
        />
        <br />
        Name:{" "}
        <input
          type="text"
          name="userName"
          value={this.state.userName}
          onChange={this.handleValueChange}
        />{" "}
        <br />
        Email:{" "}
        <input
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.handleValueChange}
        />{" "}
        <br />
        Phone:{" "}
        <input
          type="text"
          name="phone"
          value={this.state.phone}
          onChange={this.handleValueChange}
        />{" "}
        <br />
        <button type="submit">Add</button>
      </form>
    );
  }
}

export default CustomerAdd;
