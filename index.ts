import fastify from 'fastify'
import { getItems } from './adapter/datarepository';

const server = fastify()

/* List all items route */
server.get('/list', async (request, reply) => {
   return getItems()
})

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})