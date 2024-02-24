const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  pwa: {
    name: "Org Match",
    themeColor: "#fff",
    msTileColor: "#fff",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "#fff",
  }
})
