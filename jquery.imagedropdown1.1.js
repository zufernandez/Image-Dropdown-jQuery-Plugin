/*
 * ImageDropDown jQuery Plugin
 * Version 1
 * Martha Azucena Fernandez > zufernandez 
 * azucena_fs@yahoo.com.mx
 *
 * Copyright (C) 2012 Martha Azucena Fernandez Saucedo
 * Licensed under the MIT license
 */
 
(function($) { 

$.fn.imagedropdown = function(options) {
	var defaults = {
      width: 100,
	  listheight: 250
    },  settings = $.extend({}, defaults, options);  

   
    this.each(function() {
		var $this = $(this), //select element
			selectName = $this.attr('name'), 
			id = 'imagedropdown_' + selectName,
			selectedImageValue = $this.val(), //get selected value and image 
			selectedImage =$this.find("option:selected").text();
			
		//If the select already exists, return
		if($('#'+id).length > 0){ return;}
		
		//hide the normal select
		$this.addClass("imagedropdown-hidden");
		
		//Wrap select with new div		
		var containerDiv = $(document.createElement('div')).attr('id',id).addClass("imagedropdown-container");
		$this.wrap(containerDiv);	
		
		//atach selector		
		containerDiv = $("#"+id);
		var span = $('<span></span>', {
			class: 'imagedropdown-selector', 
			'width': settings.width
		}).appendTo(containerDiv);
		
		var selectedImage = $('<img />', {
			class: "imagedropdown-selected-image",
			'src': selectedImage
		}).appendTo(span);
			
		var optionsDiv = $('<div></div>', {
			class: 'imagedropdown-options imagedropdown-hidden', 
			'width': settings.width+15,
			'height': settings.listheight
			
		}).appendTo(containerDiv)
		
		
		//attach options
		var htmlcontent = '<ul class="imagedropdown-select-options" >';
		$this.find('option').each(function(){
			var value = $(this).val()
			var text = $(this).text();
			htmlcontent += '<li><img src="'+text+'"</li>';
		});
		$(optionsDiv).append(htmlcontent+"</ul>");
		
		//show list
		$(span).on('click', function(){
			$(this).parent('div.imagedropdown-container').children('div.imagedropdown-options').slideToggle();
		});
		
		//Add events when clicking on option
		$(optionsDiv).on('click', 'li', function(){
			//get value 
			image = $(this).find('img').attr('src');
			value = $this.find("option:contains('"+image+"')").val();
			//asign value to select
			$this.val(value);
			//change selected image
			selectedImage.attr('src', image);
			//hide options, slide toggle 
			optionsDiv.slideToggle();
		})
	});
	return $(this);
   };
   
})( jQuery );