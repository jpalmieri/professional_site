![Build Status](https://gitlab.com/jpalmieri/jpalmieri.gitlab.io/badges/master/build.svg)

# jpalmieri.com
### (a.k.a. jpalmieri.gitlab.io)

---

My website. Uses [Hugo](https://gohugo.io/) to generate and GitLab Pages host the static site.

Learn more about GitLab Pages at https://pages.gitlab.io and the official
documentation http://doc.gitlab.com/ee/pages/README.html.

## Setup

Install [Hugo](https://gohugo.io/), if not already installed.
For macOS with [Homebrew](https://brew.sh/):

```.sh
brew install hugo
```

For other platforms, see Hugo's
[install documentation](https://gohugo.io/getting-started/installing).

Clone the repo:
```.sh
git clone https://gitlab.com/jpalmieri/jpalmieri.gitlab.io/
```

Start the server:

```.sh
cd jpalmieri.gitlab.io/
hugo server -D # the -D flag will also serve files marked as "draft"
```
http://localhost:1313 👀

## Deploying

When a branch is merged into `master`, GitLab's CI will run this file:

https://gitlab.com/jpalmieri/jpalmieri.gitlab.io/blob/master/.gitlab-ci.yml

Here's what happens in that file:

Hugo will generate the site's files into `./public` and GitLab's CI will then deploy these files as a GitLab Pages site at https://jpalmieri.gitlab.io.

---
