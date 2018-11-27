const  myName = 'openGarage',
		debug = (process.argv[3] == 'debug'),
		openG = require('./restdef_openGarage/index.js'),
		  vcb = require('./lib/vocab'),
		  NYI = 'Not Yet Implemented',
 confTemplate = {
 			uplinkHost: '127.0.0.1',
			uplinkPort: 6443,
			ivKey: '4sc0re&7',
			targetAddr: 'https://192.168.123.231'
		  };

let conf,
	cFile,
	rest,
	targetAddr,
	prevStatus;


openG.setPassword('opendoor');



exports.neuron = {
	system: {
		debugAll: debug,
		outputDebugAt: (debug) ? 0 : 5,
		version: '1.0',
		beforeBoot: function(config, dispatcher, globals, allDone) {
			cFile = dispatcher.utilities.configFile;
			conf = cFile.get(confTemplate);

			config.interneuron.ivKey = conf.ivKey;
			config.interneuron.connectTo.host = conf.uplinkHost;
			config.interneuron.connectTo.port = conf.uplinkPort;

			config.resources[0].resex.targets.openGarage.url = `http://${conf.targetAddr}`;
			globals.conf = conf;
			globals.cFile = cFile;
			globals.openG = openG;
			globals.vcb = vcb;
			allDone(false, config, dispatcher, globals);
		}
	},

	interneuron: {
		type: 'node',
		name: myName,
		ivKey: false,
		connectTo: {host: false, port: false }
	},
	resources: [
	{
		name: 'RESTClient',
		nick: 'restClient',
		resex: {
			targets: {
				openGarage: openG.ogRest()
			}
		}
	}
	],
	skills: [
	{
		name: 'boot',
		emits: ['boot'],
		beforeEmit: function(self, message, allDone) {
			self.resources.globals.cFile = cFile;
			self.resources.globals.conf = conf;

			vcb.init(self);
			allDone();
		}
	}
	],
	vocab: {
		lexicon: {
			open: {
				nick: 'open',
				help: 'Opens the Garage Door.',
				parameters: false,
				handler: vcb.open
			},

			close: {
				nick: 'close',
				help: 'Closes the Garage Door',
				parameters: false,
				handler: vcb.close
			},

			toggle: {
				nick: 'toggle',
				help: 'Toggles Garage Poistion',
				parameters: false,
				handler: vcb.toggle
			},

			distance: {
				nick: 'distance',
				help: 'Checks the current distance the sensor sees between itself and the door.',
				parameters: false,
				handler: vcb.distance
			},

			position: {
				nick: 'position',
				help: 'Checks the current position of the Garage Door.',
				parameters: false,
				handler: vcb.position
			},

			setthreshold: {
				nick: 'setthreshold',
				help: 'Set the Threshold that tells the sensor the postition of the door.',
				parameters: [{nick: 'cm', optional: false}],
				handler: vcb.setthreshold
			},

			getthreshold: {
				nick: 'getthreshold',
				help: 'Gets the Threshold',
				parameters: false,
				handler: vcb.getthreshold
			},

			ap: {
				nick: 'ap',
				help: 'Turns on Access Point Mode. Required before switching networks.',
				parameters: false,
				handler: vcb.ap
			},

			updatetarget: {
				nick: 'updatetarget',
				help: 'Updates Target Address for openGarage Comunication.',
				parameters: [{nick:'url'}],
				handler: vcb.updatetarget
			},

			displaytarget: {
				nick: 'displaytarget',
				help: 'Shows Current Target Address.',
				parameters: false,
				handler: vcb.displaytarget
			},

			jvariables: {
				nick: 'jvariables',
				help: 'Returns OG Variables in JSON.',
				parameters: false,
				handler: vcb.jvariables
			},

			mount: {
				nick: 'mount',
				help: 'Set logic for Distance Sensor. 0= Ceiling 1= Wall',
				parameters: [{nick:'setting'}],
				handler: vcb.mount
			}
		}
	}
};
		