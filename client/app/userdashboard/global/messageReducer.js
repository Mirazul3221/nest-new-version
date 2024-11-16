export const messageReducer = (state,action) => {
if (action.type === 'fetch-message') {
   return state = [...action.payload]
}

return state
    
}