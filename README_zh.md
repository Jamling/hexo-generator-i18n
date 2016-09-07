# 简介

[![Build Status](https://travis-ci.org/Jamling/hexo-generator-i18n.svg?branch=master)](https://travis-ci.org/Jamling/hexo-generator-i18n)
[![node](https://img.shields.io/node/v/hexo-generator-i18n.svg)](https://www.npmjs.com/package/hexo-generator-i18n)
[![npm downloads](https://img.shields.io/npm/dt/hexo-generator-i18n.svg)](https://www.npmjs.com/package/hexo-generator-i18n)
[![npm version](https://img.shields.io/npm/v/hexo-generator-i18n.svg)](https://www.npmjs.com/package/hexo-generator-i18n)
[![GitHub release](https://img.shields.io/github/release/jamling/hexo-generator-i18n.svg)](https://github.com/Jamling/hexo-generator-i18n/releases/latest)

[Hexo]国际化站点生成插件.

## 安装

``` bash
$ npm install hexo-generator-i18n --save
```

## 设置

<var>_config.yml</var>
``` yaml
# 需修改Hexo默认的空值为确切的语言列表，记得在主题languages目录下添加对应的语言.yml文件
language: [zh,en]
# hexo-generator-i18n 选项（可选，默认使用如下设置）
i18n:
  type: [page, post]
  generator: [index, archive, category, tag]
```

- **type**: 想要生成国际化页面类型
 - page: <var>source</var>目录下的所有page页面
 - post: <var>source</var>/<var>_post</var>目录下所有的post页面
- **generator**: 设置需要国际化的其它生成器。
 - index: 生成国际化首页
 - archive: 生成国际化归档页
 - category: 生成国际化分类页
 - tag: 生成国际化标签页

***在主题languages目录下添加对应的语言.yml文件(如zh.yml, en.yml)***
 
在<var>source/_data/languages.yml</var>中设置语言的显示名称(Optional)
```yaml
zh: 简体中文
en: English
```

## 顺序

确保i18n插件位于<var>package.json</var>中<var>dependencies</var>配置的其它生成插件之后。不然有可能导致找不到生成器错误。

## 使用
在您的主题中，您可能需要将`url_for()`辅助函数替换为`url_for_lang()`以确保点击链接时，仍然保持当前用户所选的语言。

## 辅助函数

### get_langs
- Return Array

返回配置的语言列表（数组）, 返回的列表不包含`default`。

### default_lang
- Return string

返回默认语言，为[get_langs](#get_langs)的第一项。

### switch_lang
- Param lang
- Return string
返回其它语言下的当前页面URL。
```js
window.location = {{ switch_lang('en')}}
```

### url_for_lang
- Param path
- Param lang
- Return string

返回带语言的路径URL
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
