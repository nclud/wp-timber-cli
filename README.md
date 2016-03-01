
##Requirements
You must be using [Timber](https://github.com/jarednova/timber) for WordPress.

##Installation
run `npm install --save wp-timber-cli` inside your root WordPress theme directory.

##Usage
Timber CLI will create a WordPress PHP template and corresponding twig template and automatically create some default Timber stuff.

###Create Templates
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

###Create Query
You can create a basic WordPress query for an existing page template, or when create a new template using this CLI.

**Existing Template**

`wp-timber -q page-about.php custom-post-type`

**When Create a New Template**

`wp-timber -c page about -q custom-post-type`


**Output**
```php
<?php

 $custom_post_types_args = array(
  "post_type"     => "custom-post-type"
 );

$context = Timber::get_context();
$post = new TimberPost();
$context["post"] = $post;
$context["custom_post_types"] = Timber::get_posts($custom_post_types_args);
Timber::render("/views/pages/page-about.twig", $context);

?>
```


###Remove Templates

`wp-timber -r page about-us`

This will find a .php template called `page-about-us.php` in the root theme directory and delete it, as well as the corresponding twig template in `/views/pages/`.

###Create Subclasses

Create a subclass of a built-in Timber class (TimberPost, TimberTerm etc.) in the lib directory by running `wp-timber -s <class> <name>`, where class refers to the class to extend and name is the name assigned to the new subclass.  Site, term, post, menu, menuitem, and user are all accepted as arguments for the base class.

**Output**

`wp-timber -s post TestPost`

Creates TestPost.php in the `/lib` directory, with the following boilerplate:
```php
<?php

Class TestPost extends TimberPost { 
  // Add methods and properties here 
} 

?>
```

This will find a .php template called `page-about-us.php` in the root theme directory and delete it, as well as the corresponding twig template in `/views/pages/`.

###Build from a Config file
With Timber CLI you can generate a series of templates with queries from a configuration file. Create a `.timber` file that contains JSON to generate as many templates with queries as you want.

Here's an example config file:
```JSON
{
  "page": {
    "blog": {
      "queries":{
        "news": {
          "post_per_page": 10,
          "orderby": "title"
        },
        "custom-posts": {
          "post_per_page": 20,
          "orderby": "date"
        }
      }
    },
    "about-us": {}
  },
  "archive": {
    "events": {},
  },
  "single": {
    "event": {}
  }
}
```

Running `wp-timber build` will generate the following PHP/twig templates:
* `page-blog.php` with two queries: one for 'news' post type and one for 'custom-posts' **and** `views/pages/page-blog.twig` file
* `page-about-us.php` **and** `views/pages/page-about-us.twig`
* `archive-events.php` **and** `views/archives/archive-events.twig`
* `single-event.php` **and** `views/singles/single-event.twig`
