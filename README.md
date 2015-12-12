# node-weather-station
![Alt text](/public/img/Capture201512.png?raw=true "Screen")
## Material
This is a list of all the components that are required for this project:
* Arduino Uno
* LM35 sensor
* Motion sensor
* Luminosity sensor
* Breadboard and some jumper wires

## Install Firmata firmware
Download gort[http://gort.io/]

Scan the serial port
``` bash
$ gort scan serial
```

Upload Firmata firmware
``` bash
$ gort arduino upload firmata /dev/ttyACM0
```

## Install dependecies
``` bash
$ npm install
```

## Configure
open config file
``` bash
$ config/config.js
```
and change address/port/arduino pin

## Start app
via node
``` bash
$ node app.js
```

via forever
``` bash
$ npm -g install forever
$ forever start app.js
```

via pm2
``` bash
$ npm -g install pm2
$ pm2 start app.js
```
and browse localhost:1337
