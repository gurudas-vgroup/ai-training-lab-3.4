const { adminRequest } = require("./adminClient");

// Confirms Protected Customer Data access works and returns real dev-store records
adminRequest(`
  query {
    customers(first: 3) {
      edges { node { id firstName lastName email numberOfOrders } }
    }
  }
`).then((data) => console.log(JSON.stringify(data, null, 2))).catch(console.error);
