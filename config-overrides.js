const { addWebpackAlias, override } = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@components": path.resolve(__dirname, "src/components"),
    "@pages": path.resolve(__dirname, "src/pages"),
    "@models": path.resolve(__dirname, "src/typedef/models"),
    "@services": path.resolve(__dirname, "src/services"),
    "@constants": path.resolve(__dirname, "src/constants"),
  })
);
