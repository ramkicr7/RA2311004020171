import axios from "axios";

const BASE_URL = "http://20.207.122.201/evaluation-service";

export async function fetchNotifications(token) {
  try {
    const res = await axios.get(`${BASE_URL}/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("NOTIFICATIONS:", res.data);

    return res.data.notifications;

  } catch (err) {
    console.error("FETCH ERROR:", err.response?.data || err.message);
    return [];
  }
}