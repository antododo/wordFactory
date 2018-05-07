export default (words, {text, color, size})=>{
  return words.filter((word)=>{

    let colorMatch = true;
    let sizeMatch = true;
    let ownerMatch = true;

    // let textMatch = true;
    // if (text){
    //   textMatch = word.text.toLowerCase().includes(text.toLowerCase());
    // }
    //
    // SAME AS
    let textMatch = (text) ? word.text.toLowerCase().includes(text.toLowerCase()) : true;

    if(color){
      colorMatch = (word.fontColor.toLowerCase() === color.toLowerCase())
    }


    // .slice(0, -2) is to remove the 'px' from the size
    if(size.slice(0, -2)){
      sizeMatch = (word.fontSize.slice(0, -2) === size.slice(0, -2))
    }

    return textMatch && colorMatch && sizeMatch && ownerMatch;
  })
}
