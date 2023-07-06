{
}
const { defineConfig } = require('cypress')

module.exports = defineConfig({
	video: false,
	projectId: "cfmkj2",
	e2e: {
		supportFile: false,
		// We've imported your old cypress plugins here.
		// You may want to clean this up later by importing these.
		setupNodeEvents(on, config) {
		  return require('./cypress/plugins/index.js')(on, config);
		},
		baseUrl: "https://api.football-data.org/v4/persons",
		slowTestThreshold: 1000,
		specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
	},
})