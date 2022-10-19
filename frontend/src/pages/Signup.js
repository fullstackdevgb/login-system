import React from "react";
import { Link, Navigate } from "react-router-dom";
import "./styles.css";
import { signup } from "../redux/action/user";
import { connect } from "react-redux";
import Loading from "../component/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isRedirect: false,
    };
  }

  signUpUser = async (email, password) => {
    console.log("email & password", email);
    try {
      const URL = "http://localhost:4000/api/auth/user/signup";
      const { data } = await axios.post(URL, { email, password });
      this.props.signupAction(data);

      toast.success("user registered successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      this.setState({ isRedirect: true });
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  handleSubmit = async (event) => {
    this.setState({ error: "" });
    event.preventDefault();
    const { email, password } = this.state;
    this.signUpUser(email, password);
    this.state = {
      email: "",
      password: "",
    };
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { isRedirect } = this.state;

    return (
      <div className="container-body">
        {isRedirect && <Navigate to="/login" replace={true} />}
        <div>
          <ToastContainer />
        </div>
        <div id="login-form-wrap">
          {this.props.userRegisterState &&
          this.props.userRegisterState.loading ? (
            <Loading />
          ) : (
            <div className="signUpFormWrapper">
              <h2>Sign up</h2>
              <form id="login-form" onSubmit={this.handleSubmit}>
                <p>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    required
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <i className="validation">
                    <span></span>
                    <span></span>
                  </i>
                </p>
                <p>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    required
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <i className="validation">
                    <span></span>
                    <span></span>
                  </i>
                </p>
                <p>
                  <input type="submit" id="signup" value="signup" />
                </p>
              </form>
              <div id="create-account-wrap">
                <p>
                  Already a member? <Link to="/login">Login</Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signupAction: (email, password) => dispatch(signup(email, password)),
});

function mapStateToProps(state) {
  return {
    userRegisterState: state.userRegister,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
