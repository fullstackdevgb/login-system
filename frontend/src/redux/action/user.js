export const signup = (data) => async (dispatch) => {
  console.log("Inside signup action");
  dispatch({
    type: "USER_REGISTER_REQUEST",
  });
  dispatch({
    type: "USER_REGISTER_SUCCESS",
    payload: data,
  });
};

// export const login = (token) => async (dispatch) => {
//   console.log("Inside Login action", token);
//   dispatch({
//     type: "USER_LOGIN_REQUEST",
//   });

//   if (token) {
//     dispatch({
//       type: "USER_LOGIN_SUCCESS",
//       payload: token,
//     });
//     localStorage.setItem("token", token);
//   }
// };

export const logout = () => (dispatch) => {
  dispatch({
    type: "USER_LOGOUT_REQUEST",
  });
  localStorage.clear();
};
