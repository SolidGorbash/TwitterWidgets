// Location array initialized as an empty array

var locations = [];

var location_count = 0;

// INITIALIZING GOOGLE MAPS
function initialize() {
	
    var mapOptions = {
      	// CENTER THE MAP
      	center: new google.maps.LatLng(0,0),
		// DEFAULT ZOOM
      	zoom: 3,
		// MINIMUM ZOOM
      	minZoom: 3,
		// MAX ZOOM
      	maxZoom: 7,
        disableDefaultUI: true
    };
	
    var map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);
	    
	// MAP LIMITS
	var southWest = new google.maps.LatLng(-85.000, -122.591);
	var northEast = new google.maps.LatLng(85.000, -122.333);
	var allowedBounds = new google.maps.LatLngBounds(southWest, northEast);
	
// CHECKUNG MAP LIMITS PREVENTING GREY ZONE
	google.maps.event.addListener(map, "center_changed", function() {checkBounds(); });
	google.maps.event.addListener(map, 'bounds_changed', function() {checkBounds(); });

	function checkBounds() {
  		if ((allowedBounds.getNorthEast().lat()>(map.getBounds().getNorthEast().lat()))&&(allowedBounds.getSouthWest().lat()<(map.getBounds().getSouthWest().lat()))) {
    		lastValidCenter = map.getCenter();
    		lastValidZoom = map.getZoom();
   		 	return;
			}
  		map.panTo(lastValidCenter);
 	   	map.setZoom(lastValidZoom);
	}

}


function CreateInfoWindow(locations){
	// GOOGLE MAPS GEOCODER
	
    var mapOptions = {
      	// CENTER THE MAP
      	center: new google.maps.LatLng(0,0),
		// DEFAULT ZOOM
      	zoom: 3,
		// MINIMUM ZOOM
      	minZoom: 3,
		// MAX ZOOM
      	maxZoom: 7,
        disableDefaultUI: true
    };
	
    var map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);
	
	geocoder = new google.maps.Geocoder();
	geocoder.geocode( { 'address': locations }, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			var marker = new google.maps.Marker({
				map: map,
				position: results[0].geometry.location,
				animation: google.maps.Animation.DROP,
				draggable: false
			}); 
		
		map.panTo(marker.position);						
		$("#not_found").empty();		
		} 
		else {
			$("#not_found").html("No Location Found");						
		} 
	}); 	
}

// Get text input value when clicking on submit button

$("#submit_slider").click(function(){
	
	$("#tweet_list_slider").empty();
	
	
	var $search_param = {
		"search_param": $("#text_slider").val()
	}
	
	
	
	$.get("php/twitter_map.php", $search_param, function(data){

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
				
				locations.push(val.location);
			
			});
			
			
			var $display = $("li.display");
			
			if ($display.length == 0) {
				$("#tweet_list_slider :first").removeClass("no_display").addClass("display");
				CreateInfoWindow(locations[location_count])
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
		location_count = location_count + 1;
		$(".display").removeClass("display").slideUp().next().slideDown().addClass("display");
		CreateInfoWindow(locations[location_count])
	}
	
	else {
		$(".first").addClass(".display");
		CreateInfoWindow(locations[locations.length-1])
	}
})

$("#back").click(function(){
	if ( !$(".display").hasClass("first") ) {
		location_count = location_count - 1;
		$(".display").removeClass("display").slideUp().prev().slideDown().addClass("display");	
		CreateInfoWindow(locations[location_count])
	}
	else {
		$(".first").addClass("display");
		CreateInfoWindow(locations[0])	
	}
})



// INIZIALIZZO LA MAPPA
google.maps.event.addDomListener(window, 'load', initialize);















