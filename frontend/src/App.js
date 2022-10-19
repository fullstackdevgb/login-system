import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Protected from "./component/Protected";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      console.log("Hitting app js component did mount");
      this.setState({ isLoggedIn: true });
    }
  }

  render() {
    console.log("from app js", this.state.isLoggedIn);
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/" element={<Home />} /> */}
            <Route
              path="/home"
              element={
                <Protected isLoggedIn={this.state.isLoggedIn}>
                  <Home />
                </Protected>
              }
            />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
