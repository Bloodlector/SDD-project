import type { FastifyInstance } from "fastify";
import { createRecordSchema } from "./schemas.js";
import { createRecord } from "./service.js";

export function recordsRoutes(server: FastifyInstance) {
  server.post(
    "/api/records",
    {
      preValidation: async (request, reply) => {
        // bodyLimit is set on the route options below
      },
    },
    async (request, reply) => {
      const body = createRecordSchema.parse(request.body);
      const record = await createRecord(body);
      return reply.status(201).send({ message: "Запись отправлена", record });
    },
  );
}
