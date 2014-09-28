<?php


require_once ("define.php");

require_once ("OAuth/twitteroauth.php");

$search_parameter = $_GET["search_param"];


$toa = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, ACCESS_TOKEN, ACCESS_TOKEN_SECRET);


function queryTweet($toa, $tags) {
	$query = array(
		"q" => $tags,
		"count" => 180,
		"result_type" => "recent"
	); 
	
	$results = $toa->get("search/tweets", $query);
	
	return $results;
}  

$results = queryTweet($toa, $search_parameter);



function filterTweet($results) {
	$tweets_to_show = array();
	
	foreach ($results->statuses as $result) {
		
		$tweet = array(
			"user" => $result->user->screen_name,
			"user_fullname" => $result->user->name,
			"created" => $result->user->created_at,
			"user_image" => $result->user->profile_image_url,
			"tweet_text" => $result->text,
			"location" =>$result->user->location
		);
		$tweets_to_show[] = $tweet;
	}
	
	return $tweets_to_show;
}

$tweets_to_show = filterTweet($results);

echo json_encode($tweets_to_show);
?>