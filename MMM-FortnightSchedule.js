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
		yearStartWeek: "b",
		config: {
			timeslots: [ "Period 1", "Period 2"],
			schedule: {
				a: { 
					mon: [ "Week A Monday Activity 1", "Week A Monday Activity 2" ],
					tue: [ "Week A Tuesday Activity 1", "Week A Tuesday Activity 2" ],
					wed: [ "Week A Wednesday Activity 1", "Week A Wednesday Activity 2" ],
					thu: [ "Week A Thursday Activity 1", "Week A Thursday Activity 2" ],
					fri: [ "Week A Friday Activity 1", "Week A Friday Activity 2" ],
					sat: [ "Week A Saturday Activity 1", "Week A Saturday Activity 2" ],
					sun: [ "Week A Sunday Activity 1", "Week A Sunday Activity 2" ]					
				},
				b: { 
					mon: [ "Week B Monday Activity 1", "Week B Monday Activity 2" ],
					tue: [ "Week B Tuesday Activity 1", "Week B Tuesday Activity 2" ],
					wed: [ "Week B Wednesday Activity 1", "Week B Wednesday Activity 2" ],
					thu: [ "Week B Thursday Activity 1", "Week B Thursday Activity 2" ],
					fri: [ "Week B Friday Activity 1", "Week B Friday Activity 2" ],
					sat: [ "Week B Saturday Activity 1", "Week B Saturday Activity 2" ],
					sun: [ "Week B Sunday Activity 1", "Week B Sunday Activity 2" ]	
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

		var week = this.getDisplayWeek().toLowerCase();
		var day = this.getDisplayDate().locale("en").format("ddd").toLowerCase();
		var schedule;

		if (week === "a") {
			console.log("WEEK A DETECTED");
			schedule = this.defaults.config.schedule.a[day];
			//schedule = this.config.schedule.a[day]; // For final version!
			console.log("Schedule: ", schedule);
		}
		
		if (week === "b") {
			console.log("WEEK B DETECTED");
			schedule = this.defaults.config.schedule.b[day];
			//schedule = this.config.schedule.b[day]; // For final version!
			console.log("Schedule: ", schedule);
		}

		if (schedule === undefined) {
			return "NO DATA FOUND";
		}

		var timeslots = this.defaults.config.timeslots;
		//var timeslots = this.config.timeslots; // For final version!

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

	getDisplayDate: function() {
		var threshold = moment().startOf("day")
			.add(moment.duration("16:00"));

		var now = moment();
		if (now.isAfter(threshold)) {
			now = now.add(1, "day");
		}

		return now;
	},

	getDisplayWeek: function() {
		var now = this.getDisplayDate();
		var week = moment(now).isoWeek();

		var yearStartWeek = (this.config.yearStartWeek) ? this.config.yearStartWeek : this.defaults.yearStartWeek;

		if ((week % 2 === 0 && yearStartWeek === "a") || (week % 2 === 1 && yearStartWeek === "b")) {
			return "b";
		}

		if ((week % 2 === 0 && yearStartWeek === "b") || (week % 2 === 1 && yearStartWeek === "a")) {
			return "a";
		}

		return null;
	},

	getHeader: function() {
		var week = this.getDisplayWeek().toUpperCase();
		var day = this.getDisplayDate().locale("en").format("dddd");

		var header = "Week " + week + " - " + day;
		console.log("HEADER: ", header);

		return header;
	},

	createTimetableRow: function(time, entry) {
		var row = document.createElement("tr");
		
		var tdtime = document.createElement("td");
		tdtime.className = "xsmall dimmed timeslot";
		tdtime.appendChild(document.createTextNode(time));

		var tdentry = document.createElement("td");
		tdentry.className = "xsmall bright entry";
		tdentry.appendChild(document.createTextNode(entry));

		row.appendChild(tdtime);
		row.appendChild(tdentry);

		return row;
	},

	getScripts: function() {
		return [ "moment.js" ];
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
