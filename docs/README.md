# Документация проекта SDD

## API

### POST /api/records

Отправляет запись в Kafka-топик `KafkaTest`.

**Тело запроса:**

```json
{
  "id": "string (обязательно)",
  "name": "string (обязательно, макс. 20 символов)",
  "description": "string (обязательно, макс. 2000 символов)"
}
```

**Ответы:**

| Код | Описание |
|-----|----------|
| 201 | Запись отправлена. Тело: `{ "message": "Запись отправлена", "record": { "id", "name", "description" } }` |
| 400 | Ошибка валидации. Тело: `{ "code": "validation_error", "message": "Ошибка валидации" }` |
| 413 | Тело запроса слишком большое (лимит 16 КБ) |
| 503 | Kafka недоступен. Тело: `{ "code": "broker_unavailable", "message": "Сервис временно недоступен" }` |

## Переменные окружения

| Переменная | По умолчанию | Описание |
|------------|-------------|----------|
| `KAFKA_BROKERS` | `localhost:9092` | Список брокеров Kafka (через запятую) |
| `KAFKA_TOPIC` | `KafkaTest` | Имя топика Kafka |
| `PORT` | `3000` | Порт сервера |

## Запуск Kafka локально

```bash
docker compose -f infra/kafka/docker-compose.yml up -d
./infra/kafka/create-topic.sh
kafka-topics --list --bootstrap-server localhost:9092
```

Проверьте, что топик `KafkaTest` присутствует.

## Коды ошибок

| Код | Описание |
|-----|----------|
| `validation_error` | Неверные данные в запросе |
| `broker_unavailable` | Kafka недоступен |
| `internal` | Внутренняя ошибка сервера |
