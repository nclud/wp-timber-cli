import fs from 'fs';
import mkdirp from 'mkdirp';

const createSubclass = args => {
  const type = args[0];
  const name = args[1];

  if (selectClass(type)) {
    mkdirp.sync( './lib');
    fs.writeFileSync('./lib/' + name + '.php', buildPHPTemplate(type, name));
    console.log('Subclass Created!');
  } else {
    console.log('Please use a valid base class (post, term, menu, menuitem, user)');
  }

}

function buildPHPTemplate(type, name){
  var baseClass = selectClass(type);

  return '<?php \n' +
  '\n' +
  'Class ' + name + ' extends ' + baseClass + ' { \n' +
  '\t// Add methods and properties here \n' +
  '} \n'
  '?>'
}

function selectClass(type){
  var classes = {
    site      : 'TimberSite',
    post      : 'TimberPost',
    term      : 'TimberTerm',
    menu      : 'TimberMenu',
    menuitem  : 'TimberMenuItem',
    user      : 'TimberUser'
  }
  if (classes[type]) {
    return classes[type];
  } else { 
    return false;
  }
}

export default createSubclass;