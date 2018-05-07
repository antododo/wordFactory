export default (words, {text})=>{
  return words.filter((word)=>{
    const textMatch = word.text.toLowerCase().includes(text.toLowerCase());

    return textMatch;
  })
}
