// const { defineConfig } = require('@vue/cli-service')
const Dotenv = require('dotenv-webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      new Dotenv()
    ]
  },
  transpileDependencies: [
    'vuetify'  // Example: If you have Vuetify as a transpile dependency, add it here
  ]
};
