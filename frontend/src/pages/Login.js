import React from "react";
import { Link, Navigate } from "react-router-dom";
import "./styles.css";
import { login } from "../redux/action/user";
import { connect } from "react-redux";
import Loading from "../component/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isRedirect: false,
    };
  }

  componentDidMount() {
    if (this.props?.userRegisterState?.userInfo?.email) {
      this.setState({ email: this.props.userRegisterState.userInfo.email });
    }
  }

  loginUser = async (email, password) => {
    console.log("email from login user function", email);

    try {
      const URL = "http://localhost:4000/api/auth/user/login";
      const { data } = await axios.post(URL, {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
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
    event.preventDefault();
    this.setState({ error: "" });
    const { email, password } = this.state;
    this.loginUser(email, password);
    console.log(this.state.email);
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
    console.log("state --< ", this.state);
    const { isRedirect } = this.state;
    return (
      <div className="container-body">
        {isRedirect && <Navigate to="/home" replace={true} />}
        <div>
          <ToastContainer />
        </div>
        <div id="login-form-wrap">
          {this.props.userRegisterState &&
          this.props.userRegisterState.loading ? (
            <Loading />
          ) : (
            <div className="signUpFormWrapper">
              <h2>Login</h2>
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
                  <input type="submit" id="signup" value="Login" />
                </p>
              </form>
              <div id="create-account-wrap">
                <p>
                  Not a member <Link to="/signup">Sign up</Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userRegisterState: state.userRegister,
  };
}

export default connect(mapStateToProps)(Login);
