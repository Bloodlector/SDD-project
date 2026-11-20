import { getProducer, KAFKA_TOPIC } from "../../lib/kafka.js";
import { ServiceUnavailableError } from "../../lib/errors.js";
import type { CreateRecordInput } from "./schemas.js";

export async function publishRecord(record: CreateRecordInput): Promise<void> {
  try {
    const producer = await getProducer();
    await producer.send({
      topic: KAFKA_TOPIC,
      messages: [{ key: record.id, value: JSON.stringify(record) }],
    });
  } catch (err) {
    throw new ServiceUnavailableError("Не удалось подключиться к Kafka");
  }
}
