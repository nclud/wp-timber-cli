import fs from 'fs';

const createQuery = function(args, create){

  let type, name, postType, file;

  if (create){
    type = args[0];
    name = args[1];
    postType = args[2];
    file = './' + type + '-' + name + '.php';
  } else {
    file = args[0];
    postType = args[1];
  }

  const postTypeUnderscore = postType.replace(/-/g, '_');

  fs.readFile(file, 'utf8', function(err, data){
    if (err){
      console.log(err)
    } else {
      checkTemplateForExistingQuery(data);
    }
  })

  function checkTemplateForExistingQuery(data){

    const existingQuery = '$' + postTypeUnderscore + 's_args';

    if (data.indexOf(existingQuery) == -1){
      writeQuery(data)
    } else {
      console.log('That query already exists')
    }
  }

  function writeQuery(data){

    const queryText = '$' + postTypeUnderscore + 's_args = array( \n '+
                  ' "post_type"     => "' + postType + '" \n ' +
                  ');';
    const query = data.replace(/(<\?php)/, "<?php \n\n " + queryText);
    addQueryToContext(query);
  }

  function addQueryToContext(query){

    const contextText = '$context["' + postTypeUnderscore + 's"] = Timber::get_posts($' + postTypeUnderscore + 's_args);';
    const newQuery = query.replace(/\$context\[\"post\"\] = \$post;/, '$context["post"] = $post;\n' + contextText);

    fs.writeFile(file, newQuery, function(err, res){
      if (err){
        console.log(err)
      } else {
        console.log('Query added to ' + file);
      }
    });
  }
}

export default createQuery;
