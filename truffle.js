module.exports = {
  migrations_directory: './migrations',
  networks: {
    ganache: {
      host: 'localhost',
      port: 7545,
      network_id: '*'
    },
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    },
    rinkeby: {
      host: 'localhost',
      port: 8545,
      network_id: 4, //rinkeby test network
      gas: 4700000
    }
  }
};
