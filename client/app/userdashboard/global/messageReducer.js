export const messageReducer = (state,action) => {
if (action.type === 'fetch-message') {
   return state = [...action.payload]
}

  if (action.type === 'send-message') {
  return state = [...state,action.payload]
  }

return state
    
}