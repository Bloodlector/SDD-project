import { Kafka } from "kafkajs";

const KAFKA_BROKERS = (process.env.KAFKA_BROKERS ?? "localhost:9092").split(",");
const KAFKA_TOPIC = process.env.KAFKA_TOPIC ?? "KafkaTest";

let producerInstance: ReturnType<Kafka["producer"]> | null = null;
let connecting: Promise<ReturnType<Kafka["producer"]>> | null = null;

function createKafka(): Kafka {
  return new Kafka({
    clientId: "sdd-project",
    brokers: KAFKA_BROKERS,
    connectionTimeout: 3000,
    requestTimeout: 5000,
    retry: { retries: 0 },
    allowAutoTopicCreation: false,
  });
}

export async function getProducer(): Promise<ReturnType<Kafka["producer"]>> {
  if (producerInstance) {
    return producerInstance;
  }

  if (!connecting) {
    connecting = createKafka()
      .producer()
      .connect()
      .then((prod) => {
        producerInstance = prod;
        connecting = null;
        return prod;
      });
  }

  return connecting;
}

export async function disconnectKafka(): Promise<void> {
  if (producerInstance) {
    try {
      await producerInstance.disconnect();
    } catch {
      // ignore disconnect errors
    }
    producerInstance = null;
  }
  connecting = null;
}

export { KAFKA_TOPIC };
