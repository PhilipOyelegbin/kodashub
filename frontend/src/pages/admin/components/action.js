export const getUser = async () => {
  try {
    const user = await fetch(`${import.meta.env.VITE_API_URI}/api/users`);
    return user;
  } catch (error) {
    return error;
  }
};

export const getInvoice = async () => {
  try {
    const invoice = await fetch(`${import.meta.env.VITE_API_URI}/api/invoice`);
    return invoice;
  } catch (error) {
    return error;
  }
};

export const getHosting = async () => {
  try {
    const host = await fetch(`${import.meta.env.VITE_API_URI}/api/hosting`);
    return host;
  } catch (error) {
    return error;
  }
};

export const getWebsite = async () => {
  try {
    const website = await fetch(`${import.meta.env.VITE_API_URI}/api/website`);
    return website;
  } catch (error) {
    return error;
  }
};
