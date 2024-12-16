import { baseurl } from "@/app/config";
import axios from "axios";

export const myDetailsApi =  async (token)=>{
    try {
      const { data } = await axios.get(`${baseurl}/auth/find`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data)
      localStorage.setItem('myDetails', JSON.stringify(data))
    } catch (error) {
      console.log(error);
    }
  }



// export const notificationApi = async (token) => {
//     try {
//       const { data } = await axios.get(`${baseurl}/notification/find`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//         localStorage.setItem('notifications', JSON.stringify(data))
//     } catch (error) {}
//   };