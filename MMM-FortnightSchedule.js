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
		yearStartWeek: "b"
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
		var self = this;
		
		setInterval(function() {
			self.updateDom();
		}, this.config.updateInterval);
	},

	getDom: function() {
		var self = this;

		var week = this.getDisplayWeek().toLowerCase();
		var day = this.getDisplayDate().locale("en").format("ddd").toLowerCase();
		var schedule;

		schedule = this.config.timetable.filter(function (el) {
			return el.week === week && el.day === day;
		});

		var timeslots = this.config.timeslots;

		// create element wrapper for show into the module
		var wrapper = document.createElement("div");
		wrapper.className = "schedule-list";

		for (let index = 0; index < timeslots.length; index++) {
			const slot = timeslots[index];
			var daySchedule = schedule.filter(function (el) {
				return el.slot === slot.id;
			});
			
			var row = this.createTimetableRow(slot, daySchedule);
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

		return header;
	},

	createTimetableRow: function(slot, daySchedule) {
		var row = document.createElement("div");
		row.className = "schedule-day";
		
		var timeslot = document.createElement("span");
		timeslot.className = "schedule-timeslot";
		timeslot.appendChild(document.createTextNode(time.name));

		row.appendChild(timeslot);

		daySchedule.forEach(el => {
			var entryRow = document.createElement("div");

			var entry = document.createElement("span");
			entry.className = "schedule-title";
			entry.appendChild(document.createTextNode(entry.title));

			var location = document.createElement("span");
			location.className = "schedule-location";
			location.appendChild(document.createTextNode(entry.location));

			entryRow.appendChild(entry);
			entryRow.appendChild(location);
			row.appendChild(entryRow);
		});

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
