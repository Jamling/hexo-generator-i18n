# hexo-generator-i18n

Multi-languages pages generator for [Hexo].

## Installation

``` bash
$ npm install hexo-generator-i18n --save
```

## Options

``` yaml
i18n:
  type: [page, post]
```

- **type**: What type of page to be generated
 - page: All pages which layout is page
 - post: All posts under <var>source</var>/<var>_post</var>
 - index: Index page of hexo. <b>Not implement yet!</b>
 - archive: Category or tag pages. <b>Not implement yet!</b>

## Order

Make sure this plugin after other generators in <var>dependencies</var> of <var>package.json</var>

## License

MIT

[Hexo]: http://hexo.io/