const { Router } = require("express");
const {
  createHostingByUser,
  getHostings,
  getUserHostings,
  getHostingById,
  updateHostingById,
  deleteHostingById,
} = require("../controller/hosting.controller");
const { getUserByEmail } = require("../controller/user.controller");
const router = Router();

router.post("/v1/api/hosting/:email", async (req, res) => {
  // #swagger.tags = ['Hosting']
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
    const hosting = await createHostingByUser(email, body);
    res
      .status(200)
      .json({ message: "Hosting data saved successfully", hosting });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/v1/api/hosting", async (req, res) => {
  // #swagger.tags = ['Hosting']
  try {
    const hosting = await getHostings();
    res
      .status(200)
      .json({ message: "All hosting received successfully", hosting });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/v1/api/hosting/:email", async (req, res) => {
  // #swagger.tags = ['Hosting']
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(403).json({ message: "Bad request" });
    }

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const userHosting = await getUserHostings(email);
    res.status(200).json({ message: "User hostings found", userHosting });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/v1/api/hosting/:id", async (req, res) => {
  // #swagger.tags = ['Hosting']
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(403).json({ message: "Bad request" });
    }

    const hosting = await getHostingById(id);
    if (!hosting) {
      res.status(404).json({ message: "Hosting not found" });
    }
    res.status(200).json({ message: "Hosting found", hosting });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/v1/api/hosting/:id", async (req, res) => {
  // #swagger.tags = ['Hosting']
  try {
    const { status, ...body } = await req.body;
    const { id } = req.params;
    if (!id) {
      return res.status(403).json({ message: "Bad request" });
    }

    const existingHosting = await getHostingById(id);
    if (!existingHosting) {
      return res.status(404).json({ message: "Hosting does not exist" });
    }

    await updateHostingById(id, { status: JSON.parse(status), ...body });
    res.status(200).json({ message: "Hosting data updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/v1/api/hosting/:id", async (req, res) => {
  // #swagger.tags = ['Hosting']
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(403).json({ message: "Bad request" });
    }

    const existingHosting = await getHostingById(id);
    if (!existingHosting) {
      return res.status(404).json({ message: "Hosting does not exist" });
    }

    await deleteHostingById(id);
    res.status(200).json({ message: "Hosting deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
