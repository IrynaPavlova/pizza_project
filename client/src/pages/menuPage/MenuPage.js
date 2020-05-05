import React, { Component } from "react";
import services from "../../services/services";

class MenuPage extends Component {
  state = {
    data: []
  };

  componentDidMount = async () => {
    const data = await services.getAllUsers();
    console.log("data", data);
    this.setState({ data: data.data.users });
  };

  render() {
    console.log("state", this.state);
    //const users = this.state.data;
    return (
      <>
        <h2>MenuPage</h2>
        {/* <ul>
          {users.map(item =>
            item.images.map(elem => <img src={elem} alt="noooo" />)
          )}
        </ul> */}
      </>
    );
  }
}

export default MenuPage;

// const data = services.getAllProducts();
// console.log("data", data);

// const dataByCategory = services.getProductsByCategory("pizza");
// console.log("dataByCategory", dataByCategory);

// const dataById = services.getProductsById("5e7a12ac663deb32f1667629");
// console.log("dataById", dataById);
