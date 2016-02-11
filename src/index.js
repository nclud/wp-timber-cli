#!/usr/bin/env node

import cli from 'cli';
import fs from 'fs';
import mkdirp from 'mkdirp';


import createTemplates from './create.js'
import deleteTemplates from './delete.js';

cli.parse({
    create:   ['c', 'Create A Template'],
    delete:   ['d', 'Delete A Template'],
    help:   ['h', 'HALP']
});


cli.main(function(args, options){

  if (options.create){
    createTemplates(args);
  }

  if (options.delete){
    deleteTemplates(args);
  }

  if (options.help){
    help();
  }

});

function help(){
  console.log('HALP');
  return false;
}
