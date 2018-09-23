pragma solidity ^0.4.23;

import "./BillableWallet.sol";

contract BillableWalletFactory {

  mapping(address => address) public userWallets;
  address[] public wallets;
  mapping(address => bool) isWallet;
  address owner;

  event BillerState(address indexed biller, address indexed wallet, uint amount, address token, bool authorized);
  event Bill(address indexed biller, address wallet,  uint billIndex);

  constructor() public {
    owner = msg.sender;
  }

  function createWallet() public {
    require(userWallets[msg.sender] == 0x0, "You can only have one billable wallet");
    address newWallet = new BillableWallet(msg.sender, address(this));
    userWallets[msg.sender] = newWallet;
    isWallet[newWallet] = true;
    wallets.push(newWallet);
  }

  modifier onlyWallet() {
    require(isWallet[msg.sender] == true, "Must be a wallet");
    _;
  }
  function emitBillerStateChange(address biller, uint amount, address token, bool authorized) public onlyWallet {
    emit BillerState(biller, msg.sender, amount, token, authorized);
  }

  function emitBill(address biller, uint billIndex) public onlyWallet {
    emit Bill(biller, msg.sender, billIndex);
  }


}


