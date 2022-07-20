const { addWebpackAlias, override } = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@components": path.resolve(__dirname, "src/components"),
    "@models": path.resolve(__dirname, "src/typedef/models"),
    "@services": path.resolve(__dirname, "src/services"),
    "@constants": path.resolve(__dirname, "src/constants"),
    "@store": path.resolve(__dirname, "src/store"),
    "@pages": path.resolve(__dirname, "src/pages"),
    "@socket": path.resolve(__dirname, "src/socket"),
  })
);
