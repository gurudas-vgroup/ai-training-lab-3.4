const { adminRequest } = require("./adminClient");

async function main() {
  // Variant ID copied from get-variant.js's output
  const variantId = "gid://shopify/ProductVariant/43236336861246";

  // Creates an unpaid draft order for the variant; invoiceUrl is what a
  // customer would use to pay for a merchant- or agent-initiated sale
  const data = await adminRequest(`
    mutation createDraftOrder($variantId: ID!) {
      draftOrderCreate(input: { lineItems: [{ variantId: $variantId, quantity: 1 }] }) {
        draftOrder { id name invoiceUrl }
        userErrors { field message }
      }
    }
  `, { variantId });

  if (data.draftOrderCreate.userErrors.length) {
    throw new Error(JSON.stringify(data.draftOrderCreate.userErrors));
  }

  console.log("Draft order created:", data.draftOrderCreate.draftOrder);
}

main().catch(console.error);
