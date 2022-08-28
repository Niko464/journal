const { addTopicSchema } = require('@schemas/topics');

async function createTopicsUser(mail) {
  return await fastify.mongo.db.collection('topics').insertOne(
    {
      owner: mail,
      topics: []
    }
  )
}

module.exports = {
  createTopicsUser: createTopicsUser,
  theModule: (fastify) => {
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
      if (topicsUser.topics.find(topic => topic.name === topicName) != undefined) {
        reply.code(409).send({ status: "conflict", message: "Topic already exists" })
        return;
      }
      await fastify.mongo.db.collection('topics').updateOne({ owner: mail }, {
        $set: {
          topics: [...topicsUser.topics, {
            name: topicName,
            counter: 0,
            favourite: false,
          }]
        }
      });
      reply.code(200).send({ status: "success", message: "Added the topic" })
    })

    fastify.delete('/api/topics/:topicToDel', { preValidation: [fastify.authentication] }, async (req, reply) => {
      const mail = req.user.mail;
      const { topicToDel } = req.params;
      const topicsUser = await fastify.mongo.db.collection('topics').findOne({ owner: mail });

      if (!topicsUser) {
        reply.code(404).send({ status: "not found", message: "User not found" })
        return;
      }
      if (topicsUser.topics.find(topic => topic.name === topicToDel) == undefined) {
        reply.code(404).send({ status: "not found", message: "Topic not found" })
        return;
      }
      await fastify.mongo.db.collection('topics').updateOne({ owner: mail }, {
        $set: {
          topics: topicsUser.topics.filter(topic => topic.name !== topicToDel)
        }
      });
      reply.code(200).send({ status: "success", message: "Deleted the topic" });
    })
  }
}

/*module.exports = function (fastify) {

  
}*/