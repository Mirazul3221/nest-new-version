export const messageReducer = (state,action) => {
if (action.type === 'fetch-message') {
  state.message = [...action.payload]
   return state
}

  if (action.type === 'send-message') {
    state.message = [...state.message,action.payload]
  return state
  }
  if (action.type === 'receive-message') {
    state.message = [...state.message,action.payload]
    console.log(action.payload)
  return state
  }
   
  if (action.type === 'concate-emoji'){
      // // const tergatMessage = state?.filter(m=>m._id == action.payload)
      const {messageId,senderId,senderName,senderProfile,emoji} = action.payload
         const index = state.message?.findIndex(m=>m._id == messageId)
         console.log(index)
        if('emoji' in state.message[index]){
          const duplicateEmoCheck = state.message[index].emoji.filter(em=> em.senderId !== senderId);
          console.log(duplicateEmoCheck)
          state.message[index].emoji = [...duplicateEmoCheck,{senderId,senderName,senderProfile,emoji}]
        }else {
               state.message[index].emoji = [{senderId,senderName,senderProfile,emoji}]
        }
      // // if ("emoji" in tergatMessage[0] == false) {
      // //   tergatMessage[0].emoji = [{senderId,senderName,senderProfile,emoji}]
      // //   console.log(state)
      // //   return state
      // // }
      return {
        message:[...state.message],user:[]
      }
  }

  if (action.type === 'fetch-scroll-message') {
    state.message = [...action.payload,...state.message]
    return state
    }
  if (action.type === 'empty-message') {
    console.log('empty message')
    state.message = []
    return state
    }
///
return state
    
}