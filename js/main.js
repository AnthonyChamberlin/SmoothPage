jQuery(document).ready(function(event){
  var isAnimating = false,
    newLocation = '';
    firstLoad = false;

  //trigger smooth transition from the actual page to the new one
  $('main').on('click', '[data-type="vertical-page-transition"]', function(event){
    event.preventDefault();
    //detect which page has been selected
    var newPage = $(this).attr('href');
    //if the page is not already being animated - trigger animation
    if( !isAnimating ) verticalPageChange(newPage, true);
    firstLoad = true;
  });

  $('main').on('click', '[data-type="horizontal-page-transition"]', function(event){
    event.preventDefault();
    //detect which page has been selected
    var newPage = $(this).attr('href');
    //if the page is not already being animated - trigger animation
    if( !isAnimating ) horizontalPageChange(newPage, true);
    firstLoad = true;
  });

  //detect the 'popstate' event - e.g. user clicking the back button
  $(window).on('popstate', function() {
  	if( firstLoad ) {
      /*
      Safari emits a popstate event on page load - check if firstLoad is true before animating
      if it's false - the page has just been loaded
      */
      var newPageArray = location.pathname.split('/'),
        //this is the url of the page to be loaded
        newPage = newPageArray[newPageArray.length - 1];

      if( !isAnimating  &&  newLocation != newPage ) verticalPageChange(newPage, false);
    }
    firstLoad = true;
	});

	function verticalPageChange(url, bool) {
    isAnimating = true;
    // trigger page animation
    $('.vertical-slide').addClass('page-is-changing');
    $('.cd-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
    	loadNewContent(url, bool);
      newLocation = url;
      $('.cd-loading-bar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    });
    //if browser doesn't support CSS transitions
    if( !transitionsSupported() ) {
      loadNewContent(url, bool);
      newLocation = url;
    }
	}

  function horizontalPageChange(url, bool) {
    isAnimating = true;
    // trigger page animation
    $('.horizontal-slide').addClass('page-is-changing');
    $('.cd-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
    	loadNewContent(url, bool);
      newLocation = url;
      $('.cd-loading-bar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
    });
    //if browser doesn't support CSS transitions
    if( !transitionsSupported() ) {
      loadNewContent(url, bool);
      newLocation = url;
    }
	}

	function loadNewContent(url, bool) {
		url = ('' == url) ? 'home.html' : url;
  	var newSection = 'cd-'+url.replace('.html', '');
  	var section = $('<div class="cd-main-content '+newSection+'"></div>');

  	section.load(url+' .cd-main-content > *', function(event){
      // load new content and replace <main> content with the new one
      $('main').html(section);
      //if browser doesn't support CSS transitions - dont wait for the end of transitions
      var delay = ( transitionsSupported() ) ? 1400 : 0;

      if ( section.hasClass('cd-vertical') ) {

        setTimeout(function(){
          //wait for the end of the transition on the loading bar before revealing the new content
          ( section.hasClass('cd-vertical') ) ? $('body').addClass('cd-vertical') : $('body').removeClass('cd-vertical');
          $('body').removeClass('page-is-changing');
          $('.cd-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
            isAnimating = false;
            $('.cd-loading-bar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
          });
          if( !transitionsSupported() ) isAnimating = false;
        }, delay);

      } else if (section.hasClass('cd-horizontal')) {

        setTimeout(function(){
          //wait for the end of the transition on the loading bar before revealing the new content
          ( section.hasClass('cd-horizontal') ) ? $('body').addClass('cd-horizontal') : $('body').removeClass('cd-horizontal');
          $('body').removeClass('page-is-changing');
          $('.cd-loading-bar').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
            isAnimating = false;
            $('.cd-loading-bar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
          });

          if( !transitionsSupported() ) isAnimating = false;
        }, delay);
      }



      if(url!=window.location && bool){
        //add the new page to the window.history
        //if the new page was triggered by a 'popstate' event, don't add it
        window.history.pushState({path: url},'',url);
      }
		});
  }

  function transitionsSupported() {
    return $('html').hasClass('csstransitions');
  }
});
