import { baseurl } from "@/app/config";
import axios from "axios";

export const fetchAllFriendsByMessage = async (token) => {
  try {
    const response = await axios.get(
      `${baseurl}/messanger/my-friends-by-both-message-and-profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // ✅ No need for `await`, Axios already resolves it
  } catch (error) {
    console.error("API Fetch Error:", error.response?.data || error.message);
    throw error; // ❗ Rethrow the error to handle it properly
  }
};
