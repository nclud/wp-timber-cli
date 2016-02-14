#!/usr/bin/env node

import cli from 'cli';
import fs from 'fs';
import mkdirp from 'mkdirp';

import createTemplates from './createTemplates.js'
import createQuery from './createQuery.js';

const buildTemplatesFromConfig = function(){
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

        const Queries = BuildType[name].queries;
        if (Queries){
          Object.keys(Queries).map( (query, index) => {
            setTimeout(function(){
              const queryArgs = [type, name, query, Queries[query]];
              createQuery(queryArgs, true);
            }, 10 * (index + 1));
          });
        }
      })
    })
  }
}

export default buildTemplatesFromConfig;
