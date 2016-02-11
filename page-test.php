<?php 

$context = Timber::get_context(); 
$post = new TimberPost(); 
$context["post"] = $post; 
Timber::render("/views/pages/page-test.twig", $context); 

?>