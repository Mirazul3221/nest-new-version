export const messageReducer = (state,action) => {
if (action.type === 'fetch-message') {
   return state = [...action.payload]
}

  if (action.type === 'send-message') {
  return state = [...state,action.payload]
  }
  if (action.type === 'receive-message') {
  return state = [...state,action.payload]
  }
   
  if (action.type === 'send-emoji'){
      // // const tergatMessage = state?.filter(m=>m._id == action.payload)
      const {messageId,senderId,senderName,senderProfile,emoji} = action.payload
         const index = state?.findIndex(m=>m._id == messageId)
         console.log(state[index])
        if('emoji' in state[index]){
          state[index].emoji = [...state[index].emoji,{senderId,senderName,senderProfile,emoji}]
        }else {
               state[index].emoji = [{senderId,senderName,senderProfile,emoji}]
        }
      // // if ("emoji" in tergatMessage[0] == false) {
      // //   tergatMessage[0].emoji = [{senderId,senderName,senderProfile,emoji}]
      // //   console.log(state)
      // //   return state
      // // }
      return [...state]
  }

///
return state
    
}