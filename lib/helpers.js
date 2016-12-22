'use strict';

var _ = require('lodash');

function getLanguages(){
  var langs = this.config.i18n.languages;
  if (!langs){
    var languages = hexo.config.language;
    if(!Array.isArray(languages)){
      languages = [languages];
    }
    _.pull(languages, 'default');
    this.config.i18n.languages = languages;
  }
  return this.config.i18n.languages;
}

function defaultLang(){
  return this.get_langs()[0];
}

function switchLang(lang){
  var l = this.get_langs();
  var p = this.page.path;
  if (_.startsWith(p, this.page.lang)) {
    p = p.substring(this.page.lang.length);
  }
  if (!_.startsWith(p, '/')){
    p = '/' + p;
  }
  var ret = '';
  if (l.indexOf(lang) == 0) {
    ret = p;
  } else {
    ret = '/' + lang + p;
  }
  return ret;
}

function i18n_url(path, language) {
  var root = this.config.root || '';
  var lang = language ? language : this.page.lang;
  var url = this.url_for(path);

  // ignore from url_for. 
  if (url === '#' || _.startsWith(url, '//')) {
    return url;
  }

  if (!_.startsWith(url, '/')){
    url = '/' + url;
  }
  var pathLang = url.split('/')[1];
  var languages = this.get_langs();
  if (languages.indexOf(pathLang) != -1){
    return url;
  }
  
  if (lang && lang !== languages[0]){
    url = root + lang + url.replace(root, '/');
  }

  return url;
}

exports.langs = getLanguages;
exports.defaultLang = defaultLang;
exports.switchLang = switchLang;
exports.url = i18n_url;
