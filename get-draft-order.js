const { adminRequest } = require("./adminClient");

async function main() {
  // Draft order ID copied from create-draft-order.js's output
  const draftOrderId = "gid://shopify/DraftOrder/1065543794750";

  // Re-fetches the draft order independently of the create call, proving
  // invoiceUrl can be looked up later rather than only captured at creation
  const data = await adminRequest(`
    query getDraftOrder($id: ID!) {
      draftOrder(id: $id) {
        id
        name
        invoiceUrl
        totalPrice
        lineItems(first: 5) { edges { node { title quantity } } }
      }
    }
  `, { id: draftOrderId });

  console.log("Fetched back:", JSON.stringify(data.draftOrder, null, 2));
}

main().catch(console.error);
