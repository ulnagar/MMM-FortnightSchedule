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

		if (week === "a") {
			schedule = this.config.schedule.a[day];
		}
		
		if (week === "b") {
			schedule = this.config.schedule.b[day];
		}

		if (schedule === undefined) {
			return this.createNoDataReturn();
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

	createNoDataReturn: function() {
		var wrapper = document.createElement("table");
		var tr = document.createElement("tr");
		var td = document.createElement("td");
		var text = document.createTextNode("No Schedule found");
		td.className = "xsmall bright entry";

		wrapper.appendChild(tr);
		tr.appendChild(td);
		td.appendChild(text);

		return wrapper;
	}

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
