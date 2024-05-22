import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    experimentalRunAllSpecs: true,
    defaultCommandTimeout: 15000,
    video: true, // Enable or disable video recording
    videosFolder: 'cypress/videos', // Specifies the folder where videos will be saved
    screenshotOnRunFailure: true, // Enable or disable automatic screenshots on test failure
    screenshotsFolder: 'cypress/screenshots', // Specifies the folder where screenshots will be saved
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
