const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { prisma } = require("./connect");

const secretKey = process.env.SECRET_KEY;

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
}

async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

async function generateToken(user) {
  const payload = { id: user.id, email: user.email, role: user.role };
  return jwt.sign(payload, secretKey, { expiresIn: "4h" });
}

async function authenticate(email, password) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    throw new Error("Invalid email or password");
  }
  return generateToken(user);
}

module.exports = {
  hashPassword,
  verifyPassword,
  authenticate,
};
