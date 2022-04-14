const { signupSchema, loginSchema } = require('@schemas/auth');
const crypto = require('crypto')

module.exports = function (fastify) {

    fastify.post('/api/auth/signup', { signupSchema }, async (req, reply) => {
        const { mail, password, name } = req.body;
        if (mail === undefined || password === undefined || name === undefined) {
            reply.code(400).send({ status: 'error', message: 'Missing parameters' });
            return
        }
        const user = await fastify.mongo.db.collection('users').findOne({ mail });
        if (user) {
            reply.code(409).send({status: 'conflict', message: 'Mail already exists'});
            return
        }
        const hashedPW = crypto.createHash('md5').update(password).digest('hex');
        const jwt = fastify.jwt.sign({ mail }, {expiresIn: '48h'});
        await fastify.mongo.db.collection('users').insertOne({ mail, password: hashedPW, name, jwt });
        reply.send({ status: 'success', message: 'User created', jwt });
    })

    fastify.post('/api/auth/login', { loginSchema }, async (req, reply) => {
        const { mail, password } = req.body;
        if (mail === undefined || password === undefined) {
            reply.code(400).send({ status: 'error', message: 'Missing parameters' });
            return
        }
        const user = await fastify.mongo.db.collection('users').findOne({ mail });
        if (!user) {
            reply.code(401).send({status: 'unauthorized', message: 'Wrong credentials'});
            return
        }
        const hashedPW = crypto.createHash('md5').update(password).digest('hex');
        if (user.password !== hashedPW) {
            reply.code(401).send({status: 'unauthorized', message: 'Wrong credentials'});
            return
        }
        const jwt = fastify.jwt.sign({ mail }, {expiresIn: '48h'});
        await fastify.mongo.db.collection('users').updateOne({ mail }, { $set: { jwt } });
        reply.send({ status: 'success', message: 'User logged in', jwt });
    })
}