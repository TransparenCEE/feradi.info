// This is a manifest file that'll be compiled into including all the files listed below.
// Add new JavaScript/Coffee code in separate files in this directory and they'll automatically
// be included in the compiled file accessible from http://example.com/assets/application.js
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
//= require i18n
//= require i18n/translations
//= require jquery
//= require jquery_ujs
//= require jquery-ui
//= require twitter/bootstrap
//= require fancybox
//= require fancybox2
//= require vendor
//= require_tree .

$(document).ready(function(){
	// set focus to first text box on page
	if (gon.highlight_first_form_field){
	  $(":input:visible:enabled:first").focus();
	}

	// workaround to get logout link in navbar to work
	$('body')
		.off('click.dropdown touchstart.dropdown.data-api', '.dropdown')
		.on('click.dropdown touchstart.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() });

  // build category slider
  $('#category_slider_content').elastislide();
/*  $('#carouselh').jsCarousel({
      onthumbnailclick: function(src) { alert(src); },
      autoscroll: false,
      masked: false,
      itemstodisplay: 8,
      orientation: 'h' });
*/





  //ajax call for visualizations
  if ($('#load_more_link').length)
  {
    //$.get(gon.vis_ajax_path + '?screen_w=' + $(window).width(), function (response)
   // {
      
   // });
  }




});
