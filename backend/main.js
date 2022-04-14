const fastify = require('fastify')()
const fastifyPlugin = require('fastify-plugin');

fastify.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: "/docs",
    swagger: {
        info: {
            title: "Journal API"
        }
    }
})
fastify.register(fastifyPlugin(async (fastify, options, done) => {
    console.log("SECOND MongoURL: " + process.env.MONGODB_URI)
    console.log("it did indeed work")

    /*await fastify.register(require('fastify-mongodb'), {
        forceClose: true,
        url: process.env.MONGODB_URI
    });*/
    done();
}));

require('module-alias/register');
require('@routes/auth')(fastify)

try {
    fastify.listen(process.env.API_PORT, '0.0.0.0');
    console.log(`Listening on 0.0.0.0 ${process.env.API_PORT}`);
} catch (err) {
    console.log(err);
    console.log("Server stopped");
    process.exit(84);
}

/*
frontend:
    container_name: frontend
    build: ./frontend
    ports:
      - "8080:3000"
    depends_on:
      - backend
      - database
    restart: always
    */