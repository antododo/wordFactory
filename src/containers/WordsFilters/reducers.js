const filtersReducerDefaultState = {
  text: '',
  color: '',
  size: '',
  sortBy: 'text'
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type){
  case 'SET_TEXT_FILTER':
    return {
      ...state,
      text: action.text
    }
  case 'SET_COLOR_FILTER':
    return {
      ...state,
      color: action.color
    }
  case 'SET_SIZE_FILTER':
    return {
      ...state,
      size: action.size + 'px'
    }
  case 'SORT_BY_TEXT':
    return {
      ...state,
      sortBy: 'text'
    }
  default:
    return state
  }
}

export default filtersReducer
