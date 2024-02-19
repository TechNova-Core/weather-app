const reducer = (state, { type, payload }) => {
  // console.log(type, payload, state);
  switch (type) {
    case "CLEAR_SESSION":
      return {}
    case "SET_SESSION":
      return {
        ...state,
        ...payload,
      }
    case "SET_SESSION_DATA":
      return {
        ...state,
        sessionData: state.sessionData ? { ...state.sessionData, ...payload } : payload, 
      }
    default:
      return state
  }
}

export default reducer;