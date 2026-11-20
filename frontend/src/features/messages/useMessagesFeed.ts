import { useState, useEffect, useRef } from "react";
import type { MessageDto } from "../../../../packages/shared/src/messages";

export function useMessagesFeed() {
  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);
  const errorRef = useRef<string | null>(null);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3000/api/messages/stream");
    eventSourceRef.current = eventSource;

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as MessageDto[];
        setMessages(data);
        setError(null);
        errorRef.current = null;
        setConnected(true);
      } catch {
        const msg = "Ошибка парсинга данных";
        setError(msg);
        errorRef.current = msg;
      }
    };

    eventSource.onerror = () => {
      if (eventSource.readyState === EventSource.CLOSED) {
        setConnected(false);
        return;
      }
      setConnected(false);
      if (!errorRef.current) {
        const msg = "Ошибка подключения к серверу";
        setError(msg);
        errorRef.current = msg;
      }
    };

    return () => {
      eventSource.close();
      eventSourceRef.current = null;
    };
  }, []);

  return { messages, error, connected };
}
