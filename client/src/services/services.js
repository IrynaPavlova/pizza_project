import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/";

export default {
  async getAllProducts() {
    try {
      const data = await axios.get("/products");
      console.log("data", data);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  async getProductsById(id) {
    try {
      const data = await axios.get(`/products/${id}`);
      //console.log("data", data);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  async getProductsByCategory(category) {
    try {
      const data = await axios.get(`/products/?category="${category}"`);
      //console.log("data", data);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  },

  async getAllUsers() {
    try {
      const data = await axios.get("/users");
      console.log("data", data);
      return data;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
};
