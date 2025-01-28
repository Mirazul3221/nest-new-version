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
   
  if (action.type === 'concate-emoji'){
      // // const tergatMessage = state?.filter(m=>m._id == action.payload)
      const {messageId,senderId,senderName,senderProfile,emoji} = action.payload
         const index = state?.findIndex(m=>m._id == messageId)
        if('emoji' in state[index]){
          const duplicateEmoCheck = state[index].emoji.filter(em=> em.senderId !== senderId);
          console.log(duplicateEmoCheck)
          state[index].emoji = [...duplicateEmoCheck,{senderId,senderName,senderProfile,emoji}]
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

  if (action.type === 'fetch-scroll-message') {
    return state = [...action.payload,...state]
    }
  if (action.type === 'empty-message') {
    console.log('empty message')
    return state = []
    }
///
return state
    
}