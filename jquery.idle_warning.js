/* 
jquery.idle_warning.js
VERSION 0.1

This plugin will fire off the following events:
idle_warning.tick - This event is fired on every tick of the countdown. Contains the current time string as well. i.e. function( event, time_string)
idle_warning.warn - This is fired on idle warning
idle_warning.complete - This is fired once the countdown reaches 0 and the idle_warning.warn has been triggered.

This plugin will listen for the following events:
idle_warning.reset - This will reset the timer and prevent idle_warning.complete from being triggered once idle_warning.warn has already been triggered.
*/
(function($){
  $.fn.extend({ 
    
    idle_warning: function(options) {
      var defaults = { 
        seconds_before : 300,
        seconds_after  : 300 
      }
      var options = $.extend(defaults, options);
      var global_seconds_before = options.seconds_before + 1;
      var global_seconds_after  = options.seconds_after + 1;
      var warned = false;
      
      function reset_timer(elem) {
        global_seconds_before = options.seconds_before + 1;
        global_seconds_after  = options.seconds_after + 1;
        warned = false;
        elem.trigger('idle_warning.timer_reset');
      }
      
      function time_for_display(seconds) {
        var t_str = "";
        var minutes_display = Math.floor(seconds / 60)
        if (minutes_display > 0) {
          t_str += minutes_display + " minute(s) and ";
        }
        var seconds_display = seconds % 60;
        if (seconds_display > 0) {
          t_str += seconds_display + " second(s)";
        }
        if(t_str == "") {
          t_str = "0";
        }
        return t_str;
      }

      function tick(elem) {
        var seconds = 0;
        if (warned) {
          global_seconds_after--;
          seconds = global_seconds_after;
        } else {
          global_seconds_before--;
          seconds = global_seconds_before;
        }
        var time_string = time_for_display(seconds);
        elem.trigger('idle_warning.tick', [ time_string ]);
        if ( time_string == "0" ) {
          if ( warned ) {
            elem.trigger('idle_warning.complete');
          } else {
            elem.trigger('idle_warning.warn');
            warned = true;
          }
        }
        window.setTimeout( function() { tick(elem) }, 1000);
      }

      return this.each(function() {
        var $this = $(this);
        $this.unbind('click').bind('click', function() { 
          if(!warned) {
            // once idle_warning.warn has been triggered, only a 
            // idle_warning.reset event will reset the timer.
            reset_timer($this); 
          } 
        });
        $this.unbind('idle_warning.reset').bind('idle_warning.reset', function() { reset_timer($this); });
        tick($this);
      });
    }
  });
})(jQuery);