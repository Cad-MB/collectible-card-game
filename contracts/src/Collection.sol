// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Collection is Ownable {
  string public name;
  int public cardCount;
  string public collectionID;
  uint256[] public cards;
  address private _cardNftContract;
   
  constructor(string memory _name, string memory _collectionId, int _cardCount, address cardNftContract) Ownable(msg.sender) {
    name = _name;
    cardCount = _cardCount;
    collectionID = _collectionId;
    _cardNftContract = cardNftContract;
  }

  function addCard(uint256 cardId) external onlyOwner {
    // if cards.length is equal or higher than cardCount, it will revert
    require(cards.length < uint256(cardCount), "Collection: Card count exceeded");
    cards.push(cardId);
  }

  function getCards() external view returns (uint256[] memory) {
    return cards;
  }

  function getCardNftContract() external view returns (address) {
    return _cardNftContract;
  }
}
