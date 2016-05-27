'use strict';

var type = hexo.config.i18n.type;
if (type){
  if(!Array.isArray(type)){
    type = [type];
  }
  var i18n = require('./lib/i18n');
  type.forEach(function(item){
    if (item == 'page')	{
      hexo.extend.generator.register('page-i18n', i18n.page);
    }
	else if (item == 'post') {
	  hexo.extend.generator.register('post-i18n', i18n.post);
	}
  });
}