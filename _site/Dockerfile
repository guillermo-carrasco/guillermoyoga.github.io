# Use the official Ruby image as base
FROM ruby:3.1-alpine

# Install dependencies for Jekyll and Node.js
RUN apk add --no-cache \
    build-base \
    git \
    nodejs \
    npm \
    tzdata

# Set working directory
WORKDIR /app

# Copy Gemfile and package.json for dependency installation
COPY Gemfile Gemfile.lock* ./
COPY package*.json ./

# Install Ruby gems
RUN bundle install

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 4000 (Jekyll's default port)
EXPOSE 4000

# Set the default command to serve Jekyll in development mode
CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--livereload", "--force_polling"]
