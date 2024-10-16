import { jwtDecode } from "jwt-decode";
export const decode_token = (token) => {
  // const { store } = useContext(storeContext);
  if (token) {
    try {
      const jwt_decoded = jwtDecode(token);
      const exp = new Date(jwt_decoded.exp * 1001);
      console.log(exp)
      if (new Date() > exp) {
        localStorage.removeItem("token");
        return "";
      } else {
        return jwt_decoded;
      }
    } catch (error) {}
  } else {
    return "";
  }
};