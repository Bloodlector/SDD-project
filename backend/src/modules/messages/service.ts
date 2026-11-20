import { getBuffer } from "./repository.js";
import type { MessageDto } from "./schemas.js";

export function getMessages(): MessageDto[] {
  return getBuffer();
}
