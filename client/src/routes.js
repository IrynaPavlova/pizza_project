import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import MenuPage from "./pages/menuPage/MenuPage";
import OrderPage from "./pages/orderPage/OrderPage";

export const useRoute = () => {
  return (
    <>
      <Switch>
        <Route path="/" exact component={MenuPage} />
        <Route path="/order" component={OrderPage} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};
