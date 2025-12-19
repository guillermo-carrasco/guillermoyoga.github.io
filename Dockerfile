# Use the official Ruby image as base
FROM ruby:3.1-alpine

# Install dependencies for Jekyll
RUN apk add --no-cache \
    build-base \
    git \
    tzdata

# Set working directory
WORKDIR /app

# Copy Gemfile for dependency installation
COPY Gemfile Gemfile.lock* ./

# Install Ruby gems
RUN bundle install

# Copy the rest of the application
COPY . .

# Expose port 4000 (Jekyll's default port)
EXPOSE 4000

# Set the default command to serve Jekyll in development mode
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--livereload", "--force_polling"]
