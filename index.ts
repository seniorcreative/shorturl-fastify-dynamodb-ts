import fastify from "fastify";
import routes from "./controller/routes";
import { routeType } from "./model/route";

const server = fastify();

routes.forEach((route: routeType) => {
  server.get(route.path, async (request, reply) => {
    return route.method();
  })
})

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})