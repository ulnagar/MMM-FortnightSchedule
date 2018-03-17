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
		retryDelay: 5000,
		config: {
			timeslots: [ "Period 1", "Period 2"],
			schedule: {
				a: { 
					mon: [ "Week A Monday Activity 1", "Week A Monday Activity 2" ],
					tue: [ "Week A Tuesday Activity 1", "Week A Tuesday Activity 2" ]
				},
				b: { 
					mon: [ "Week B Monday Activity 1", "Week B Monday Activity 2" ],
					tue: [ "Week B Tuesday Activity 1", "Week B Tuesday Activity 2" ]
				}
			}
		}
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

		var week = "a";
		var day = "mon";
		var schedule;
		if(week === "a") {
			console.log("WEEK A DETECTED");
			schedule = this.config.schedule.a[day];
			console.log("Schedule: ", schedule);
		} else {
			console.log("WEEK B DETECTED");
			schedule = this.config.schedule.b[day];
			console.log("Schedule: ", schedule);
		}

		if(schedule === undefined) {
			return "NO DATA FOUND";
		}

		var timeslots = this.config.timeslots;

		// create element wrapper for show into the module
		var wrapper = document.createElement("div");
		for (let index = 0; index < schedule.length; index++) {
			const entry = schedule[index];
			const time = timeslots[index];
			var row = this.createTimetableRow(time, entry);
			wrapper.appendChild(row);
		}

		return wrapper;
	},

	createTimetableRow: function(time, entry) {
		var row = document.createElement("tr");
		
		var tdtime = document.createElement("td");
		tdtime.className = "xsmall dimmed lessontime";
		tdtime.appendChild(document.createTextNode(time));

		var tdentry = document.createElement("td");
		tdentry.className = "xsmall bright lesson";
		tdentry.appendChild(document.createTextNode(entry));

		row.appendChild(tdtime);
		row.appendChild(tdentry);

		return row;
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
