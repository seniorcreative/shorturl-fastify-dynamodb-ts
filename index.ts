import fastify from 'fastify'
import './adapter/datarepository';

const server = fastify()

/* Example route */
server.get('/items', async (request, reply) => {
  return 'pong\n'
})

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})