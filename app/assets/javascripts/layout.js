$(document).ready(function() {
  // parallax js magic
  var scene = $('#scene').get(0);
  // mobile User Agent detection
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    // instatiate without inverting x and y axes
    // I like this better on mobile
    var parallax = new Parallax(scene, {
      invertX: false,
      invertY: false
    });
  } else {
    // instatiate as default (x and y inverted)
    var parallax = new Parallax(scene);
  }

  moveLinksIntoConstellation($('.constellation-index').children(), $('.link-layer'));

  // Hamburger nav function
  $('.header .hamburger').click(function(e) {
    e.preventDefault();
    if ($('.nav-container').hasClass('open')) {
      closeNav();
    } else {
      $('.hamburger').addClass('active');
      $('.nav-container').addClass('open');
      $('.overlay').addClass('active');
      parallax.disable();
    }
  });
  $('.overlay').click(function() {
    closeNav();
  });
  var closeNav = function() {
    $('.hamburger').removeClass('active');
    $('.nav-container').removeClass('open');
    $('.overlay').removeClass('active');
    parallax.enable();
  };

  // 'pjax:end' fires on back/forward browser button navigation
  $(document).on('pjax:complete pjax:end', function() {
    closeNav();
    moveLinksIntoConstellation($('.constellation-index').children(), $('.link-layer'));
  });

  // removes the flash on click so the user doesn't see it when navigating back
  // with browser button
  $(document).on('pjax:click', function() {
    $('.flash').hide();
  });
});



// kind of a hack to move elements rendered via pjax into the parallax.js layers.
// since one pjax link can only be associated with updating one pjax container,
// and the parallax.js layers need to remain in the document,
// this seems like the best way to update the links in the parallax.js layers
// (by moving them into those layers after the pjax is done).
// I guess another option would be to try to add a multiple container feature
// to pjax...but I'm not trying to do that right now.
var moveLinksIntoConstellation = function($links, $destinationContainers) {
  // clear the div of any previous links
  $destinationContainers.each(function(i, el) { $(el).empty(); });
  $links.each(function(i, link) {
    var $destination = $(link).data('destination');
    // copy them to the new div instead of moving them
    $(link).clone().appendTo('.' + $destination);
  });
};
