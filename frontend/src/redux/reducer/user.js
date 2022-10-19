
export const userRegister = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { loading: true };
    case "USER_REGISTER_SUCCESS":
      return { loading: false, userInfo: action.payload };
    case "USER_REGISTER_FAIL":
      return { loading: false };
    default:
      return state;
  }
};

export const userLogin = (state = {}, action) => {
  console.log('Hitting user login reducer')
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true };
    case "USER_LOGIN_SUCCESS":
      return { loading: false, token: action.payload};
    case "USER_LOGIN_FAIL":
      return { loading: false };
    default:
      return state;
  }
};
