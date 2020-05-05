import React from "react";
import { useRoute } from "../routes";

const App = () => {
  const route = useRoute();
  return <>{route}</>;
};

export default App;
