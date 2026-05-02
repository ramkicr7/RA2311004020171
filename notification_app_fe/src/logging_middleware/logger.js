import axios from "axios";

let TOKEN = "";

export const setToken = (token) => {
  TOKEN = token;
};

export async function Log(stack, level, pkg, message) {
  try {
    await axios.post(
      "http://20.207.122.201/evaluation-service/logs",
      {
        stack,
        level,
        package: pkg,
        message
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      }
    );
  } catch (err) {
    console.error("Logging failed");
  }
}