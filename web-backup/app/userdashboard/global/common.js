import { baseurl } from "@/app/config"
import axios from "axios"

export const CountQuestionsCollection =async (status,singleQuestion,token)=> {
    const manageQuestion = {
      status,
      subject:singleQuestion.subject,
      id:singleQuestion._id
    }
    const {data} = await axios.post(`${baseurl}/auth/collect-all-questions`,manageQuestion,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (status=='right') {
      const collectRQuestions = localStorage.getItem("collectedRightQuestions") ? JSON.parse(localStorage.getItem("collectedRightQuestions")) : []
        collectRQuestions.push(singleQuestion)
    localStorage.setItem("collectedRightQuestions", JSON.stringify(collectRQuestions));
    }else { 
    const collectWQuestions = localStorage.getItem("collectedWrongQuestions") ? JSON.parse(localStorage.getItem("collectedWrongQuestions")) : []
    collectWQuestions.push(singleQuestion)
    localStorage.setItem("collectedWrongQuestions", JSON.stringify(collectWQuestions));
    }
 }