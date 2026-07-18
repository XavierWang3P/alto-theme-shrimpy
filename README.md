# Alto Shrimpy

Alto 是一个面向个人博客的 [Ghost](https://ghost.org/) 主题。这个版本在原始 Alto 的简约基础上，加入了更鲜明的首页视觉、更舒展的中文阅读排版，以及更克制的前端资源加载策略。

它适合想要建立个人气质、重视阅读体验，并且希望网站在 PageSpeed Insights 中保持轻快表现的博客。

> [!IMPORTANT]
> 这个仓库是 Alto Ghost 主题的独立镜像，通常从 `TryGhost/Themes/packages/alto` 同步而来。长期维护的主题内容变更，原则上应回到 `TryGhost/Themes` monorepo 中完成；当前仓库中的本地改动用于这个个人博客版本。

## 版本

当前版本：`1.1.1`

## 主要特点

- 个性化首页 Hero：使用 Ghost 后台中的站点标题、描述、封面图和强调色。
- 满屏文章封面：有特色图的文章页会优先展示沉浸式封面。
- 轻量精选文章横向浏览：移除 jQuery 与 Owl Carousel，改用原生 JavaScript。
- 卡片边框与标签胶囊：文章列表和精选区的边框、标签会在 hover 时同步运动，并保持贴线对齐。
- 中文阅读优化：改善中文标题断行、正文行高、长词换行和移动端阅读节奏。
- 图片与首屏性能优化：首屏图使用高优先级加载，非首屏图片懒加载并异步解码。
- 深色模式支持：可通过 Ghost 后台主题设置切换浅色或深色。
- 构建产物分离：全站脚本与文章页灯箱脚本拆分，列表页不会加载文章页专用灯箱代码。

## Ghost 后台设置

主题支持以下 Ghost 自定义设置：

- `navigation_layout`：导航布局，可选左侧 Logo、中间 Logo、堆叠布局。
- `title_font`：标题字体，可选现代无衬线或优雅衬线。
- `body_font`：正文字体，可选现代无衬线或优雅衬线。
- `color_scheme`：浅色或深色模式。
- `white_logo_for_dark_mode`：深色模式专用白色 Logo。
- `show_featured_posts`：首页是否显示精选文章。
- `show_author`：文章页是否显示作者信息。
- `show_related_posts`：文章页是否显示相关文章。

首页还会读取 Ghost 的站点标题、站点描述、站点封面图、强调色和精选文章。

## 安装

上传主题包：

```bash
dist/alto-shrimpy.zip
```

在 Ghost 后台进入 `Settings → Design & branding → Change theme → Upload theme`，上传 `dist/alto-shrimpy.zip` 即可。

如果需要重新生成安装包：

```bash
pnpm zip
```

## 开发

本项目使用 pnpm 和 Gulp 构建源文件。

```bash
pnpm install
pnpm dev
```

常用命令：

```bash
pnpm test
pnpm zip
```

开发约束：

- CSS 源文件位于 `assets/css/`。
- JavaScript 源文件位于 `assets/js/`。
- 模板和 partial 使用 `.hbs` 文件。
- 修改源资源后，需要保持 `assets/built/` 中的生成文件同步。
- 不要提交 `node_modules/`、`.pnpm-store/`、secrets 或本地 Ghost 内容。

## 翻译

中文翻译位于：

```bash
locales/zh.json
```

Ghost 官方主题的长期翻译维护通常属于 `TryGhost/Themes/packages/theme-translations`。当前仓库中的中文 locale 是这个个人博客版本的本地覆盖。

## 性能说明

这个版本重点优化了 PageSpeed Insights 关注的主题层指标：

- 减少全站 JavaScript 体积。
- 文章页专用灯箱脚本只在文章页和页面模板中加载。
- 首屏大图使用 `fetchpriority="high"`。
- 非首屏图片使用 `loading="lazy"` 与 `decoding="async"`。
- 字体使用 `font-display: swap`，降低文本渲染阻塞。
- 非首屏文章列表、相关内容和评论区域使用 `content-visibility` 降低渲染成本。

真实 PSI 分数仍取决于实际 Ghost 站点的服务器响应、图片 CDN、封面图尺寸、第三方脚本和页面内容。

## License

Copyright (c) 2013-2026 Ghost Foundation.

Released under the [MIT license](LICENSE).
