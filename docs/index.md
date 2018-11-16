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


## Network Setup
___

On initial startup, make sure /openGarage/index.js line 20 reads: 
`openG.setPassword('opendoor');`

Once you change the password, you will have to update this line with the new password to continue use.

On plugging in the device for the first time, you will notice the lights immediately start flashing quickly. This is called AP mode. If your device is not in AP mode you may hold the button for 5 seconds to reset and reboot into AP mode, or you may use the `ap` verb in the terminal to tell a neuraverse established oG sensor to return to AP mode. 

Use a laptop or smart device to search for Wifis around you. When the sensor goes into AP mode it will immediately become discoverable as a hotspot with a name starting with `OG_` and finishing with the last digits of it's serial number. 

Connect to the wifi, and use a browser to navigate to 192.168.4.1.

Select the wifi you'd like to connect to by filling out the form on the site, and hit connect to tell the sensor to start the connection process. 

On completion, save the new IP of the sensor, and in the terminal use the `updatetarget` verb to connect the neuron and the sensor. 

Use `toggle` to test connection, and you should be done.
