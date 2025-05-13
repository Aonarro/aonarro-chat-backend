# Chat Microservices Backend

## Description

This is a microservices backend for a modern chat application, built with Node.js and NestJS. Each service is responsible for its own domain, ensuring scalability, fault tolerance, and maintainability. RabbitMQ is used for inter-service communication, PostgreSQL for data storage, Redis for caching and queues, and Elasticsearch for search functionality. Incoming traffic is routed through Nginx.

## Architecture

- **auth-service** — user authentication and authorization.
- **user-service** — user profile management.
- **chat-service** — chat and participant management.
- **message-service** — message processing and storage.
- **file-service** — file upload and storage (e.g., images).
- **notification-service** — sending notifications to users.
- **websocket-gateway-service** — WebSocket gateway for real-time interaction.
- **gateway (nginx)** — routing HTTP/WebSocket requests to the appropriate services.

### Infrastructure

- **PostgreSQL** — main database.
- **Redis** — cache and queues.
- **RabbitMQ** — message broker for microservices.
- **Elasticsearch** — full-text search.

## Quick Start

### 1. Clone the repository

```bash
git clone <your-repository>
cd <your-repository>
```

### 2. Configure environment variables

Create a `.env` file in the root directory and fill it with the required variables.

### 3. Start infrastructure and services

```bash
docker-compose up --build
```

### 4. Access services

- **Nginx Gateway:** http://localhost:8080
- **RabbitMQ UI:** http://localhost:15672
- **Elasticsearch:** http://localhost:9200

### 5. Local development

To develop a specific service:

```bash
cd <service-name>
yarn install
yarn start:dev
```

## Technologies

- **Node.js, TypeScript, NestJS**
- **PostgreSQL, Redis, RabbitMQ, Elasticsearch**
- **Docker, Docker Compose**
- **Nginx**

## Example Routes (Nginx)

- `/auth/` → auth-service
- `/users/` → user-service
- `/chat-ws/` → websocket-gateway-service

## Required Environment Variables

The following environment variables must be set in your `.env` file:

# App environment

# PostgreSQL general settings

`POSTGRES_USER=` # PostgreSQL username
`POSTGRES_PASSWORD=` # PostgreSQL password
`POSTGRES_DB=` # PostgreSQL database name
`POSTGRES_HOST=` # PostgreSQL host (usually "postgres")
`POSTGRES_PORT=` # PostgreSQL port

# PostgreSQL URIs for microservices

`POSTGRES_AUTH_URI=` # Connection URI for auth-service
`POSTGRES_USER_URI=` # Connection URI for user-service
`POSTGRES_CHAT_URI=` # Connection URI for chat-service
`POSTGRES_MESSAGE_URI=` # Connection URI for message-service

# Redis

`REDIS_HOST=` # Redis host
`REDIS_PORT=` # Redis port
`REDIS_URI=` # Full Redis URI

# RabbitMQ

`RABBITMQ_HOST=` # RabbitMQ host
`RABBITMQ_PORT=` # RabbitMQ port
`RABBITMQ_UI_PORT=` # RabbitMQ UI port (management panel)

# Elasticsearch

`ELASTICSEARCH_PORT=` # Elasticsearch port
`ELASTICSEARCH_USERNAME=` # Elasticsearch username
`ELASTICSEARCH_PASSWORD=` # Elasticsearch password

# Nginx

`NGINX_PORT=` # Nginx port

# Auth Service

`AUTH_PORT=` # Port for auth-service
`AUTH_HOST=` # Host for auth-service
`COOKIES_SECRET=` # Secret for cookies
`SESSION_SECRET=` # Secret for session
`SESSION_NAME=` # Session cookie name
`SESSION_DOMAIN=` # Session domain
`SESSION_MAX_AGE=` # Session lifespan (in ms)
`SESSION_HTTP_ONLY=` # Prevent JS access (true/false)
`SESSION_SECURE=` # Use only HTTPS (true/false)
`SESSION_PREFIX=` # Redis key prefix for sessions

# User Service

`USER_PORT=` # Port for user-service
`USER_HOST=` # Host for user-service

# WebSocket Gateway

`WEBSOCKET_GATEWAY_PORT=` # Port for websocket-gateway
`USER_HOST=` # Host for websocket-gateway

# Mail Service

`MAIL_HOST=` # SMTP host
`MAIL_PORT=` # SMTP port
`MAIL_LOGIN=` # Email login
`MAIL_PASSWORD=` # Email password (or app password)

# AWS S3

`AWS_REGION=` # AWS region
`AWS_S3_BUCKET=` # S3 bucket name
`AWS_ACCESS_KEY_ID=` # AWS access key
`AWS_SECRET_ACCESS_KEY=` # AWS secret key

# Crypto

`MESSAGE_SECRET_KEY=` # Secret key for encrypting messages

---

# Микросервисный Бэкенд Чата

## Описание

Это микросервисный бэкенд для современного чата, реализованный на Node.js с использованием NestJS. Каждый сервис отвечает за свою доменную область, что обеспечивает масштабируемость, отказоустойчивость и удобство поддержки. В качестве транспорта между сервисами используется RabbitMQ, для хранения данных — PostgreSQL, для кэширования и очередей — Redis, для поиска — Elasticsearch. Входящий трафик маршрутизируется через Nginx.

## Архитектура

- **auth-service** — аутентификация и авторизация пользователей.
- **user-service** — управление профилями пользователей.
- **chat-service** — управление чатами и их участниками.
- **message-service** — обработка и хранение сообщений.
- **file-service** — загрузка и хранение файлов (например, изображений).
- **notification-service** — отправка уведомлений пользователям.
- **websocket-gateway-service** — WebSocket-шлюз для real-time взаимодействия.
- **gateway (nginx)** — маршрутизация HTTP/WebSocket-запросов к нужным сервисам.

### Инфраструктура

- **PostgreSQL** — основная база данных.
- **Redis** — кэш и очереди.
- **RabbitMQ** — брокер сообщений для микросервисов.
- **Elasticsearch** — полнотекстовый поиск.

## Быстрый старт

### 1. Клонируйте репозиторий

```bash
git clone <ваш-репозиторий>
cd <ваш-репозиторий>
```

### 2. Настройте переменные окружения

Создайте файл `.env` в корне и заполните его необходимыми переменными.

### 3. Запустите инфраструктуру и сервисы

```bash
docker-compose up --build
```

### 4. Доступ к сервисам

- **Nginx Gateway:** http://localhost:8080
- **RabbitMQ UI:** http://localhost:15672
- **Elasticsearch:** http://localhost:9200

### 5. Локальная разработка

Для разработки отдельного сервиса:

```bash
cd <service-name>
yarn install
yarn start:dev
```

## Технологии

- **Node.js, TypeScript, NestJS**
- **PostgreSQL, Redis, RabbitMQ, Elasticsearch**
- **Docker, Docker Compose**
- **Nginx**

## Примеры маршрутов (Nginx)

- `/auth/` → auth-service
- `/users/` → user-service
- `/chat-ws/` → websocket-gateway-service

## Обязательные переменные окружения

В файле `.env` необходимо указать следующие переменные:

# App environment

# PostgreSQL общие настройки

`POSTGRES_USER=` # Имя пользователя PostgreSQL
`POSTGRES_PASSWORD=` # Пароль PostgreSQL
`POSTGRES_DB=` # Название базы данных PostgreSQL
`POSTGRES_HOST=` # Хост PostgreSQL (обычно postgres)
`POSTGRES_PORT=` # Порт PostgreSQL

# PostgreSQL URI для микросервисов

`POSTGRES_AUTH_URI=` # URI подключения для auth-service
`POSTGRES_USER_URI=` # URI подключения для user-service
`POSTGRES_CHAT_URI=` # URI подключения для chat-service
`POSTGRES_MESSAGE_URI=` # URI подключения для message-service

# Redis

`REDIS_HOST=` # Хост Redis
`REDIS_PORT=` # Порт Redis
`REDIS_URI=` # Полный URI Redis

# RabbitMQ

`RABBITMQ_HOST=` # Хост RabbitMQ
`RABBITMQ_PORT=` # Порт RabbitMQ
`RABBITMQ_UI_PORT=` # Порт UI RabbitMQ (панель управления)

# Elasticsearch

`ELASTICSEARCH_PORT=` # Порт Elasticsearch
`ELASTICSEARCH_USERNAME=` # Логин Elasticsearch
`ELASTICSEARCH_PASSWORD=` # Пароль Elasticsearch

# Nginx

`NGINX_PORT=` # Порт Nginx

# Auth Service

`AUTH_PORT=` # Порт auth-service
`AUTH_HOST=` # Хост auth-service
`COOKIES_SECRET=` # Секрет для cookies
`SESSION_SECRET=` # Секрет для сессий
`SESSION_NAME=` # Название cookie сессии
`SESSION_DOMAIN=` # Домен для сессии
`SESSION_MAX_AGE=` # Время жизни сессии (в мс)
`SESSION_HTTP_ONLY=` # Защита от доступа из JS (true/false)
`SESSION_SECURE=` # Использовать только HTTPS (true/false)
`SESSION_PREFIX=` # Префикс ключей в Redis

# User Service

`USER_PORT=` # Порт user-service
`USER_HOST=` # Хост user-service

# WebSocket Gateway

`WEBSOCKET_GATEWAY_PORT=` # Порт WebSocket Gateway
`USER_HOST=` # Хост WebSocket Gateway

# Mail Service

`MAIL_HOST=` # SMTP хост
`MAIL_PORT=` # SMTP порт
`MAIL_LOGIN=` # Логин почты
`MAIL_PASSWORD=` # Пароль почты (или app password)

# AWS S3

`AWS_REGION=` # Регион S3
`AWS_S3_BUCKET=` # Название бакета
`AWS_ACCESS_KEY_ID=` # AWS access key
`AWS_SECRET_ACCESS_KEY=` # AWS secret key

# Crypto

`MESSAGE_SECRET_KEY=` # Секретный ключ для шифрования сообщений
