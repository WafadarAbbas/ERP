import axios from "axios";
import { getToken } from '../Compo/utilis/getToken';
const ApiCall = async ({ url, method, data }) => {
  const secretKey = process.env.REACT_APP_SECRET_KEY;

  
  const token = await getToken();

  console.log("api calling", url, method, data);

  try {
    const response = await axios({
      method: method,
      url: url,
      data: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
    });

    console.log("api response", response);

    if (response?.status === 200) {
      return response;
    }
  } catch (error) {
    console.error("api call catch", error);
    if (error.message === "Network Error") {
      return error.message;
    }
    return error.response ? error.response.data : error;  
  }
};

export default ApiCall;