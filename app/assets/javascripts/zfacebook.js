$(document).ready(function(){
/*
*****************  
this code is now in layout/application
****************
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=" + gon.fb_app_id;
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

      window.fbAsyncInit = function() {

        // init the FB JS SDK
        FB.init({
          appId      : gon.fb_app_id, // App ID from the App Dashboard
          channelUrl : '<%= "#{request.protocol}#{request.host_with_port}/channel.html" %>', // Channel File for x-domain communication
          status     : true, // check the login status upon init?
          cookie     : true, // set sessions cookies to allow your server to access the session?
          xfbml      : true  // parse XFBML tags on this page?
        });

		    // when a comment is submitted, notify the user of the idea
		    if (gon.show_fb_comments){
			    FB.Event.subscribe('comment.create', function(response){
				    // get id of record
				    var resp_url_ary = response.href.split("/");
				    var id = resp_url_ary[resp_url_ary.length-1].split("?")[0];

            // send out notifications
            // check if visuals or ideas comments
            var url_ary = window.location.pathname.split( '/' );

            if (url_ary.indexOf('visualizations') > -1){
      				$.get(gon.visual_comment_notification_url.replace(gon.placeholder, id));
            } else if (url_ary.indexOf('ideas') > -1){
      				$.get(gon.idea_comment_notification_url.replace(gon.placeholder, id));
            }

            // increment comment count on page
            $('span.comment_count_number').each(function(index, element){
              $(this).parent().fadeOut('slow', function(){
                var old_count = parseInt($(element).html());
                $(element).html(old_count+1);
                $(this).css('color', '#fff');
                $(this).css('background-color', '#469e72');
                $(this).fadeIn('slow', function(){
                  $(this).animate({color: '#757575', backgroundColor: 'transparent'}, 1000);
                });
              });
            });
			    });
		    }


		    // when a like is submitted, record it locally
		    if (gon.show_fb_like){
			    FB.Event.subscribe('edge.create', function(response){
				    // get id of record
				    var resp_url_ary = response.split("/");
				    var id = resp_url_ary[resp_url_ary.length-1].split("?")[0];

            // record the like
            // check if visuals or ideas comments
            var url_ary = window.location.pathname.split( '/' );
            if (url_ary.indexOf('visualizations') > -1){
      				$.get(gon.visual_fb_like_url.replace(gon.placeholder, id));
            } else if (url_ary.indexOf('ideas') > -1){
      				$.get(gon.idea_fb_like_url.replace(gon.placeholder, id));
            }
			    });
		    }

      };
*/

	// set the width of the facebook comments box
	if (gon.show_fb_comments){
		$('div.fb-comments').attr('data-width',$('div.page-header').width());
	}
});
