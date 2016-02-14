<?php 

 $custom_posts_args = array( 
  "post_type"			=> "custom-posts",
 ); 

 $news_args = array( 
  "post_type"			=> "news",
  "post_per_page"			=> 10,
  "orderby"			=> title,
 ); 

$context = Timber::get_context(); 
$post = new TimberPost(); 
$context["post"] = $post;
$context["custom_posts"] = Timber::get_posts($custom_posts_args);
$context["news"] = Timber::get_posts($news_args); 
Timber::render("/views/pages/page-test.twig", $context); 

?>