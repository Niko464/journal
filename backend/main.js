const fastify = require('fastify')()

fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: "/docs",
  swagger: {
    info: {
      title: "Journal API"
    }
  }
})

fastify.get("/superTest", (req, reply) => {
    reply.send({ hello: "world" })
})

//require('./routes/auth')(fastify)

try {
    fastify.listen(process.env.API_PORT, '0.0.0.0');
    console.log(`Listening on 0.0.0.0 ${process.env.API_PORT}`);
} catch (err) {
    console.log(err);
    process.exit(84);
}

/*



database:
    container_name: database
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - ./database:/data/db
    networks:
      - backend-network
    restart: always
*/