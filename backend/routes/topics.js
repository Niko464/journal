const { addTopicSchema } = require('@schemas/topics');

module.exports = function (fastify) {

  async function createTopicsUser(mail) {
    return await fastify.mongo.db.collection('topics').insertOne(
      {
        owner: mail,
        topics: []
      }
    )
  }

  fastify.get('/api/topics', { preValidation: [fastify.authentication] }, async (req, reply) => {
    const mail = req.user.mail;
    const topicsUser = await fastify.mongo.db.collection('topics').findOne({ owner: mail });
    if (!topicsUser) {
      await createTopicsUser(mail)
      reply.code(200).send({ status: "success", topics: [] })
      return;
    }
    reply.code(200).send({ status: "success", topics: topicsUser.topics })
  })

  fastify.post('/api/topics', { preValidation: [fastify.authentication], addTopicSchema }, async (req, reply) => {
    const mail = req.user.mail;
    let topicsUser = await fastify.mongo.db.collection('topics').findOne({ owner: mail });
    if (!topicsUser) {
      await createTopicsUser(mail);
      topicsUser = await fastify.mongo.db.collection('topics').findOne({ owner: mail });
    }
    const { topicName } = req.body;
    if (topicsUser.topics.find(topic => topic === topicName) != undefined) {
      reply.code(409).send({ status: "conflict", message: "Topic already exists" })
      return;
    }
    await fastify.mongo.db.collection('topics').updateOne({owner: mail}, { $set: {
      topics: [...topicsUser.topics, {name: topicName, counter: 0}]
    }});
    reply.code(200).send({ status: "success", message: "Added the topic" })
  })

}