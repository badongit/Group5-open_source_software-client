const { addWebpackAlias, override } = require("customize-cra");
const path = require("path");

module.exports = override(
  addWebpackAlias({
    "@components": path.resolve(__dirname, "src/components"),
    "@pages": path.resolve(__dirname, "src/pages"),
    "@models": path.resolve(__dirname, "src/typedef/models"),
    "@services": path.resolve(__dirname, "src/services"),
    "@constants": path.resolve(__dirname, "src/constants"),
    "@store": path.resolve(__dirname, "src/store"),
    "@socket": path.resolve(__dirname, "src/socket"),
    "@modules": path.resolve(__dirname, "src/modules"),
    "@utils": path.resolve(__dirname, "src/utils"),
    "@hooks": path.resolve(__dirname, "src/hooks")
  })
);
