'use strict';

var i18n = require('./lib/i18n');

hexo.extend.helper.register('url_for_lang', i18n.url);

var type = hexo.config.i18n.type;
if (type){
  if(!Array.isArray(type)){
    type = [type];
  }
  
  type.forEach(function(item){
    if (item == 'page')	{
      hexo.extend.generator.register('page-i18n', i18n.page);
    }
    else if (item == 'post') {
      hexo.extend.generator.register('post-i18n', i18n.post);
    }
  });
}

var generator = hexo.config.i18n.generator;
if (generator){
  if(!Array.isArray(generator)){
    generator = [generator];
  }
  hexo.config.i18n.generator = generator;
  
  var gs = hexo.extend.generator.list();
  generator.forEach(function(item){
    var g = gs[item];
    if (!g && !_.endsWith(item, '-i18n')){
      _.pull(hexo.config.i18n.generator, item);
    }
  });
  hexo.extend.generator.register('other-i18n', i18n.archive);
}