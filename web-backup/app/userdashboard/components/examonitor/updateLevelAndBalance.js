import { baseurl } from "@/app/config";
import axios from "axios";

export const UpdateUserBalanceAndLevel = (userDetails) => {

  //========================================================================================
  //=================================UPDATE LEVEL===========================================
  //========================================================================================
  const token = userDetails.token;
  const info = userDetails.userInfo;
  const updateUserData =async (incomingLevel,fund)=> {
    try {
      await axios.get(
        `${baseurl}/auth/insert-balance-and-level`,
        { key: "level", value: incomingLevel,fund:fund },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {}
  }
  updateUserData()

  //======================================
  const condition =async () => {
    let value = 2100;
    let p = 70
    if ((value >= 900 && value < 4900) && p)  {
        // const fund = userDetails.balance + 5
        // userDetails.status == "Level One" ? null : updateLavelValue("Level One", fund)
        console.log('snvkl')
      }
      if ((value >= 4900 && value < 16900) && p)  {
          console.log("2222222222");
      }
      if ((value >= 16900 && value < 44100) && p)  {
          console.log("333");
      }
      if ((value >= 44100 && value < 96100) && p)  {
          console.log("444");
      }
      if ((value >= 96100 && value < 184900) && p)  {
          console.log("55");
      }
      if ((value >= 184900 && value < 324900) && p)  {
          console.log("6666");
      }
      if ((value >= 324900 && value < 532900) && p)  {
          console.log("77777");
      }
      if ((value >= 324900 && value < 532900) && p)  {
          console.log("77777");
      }
}
}