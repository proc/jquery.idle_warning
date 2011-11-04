# jquery.idle_warning.js

VERSION 0.1

## Requirements
* jQuery 1.5 or higher

## Events

####This plugin will fire off the following events:
* _idle_warning.tick_ - This event is fired on every tick of the countdown. Contains the current time string as well. i.e. function( event, time_string)
* _idle_warning.warn_ - This is fired on idle warning
* _idle_warning.complete_ - This is fired once the countdown reaches 0 and the user has already been warned.