/// <reference types="cypress" />
/// <reference types="@shelex/cypress-allure-plugin" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const browserify = require('@cypress/browserify-preprocessor')

module.exports = (on, config) => {
  on('before:browser:launch', (_, launchOptions) => {
      launchOptions.args.push('--window-size=1920,1080');
      launchOptions.args.push('--lang=en-US');
      return launchOptions;
  });

  const options = browserify.defaultOptions;
  options.typescript = require.resolve('typescript');
  on('file:preprocessor', browserify
    .defaultOptions(options));
  allureWriter(on, config);
  return config
}