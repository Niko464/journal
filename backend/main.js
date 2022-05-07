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

    await fastify.register(require('fastify-mongodb'), {
        forceClose: true,
        url: "mongodb://database:" + process.env.MONGODB_PORT + "/journal"
    });
    console.log("Connected to MongoDB")
    done();
}));
fastify.register(require('fastify-cors'), {
    origin: process.env.ORIGIN
});
fastify.register(require('fastify-jwt'), {
    secret: process.env.JWT_SECRET
});

fastify.decorate('authentication', async (req, res) => {
    try {
        await req.jwtVerify();
    } catch (e) {
        switch (e.message) {
            case 'Authorization token expired':
                const user = await fastify.mongo.db.collection('users').findOne({ token: req.headers.authorization.substring(7, req.headers.authorization.length) });
                const mail = user.mail;
                const token = fastify.jwt.sign({ mail }, { expiresIn: '72h' });
                await fastify.mongo.db.collection('users').updateOne(user, { $set: { token } });
                res.code(401).send({ token });
                break;
            default:
                res.code(403).header('Content-Type', 'application/json').send({ status: 'Forbidden' });
                break;
        }
    }
});

require('module-alias/register');
require('@routes/auth')(fastify);
require('@routes/topics')(fastify);
require('@routes/articles')(fastify);

try {
    fastify.listen(process.env.API_PORT, '0.0.0.0');
    console.log(`Listening on 0.0.0.0 ${process.env.API_PORT}`);
} catch (err) {
    console.log(err);
    console.log("Server stopped");
    process.exit(84);
}

/*

    */