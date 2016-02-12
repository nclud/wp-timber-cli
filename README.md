
##Requirements
You must be using [Timber](https://github.com/jarednova/timber) for WordPress.

##Installation
run `npm install --save wp-timber-cli` inside your root WordPress theme directory.

##Usage
Timber CLI will create a WordPress PHP template and corresponding twig template and automatically create some default Timber stuff.

####Create Templates
From the command line, run `wp-timber -c <type> <name>` where type is the type of template (page, single, archive) and name is, you guessed it, the name of the template.

**Example Output**

`wp-timber -c page about-us`

Creates `page-about-us.php` in your theme's root directory, and `/views/pages/page-about-us.twig`. If you don't have a `views` directory it will be created for you.

Inside the created .php file is a very basic Timber template that renders the corresponding twig template that was also created.

_page-about-us.php_
```php
<?php

$context = Timber::get_context();
$post = new TimberPost();
$context["post"] = $post; 
Timber::render("/views/pages/page-test.twig", $context);

?>
```

####Create Query
You can create a basic WordPress query for an existing page template, or when create a new template using this CLI.

**Existing Template**
`wp-timber -q page-your-template.php <post-type-to-query-for>`

**When Create a New Template**
`wp-timber -c page about -q custom-post-type`


**Output**
```
<?php

 $custom-post-typesArgs = array(
  "post_type"     => "custom-post-type"
 );

$context = Timber::get_context();
$post = new TimberPost();
$context["post"] = $post;
$context["custom-post-types"] = Timber::get_posts($custom-post-typesArgs);
Timber::render("/views/pages/page-about.twig", $context);

?>
```


####Delete

`wp-timber -d page about-us`

This will find a .php template called `page-about-us.php` in the root theme directory and delete it, as well as the corresponding twig template in `/views/pages/`.
