pragma solidity ^0.4.23;

import "./BillableWallet.sol";

contract BillableWalletFactory {

  mapping(address => address) public userWallets;
  address[] public wallets;
  address owner;


  constructor() public {
    owner = msg.sender;
  }

  function createWallet() public {
    require(userWallets[msg.sender] == 0x0, "You can only have one billable wallet");
    address newWallet = new BillableWallet(msg.sender);
    userWallets[msg.sender] = newWallet;
    wallets.push(newWallet);
  }

}
