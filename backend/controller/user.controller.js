const { prisma } = require("../utils/connect");

const createUser = async (newData) => {
  try {
    const users = await prisma.user.create({ data: newData });
    return users;
  } catch (error) {
    throw error;
  }
};

const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({});
    return users;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const users = await prisma.user.findUnique({ where: { id } });
    return users;
  } catch (error) {
    throw error;
  }
};

const updateUserById = async (id, newData) => {
  try {
    const users = await prisma.user.update({
      where: { id },
      data: { newData },
    });
    return users;
  } catch (error) {
    throw error;
  }
};

const deleteUserById = async (id) => {
  try {
    const users = await prisma.user.delete({
      where: { id },
    });
    return users;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
