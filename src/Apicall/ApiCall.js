import axios from "axios";

const ApiCall = async ({ url, method, data }) => {


  console.log("api calling", url, method, data);

  try {
    const response = await axios({
      method: method,
      url: url,
      data: data,
      headers: {
        "Content-Type": "application/json",
        
      },
 
    });

    console.log("api response", response);

    if (response?.status === 200 || response?.status === 204) {
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
