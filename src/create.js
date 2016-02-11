import fs from 'fs';
import mkdirp from 'mkdirp';

const createTemplates = args => {
  const type = args[0];
  const name = args[1];

  fs.writeFileSync(type + '-' + name + '.php', buildPHPTemplate(type, name));
  mkdirp.sync( './views/' + type + 's');
  fs.writeFileSync('./views/' + type + 's/' + type + '-' + name + '.twig');

}

function buildPHPTemplate(type, name){
  return '<?php \n' +
  '\n' +
  '$context = Timber::get_context(); \n' +
  '$post = new TimberPost(); \n' +
  '$context["post"] = $post; \n' +
  'Timber::render("/views/' + type + 's/' + type + '-' + name + '.twig", $context); \n' +
  '\n' +
  '?>'
}

export default createTemplates;
