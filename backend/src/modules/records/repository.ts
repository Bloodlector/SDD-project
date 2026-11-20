import { getProducer, KAFKA_TOPIC } from "../../lib/kafka.js";
import { ServiceUnavailableError } from "../../lib/errors.js";
import type { RecordDto } from "./service.js";

export async function publishRecord(record: RecordDto): Promise<void> {
  try {
    const producer = await getProducer();
    await producer.send({
      topic: KAFKA_TOPIC,
      messages: [{ key: record.id, value: JSON.stringify(record) }],
    });
  } catch {
    throw new ServiceUnavailableError("Не удалось подключиться к Kafka");
  }
}
