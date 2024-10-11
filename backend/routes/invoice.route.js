const { Router } = require("express");
const {
  createInvoiceByUser,
  getInvoices,
  getUserInvoices,
  getInvoiceById,
  updateInvoiceById,
  deleteInvoiceById,
} = require("../controller/invoice.controller");
const { getUserByEmail } = require("../controller/user.controller");
const router = Router();

router.post("/v1/api/invoice/:email", async (req, res) => {
  // #swagger.tags = ['Invoice']
  try {
    const body = await req.body;
    const { email } = req.params;
    if (!body) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (!email) {
      return res.status(403).json({ error: "Bad request" });
    }

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const invoice = await createInvoiceByUser(email, body);
    res
      .status(200)
      .json({ message: "Invoice data saved successfully", invoice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/v1/api/invoice", async (req, res) => {
  // #swagger.tags = ['Invoice']
  try {
    const invoice = await getInvoices();
    res
      .status(200)
      .json({ message: "All invoice received successfully", invoice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/v1/api/invoice/:email", async (req, res) => {
  // #swagger.tags = ['Invoice']
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(403).json({ message: "Bad request" });
    }

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const userInvoice = await getUserInvoices(email);
    res.status(200).json({ message: "User invoices found", userInvoice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/v1/api/invoice/:id", async (req, res) => {
  // #swagger.tags = ['Invoice']
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(403).json({ message: "Bad request" });
    }

    const invoice = await getInvoiceById(id);
    if (!invoice) {
      res.status(404).json({ message: "Invoice not found" });
    }
    res.status(200).json({ message: "Invoice found", invoice });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/v1/api/invoice/:id", async (req, res) => {
  // #swagger.tags = ['Invoice']
  try {
    const { status, ...body } = await req.body;
    const { id } = req.params;
    if (!id) {
      return res.status(403).json({ message: "Bad request" });
    }

    const existingInvoice = await getInvoiceById(id);
    if (!existingInvoice) {
      return res.status(404).json({ message: "Invoice does not exist" });
    }

    await updateInvoiceById(id, { status: JSON.parse(status), ...body });
    res.status(200).json({ message: "Invoice data updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/v1/api/invoice/:id", async (req, res) => {
  // #swagger.tags = ['Invoice']
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(403).json({ message: "Bad request" });
    }

    const existingInvoice = await getInvoiceById(id);
    if (!existingInvoice) {
      return res.status(404).json({ message: "Invoice does not exist" });
    }

    await deleteInvoiceById(id);
    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
