import { baseurl } from "@/app/config";
import axios from "axios";

export const fetchAllFriendsByMessage = async (token) => {
    try {
        const { data } = await axios.get(
          `${baseurl}/messanger/my-friends-by-both-message-and-profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
       return await data
      } catch (error) {
        console.log(error)
      }
}