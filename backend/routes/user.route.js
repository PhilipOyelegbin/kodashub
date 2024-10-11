const { Router } = require("express");
const {
  getUsers,
  createUser,
  updateUserByEmail,
  getUserByEmail,
  deleteUserByEmail,
} = require("../controller/user.controller");
const { hashPassword } = require("../utils/auth");

const router = Router();

router.get("v1/api/users", async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const users = await getUsers();
    res.status(200).json({ message: "All users received successfully", users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/v1/api/users", async (req, res) => {
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
    res.status(200).json({ message: "User data saved successfully", users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/v1/api/users/:email", async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(403).json({ message: "Error: Email is required" });
    }

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    res.status(200).json({ message: "User found", existingUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/v1/api/users/:email", async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const { password, ...body } = await req.body;
    const { email } = req.params;

    if (!email) {
      return res.status(403).json({ message: "Error: Email is required" });
    }

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    if (password) {
      const newPassword = await hashPassword(password);
      await updateUserByEmail(email, { password: newPassword });
    } else {
      await updateUserByEmail(email, body);
    }
    res.status(200).json({ message: "User data updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/v1/api/users/:email", async (req, res) => {
  // #swagger.tags = ['Users']
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(403).json({ message: "Error: Email is required" });
    }

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    await deleteUserByEmail(email);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
