pragma solidity ^0.4.23;

contract BillableWallet {

  struct Bill {
    uint amount;
    address biller;
    uint createdAt;
    bool paid;
  }

  struct Authorization {
    uint amount;
    uint waitTime;
  }

  struct BillerProfile {
    uint lastBilled;
    uint lastPaid;
    uint lastAuthorized;
  }

  address public owner;

  Bill[] public bills;
  mapping(address => Authorization) public authorizations;
  mapping(address => BillerProfile) public billerProfiles;

  event BillPaid(address biller, uint amount, uint time);
  event Deposit(address from, uint amount, uint time);


  constructor(address creator) public {
    owner = creator;
  }

  function authorizedFor(uint amount, address biller) view public returns(bool) {
    BillerProfile storage billerProfile = billerProfiles[biller];
    Authorization storage auth = authorizations[biller];
    uint lastBillTime = billerProfile.lastAuthorized;
    uint waitTime = auth.waitTime;
    uint minTime = lastBillTime + waitTime;
    return now >= minTime && amount <= auth.amount;
  }

  function isPaid(uint pendingBillIndex) public view returns(bool) {
    return bills[pendingBillIndex].paid;
  }

  function markPaid(uint pendingBillIndex) internal returns(bool paid) {
    require(bills[pendingBillIndex].paid == false, "Can't double pay");
    bills[pendingBillIndex].paid = true;
    billerProfiles[bills[pendingBillIndex].biller].lastPaid = now;
    emit BillPaid(bills[pendingBillIndex].biller, bills[pendingBillIndex].amount, now);
    return true;
  }

  function bill(uint amount) external returns(bool) {
    billerProfiles[msg.sender].lastBilled = now;
    bills.push(Bill(amount, msg.sender, now, false));
    if(authorizedFor(amount, msg.sender) && address(this).balance >= amount) {
      billerProfiles[msg.sender].lastAuthorized = now;
      require(markPaid(bills.length -1), "Saving payment failed");
      msg.sender.transfer(amount);
      return true;
    }
    return false;
  }

  modifier ownerOnly() {
    require(msg.sender == owner);
    _;
  }

  function approve(uint pendingBillIndex) public ownerOnly {
    uint billAmt = bills[pendingBillIndex].amount;
    if(msg.sender == owner && address(this).balance >= billAmt) {
      markPaid(pendingBillIndex);
      msg.sender.transfer(billAmt);
    }
  }

  function authorize(address biller, uint amount, uint waitTime ) public ownerOnly {
    authorizations[biller] = Authorization(amount, waitTime);
  }

  function send(uint amount, address to) public ownerOnly {
    to.transfer(amount);
  }

  function () public payable {
    deposit();
  }

  function deposit() public payable {
    emit Deposit(msg.sender, msg.value, now);
  }

  function balance() public view returns(uint) {
    return address(this).balance; 
  }
}

