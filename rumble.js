(function($) {
  $.fn.rumble = function(opts) {
    var options = $.extend({ on: 'hover', speed: 10, x: 2, y: 2, z: 0, a: 1 }, opts);

    return this.each(function(index) {
      var tick, m = window.getComputedStyle(this).webkitTransform,
          self = $(this).css('-webkit-tap-highlight-color', 'transparent');

      switch(options.on) {
        case 'hover':  self.bind('mouseover touchstart', start).bind('mouseout mouseleave touchend', stop); break;
        case 'hold':   self.bind('mousedown touchstart', start).bind('mouseup mouseout mouseleave touchend', stop); break;
        case 'toggle': self.bind('click touchend', function(){ tick ? stop() : start() }); break;
        default: start();
      }
      function start() {
        if (tick) return; 
        tick = setInterval(rumble, options.speed);
      }
      function stop() {
        if (!tick) return;
        clearInterval(tick); tick = undefined;
        self.css('-webkit-transform', m);
      }
      function rumble() {
        var v = ['a','x','y','z'].map(function(t) {
          return Math.floor(Math.random() * options[t] * 2) - options[t];
        });
        var matrix = new WebKitCSSMatrix(m == 'none' ? '' : m);
        self.css('-webkit-transform', matrix.rotate(v[0]).translate(v[1], v[2], v[3]));
      }
    });
  }
})(window.jQuery || window.Zepto);