const { Router } = require("express");
const { getUsers, createUser } = require("../controller/user.controller");
const { hashPassword } = require("../utils/auth");

const router = Router();

router.get("/api/users", async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const users = await getUsers();
    res.status(200).json({ message: "All users received successfully", users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/api/users", async (req, res) => {
  // #swagger.tags = ['Users']
  const { first_name, last_name, email, phone_number, password } =
    await req.body;
  if (!first_name || !last_name || !email || !phone_number || !password) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }
  try {
    const users = await createUser({
      first_name,
      last_name,
      email,
      phone_number,
      password: await hashPassword(password),
    });
    res.status(200).json({ message: "All users received successfully", users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
