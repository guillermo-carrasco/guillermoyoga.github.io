---
layout: page
title: Classes
description: Class sequences I've designed for various levels and focus areas.
background: '/img/bg-about.jpg'
eyebrow: Teaching Resources
---

<div class="classes-intro">
  <p>These are sequences I've designed and taught. Each class is structured with intentional pacing, clear transitions, and options for different levels. Feel free to explore and reach out if you'd like me to teach one of these at your studio.</p>
</div>

<div class="classes-filters" data-classes-filters>
  <div class="classes-filters__group">
    <span class="classes-filters__label">Level</span>
    <div class="classes-filters__buttons">
      <button class="filter-btn filter-btn--active" data-filter="level" data-value="all">All</button>
      <button class="filter-btn filter-btn--beginner" data-filter="level" data-value="beginner">Beginner</button>
      <button class="filter-btn filter-btn--intermediate" data-filter="level" data-value="intermediate">Intermediate</button>
      <button class="filter-btn filter-btn--advanced" data-filter="level" data-value="advanced">Advanced</button>
    </div>
  </div>
  <div class="classes-filters__group">
    <span class="classes-filters__label">Duration</span>
    <div class="classes-filters__buttons">
      <button class="filter-btn filter-btn--active" data-filter="duration" data-value="all">All</button>
      <button class="filter-btn" data-filter="duration" data-value="short">≤30 min</button>
      <button class="filter-btn" data-filter="duration" data-value="medium">45 min</button>
      <button class="filter-btn" data-filter="duration" data-value="long">60+ min</button>
    </div>
  </div>
</div>

<div class="classes-list" data-classes-list>
{% for class in site.classes %}
{% assign duration_category = "long" %}
{% if class.duration <= 30 %}
  {% assign duration_category = "short" %}
{% elsif class.duration <= 50 %}
  {% assign duration_category = "medium" %}
{% endif %}
<article class="class-card" data-level="{{ class.level }}" data-duration="{{ duration_category }}">
  <header class="class-card__header">
    <div class="class-card__meta">
      <button class="class-card__duration filter-badge" data-filter-click="duration" data-value="{{ duration_category }}">{{ class.duration }} min</button>
      <button class="class-card__level class-card__level--{{ class.level }} filter-badge" data-filter-click="level" data-value="{{ class.level }}">{{ class.level | capitalize }}</button>
    </div>
    <h2 class="class-card__title">{{ class.title }}</h2>
    {% if class.theme %}
      <p class="class-card__theme">Theme: <strong>{{ class.theme }}</strong></p>
    {% endif %}
    {% if class.playlist_url %}
      <a href="{{ class.playlist_url }}" class="class-card__playlist" target="_blank" rel="noopener">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
        {{ class.playlist_name | default: "Listen on Spotify" }}
      </a>
    {% endif %}
  </header>

  <div class="class-card__body">
    <div class="class-card__column class-card__column--left">
      {% assign half = class.sections.size | divided_by: 2 %}
      {% for section in class.sections limit: half %}
        <section class="class-section {% if section.highlight %}class-section--highlight{% endif %}">
          <h3 class="class-section__title">
            {{ section.name }}
            <span class="class-section__duration">~{{ section.duration }} min</span>
          </h3>
          <ul class="class-section__list">
            {% for item in section.items %}
              <li>{{ item }}</li>
            {% endfor %}
          </ul>
        </section>
      {% endfor %}
    </div>

    <div class="class-card__column class-card__column--right">
      {% for section in class.sections offset: half %}
        <section class="class-section {% if section.highlight %}class-section--highlight{% endif %}">
          <h3 class="class-section__title">
            {{ section.name }}
            <span class="class-section__duration">~{{ section.duration }} min</span>
          </h3>
          <ul class="class-section__list">
            {% for item in section.items %}
              <li>{{ item }}</li>
            {% endfor %}
          </ul>
        </section>
      {% endfor %}
    </div>
  </div>
</article>
{% endfor %}
</div>

<div class="classes-empty" data-classes-empty hidden>
  <p>No classes match your filters. Try adjusting your selection.</p>
</div>

{% if site.classes.size == 0 %}
<div class="classes-empty">
  <p>No classes published yet. Check back soon!</p>
</div>
{% endif %}
