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