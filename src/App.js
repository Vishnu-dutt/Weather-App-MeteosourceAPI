import Header from "./components/Header";
import Main from "./components/Main";
import "./styles/components/App.scss";
import React, { useContext } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import ThemeContext from "./context/theme.context";

function App() {
  const { dark } = useContext(ThemeContext);

  return (
    <div className={`App-${dark ? "dark" : "light"}`}>
      <Header />
      <Main />
    </div>
  );
}

export default App;
