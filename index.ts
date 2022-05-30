import fastify from "fastify";
import ShortUrlDynamoDbRepository from "./adapter/ShortUrlDynamoDbRepository";

const server = fastify();

// The main shorturl route
server.get("/:shorturl", { schema: { params: { shorturl: { type: "string" } } } }, async (request, reply) => {
  return new ShortUrlDynamoDbRepository().get(Object(request.params).shorturl.toString())
});

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})