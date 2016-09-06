# hexo-generator-i18n

[![Build Status](https://travis-ci.org/Jamling/hexo-generator-i18n.svg?branch=master)](https://travis-ci.org/Jamling/hexo-generator-i18n)

Multi-languages pages generator for [Hexo].

## Installation

``` bash
$ npm install hexo-generator-i18n --save
```

## Config

<var>_config.yml</var>
``` yaml
# hexo default is empty, change to exact languages
language: [zh,en]
# config hexo-generator-i18n option (optional, this is default option)
i18n:
  type: [page, post]
  generator: [index, archive, category, tag]
```

- **type**: What type of model to be i18n generated
 - page: All page model under <var>source</var>
 - post: All post model under <var>source</var>/<var>_post</var>
- **generator**: Which generator to be i18n generated, it's array of your installed generator names.
 - index: Generate i18n index page
 - archive: Generate i18n archive page
 - category: Generate i18n category page
 - tag: Generate i18n tag page
 
<var>source/_data/languages.yml</var>
```yaml
zh: 简体中文
en: English
```
 
## Order

Make sure this plugin after other generators in <var>dependencies</var> of <var>package.json</var>

## Usage
You may need to replace `url_for()` to `url_for_lang()` to output link under current language. Usually, in post/archive/tag/category pages.

## Helpers

### get_langs
Return array of config languages, exclude `default` language

### default_lang
Return default language, it's the first element of [get_langs](#get_langs)

### switch_lang
Return the absolute url under lang
```js
window.location = {{ switch_lang('en')}}
```

### url_for_lang
Return url for path with language
```js
  ret += '<ul class="list-group">';
  this.site.tags.forEach(function(item){
    ret += '<li class="list-group-item"><a href="' + _self.url_for_lang(item.path) + '">' + item.name + '</a></li>';
  });
  ret += '</ul>';
```

## License

MIT

[Hexo]: http://hexo.io/
