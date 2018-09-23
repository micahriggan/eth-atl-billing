pragma solidity ^0.4.23;

import "./BillableWallet.sol";

contract BillableWalletFactory {

  mapping(address => address) public userWallets;
  address[] public wallets;
  address owner;

  event BillerState(address indexed biller, address wallet, uint amount, address token, bool authorized);

  constructor() public {
    owner = msg.sender;
  }

  function createWallet() public {
    require(userWallets[msg.sender] == 0x0, "You can only have one billable wallet");
    address newWallet = new BillableWallet(msg.sender, address(this));
    userWallets[msg.sender] = newWallet;
    wallets.push(newWallet);
  }

  function emitBillerAuthorization(address biller, uint amount, address token, bool authorized) public {
    emit BillerState(biller, msg.sender, amount, token, authorized);
  }

}

