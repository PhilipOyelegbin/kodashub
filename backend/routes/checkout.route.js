const { Router } = require("express");

const router = Router();

router.post("/v1/api/checkout", async (req, res) => {
  // #swagger.tags = ['Checkout']
  const { id, email, price } = await req.body;

  if (!id || !email || !price) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const params = JSON.stringify({
      reference: id,
      email,
      amount: price * 100,
      channels: ["card", "bank_transfer"],
    });

    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        body: params,
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();

    if (!result.status) {
      throw new Error("Network error encountered!");
    }

    return res.status(200).json({
      message: "Payment gatway received",
      path: result.data.authorization_url,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error", error });
  }
});
