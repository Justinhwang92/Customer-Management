import React from "react";

class CustomerDelete extends React.Component {
  deleteCustomer(id) {
    // usage - delete customer whose id is 7: /api/customer/7
    const url = "/api/customers/" + id;

    fetch(url, {
      method: "DELETE",
    });
    // refresh the states
    this.props.stateRefresh();
  }

  render() {
    return (
      <button
        onClick={(e) => {
          this.deleteCustomer(this.props.id);
        }}
      >
        Delete
      </button>
    );
  }
}

export default CustomerDelete;
