#!/usr/bin/env node

import cli from 'cli';
import fs from 'fs';
import mkdirp from 'mkdirp';


import createTemplates from './createTemplates.js'
import deleteTemplates from './removeTemplates.js';
import createQuery from './createQuery.js';
import buildTemplatesFromConfig from './build.js'

cli.parse({
    create:   ['c', 'Create A Template'],
    remove:   ['r', 'Remove A Template'],
    query:   ['q', 'Add Query to Template'],
    help:   ['h', 'HALP']
});


cli.main(function(args, options){

  console.log('args: ', args);
  console.log('options: ', options);


  const { create, remove, query, help, init } = options;

  if (args[0] == 'build'){
    buildTemplatesFromConfig()
  } else {
    if (create){
      createTemplates(args);
    }

    if (remove){
      deleteTemplates(args);
    }

    if (query){
      createQuery(args, create);
    }

    if (help){
      help();
    }

    if (init){
      init();
    }
  }

});

function help(){
  console.log('HALP');
  return false;
}
