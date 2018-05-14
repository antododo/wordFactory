const wordsReducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_WORD':
    return [
      ...state,
      {
        text: action.text,
        fontSize: action.fontSize,
        fontColor: action.fontColor,
        time: action.time,
        owner: action.owner
      }
    ]
  case 'RESET_WORDS' :
    return []
  default:
    return state
  }
}

export default wordsReducer
