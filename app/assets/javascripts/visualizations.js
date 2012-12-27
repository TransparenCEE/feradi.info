function reset_interactive_iframe_height(){
	// adjust iframe height to fill entire window minus the header bar
	$('iframe#interactive').css('height', $(window).height()-46);
}

// we need 230px from original file.
// the large file that is show on screen for cropping can be a different size
// so adjust the values so the scale is the same
var adjusted_size = gon.thumbnail_size;
if (gon.originalW && gon.largeW){
	adjusted_size = gon.thumbnail_size*gon.largeW/gon.originalW;
}

function update_crop(coords) {
	var rx = adjusted_size/coords.w;
	var ry = adjusted_size/coords.h;
	$('#cropbox_preview').css({
		width: Math.round(rx * gon.largeW) + 'px',
		height: Math.round(ry * gon.largeH) + 'px',
		marginLeft: '-' + Math.round(rx * coords.x) + 'px',
		marginTop: '-' + Math.round(ry * coords.y) + 'px'
	});
  var ratio = gon.originalW / gon.largeW;
  $("#visualization_crop_x").val(Math.round(coords.x * ratio));
  $("#visualization_crop_y").val(Math.round(coords.y * ratio));
  $("#visualization_crop_w").val(Math.round(coords.w * ratio));
  $("#visualization_crop_h").val(Math.round(coords.h * ratio));
}

$(document).ready(function(){
	// visualization show interactive
	// - adjust iframe height when window changes
	if (gon.show_interactive){
		$(window).bind('load resize', reset_interactive_iframe_height);
	}

	// visualization form
	if (gon.edit_visualization){
		// load the date time pickers
		$('#visualization_published_date').datepicker({
				dateFormat: 'dd.mm.yy',
		});
		if (gon.published_date !== undefined && gon.published_date.length > 0)
		{
			$("#visualization_published_date").datepicker("setDate", new Date(gon.published_date));
		}

		// show correct fields for visualization type
		if (gon.visualization_type){
			if (gon.visualization_type == 1){
				$('#visualization_visual_input').show();
				$('#visualization_interactive_url_input').hide();
			} else if (gon.visualization_type == 2){
				$('#visualization_interactive_url_input').show();
				$('#visualization_visual_input').hide();
				$('#visualization_thumbnail').hide();
			}
		}

		// if type changes, show appropriate fields
		$('select#visualization_visualization_type_id').change(function() {
			if ($(this).val() == '1'){
				$('#visualization_visual_input').show(300);
				$('#visualization_thumbnail').show(300);
				$('#visualization_interactive_url_input').hide(300);
				$('input#visualization_interactive_url').attr('value', '');
			} else if ($(this).val() == '2'){
				$('#visualization_interactive_url_input').show(300);
				$('#visualization_visual_input').hide(300);
				$('#visualization_thumbnail').hide(300);
				$('input#visualization_visual').attr('value', '');
			} else {
				$('#visualization_interactive_url_input').hide(300);
				$('#visualization_visual_input').hide(300);
				$('#visualization_thumbnail').hide(300);
			}
		});

		// if record is published, show pub date field by default
		if ($('input:radio[name="visualization[published]"]:checked').val() === 'true') {
			$('#visualization_published_date_input').show();
		} else {
			$('#visualization_published_date_input').hide();
		}

		// if record is marked as published, show pub date field
		$('input:radio[name="visualization[published]"]').click(function(){
			if ($(this).val() === 'true'){
				// show url textbox
			  $('#visualization_published_date_input').show(300);
			} else {
				// clear and hide pub date textbox
				$('#visualization_published_date').attr('value', '');
			  $('#visualization_published_date_input').hide(300);
			}
		});

		// assign the jcrop to the visual image
	  $('img#cropbox').Jcrop({
	    onChange: update_crop,
	    onSelect: update_crop,
	    setSelect: [0, 0, adjusted_size, adjusted_size],
			minSize: [adjusted_size,adjusted_size],
			maxSize: [adjusted_size, adjusted_size],
	    aspectRatio: 1
	  });

	}


});
