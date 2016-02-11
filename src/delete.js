import fs from 'fs'

const deleteTemplates = function(args){
  var type = args[0];
  var name = args[1];

  fs.unlink('./' + type + '-' + name + '.php', function(err){
    if (err){
      console.log(err);
    } else {
      console.log('PHP Template Deleted')
    }
  });
  fs.unlink('./views/' + type + 's/' + type + '-' + name + '.twig', function(err){
    if (err){
      console.log(err);
    } else {
      console.log('Twig Template Deleted')
    }
  });
}

export default deleteTemplates
