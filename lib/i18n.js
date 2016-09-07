'use strict';

var _ = require('lodash');

function getLang(hexo){
  if (!hexo.config.i18n.languages){
    var languages = hexo.config.language;
    if(!Array.isArray(languages)){
      languages = [languages];
    }
    _.pull(languages, 'default');
    hexo.config.i18n.languages = languages;
  }
  return hexo.config.i18n.languages;
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
          if (languages.length <= 2) {
            _.extend(copy, page);
          } else {
            _.defaults(copy, page);
          }
          copy.lang = l;
          copy.__page = true;
          copy.path = path;
          _self.log.debug("generate i18n page " + copy.path);
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
          if (languages.length <= 2) {
            _.extend(copy, page);
          } else {
            _.defaults(copy, page);
          }
          copy.lang = l;
          copy.__post = true;
          copy.path = path;
          _self.log.debug("generate i18n post " + copy.path);
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

function i18n_archive(locals) {
  var _self = this;
  var languages = getLang(_self);
  
  var i18n = [];
  var langPaths = [];
  
  var result = [];
  var gs = _self.extend.generator.list();
  var siteLocals = _self.locals.toObject();
  
  this.config.i18n.generator.forEach(function(g){
    var datas = gs[g].call(_self, siteLocals).then(function(data){
      _self.log.debug('i18n for generator: %s', g);
      return data;
    })
    .reduce(function(result, data) {
      return data ? result.concat(data) : result;
    }, [])
    .map(function(item){
        for (var i = 1; i< languages.length; i++){
          var l = languages[i];
          
          var copy = {};
          if (languages.length <= 2) {
            _.extend(copy, item);
          } else {
            _.defaultsDeep(copy, item);
          }
          copy.path = l + '/' + item.path;
          copy.data.base = l + '/' + item.data.base;
          copy.data.prev_link = l + '/' + item.data.prev_link;
          copy.data.current_url = l + '/' + item.data.current_url;
          copy.data.next_link = l + '/' + item.data.next_link;
          //console.log(copy);
          result.push(copy);
        }
    });
  });
  return result;
};

exports.page = i18n_page;
exports.post = i18n_post;
exports.archive = i18n_archive;
