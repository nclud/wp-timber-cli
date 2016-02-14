var assert = require('assert');
var fs = require('fs');
var rimraf = require('rimraf');
var createTemplates = require('../lib/createTemplates.js');
var deleteTemplates = require('../lib/removeTemplates.js');

function cleanUp(){
  rimraf.sync('./views');
}

describe('createTemplates', function() {
  it ('should create a PHP and Twig template', function(done){

    var args = ['page', 'test'];
    var type = args[0];
    var name = args[1];

    createTemplates(args);

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
