import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

export class Customer extends React.Component {
  render() {
    return (
      <TableRow>
        <TableCell>{this.props.id}</TableCell>
        <TableCell>
          <img src={this.props.image} alt="profile picture" />
        </TableCell>
        <TableCell>{this.props.name}</TableCell>
        <TableCell>{this.props.email}</TableCell>
        <TableCell>{this.props.phone}</TableCell>
      </TableRow>
    );
  }
}

export default Customer;
