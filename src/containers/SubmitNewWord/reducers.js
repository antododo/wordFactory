const submitReducer = (state ={submitingWord: false}, action) => {
  switch (action.type){
    case 'SUBMITING_WORD':
      return {submitingWord: true}
    case 'SUBMIT_DONE':
      return {submitingWord: false}
    default:
      return state
  }
}

export default submitReducer
