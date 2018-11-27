[meta]: # (
	name: openGarage
	description: neuron designed to talk to the standard openGarage Sensor.
)

# Open Garage
___
#### Author: Winston Purkiss

This neuron utilizes a rest API to communicate with a distance sensor to control and monitor your garage door.

### Requirements
___
None

### Initial Setup
___
[Network Setup](nrlx://.../Setup/ns.md)

### Interneuron
___
`name:` openGarage

### Vocabulary
___
`toggle`: Presses Garage Door Controller and Toggles Door Position.

`distance`: Gets Distance Seen by Sensor.

`jvariables`: Returns all openGarage Variables in JSON.

`position`: Returns Posistion of Door.

`open`: Opens Garage Door.

`close`: Closes Garage Door.

`ap`: Turns on Access Point Mode. Allows New Network Setup.

`reboot`: Reboots the hardware.

`setthreshold`: Sets the threshold for which the door is considered open or close.

`getthreshold`: Gets the threshold for which the door is considered open or close.

`updatetarget`: Update Target Address. For changing Networks.

`displaytarget`: Displays Current Target.

`mount`: (numerical value between 0 and 1 only) Sets logic of Door Sensor. 0 = Ceiling Mount, 1 = Wall Mount. Ceiling logic says Closer Distance is open. Wall Logic says Closer Distance is closed.

### Skills
___
None

### Resources
___
#### Stock
RestClient: Used to talk to the sensor.

#### Custom
None

