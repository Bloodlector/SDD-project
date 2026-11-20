import type { MessageDto } from "./schemas.js";
import { getProducer, createKafka, KAFKA_TOPIC } from "../../lib/kafka.js";

// Buffer for consumed messages
const BUFFER_SIZE = 500;
const messageBuffer: MessageDto[] = [];
const seenIds = new Set<string>();

let consumerInstance: ReturnType<Kafka["consumer"]> | null = null;
let consumerConnecting: Promise<ReturnType<Kafka["consumer"]>> | null = null;

export function getBuffer(): MessageDto[] {
  return [...messageBuffer];
}

export function addMessage(msg: MessageDto): void {
  if (seenIds.has(msg.id)) return;
  seenIds.add(msg.id);
  messageBuffer.push(msg);
  if (messageBuffer.length > BUFFER_SIZE) {
    messageBuffer.shift();
  }
}

export async function startMessagesConsumer(): Promise<void> {
  if (consumerInstance) return;

  if (!consumerConnecting) {
    consumerConnecting = (async () => {
      const kafka = createKafka();
      const consumer = kafka.consumer({ groupId: "sdd-messages-panel" });
      await consumer.connect();
      await consumer.subscribe({ topic: KAFKA_TOPIC, fromBeginning: true });

      consumer.run({
        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {
          if (!message.value) return;
          try {
            const parsed = JSON.parse(message.value.toString());
            addMessage({
              id: parsed.id ?? message.key?.toString() ?? `msg-${Date.now()}`,
              name: parsed.name ?? "",
              description: parsed.description ?? "",
              timestamp: parsed.timestamp ?? new Date().toISOString(),
            });
          } catch {
            // ignore parse errors
          }
        },
      });

      consumerInstance = consumer;
      consumerConnecting = null;
    })();
  }

  return consumerConnecting;
}

export async function stopMessagesConsumer(): Promise<void> {
  if (consumerInstance) {
    try {
      await consumerInstance.disconnect();
    } catch {
      // ignore
    }
    consumerInstance = null;
  }
  consumerConnecting = null;
}

export { KAFKA_TOPIC };
