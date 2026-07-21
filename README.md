# guillermoyoga.com

Personal site for Guillermo Carrasco, a yoga teacher based in NYC. It uses Jekyll 4, modern Sass, and a small amount of dependency-free JavaScript.

## Requirements

- Ruby 3.4.10 (see `.ruby-version`)
- Bundler
- Docker Desktop, if using the container workflow

## Local development

Using the local Ruby toolchain:

```bash
make install
make site
bundle exec jekyll serve --livereload
```

Using Docker:

```bash
make serve
```

The site is available at `http://localhost:4000`; LiveReload uses port `35729`.

## Validation

```bash
make check
```

This builds the production site and validates generated HTML and internal links with HTMLProofer. The same checks run on pull requests and before deployment.

## Content

- Core pages live in `index.md`, `about.md`, `contact.html`, and `posts/index.html`.
- Journal entries live in `_posts/` and use the `post` layout.
- Shared templates live in `_layouts/` and `_includes/`.
- Global styles live in `_sass/styles.scss`; `assets/main.scss` is the Jekyll entry point.
- Hero images live in `img/`. Keep matching `.jpg` and `.avif` files because templates preload AVIF and retain JPEG as a fallback.

## Deployment

Pushes to `main` are built and deployed by `.github/workflows/pages.yml`. Pull requests run the same build and HTML validation without deploying. The repository's Pages source must be set to **GitHub Actions**.

The custom domain is configured in `CNAME` and in the repository's Pages settings.

## Services

- The contact form posts to Formspree. Its endpoint is configured in `contact.html`.
- Google Analytics is enabled only in production. Its measurement ID is configured in `_config.yml`.
