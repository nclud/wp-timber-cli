#!/usr/bin/env node

import cli from 'cli';
import fs from 'fs';
import mkdirp from 'mkdirp';

import createTemplates from './createTemplates.js'
import createQuery from './createQuery.js';

fs.readFile('./.timber', 'utf8', function(err, res){
  if (err){
    console.log(err)
  } else {
    console.log('Building...');
    parseFile(res)
  }
})

function parseFile(file){
  const Types=JSON.parse(file);

  Object.keys(Types).map( type => {
    const BuildType = Types[type];
    Object.keys(BuildType).map( name => {
      const args = [type, name]
      createTemplates(args);

      const queries = BuildType[name].queries;
      if (queries){
        Object.keys(queries).map( (query, index) => {
          setTimeout(function(){
            console.log(query);
            const fileName = './' + type + '-' + name + '.php';
            const queryArgs = [fileName, query];
            createQuery(queryArgs);
          }, 1000 * (index + 1));
        });
      }
    })
  })
}
