+++
title = "Switching to Hugo"
date = 2018-02-28T15:48:37-08:00
description = "Who knew it would be simpler without Ruby?"
toc = true
categories = ["technology"]
tags = ["static site generators", "go", "hugo"]
images = [
  "https://source.unsplash.com/category/technology/1600x900"
] # overrides the site-wide open graph image
+++

I decided to switch from Ruby-based static site generation to [Hugo](https://gohugo.io/).

# A little background

I had been using [Middleman](https://middlemanapp.com/) to manage this site (in an earlier form) until, with the release of v4.0, the asset pipeline was abandoned in favor of an External Pipelines feature to support, for example, asset managers like [Webpack](https://webpack.js.org/).

<!--more-->

I don't think this was a bad decision. In fact, Rails moved in this same direction shortly thereafter. However, being a Rubyist and so used to the asset pipeline that, in an act of defiance, I decided to give up Middleman and simply use [Rails as a static site generator](https://nowaker.net/post/ruby-on-rails-a-static-site-generator.html).
This worked fine for a while, but after time I realized that Rails is just not meant for this kind of thing. I spent so much time configuring everything (and, in fact going against the ["convention over configuration" motto](http://rubyonrails.org/doctrine/#convention-over-configuration)), that development of my simple site was slow and tedious. I briefly considered going back to Middleman (and I'll probably still use it for another project in the future), but realized that I needed something that just worked out of the box, with little configuration. After all, I should be spending my time at work solving the difficult problems, not going through setup hell during my spare time as well, right?

# Making the switch

I use [GitLab Pages](https://about.gitlab.com/features/pages/) to host my site, and I found a [template for Hugo](https://gitlab.com/pages/hugo) in their static site generator templates, so I took a look at Hugo's docs. I was cautious of using a static site generator that uses code that I haven't yet learned (Golang), but I found exactly what I was looking for with Hugo: little configuration and [beautifully designed themes](https://themes.gohugo.io/).

But so many frameworks gloat about how "simple" setup is, and then you spend hours one one little detail, reading through endless documentation, posting on Stack Overflow, bashing your head against the wall, etc. Was this going to be the same? I decided to give it a go by setting up the [After Dark](https://comfusion.github.io/after-dark/) theme.

# Testing it out

I use a mac, and I love [Homebrew](https://brew.sh/), so I follow the [standard installation instructions](https://comfusion.github.io/after-dark/#getting-started).

```.sh
brew install hugo
curl -s https://raw.githubusercontent.com/comfusion/after-dark/master/bin/install.sh | sh
```

The install script tells me I now have a site installed at `./flying-toasters` (what?), so I open that directory up.

```
flying-toasters
  └──archetypes
  |   ├──default.md
  |   └──post.md
  ├──content
  |   └──post
  |       └──starry-night.md
  ├──data
  ├──layouts
  ├──static
  └──themes
  |   └──after-dark
  |       └──...
  └──config.toml
```

Seems fairly straightforward. The `./themes` directory seems to contain all of the configuration for the `after-dark` theme. The installation script has already created a `post` for me (`starry-night.md`). I have archetypes...I'm assuming those are some kind of templates associated with the `post`.

I fire up the server per the documentation with `hugo server -D` (I later find that the `-D` flag is for displaying items still in "draft" mode), and take a look. The `starry-night.md` post is welcoming me and telling me to configure my archetypes before getting started. So, let's go check out the [docs](https://gohugo.io/content-management/archetypes/) and see what these are.

> Archetypes are content files in the archetypes directory of your project that contain preconfigured front matter for your website’s content types. Archetypes facilitate consistent metadata across your website content and allow content authors to quickly generate instances of a content type via the hugo new command.

Hey, this `hugo new` command sounds like `rails generate`. What's the sytax?

```.sh
hugo new <content-section>/<file-name.md>
```

Let's give it a shot:

```.sh
hugo new post/something-else.md
# => ./content/post/something-else.md created
```

Sure enough, the new file contains all of the [front matter](https://gohugo.io/content-management/front-matter/) that the archetype did, along with all of the default content (telling me, once again to configure my archetypes and showing me an animated gif of a train).

# Configuration

I know that I want this simple site to have a few things that I'm not yet seeing when viewing it on the server:

* I want the simple nav menu, like the one at the top of [Hack Cabin](https://hackcabin.com/) blog
* I want a **Home** link in the nav menu
* I want an **About** page, and I want that to show up in the nav menu
* I want a **Bio** page, and I don't want that to show up in the nav menu (I want it to be accessible via a link from the **About** page)

## Nav menu

Although this wasn't noted in the After Dark docs, the `config.toml` file had a param with a comment next to it that seemed promising:

```.toml
[params]
  ...
  show_menu = false # Optional, set true to enable section menu
  ...
```

Upon switching this to `true`, flying-toasters was reloaded and the **Posts** nav link appeared at the top. Next task is getting **Home** in there, to the left of it.

Per the After Dark [docs](https://comfusion.github.io/after-dark/#section-menu), this was an easy copypasta into `config.toml` as well:

```.toml
[[menu.main]]
  name = "Home"
  weight = 1
  identifier = "home"
  url = "/"
```

## Adding an About page

I want a page with a simple blurb about who I am and what I do, yadda yadda, so let's use our old friend `hugo new` and generate one from the `default.md` archetype:

```.sh
hugo new about.md
# => ./content/about.md created
```

That's great, but it's not showing up in my nav menu. Let's add more menu configuration to the `config.toml` file:

```.toml
[[menu.main]]
  name = "Home"
  ...
[[menu.main]]
  name = "About"
  weight = 1
  identifier = "about"
  url = "/about/"
```

Ok, now it's showing up, but the nav links are in a weird order:

```
[About] [Home] [Posts]
```

Clearly, **[Home]** should be first, and I'd like **[About]** to be last. I'm guessing that that `weight` property can order them for me.

```.toml
[[menu.main]]
  name = "Home"
  weight = 1
  identifier = "home"
  url = "/"
[[menu.main]]
  name = "Posts"
  weight = 2
  identifier = "post"
  url = "/post/"
[[menu.main]]
  name = "About"
  weight = 3
  identifier = "about"
  url = "/about/"
```

I'm going to skip looking this up in the docs because it works like a charm.

But wait...the **About** nav link doesn't stay highlighted when I'm on the `/about/` page. Something still needs to be configured so that Hugo knows to to add an `.active` class to the element when I'm on the page.

It looks like I jumped the gun by using generating the **About** page with `hugo new about.md`, which placed the `about.md` file directly in the `./content` directory. According to the [docs](https://gohugo.io/content-management/organization/#organization-of-content-source), my directory structure should look more like this, with an `_index.md` file in `./content/about/`:

```
flying-toasters
  ...
  ├──content
  |   └──post
  |   |   └──starry-night.md
  |   └──about
  |       └──_index.md
  ...
```

After correcting that mistake, I check the page again, and the **[About]** link is highlighted, but the content of the **About** page is missing; all that's shown is the title. It looks like Hugo is using the wrong template (or, it's not using the one I *want* it to).

I dig into the `./themes` directory and notice the default templates:

```
flying-toasters
  ...
  └──themes
     └──after-dark
        ...
        └──layouts
            └──_default
                ...
                └──list.html
                └──single.html
                ...
```

Although I haven't yet made myself familiar with the templating syntax, `list.html` seems to be the one that's being used:

```.go
{{ define "header" }}
  {{ partial "menu.html" . }}
{{ end }}
{{ define "main" }}
  <header>
    <h1>{{ .Title }}</h1>
  </header>
  {{ range .Paginator.Pages }}
    {{ partial "page-summary.html" . }}
  {{ end }}
{{ end }}
{{ define "footer" }}
  {{ partial "pagination.html" . }}
  {{ partial "powered-by.html" . }}
{{ end }}
```

That would make sense, since an index file would be expected to list the items in the directory, and there are no other items for it to list. It looks like I want to use `single.html` instead, since it includes `{{ .Content }}`:

```.go
{{ define "title" -}}
  {{ .Title }} | {{ .Site.Title }}
{{- end }}
{{ define "header" }}
  {{ partial "menu.html" . }}
{{ end }}
{{ define "main" }}
  <header>
    <h1>{{ .Title }}</h1>
  </header>
  {{ .Content }}
{{ end }}
{{ define "footer" }}
  {{ partial "powered-by.html" . }}
{{ end }}
```

After a little searching in the docs, I find [front matter's layout property](https://gohugo.io/content-management/front-matter/), with a nice explanation of how layout is determined:

>layout

>the layout Hugo should select from the lookup order when rendering the content. If a type is not specified in the front matter, Hugo will look for the layout of the same name in the layout directory that corresponds with a content’s section.

So, in this case, Hugo is looking for an `about` type, and since once isn't found, it's using the default type, with the `list.html` template. Let's change the `./content/about/_index.md` layout to "single":

```.toml
+++
title = "About me"
description = "About Joe Palmieri"
categories = ["about"]
layout = "single"
+++
```

That did the trick! The content is now showing after the page reloads. On to the Bio.

## Adding a Bio page

At this point, I know how to create the **Bio** page, and I know not to create it in the bare `/.content` directory; it needs to have a meaningful parent directory. Since the bio will be *about* me, let's put it in `./content/about`:

```.sh
hugo new about/bio.md
# => /content/about/bio.md created
```

I add some content to `bio.md`, remove the `draft = true` setting, and visit `/about/bio/` in my browser. Looks good: all of the content is showing, there's no **[Bio]** link in the top nav, and the **[About]** nav link even is active when I'm on the bio page.

However, one thing would make this page better. It's a pretty long page (it's my extended bio), so it would be nice if it had the time reading estimate at the top (e.g., "5 minute read"), along with the edit date, like the posts. We can probably have the bio use the **Post** template, right?

The post template is located at `./themes/after-dark/layouts/post/single.md` It looks like the [docs](https://gohugo.io/content-management/organization/#type) say that, to get the nested template, we'll need to change the `type` to `"post"` and use the `"single"` layout:

```.toml
+++
title = "Bio"
date = 2018-02-28T19:09:41-08:00
description = "A bit about me"
type = "post"
layout = "single"
+++
```

Ok, that seemed to work. One added bonus of using the **Post** template is that we can now use the [Table of Contents](https://comfusion.github.io/after-dark/#table-of-contents) feature that After Dark made. This will create a collapsable menu based on all of the section headings in the markdown (e.g., `# First Chapter`) when it's enabled. Since I mentioned that I have a long bio, this will work nicely.

```.toml
+++
title = "Bio"
date = 2018-02-28T19:09:41-08:00
description = "A bit about me"
type = "post"
layout = "single"
toc = true
+++
```

Also, since the bio is of the `post` type, it will show up in the homepage's list of items. I like this, since...well...uhh...I don't have any other posts yet. But it's a personal preference.

# Conclusion

And there it is! You can check out the code in the [repo](https://gitlab.com/jpalmieri/jpalmieri.gitlab.io) for this site.

While setting up the site in Hugo wasn't completely simple, it was far simpler than it could have been, and the documentation (while sometimes out of date), is pretty good. It was definitely better than what I've experienced with Middleman, seeing as Hugo has a *ton* of free themes available and, I assume, are fairly simple to configure like After Dark.

But, of course, YMMV. Hacky Codeine!
