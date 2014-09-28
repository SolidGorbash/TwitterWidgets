// Get text input value when clicking on submit button

$("#submit_scroller").click(function(){
	
	// Empty ul with a new search
	$("#tweet_list_scroller").empty();
	
	// search parameter
	var $search_param = {
		"search_param": $("#text_scroller").val()
	}
	
	
	
	$.get("php/twitter.php", $search_param, function(data){

		var $tweet_array = $.parseJSON(data);
		
		
		
			$.each($tweet_array, function(key, val){
				
				var $tweet = '<li>' +
							 '<div class="tweet">' +
							 '<img class="profile_info" src="' + val.user_image + '" alt="user_image"/>' + 
							 '<h3 class="profile_info">' +  val.user_fullname + '<img class="logo" src="img/Twitter_logo_blue.png"/>' +
							 '</br><span class="screen_name">@' + val.user +  '</span></h3>' +
							 '<div class="clear"></div>' +
							 '<p>' + val.tweet_text + '</p>' +
							 '</div>' +
							 '<div class="line"> </div>' +	
							 '</li>'	
				
				$("#tweet_list_scroller").append($tweet);
			
			});


	});
	
}); // Closing of click function