import { Navigate } from "react-router-dom";
const Protected = ({ isLoggedIn, children }) => {
  if (!localStorage.getItem("token")) {
    console.log("Protected",isLoggedIn);
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};
export default Protected;
