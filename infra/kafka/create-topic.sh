#!/bin/bash
# Create the KafkaTest topic if it doesn't exist
# Usage: ./create-topic.sh

KAFKA_BOOTSTRAP="${KAFKA_BOOTSTRAP:-localhost:9092}"
TOPIC="${KAFKA_TOPIC:-KafkaTest}"

echo "Creating topic '$TOPIC' on $KAFKA_BOOTSTRAP..."

docker run --rm \
  --network host \
  apache/kafka:latest \
  kafka-topics --bootstrap-server "$KAFKA_BOOTSTRAP" \
  --create \
  --topic "$TOPIC" \
  --partitions 1 \
  --replication-factor 1 \
  --if-not-exists

echo "Topic '$TOPIC' is ready."
