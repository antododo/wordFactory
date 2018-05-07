export const addWord = word => ({
  type: 'ADD_WORD',
  text: word.text,
  fontSize: word.fontSize,
  fontColor: word.fontColor,
  time: word.time,
  owner: word.owner
})
