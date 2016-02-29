import fs from 'fs';
import mkdirp from 'mkdirp';

const createSubclass = args => {
  const type = args[0];
  const name = args[1];
  
  fs.writeFileSync('./lib/' + name + '.php', buildPHPTemplate(type, name));

  console.log('Subclass Created!');
}

function buildPHPTemplate(type, name){
  var baseClass = selectClass(type);

  return '<?php \n' +
  '\n' +
  'Class ' + name + ' extends ' + baseClass + '{ \n' +
  '// Add methods and properties here \n' +
  '} \n'
  '?>'
}

function selectClass(type) {
  var classes = {
    'post'      : 'TimberPost',
    'term'      : 'TimberTerm',
    'menu'      : 'TimberMenu',
    'menuitem'  : 'TimberMenuItem',
    'user'      : 'TimberUser'
  }
  return classes.type;
}

export default createSubclass;