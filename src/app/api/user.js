import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const checkStatus = async (accessToken) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/signin`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response, "response");
    return response;
  } catch (error) {
    console.error("Error checking status:", error);
    throw error;
  }
}
