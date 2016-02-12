import fs from 'fs'

const removeTemplates = function(args){
  const type = args[0];
  const name = args[1];

  fs.unlink('./' + type + '-' + name + '.php', function(err){
    if (err){
      console.log(err);
    } else {
      console.log('PHP Template Removed')
    }
  });
  fs.unlink('./views/' + type + 's/' + type + '-' + name + '.twig', function(err){
    if (err){
      console.log(err);
    } else {
      console.log('Twig Template Removed')
    }
  });
}

export default removeTemplates
