const getWebBaseUrl = () => {
  switch (process.env.ENVIRONMENT) {
    case "production":
      return `https://taskmanager.com`;
    case "staging":
      return `https://staging.taskmanager.com`;
    default:
      return `http://localhost:5001`;
  }
};

module.exports = { getWebBaseUrl };
