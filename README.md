# guillermoyoga.com

Personal site for Guillermo Carrasco -- yoga teacher based in NYC. Built with a lean Jekyll setup and custom styles (no external CSS frameworks or JavaScript dependencies).

## Tech stack

- [Jekyll 4](https://jekyllrb.com/) for static site generation
- Sass for styling (`assets/main.scss`)
- A sprinkle of vanilla JavaScript for the contact form

## Local development

### Using Docker (recommended)

```bash
docker-compose up          # start dev server with live reload
docker-compose down        # stop the container
```

Visit `http://localhost:4000` once the container is running.

### Using local Ruby

```bash
bundle install
bundle exec jekyll serve --livereload
```

## Content structure

- `index.md`, `about.md`, `contact.html`, `posts/index.html` – core pages
- `_posts/` – add Markdown posts here (use the `post` layout)
- `_layouts/` & `_includes/` – shared templates (hero, nav, footer, etc.)
- `_sass/styles.scss` – global design tokens and component styles
- `assets/scripts.js` – form submission helper (Formspree)

## Deployment

- Hosted via GitHub Pages with the custom domain `guillermoyoga.com`
- `CNAME` is committed; ensure DNS records point to GitHub Pages IPs

## Customizing

- Update global metadata inside `_config.yml`
- Swap hero images in the `img/` folder and reference them via front matter
- Adjust colors/typography by editing the variables at the top of `_sass/styles.scss`
- The contact form posts to Formspree (`https://formspree.io/f/xgvlvgdd`). Replace the endpoint if needed.
