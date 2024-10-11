const { Router } = require("express");
const {
  createService,
  getServices,
  getServiceById,
  updateServiceById,
  deleteServiceById,
} = require("../controller/service.controller");

const router = Router();

router.post("/v1/api/service", async (req, res) => {
  // #swagger.tags = ['service']
  const { plan, description, amount, features } = await req.body;
  if (!plan || !description || !amount || !features) {
    return res.status(400).json({ message: "All field are required" });
  }
  try {
    const service = await createService({
      plan,
      description,
      amount: parseInt(amount),
      features: features?.split(","),
    });
    res
      .status(200)
      .json({ message: "Service data saved successfully", service });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/v1/api/service", async (req, res) => {
  // #swagger.tags = ['service']
  try {
    const service = await getServices();
    res.status(200).json({ message: "All service found", service });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/v1/api/service/:id", async (req, res) => {
  // #swagger.tags = ['service']
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(403).json({ message: "Bad request" });
    }

    const existingService = await getServiceById(id);
    if (!existingService) {
      return res.status(404).json({ message: "Service does not exist" });
    }

    res.status(200).json({ message: "Service found", existingService });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/v1/api/service/:id", async (req, res) => {
  // #swagger.tags = ['service']
  try {
    const { features, ...body } = await req.body;
    const { id } = req.params;

    if (!id) {
      return res.status(403).json({ message: "Bad request" });
    }

    const existingService = await getServiceById(id);
    if (!existingService) {
      return res.status(404).json({ message: "Service does not exist" });
    }

    await updateServiceById(id, { features: features?.split(","), ...body });
    res.status(200).json({ message: "Service data updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/v1/api/service/:id", async (req, res) => {
  // #swagger.tags = ['service']
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(403).json({ message: "Bad request" });
    }

    const existingService = await getServiceById(id);
    if (!existingService) {
      return res.status(404).json({ message: "Service does not exist" });
    }

    await deleteServiceById(id);
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
