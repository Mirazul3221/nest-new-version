export const reducer = (state, action) => {
  if (action.type === "ALL") {
    state = action.payload;
    return state;
  }
  if (action.type === "FILTER") {
    const allData = action.payload;
    const filterQuestions = allData.filter((quest) => {
      return quest.subject === action.filter;
    });
    return filterQuestions;
  }
  if (action.type === "RECENT") {
    const allData = action.payload;
    const recentData = allData.slice(0, 20);
    state = recentData;
    return state;
  }
  return state;
};
