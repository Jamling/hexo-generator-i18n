'use strict';

var _ = require('lodash');

//------------> Init langs
  if (!hexo.config.i18n) {
    hexo.log.info('i18n not config in _config.yml, use default config!\nPlease visit https://github.com/Jamling/hexo-generator-i18n for more information');
    hexo.config.i18n = {
      type: ["page", "post"],
      generator: ["index", "archive", "category", "tag"]
    }
  }
  if (!hexo.config.i18n.languages){
    var languages = hexo.config.language;
    if(!Array.isArray(languages)){
      languages = [languages];
    }
    _.pull(languages, 'default');
    hexo.config.i18n.languages = languages;
  }

//------------> Helper
var helper = require('./lib/helpers');

hexo.extend.helper.register('get_langs', helper.langs);
hexo.extend.helper.register('default_lang', helper.defaultLang);
hexo.extend.helper.register('switch_lang', helper.switchLang);
hexo.extend.helper.register('url_for_lang', helper.url);

//------------> Generator
var i18n = require('./lib/i18n');
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