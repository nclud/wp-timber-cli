import fs from 'fs';

const createQuery = function(args, create){
  let type, name, postType, queryOptions, file;

  if (create){
    type = args[0];
    name = args[1];
    postType = args[2];
    queryOptions = args[3];
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

    const existingQuery = '$' + postTypeUnderscore + '_args';

    if (data.indexOf(existingQuery) == -1){
      writeQuery(data)
    } else {
      console.log('That query already exists')
    }
  }

  function writeQueryOptions(options){
    let optionsString = '';
    Object.keys(options).map( option => {
      const value = options[option];
      optionsString += ' "' + option + '"\t\t\t=> "' + value + '",\n ';
    })

    return optionsString;
  }

  function writeQuery(data){
    const queryOptionsText = queryOptions ? writeQueryOptions(queryOptions) : '';
    const queryText = '$' + postTypeUnderscore + '_args = array( \n '+
                  ' "post_type"\t\t\t=> "' + postType + '",\n ' +
                  queryOptionsText +
                  ');';
    const query = data.replace(/(<\?php)/, "<?php \n\n " + queryText);
    addQueryToContext(query);
  }

  function addQueryToContext(query){

    const contextText = '$context["' + postTypeUnderscore + '"] = Timber::get_posts($' + postTypeUnderscore + '_args);';
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
