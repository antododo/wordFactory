const wordsReducer = (state = [], action) => {
  switch (action.type) {
  case 'ADD_WORD':
    return [
      ...state,
      {
        word: action.word
      }
    ]
  default:
    return state
  }
}

export default wordsReducer
