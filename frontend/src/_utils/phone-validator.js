const validatePhone = phone => {
  const pattern = /^\d{10}$/;
  return pattern.test(phone);
};

module.exports = { validatePhone };
