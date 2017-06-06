var tnkParallax = {
  _speed: 2,
  _selector: '.page-wrapper',
  _interval: 500,
  _initialHeight: null,
  $window: null,
  $pageWrapper: null,
  $parallaxWrapper: null,
  resetCSS: {
    'background-image': 'none',
    'overflow': 'hidden'
  },
  startCSS: {
    'position': 'fixed',
    'top': '0',
    'left': '0',
    'right': '0',
    'height': '100%'
  },
  init: function (selector) {
    var self = this;
    if (selector) {
      self._selector = selector;
    }
    if (jQuery('html').hasClass('csstransforms3d')) {
      self.$window = jQuery(window);
      self.$pageWrapper = jQuery(self._selector);
      self._initialHeight = self.$pageWrapper.height();
      var $tmpDiv = jQuery('<div />');
      $tmpDiv.css(self.startCSS).css({
        'background-image': self.$pageWrapper.css('background-image'),
        'background-position': self.$pageWrapper.css('background-position'),
        'background-repeat': self.$pageWrapper.css('background-repeat'),
        'min-height': self._initialHeight
      }).attr('id', 'parallaxWrapper').prependTo('body');
      self.$pageWrapper.css(self.resetCSS);
      self.$parallaxWrapper = $tmpDiv;

      setInterval(function () {
        self.checkHeight();
      }, self._interval);
      self.$window.resize(function () {
        self.resize();
      });
      self.bind();
    }
  },
  checkHeight: function () {
    var self = this;
    if (self._initialHeight != self.$pageWrapper.height()) {
      self._initialHeight = self.$pageWrapper.height();
      self.resize();
    }
  },
  resize: function () {
    var self = this;
    self.$parallaxWrapper.css({
      'min-height': self._initialHeight
    });
  },
  bind: function () {
    var self = this;
    self.$window.bind('scroll', function () {
      var offset = (self.$window.scrollTop() / self._speed);
      if (offset < 0) {
        offset = 0;
      }
      self.$parallaxWrapper.css('transform', 'translate3d(0, -' + offset + "px, 0)");
    });
    self.$window.scroll();
  }
};
jQuery(document).ready(function () {
  tnkParallax.init();
});