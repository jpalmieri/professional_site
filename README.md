![Build Status](https://gitlab.com/jpalmieri/jpalmieri.gitlab.io/badges/master/build.svg)

# jpalmieri.com
### (a.k.a. jpalmieri.gitlab.io)

---

My website. Uses GitLab Pages to generate and host the static site.

Learn more about GitLab Pages at https://pages.gitlab.io and the official
documentation http://doc.gitlab.com/ee/pages/README.html.

## Setup

```
git clone https://gitlab.com/jpalmieri/jpalmieri.gitlab.io/
cd jpalmieri.gitlab.io/
bundle install
bundle exec rails server
```
http://localhost:3000 👀

## Deploying

When a branch is merged into `master`, GitLab's CI will run this file:

https://gitlab.com/jpalmieri/jpalmieri.gitlab.io/blob/master/.gitlab-ci.yml

Here's what happens in that file:

A daemonized rails server is started, the served files are copied to `public/` (using `rsync`) and then GitLab's CI deploys static files in the `public/` folder as a GitLab Pages site at https://jpalmieri.gitlab.io.

## Testing

Locally:
```
bundle exec rspec
```

Additionally, pushing to GitLab will trigger the CI, which will run the `rspec` job as well (using GitLab's runners). See `.gitlab-ci.yml` for details.
---
