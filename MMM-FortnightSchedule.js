/* global Module */

/* Magic Mirror
 * Module: MMM-FortnightSchedule
 *
 * By 
 * MIT Licensed.
 */

Module.register("MMM-FortnightSchedule", {
	defaults: {
		updateInterval: 60000,
		retryDelay: 5000
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
		var self = this;

		// Schedule update timer.
		setInterval(function() {
			self.updateDom();
		}, this.config.updateInterval);
	},

	getDom: function() {
		var self = this;

		// create element wrapper for show into the module
		var wrapper = document.createElement("div");
		wrapper.innerHTML = "This is the content!";
	
		return wrapper;
	},

	getScripts: function() {
		return [];
	},

	getStyles: function () {
		return [
			"MMM-FortnightSchedule.css",
		];
	},

	// Load translations files
	getTranslations: function() {
		return {
			en: "translations/en.json"
		};
	}
});
