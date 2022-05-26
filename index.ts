import fastify from "fastify";
import routes from "./controller/routes";
import { routeType } from "./model/route";
import { getItem } from "./adapter/datarepository";


const server = fastify();

// The main shorturl route
server.get("/:shorturl", { schema: { params: { shorturl: { type: "string" } } } }, async (request, reply) => {
  return getItem(Object(request.params).shorturl.toString())
});

// Other routes
routes.forEach((route: routeType) => {
  server.get(route.path, async (request, reply) => {
    return route.method(route.args || null);
  })
})

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})