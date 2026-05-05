# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal Jekyll site for Guillermo Carrasco — a NYC-based yoga teacher. Deployed via GitHub Pages with the custom domain `guillermoyoga.com` (see `CNAME`). Lean stack: Jekyll 4 + Sass + a small amount of vanilla JS. No CSS frameworks or JS dependencies.

## Common commands

Local dev runs in Docker (preferred) or a local Ruby toolchain.

```bash
make serve            # docker-compose up --build (live reload at http://localhost:4000)
make serve-detached   # same, in background
make stop             # docker-compose down
make logs             # tail container logs
make shell            # open a shell in the Jekyll container
make install          # bundle install inside the container

# Local Ruby (alternative)
bundle install
bundle exec jekyll serve --livereload
```

LiveReload uses port 35729 (mapped in `docker-compose.yml`). The Docker command runs with `--force_polling` because file watching on bind mounts is unreliable.

There is no test suite or linter. The repo is pure Ruby/Jekyll — no Node toolchain.

## Architecture

Standard Jekyll layout, but a few non-default conventions matter:

- **Layouts.** `default.html` is the shell (head + navbar + main + footer + scripts + GA). `page.html` adds a hero with optional background image controlled by the `background` and `eyebrow` front matter. `post.html` is for blog posts. Pages opt into the hero by setting `layout: page` and supplying `title` / `description` / `background`.
- **Styles.** A single Sass entry point: `assets/main.scss` (which has the required empty front matter so Jekyll processes it) `@use`s `_sass/styles.scss`. All design tokens are CSS custom properties declared in the `:root {}` block at the top of `_sass/styles.scss` — change them there, not in component blocks.
- **JS.** `assets/scripts.js` is small and unbundled — it handles the mobile nav toggle (`data-nav-toggle`, `data-nav-menu`) and the Formspree contact form (`#contactForm`).
- **Contact form.** Posts to Formspree at `https://formspree.io/f/xgvlvgdd`. The endpoint is hardcoded in `contact.html`; `assets/scripts.js` handles the async submit + status messaging.
- **Analytics.** Google Analytics ID is set in `_config.yml` (`google_analytics`) and rendered by `_includes/google-analytics.html`.

## Authoring content

- **Blog posts:** add `_posts/YYYY-MM-DD-slug.md` with `layout: post` front matter. A `background` image path enables the post hero.
- **Pages:** top-level `.md` / `.html` files (e.g. `about.md`, `contact.html`) with `layout: page` for hero-style pages.
