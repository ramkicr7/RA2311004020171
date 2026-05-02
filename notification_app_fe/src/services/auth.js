import axios from "axios";
import { setToken } from "../logging_middleware/logger";

export async function getToken() {
  try {
    const res = await axios.post(
      "http://20.207.122.201/evaluation-service/auth",
      {
        email: "ee2177@srmist.edu.in",
        name: "ramkishore",
        rollNo: "ra2311004020171",
        accessCode: "QkbpxH",
        clientID: "966a3c5a-8d1d-4e11-9a25-02fc8bf9c30f",
        clientSecret: "krEVzzaYQcjezQTJ"
      }
    );

    console.log("TOKEN SUCCESS:", res.data);

    const token = res.data.access_token;
    setToken(token);

    return token;

  } catch (err) {
    console.error("AUTH ERROR FULL:", err.response?.data);
    return null;
  }
}