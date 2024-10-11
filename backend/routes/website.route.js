const { Router } = require("express");
const {
  createWebsiteByUser,
  getWebsites,
  getUserWebsites,
  getWebsiteById,
  updateWebsiteById,
  deleteWebsiteById,
} = require("../controller/website.controller");
const { getUserByEmail } = require("../controller/user.controller");
const router = Router();

router.post("/v1/api/website/:email", async (req, res) => {
  // #swagger.tags = ['Website']
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
    const website = await createWebsiteByUser(email, body);
    res
      .status(200)
      .json({ message: "Website data saved successfully", website });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/v1/api/website", async (req, res) => {
  // #swagger.tags = ['Website']
  try {
    const website = await getWebsites();
    res
      .status(200)
      .json({ message: "All website received successfully", website });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/v1/api/website/:email", async (req, res) => {
  // #swagger.tags = ['Website']
  try {
    const { email } = req.params;
    if (!email) {
      return res.status(403).json({ message: "Bad request" });
    }

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const userWebsite = await getUserWebsites(email);
    res.status(200).json({ message: "User websites found", userWebsite });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/v1/api/website/:id", async (req, res) => {
  // #swagger.tags = ['Website']
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(403).json({ message: "Bad request" });
    }

    const website = await getWebsiteById(id);
    if (!website) {
      res.status(404).json({ message: "Website not found" });
    }
    res.status(200).json({ message: "Website found", website });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/v1/api/website/:id", async (req, res) => {
  // #swagger.tags = ['Website']
  try {
    const { status, ...body } = await req.body;
    const { id } = req.params;
    if (!id) {
      return res.status(403).json({ message: "Bad request" });
    }

    const existingWebsite = await getWebsiteById(id);
    if (!existingWebsite) {
      return res.status(404).json({ message: "Website does not exist" });
    }

    await updateWebsiteById(id, { status: JSON.parse(status), ...body });
    res.status(200).json({ message: "Website data updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/v1/api/website/:id", async (req, res) => {
  // #swagger.tags = ['Website']
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(403).json({ message: "Bad request" });
    }

    const existingWebsite = await getWebsiteById(id);
    if (!existingWebsite) {
      return res.status(404).json({ message: "Website does not exist" });
    }

    await deleteWebsiteById(id);
    res.status(200).json({ message: "Website deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
