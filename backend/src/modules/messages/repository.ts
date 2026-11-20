import type { MessageDto } from "./schemas.js";
import { createKafka, KAFKA_TOPIC } from "../../lib/kafka.js";

// Buffer for consumed messages
const BUFFER_SIZE = 500;
const messageBuffer: MessageDto[] = [];
const seenIds = new Set<string>();

let consumerInstance: { disconnect: () => Promise<void> } | null = null;
let consumerConnecting: Promise<void> | null = null;

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

      void consumer.run({
        autoCommit: false,
        eachMessage: async ({ message }) => {
          if (!message.value) return;
          try {
            const parsed = JSON.parse(message.value.toString()) as {
              id?: string;
              name?: string;
              description?: string;
              timestamp?: string;
            };
            addMessage({
              id: parsed.id ?? message.key?.toString() ?? `msg-${String(Date.now())}`,
              name: parsed.name ?? "",
              description: parsed.description ?? "",
              timestamp: parsed.timestamp ?? new Date().toISOString(),
            });
          } catch {
            // ignore parse errors
            await Promise.resolve();
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
