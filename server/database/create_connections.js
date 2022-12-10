const { createConnection } = require('mongoose');

// You create connections by calling this function and giving it the URL to the server
function createConnections(url1, url2) {
  const db1 = createConnection(url1);
  const db2 = createConnection(url2);
  return {
    db1,
    db2
  }
}

module.exports = { createConnections }