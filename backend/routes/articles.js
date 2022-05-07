const { addArticleSchema } = require('@schemas/articles');
const moment = require('moment')

module.exports = function (fastify) {

  async function createArticleUser(mail) {
    return await fastify.mongo.db.collection('articles').insertOne(
      {
        owner: mail,
        articles: []
      }
    )
  }

  fastify.get('/api/articles', { preValidation: [fastify.authentication] }, async (req, reply) => {
    const mail = req.user.mail;
    const articleUser = await fastify.mongo.db.collection('articles').findOne({ owner: mail });
    if (!articleUser) {
      await createArticleUser(mail)
      reply.code(200).send({ status: "success", articles: [] })
      return;
    }
    reply.code(200).send({ status: "success", articles: articleUser.articles })
  })

  fastify.post('/api/articles', { preValidation: [fastify.authentication], addArticleSchema }, async (req, reply) => {
    const mail = req.user.mail;
    const { topics, text, date } = req.body;
    let articleUser = await fastify.mongo.db.collection('articles').findOne({ owner: mail });
    if (!articleUser) {
      await createArticleUser(mail);
      articleUser = await fastify.mongo.db.collection('articles').findOne({ owner: mail });
    }
    if (topics === undefined || text === undefined) {
      reply.code(400).send({ status: "error", message: "Topics and text are required" })
      return;
    }
    if (topics.length === 0) {
      reply.code(400).send({ status: "error", message: "You must select at least one topic" })
      return;
    }
    if (text === "") {
      reply.code(400).send({ status: "error", message: "You can't save empty text" })
      return;
    }
    if (date === null || date === undefined || date === "") {
      reply.code(400).send({ status: "error", message: "You can't save text without selecting date" })
      return;
    }
    let parsedDate = moment(date)
    if (parsedDate.isValid() === false) {
      reply.code(400).send({ status: "error", message: "You can't save text with invalid date" })
      return;
    }
    await fastify.mongo.db.collection('articles').updateOne({ owner: mail }, {
      $set: {
        articles: [...articleUser.articles, {
          topics: topics,
          text: text,
          date: parsedDate.format("DD-MM-YYYY")
        }]
      }
    });
    reply.code(200).send({ status: "success", message: "Added the topic" })
  })

}