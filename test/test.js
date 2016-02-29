var assert = require('assert');
var fs = require('fs');
var rimraf = require('rimraf');
var createTemplates = require('../lib/createTemplates.js');
var deleteTemplates = require('../lib/removeTemplates.js');
var createSubclass = require('../lib/createSubclass.js');

function cleanUp(){
  rimraf.sync('./views');
}

describe('createTemplates', function() {
  it ('should create a PHP and Twig template', function(done){

    console.log(createTemplates);

    var args = ['page', 'test'];
    var type = args[0];
    var name = args[1];

    createTemplates.default(args);

    if (fs.existsSync('./' + type + '-' + name + '.php')){
      console.log('php template exists');
      if (fs.existsSync('./views/' + type + 's/' + type + '-' + name + '.twig')){
        console.log('twig template exists');
        cleanUp();
        return done()
      } else {
        throw new Error('Twig template not created')
      }
    } else {
      cleanUp();
      throw new Error('PHP template not created')
    }
  });
});

describe('createSubclass', function() {
  it ('should create a subclass of TimberPost', function(done){

    var args = ['post', 'TestPost'];
    var type = args[0];
    var name = args[1];

    createSubclass.default(args);

    if (fs.existsSync('./lib/' + name + '.php')){
      console.log('subclass exists');
      cleanUp();
      return done();
    } else {
      cleanUp();
      throw new Error('Subclass not created')
    }
  });
});
