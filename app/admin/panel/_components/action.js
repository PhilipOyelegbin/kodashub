export const getUser = async () => {
  try {
    const user = await fetch(`/api/users`, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    return user;
  } catch (error) {
    return error;
  }
};

export const getInvoice = async () => {
  try {
    const invoice = await fetch(`/api/invoices`, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    return invoice;
  } catch (error) {
    return error;
  }
};

export const getHosting = async () => {
  try {
    const host = await fetch(`/api/hosting`, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    return host;
  } catch (error) {
    return error;
  }
};

export const getWebsite = async () => {
  try {
    const website = await fetch(`/api/development`, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    return website;
  } catch (error) {
    return error;
  }
};
