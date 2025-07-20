export const globalDataReducer = (state, action) => {

 if (action.type == 'GLOBALUSERDATA') {
      return {
      globalUserProfile : action.payload,
      message:state.message,
      user: state.user,
      userMemories: state.userMemories,
      rightSideBarData:state.rightSideBarData
    };
 }
 
  if (action.type === "fetch-message") {
    state.message = [...action.payload];
    return state;
  }

  if (action.type === "send-message") {
    state.message = [...state.message, action.payload];
    return state;
  }
  if (action.type === "receive-message") {
    return {
      globalUserProfile:state.globalUserProfile,
      message: [...state.message, action.payload],
      user: state.user,
      userMemories: state.userMemories,
      rightSideBarData:state.rightSideBarData
    };
  }

  if (action.type === "concate-emoji") {
    // // const tergatMessage = state?.filter(m=>m._id == action.payload)
    const { messageId, senderId, senderName, senderProfile, emoji } =
      action.payload;
    const index = state?.message?.findIndex((m) => m._id == messageId);
    if ("emoji" in state?.message[index]) {
      const duplicateEmoCheck = state.message[index].emoji.filter(
        (em) => em.senderId !== senderId
      );
      console.log(duplicateEmoCheck);
      state.message[index].emoji = [
        ...duplicateEmoCheck,
        { senderId, senderName, senderProfile, emoji },
      ];
    } else {
      state.message[index].emoji = [
        { senderId, senderName, senderProfile, emoji },
      ];
    }
    // // if ("emoji" in tergatMessage[0] == false) {
    // //   tergatMessage[0].emoji = [{senderId,senderName,senderProfile,emoji}]
    // //   console.log(state)
    // //   return state
    // // }
    return {
      globalUserProfile:state.globalUserProfile,
      message: [...state.message],
      user: state.user,
      userMemories: state.userMemories,
      rightSideBarData:state.rightSideBarData
    };
  }

  if (action.type === "fetch-scroll-message") {
    return {
      globalUserProfile:state.globalUserProfile,
      message: [...action.payload, ...state.message],
      user: state.user,
      userMemories: state.userMemories,
      rightSideBarData:state.rightSideBarData
    };
  }
  if (action.type === "empty-message") {
    state.message = [];
    return state;
  }

  ///////////////////////////////////////////User logic from here/////////////////////////////
  if (action.type === "STORE_ALL_MESSANGER_USER") {
    return {
      globalUserProfile:state.globalUserProfile,
      message: state.message,
      user: [...action.payload],
      userMemories: state.userMemories,
      rightSideBarData:state.rightSideBarData
    };
  }

  if (action.type === "INSURT_MY_USER_PROFILE") {
    // const isExist = state.user.some(user=>user.senderId===action.payload.senderId)
    // const isExistObj = state.user.find(user=>user.senderId===action.payload.senderId)
    const updateArrey = state.user.filter(
      (user) => user.userId !== action.payload.userId
    );
    return {
      globalUserProfile:state.globalUserProfile,
      message: state.message,
      user: [action.payload, ...updateArrey],
      userMemories: state.userMemories,
      rightSideBarData:state.rightSideBarData
    };
  }

  if (action.type === "STORE_REMOTE_USER_PROFILE") {
    const existingUser = state.user.filter(
      (user) => user.userId === action.payload.data.userId
    );
    const updatingUsers = state.user.filter(
      (user) => user.userId !== action.payload.data.userId
    );
    const newUserModify = {
      ...action.payload.data,
      unseenMessageCount: existingUser[0]?.unseenMessageCount + 1,
      test: "sttt",
    };
    return {
      globalUserProfile:state.globalUserProfile,
      message: state.message,
      user: [newUserModify, ...updatingUsers],
      userMemories: state.userMemories,
      rightSideBarData:state.rightSideBarData
    };
  }

  ///////////////////////////////Logic for user memory management///////////////////////////
  if (action.type === "ADD_ALL_MEMORY") {
    return {
      globalUserProfile:state.globalUserProfile,
      message: state.message,
      user: state.user,
      userMemories: action.payload,
      rightSideBarData:state.rightSideBarData
    };
  }
  if (action.type === "ADD_NEW_MEMORY") {
    return {
      globalUserProfile:state.globalUserProfile,
      message: state.message,
      user: state.user,
      userMemories: action.payload,
      rightSideBarData:state.rightSideBarData
    };
  }
  if (action.type === "STORE_RIGHTSIDEBAR_DATA") {
    return {
      globalUserProfile:state.globalUserProfile,
      message: state.message,
      user: state.user,
      userMemories: state.userMemories,
      rightSideBarData:action.payload
    };
  }
  return state;
};
