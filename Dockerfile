FROM ruby:4.0.0-alpine3.23

RUN apk add --no-cache \
    build-base \
    libcurl \
    tzdata

WORKDIR /app

COPY .ruby-version Gemfile Gemfile.lock ./

RUN gem install bundler --version 4.0.15 --no-document && \
    bundle _4.0.15_ install --jobs 4 --retry 3

COPY . .

EXPOSE 4000

CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--livereload", "--force_polling"]
