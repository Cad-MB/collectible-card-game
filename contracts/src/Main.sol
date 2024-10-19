// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";
import "./Collection.sol";

// thanks to TME's teammates for the collab
contract Main is Ownable {
  int private index;
  mapping(int => Collection) private collections;
  mapping(string => Collection) private collectionsById;

  // store the owners of the cards
  address[] public owners;
  mapping(address => bool) verifyOwner;

  constructor() Ownable(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266) {
    index = 0;
  }

  function createCollection(
    string calldata collentionName,
    int cardCount,
    string calldata id
  ) external onlyOwner {
    address initialOwner = address(this); // the contract itself is the owner
    Collection newCollection = new Collection(
      initialOwner,
      collentionName,
      cardCount
    );
    collections[index] = newCollection; // store the new collection
    collectionsById[id] = newCollection; // store the new collection
    index++; // increment the index
  }

  function mintCard(
    string calldata collectionId,
    address recipient,
    string memory newTokenURI
  ) external onlyOwner returns (uint256) {
    if (!verifyOwner[recipient]) {
      owners.push(recipient);
      verifyOwner[recipient] = true;
    }
    uint256 tokenId = collectionsById[collectionId].mintNFT(
      recipient,
      newTokenURI
    );
    return tokenId;

    // bool theOwner = verifyOwner[recipient];
    // if (theOwner == false) {
    //   owners.push(recipient);
    //   verifyOwner[recipient] = true;
    // }
    // Collection collection = collectionsById[collectionId];
    // uint256 tokenId = collection.mintNFT(recipient, newTokenURI);
    // return tokenId;
  }

  // by copilot
  function getOwners() public view returns (address[] memory) {
    return owners;
  }

  // returns an array of the balance of an account in each collection
  function balanceOf(address owner) public view returns (uint[] memory) {
    uint[] memory balances = new uint[](uint(index));
    for (uint i = 0; i < uint(index); i++) {
      balances[i] = collections[int(i)].balanceOf(owner);
    }
    return balances;
  }

  // inspired by Joumana
  function tokenOfOwnerByIndex(
    int collectionId,
    address owner,
    uint i
  ) external view returns (uint256) {
    return collections[collectionId].tokenOfOwnerByIndex(owner, i);
  }

  function tokenURI(
    int collectionId,
    uint i
  ) external view returns (string memory) {
    return collections[collectionId].tokenURI(i);
  }
}
