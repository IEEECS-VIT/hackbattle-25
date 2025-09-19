import axios from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const verifyToken = async (accessToken) => {
  return axios.post(
    `${BACKEND_URL}/login/verify-token`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};


export const leaveTeam = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`${BACKEND_URL}/teams/leave`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error leaving team:", err.response?.data || err.message);
    throw err;
  }
};


export const removeMember = async (memberUid) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${BACKEND_URL}/teams/remove-member`,
      { memberUid },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error removing member:", err.response?.data || err.message);
    throw err;
  }
};