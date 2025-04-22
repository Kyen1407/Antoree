FROM php:8.2-apache

# Cài các extension PHP thường dùng
RUN docker-php-ext-install pdo pdo_mysql

# Bật mod_rewrite để Laravel hoạt động
RUN a2enmod rewrite

# Copy project vào container
COPY . /var/www/html

# Thiết lập quyền
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Laravel app thường nằm ở /public
# WORKDIR /var/www/html

# Apache serve public folder
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
  && apt-get install -y nodejs