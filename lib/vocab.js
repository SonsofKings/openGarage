let self;

exports.init = function (el) {
	self = el;

}

exports.toggle = function(self, message, allDone) {
	self.resources.restClient.get("openGarage", "toggle", {}, function(err, result) {});
}

exports.distance = function(self, message, allDone) {
	self.resources.restClient.get("openGarage", "variables", {}, function(err, res) {

// console.log(res)
// console.log(self.resources.globals.conf)

		let response = JSON.parse(res);
		let result = response.dist;
		return allDone(false, "The Sensor sees " + result + "cm of space.");
	});
};

exports.jvariables = function(self, message, allDone) {
	self.resources.restClient.get("openGarage", "variables", {}, function(err, res) {
		return allDone(false, res);
	});
};

exports.position = function(self, message, allDone) {
	self.resources.restClient.get("openGarage", "variables", {}, function(err, res) {
		let response = JSON.parse(res);
		let result = response.door;
		if (result === 1) {
			return allDone(false, "The Garage is Open");
		} else if (result === 0) {
			return allDone(false, "The Garage is Closed");
		} else {
			return allDone(true, "An Error Occured");
		};
	});
};

exports.open = function(self, message, allDone) {
	self.resources.restClient.get("openGarage", "variables", {}, function(err, res) {
		let response = JSON.parse(res);
		if (response.door === 1) {
			return allDone(false, "The Garage is Already Open");
		} else {
			self.resources.restClient.get("openGarage", "toggle", {}, function(err, res) {
				return allDone(false, "Ok, Opening the Garage Door.");
			});
		};
	});
};

exports.close = function(self, message, allDone) {
	self.resources.restClient.get("openGarage", "variables", {}, function(err, res) {
		let response = JSON.parse(res);
		if(response.door === 0) {
			return allDone(false, "The Garage is Already Closed");
		} else {
			self.resources.restClient.get("openGarage", "toggle", {}, function(err, res) {
				return allDone(false, "Ok, Closing Garage Door.")
			})
		}
	});
};

exports.ap = function(self, message, allDone) {
	self.resources.restClient.get("openGarage", "ap", {}, function(err, res) {
		return allDone(false, 'Access Point Enabled. Check NeuraDocs for Network Setup Guide.')
	});
};

exports.reboot = function(self, message, allDone) {
	self.resources.restClient.get("openGarage", "reboot", {}, function(err, res) {
		return allDone(false, 'Rebooting Hardware');
	});
};

exports.setthreshold = function(self, message, allDone) {
	let cm = (message.content.cm - 0) || null;
	if (!cm) {
		return allDone(true, 'Threshold must be a Numerical Value.')
	} else {
		self.resources.restClient.get("openGarage", "setthreshold", {dth: cm}, function(err, res) {
			if (err) {
				return allDone(true, err)
			} else {
				return allDone(false, 'Distance Threshold Changed.')
			}
		});
	};
};

exports.getthreshold = function(self, message, allDone) {
	self.resources.restClient.get("openGarage", "options", {}, function(err, res) {
		let response = JSON.parse(res);
		return allDone(false, 'Threshold is set to: ' + response.dth + 'cm.');

	});
}

exports.updatetarget = function(self, message, allDone) {
	self.globals.conf.targetAddr = message.content.url;
	self.globals.cFile.update('targetAddr', self.globals.conf.targetAddr);
	return allDone(false, 'Target changed to: ' + message.content.url)
}

exports.displaytarget = function(self, message, allDone) {
	return allDone(false, self.globals.conf.targetAddr);
}

exports.mount = function(self, message, allDone) {
	let mset;
	let setting = (message.content.setting - 0);
	if (setting > 1 || setting < 0) {return allDone(true, "Mount can only be 0 or 1")};
	if (setting === 0) {mset = 'Ceiling Mount.'};
	if (setting === 1) {mset = 'Wall Mount.'}

	self.resources.restClient.get("openGarage", "mount", {mnt: setting}, function(err, res) {
		return allDone(false, 'Mount Setting Changed to ' + mset)
	})
}

