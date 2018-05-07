// export const setTextFilter = (text = '') => {
//   return ({
//     type: 'SET_TEXT_FILTER',
//     text: text
//   })
// }
// SAME AS //
//
// SET_TEXT_FILTER
export const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
});

// SET_COLOR_FILTER
export const setColorFilter = (color = '#4A90E2') => ({
  type: 'SET_COLOR_FILTER',
  color
})

// SET_SIZE_FILTER
export const setSizeFilter = (size = 24) => ({
  type: 'SET_SIZE_FILTER',
  size
})
