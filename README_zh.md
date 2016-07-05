# 简介

[Hexo]国际化站点生成插件.

## 安装

``` bash
$ npm install hexo-generator-i18n --save
```

## 选项

``` yaml
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
