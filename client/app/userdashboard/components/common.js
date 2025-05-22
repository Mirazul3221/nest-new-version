import { baseurl } from "@/app/config";
import axios from "axios";

export const myDetailsApi =  async (token)=>{
    try {
      const { data } = await axios.get(`${baseurl}/auth/find`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.setItem('myDetails', JSON.stringify(data))
    } catch (error) {
      console.log(error);
    }
  }


export const profileApi =async (token,id) => {
  try {
    const { data } = await axios.get(`${baseurl}/auth/user/find-user-profile-by-id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data
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

 export const isWebGLAvailable = function () {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch (e) {
    return false;
  }
}

export const commonLogout = async (dispatch, err) => {
  if (err.response.data.error === "Unauthorized") {
    await dispatch({ type: "logout" });
    window.location.href = "/login";
  }
};

export const maskEmail = (email) => {
  if (!email) return '';
  const [name, domain] = email.split('@');
  if (!name || !domain) return email;

  const maskedName = name[0] +name[1] + '*'.repeat(name.length - 1) + name[name.length-2] + name[name.length-1];
  return `${maskedName}@${domain}`;
}; 