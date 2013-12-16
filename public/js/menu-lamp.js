(function($) {
		  
	var ml_speed = 400;//ml_speed of lava lamp
	var ml_menuFadeIn = 300;//ml_speed of menu fade in transition
	var ml_menuFadeOut = 300;//ml_speed of menu fade out transition
	var ml_style = 'easeOutExpo';//ml_style of lava lamp
	var ml_totalWidth = 0;//variable for calculating total width of menu according to how many li's there are
	var ml_reducedWidth = 0;
	var ml_reducedHeight = 3;
	
	$(document).ready(function(){
	   
	   var dLeft = $('.menu-lamp li:first').offset().left;//setting default position of menu
	   var dWidth = $('.menu-lamp li:first').width() - ml_reducedWidth;
	   var dTop = $('.menu-lamp li:first').offset().top - ml_reducedHeight;
		
		//Set lava lamp position and width match active menu class
		if($(".menu-lamp").find('.active'))
		{
			var current_lamp = $(".menu-lamp").find('.active');
			dLeft = current_lamp.offset().left;
		}
		
		//Set the initial lava lamp position and width
		$('#box').css({left: dLeft});
		$('#box').css({top: dTop});
		$('#box .head').css({width: dWidth});
	
	$(".menu-lamp > li").hover(function(){		 
											 
		var position = $(this).offset().left;//set width and position of lava lamp
		var width = $(this).width() - ml_reducedWidth; 

		$('#box').stop().animate({left: position},{duration:ml_speed, easing: ml_style});	//animating lava lamp
		$('#box .head').stop().animate({width:width},{duration:ml_speed, easing: ml_style});
		},	
		function(){});


	 $(".menu-lamp > li").hover(function(){//animating the fade in and fade out of submenus level 1
										 
        $(this).find('ul.submenu li').fadeIn(ml_menuFadeIn); 
		$('li li li').css({display:"none"});
		
		},
        function(){  
		    $(this).find('li').fadeOut(ml_menuFadeIn); 
	    });  
		
    	 $(".submenu > li").hover(function(){//animating the fade in and fade out of submenus level 2 
			$(this).find('li').fadeIn(ml_menuFadeIn);  
			$('li li li li').css({display:"none"});
			
		},
        function(){  
            $(this).find('li').fadeOut(ml_menuFadeOut); 
			
        }); 
		 $(".submenu3").hover(function(){//animating the fade in and fade out of submenus  level 3
        $(this).find('li').fadeIn(ml_menuFadeIn);  
		},
        function(){  
            $(this).find('li').fadeOut(ml_menuFadeOut); 
        }); 
});

})(this.jQuery);


