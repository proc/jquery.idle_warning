# jquery.idle_warning.js

VERSION 0.0

## Requirements
* jQuery 1.5 or higher

## Events
* This plugin will fire off the following events:
* **idle_warning.tick - This event is fired on every tick of the countdown. Contains the current time string as well. i.e. function( event, time_string)
* **idle_warning.warn - This is fired on idle warning
* **idle_warning.complete - This is fired once the countdown reaches 0 and the user has already been warned.