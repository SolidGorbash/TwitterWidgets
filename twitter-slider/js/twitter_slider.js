// Get text input value when clicking on submit button

$("#submit_slider").click(function(){
	
	$("#tweet_list_slider").empty()
	
	var $search_param = {
		"search_param": $("#text_slider").val()
	}
	
	
	
	$.get("php/twitter.php", $search_param, function(data){

		var $tweet_array = $.parseJSON(data);
		
			$.each($tweet_array, function(key, val){
				
				var $tweet = '<li class="no_display">' +
							 '<div class="tweet">' +
							 '<img class="profile_info" src="' + val.user_image + '" alt="user_image"/>' + 
							 '<h3 class="profile_info">' +  val.user_fullname + '<img class="logo" src="img/Twitter_logo_blue.png"/>' +
							 '</br><span class="screen_name">@' + val.user +  '</span></h3>' +
							 '<div class="clear"></div>' +
							 '<p>' + val.tweet_text + '</p>' +
							 '</div>' +
							 '<div class="line"> </div>' +	
							 '</li>'	
				
				$("#tweet_list_slider").append($tweet);
			
			});
			
			
			var $display = $("li.display");
			
			if ($display.length == 0) {
				$("#tweet_list_slider :first").removeClass("no_display").addClass("display");
			}
			
			$("#tweet_list_slider :first").addClass("first");
			$("#tweet_list_slider :last-child").addClass("last");
	});
	
}); // Closing of click function


$("#forward").mousedown(function(){
	$("#forward").attr("src", "img/down_alt.png");
}).mouseup(function(){
	$("#forward").attr("src", "img/down.png");
});

$("#back").mousedown(function(){
	$("#back").attr("src", "img/up_alt.png");
}).mouseup(function(){
	$("#back").attr("src", "img/up.png");
});


$("#forward").click(function(){
	
	if ( !$(".display").hasClass("last") ) {
		$(".display").removeClass("display").slideUp().next().slideDown().addClass("display");
	}
	
	else {
		$(".first").addClass(".display");
	}
})

$("#back").click(function(){
	if ( !$(".display").hasClass("first") ) {
		$(".display").removeClass("display").slideUp().prev().slideDown().addClass("display");	
	}
	else {
		$(".first").addClass("display");	
	}
})