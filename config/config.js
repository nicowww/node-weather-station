var config = {};

/*
                               +-----+
  +----[PWR]-------------------| USB |--+
  |                            +-----+  |
  |           GND/RST2  [ ] [ ]         |
  |         MOSI2/SCK2  [ ] [ ]  SCL[ ] |   C5
  |            5V/MISO2 [ ] [ ]  SDA[ ] |   C4
  |                             AREF[ ] |
  |                              GND[ ] |
  | [ ]N/C                    SCK/13[ ] |   B5
  | [ ]v.ref                 MISO/12[ ] |   .
  | [ ]RST                   MOSI/11[ ]~|   .
  | [ ]3V3    +---+               10[ ]~|   .
  | [ ]5v     | A |                9[ ]~|   .
  | [ ]GND   -| R |-               8[ ] |   B0
  | [ ]GND   -| D |-                    |
  | [ ]Vin   -| U |-               7[ ] |   D7
  |          -| I |-               6[ ]~|   .
  | [ ]A0    -| N |-               5[ ]~|   .
  | [ ]A1    -| O |-               4[ ] |   .
  | [ ]A2     +---+           INT1/3[ ]~|   .
  | [ ]A3                     INT0/2[ ] |   .
  | [ ]A4      RST SCK MISO     TX>1[ ] |   .
  | [ ]A5      [ ] [ ] [ ]      RX<0[ ] |   D0
  |            [ ] [ ] [ ]              |
  |  UNO_R3    GND MOSI 5V  ____________/
   \_______________________/
*/
// Adress configuration
config.address = 'localhost';
config.port = 1337;

// Led configuration
config.pin_led = 13;
config.freq_led = 1000;

// Luminosity sensor configuration
config.pin_luminosity = 'A5';
config.freq_luminosity = 1000;

// Motion sensor configuration
config.pin_motion = 7;

// Tamperature sensor configuration
config.pin_sensor = 'A2';
config.freq_sensor = 1000;

module.exports = config;
