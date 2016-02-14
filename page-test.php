<?php 

 $custom_posts_args = array( 
  "post_type"     => "custom-post" 
 ); 

 $newss_args = array( 
  "post_type"     => "news" 
 ); 

$context = Timber::get_context(); 
$post = new TimberPost(); 
$context["post"] = $post;
$context["custom_posts"] = Timber::get_posts($custom_posts_args);
$context["newss"] = Timber::get_posts($newss_args); 
Timber::render("/views/pages/page-test.twig", $context); 

?>