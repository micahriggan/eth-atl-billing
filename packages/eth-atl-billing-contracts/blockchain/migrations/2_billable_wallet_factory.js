var BillableWalletFactory = artifacts.require("../contracts/BillableWalletFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(BillableWalletFactory);
};
