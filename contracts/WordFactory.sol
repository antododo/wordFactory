pragma solidity ^0.4.2;

import "./zeppelin/ownership/Ownable.sol";

contract WordFactory is Ownable {

  //Event
  event NewWord(address owner, string text, string color, uint size, uint time);

  // Struct
  struct Word {
    address owner;
    string text;
    string color;
    uint size;
    uint time;
  }

  // Array of Words
  Word[] public words;

  // Mapping
  mapping (address => uint) OwnerWordCount;
  mapping (uint => address) WordToOwner;

  // Add word
  function addWord(string _text, string _color, uint _size) public {
    uint id = words.push(Word(msg.sender, _text, _color, _size, block.timestamp)) -1;
    WordToOwner[id] = msg.sender;
    NewWord(msg.sender, _text, _color, _size, block.timestamp);
    // emit NewWord(msg.sender, _text, _color, _size, block.timestamp);
    OwnerWordCount[msg.sender]++;
  }

  // Get length of words
  function getLengthOfWords() public constant returns (uint count){
    return words.length;
  }

  // Get words by owner
  // Returning an array with words ID instead of an array of Word because
  // returning array of struct is currently experimental: 'pragma experimental ABIEncoderV2;'
  function getWordByOwner(address _owner) public view returns(uint[]) {
    uint[] memory result = new uint[](OwnerWordCount[_owner]);
    uint counter = 0;
    for(uint i = 0; i < words.length; i++) {
      if (WordToOwner[i] == _owner) {
        result[counter] = i;
        counter++;
      }
    }
    return result;
  }
}
