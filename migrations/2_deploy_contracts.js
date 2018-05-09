var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var WordFactory = artifacts.require("./WordFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(WordFactory);
};
