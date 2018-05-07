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
