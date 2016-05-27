'use strict';

var _ = require('lodash');

function getLang(hexo){
  var languages = hexo.config.language;
  if(!Array.isArray(languages)){
    languages = [languages];
  }
  _.pull(languages, 'default');
  return languages;
}


function i18n_page(locals) {
  var _self = this;
  var languages = getLang(_self);
  
  var i18n = [];
  var langPaths = [];
  
  locals.pages.forEach(function(page){
    var lang = page.path.split('/')[0];
    if (languages.indexOf(lang) == -1){
      i18n.push(page);
    } else {
      langPaths.push(page.path);
      page.lang = lang;
    }
  });
  
  var result = [];
  i18n.forEach(function(page){
    var layouts = ['page', 'post', 'index'];
    var layout = page.layout;
    for (var i = 1; i< languages.length; i++){
      var l = languages[i];
      var path = l + '/' + page.path;
      if (langPaths.indexOf(path) != -1){
        continue;
      }
      if (!layout || layout === 'false' || layout === 'off') {
        result.push({path: path, data: page.content});
      }
      else {
          if (layout !== 'page') layouts.unshift(layout);
          var copy = {};
          _.extend(copy, page);
          copy.lang = l;
          copy.__page = true;
          copy.path = path;
          _self.log.info("generate i18n page " + copy.path);
          result.push({
            path: copy.path,
            layout: layouts,
            data: copy
          });
      }
    }
  });
  return result.length > 0 ? result : [];
};

function i18n_post(locals) {
  var _self = this;
  var languages = getLang(_self);
  
  var i18n = [];
  var langPaths = [];
  
  locals.posts.forEach(function(page){
    var lang = page.path.split('/')[0];
    if (languages.indexOf(lang) == -1){
      i18n.push(page);
    }else {
      langPaths.push(page.path);
      page.lang = lang;
    }
  });
  
  var result = [];
  i18n.forEach(function(page){
    var layouts = ['post', 'page', 'index'];
    var layout = page.layout;
    for (var i = 1; i< languages.length; i++){
      var l = languages[i];
      var path = l + '/' + page.path;
      if (langPaths.indexOf(path) != -1){
        continue;
      }
      if (!layout || layout === 'false' || layout === 'off') {
        result.push({path: path, data: page.content});
      }
      else {
          if (layout !== 'post') layouts.unshift(layout);
          var copy = {};
          _.extend(copy, page);
          copy.lang = l;
          copy.__post = true;
          copy.path = path;
          _self.log.info("generate i18n post " + copy.path);
          result.push({
            path: copy.path,
            layout: layouts,
            data: copy
          });
      }
    }
  });
  return result.length > 0 ? result : [];
};


exports.page = i18n_page;
exports.post = i18n_post;
