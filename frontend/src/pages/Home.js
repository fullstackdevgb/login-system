import React from "react";
import {connect} from "react-redux"
import { Navigate } from "react-router-dom";
import { logout } from "../redux/action/user";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldLogout: false,
    };
  }

  
  handleLogout = () => {
    console.log('loggin out')
    localStorage.clear()
    this.setState({ shouldLogout: true })
  };

  render() {
    return (
      <>
        {this.state.shouldLogout && <Navigate to="/login" replace={true} />}
        <h1>Hi {this.props.userRegisterState.userInfo.email} </h1>
        <button
          type="button"
          class="btn btn-primary"
          onClick={this.handleLogout}
        >
          logout
        </button>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logoutAction: () => dispatch(logout()),
});

function mapStateToProps(state) {
  return {
    userRegisterState: state.userRegister,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
