import React, { Component } from "react";
import glam from "glamorous";
import "antd/dist/antd.css";
import { Layout } from "antd-3.5.4";
import Routes from "./components/Routes";
import Header from "./containers/Header";

const AppBase = glam(Layout)({
  minHeight: "100vh"
});

const Content = glam(Layout.Content)({ padding: 50 });

class App extends Component {
  render() {
    return (
      <AppBase>
        <Header />
        <Content>
          <Routes />
        </Content>
      </AppBase>
    );
  }
}

export default App;
