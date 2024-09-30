import crypto from "crypto";

export const Verify = async (username, password) => {
  const hashedID = process.env.ADMIN_ID;
  const hashedPass = process.env.ADMIN_PASS;

  const hashedPassword = crypto
    .createHash("sha512")
    .update(password)
    .digest("hex");

  if (username === hashedID && hashedPassword === hashedPass) {
    return true;
  } else {
    return false;
  }
};
