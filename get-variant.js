const { adminRequest } = require("./adminClient");

// Grabs a real variant ID to use as a line item in the draft order below.
adminRequest(`
  query {
    products(first: 1) {
      edges { node { title variants(first: 1) { edges { node { id } } } } }
    }
  }
`).then((data) => console.log(JSON.stringify(data, null, 2))).catch(console.error);
