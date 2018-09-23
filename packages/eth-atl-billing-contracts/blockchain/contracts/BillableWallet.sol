pragma solidity ^0.4.23;
import "./ERC20.sol";
import "./BillableWalletFactory.sol";

contract BillableWallet {

  struct Bill {
    uint amount;
    address biller;
    uint createdAt;
    bool paid;
    address token;
  }

  struct Authorization {
    uint amount;
    uint waitTime;
  }

  struct BillerProfile {
    uint lastBilled;
    uint lastPaid;
  }

  address public owner;
  BillableWalletFactory public wFactory;

  Bill[] public bills;
  address[] billers;

  mapping(address => mapping(address => Authorization)) public billerTokenAuthorizations;
  mapping(address => mapping(address => BillerProfile)) public billerTokenProfiles;

  event BillPaid(address biller, uint amount, uint time);
  event Deposit(address from, uint amount, uint time);


  constructor(address creator, address factory) public {
    owner = creator;
    wFactory = BillableWalletFactory(factory);
  }

  function authorizedFor(uint amount, address biller, address token) view public returns(bool) {
    BillerProfile storage billerProfile = billerTokenProfiles[biller][token];
    Authorization storage auth = billerTokenAuthorizations[biller][token];
    uint lastBillTime = billerProfile.lastBilled;
    uint waitTime = auth.waitTime;
    uint minTime = lastBillTime + waitTime;
    return now >= minTime && amount <= auth.amount;
  }

  function isPaid(uint pendingBillIndex) public view returns(bool) {
    return bills[pendingBillIndex].paid;
  }

  function markPaid(uint pendingBillIndex) internal returns(bool paid) {
    Bill storage foundBill = bills[pendingBillIndex];
    require(foundBill.paid == false, "Can't double pay");
    foundBill.paid = true;
    billerTokenProfiles[foundBill.biller][foundBill.token].lastPaid = now;
    emit BillPaid(foundBill.biller, foundBill.amount, now);
    return true;
  }

  function getBalance(address token) public view returns (uint balance) {
    if(token == 0x0) {
      return address(this).balance;
    } else {
      return ERC20Interface(token).balanceOf(address(this));
    }
  }

  function internalSend(address to, uint amount, address token) private returns(bool success) {
    if(token == 0x0) {
      return to.send(amount);
    } else {
      return ERC20Interface(token).transfer(to, amount);
    }
  }

  function bill(uint amount, address token) external returns(bool) {
    billerTokenProfiles[msg.sender][token].lastBilled = now;
    bills.push(Bill({
      amount: amount,
      biller: msg.sender,
      createdAt: now,
      paid: false,
      token: token
    }));
    wFactory.emitBill(msg.sender, address(this), bills.length - 1);
    if(authorizedFor(amount, msg.sender, token) && getBalance(token) >= amount) {
      require(markPaid(bills.length -1), "Saving payment failed");
      require(internalSend(msg.sender, amount, token), "Payment must succeed");
      return true;
    }
    return false;
  }

  modifier ownerOnly() {
    require(msg.sender == owner);
    _;
  }

  function approve(uint pendingBillIndex) public ownerOnly {
    Bill memory foundBill = bills[pendingBillIndex];
    if(msg.sender == owner && address(this).balance >= foundBill.amount) {
      markPaid(pendingBillIndex);
      require(internalSend(foundBill.biller, foundBill.amount, foundBill.token), "Payment must succeed");
    }
  }

  function authorize(address biller, uint amount, uint waitTime, address token ) public ownerOnly {
    billerTokenAuthorizations[biller][token] = Authorization(amount, waitTime);
    wFactory.emitBillerStateChange(biller, amount, token, true);
  }

  function revoke(address biller, address token) public ownerOnly {
    billerTokenAuthorizations[biller][token] = Authorization(0, 0);
    wFactory.emitBillerStateChange(biller, 0, token, false);
  }

  function transfer(address to, uint amount, address token) public ownerOnly {
    require(internalSend(to, amount, token), "Payment must succeed");
  }

  function () public payable {
    deposit();
  }

  function deposit() public payable {
    emit Deposit(msg.sender, msg.value, now);
  }
}
