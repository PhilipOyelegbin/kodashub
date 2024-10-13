export const getUser = async () => {
  try {
    const user = await fetch(`${process.env.API_URI}/api/users`);
    return user;
  } catch (error) {
    return error;
  }
};

export const getInvoice = async () => {
  try {
    const invoice = await fetch(`${process.env.API_URI}/api/invoice`);
    return invoice;
  } catch (error) {
    return error;
  }
};

export const getHosting = async () => {
  try {
    const host = await fetch(`${process.env.API_URI}/api/hosting`);
    return host;
  } catch (error) {
    return error;
  }
};

export const getWebsite = async () => {
  try {
    const website = await fetch(`${process.env.API_URI}/api/website`);
    return website;
  } catch (error) {
    return error;
  }
};
