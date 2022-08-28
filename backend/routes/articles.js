const { addArticleSchema } = require('@schemas/articles');
const moment = require('moment')
const { v4: uuidv4 } = require('uuid');
const { createTopicsUser } = require('./topics');

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
    let articleListWithoutText = articleUser.articles.map(article => {
      delete article.text
      return article
    })
    reply.code(200).send({ status: "success", articles: articleListWithoutText })
  })

  fastify.get('/api/articles/:id', { preValidation: [fastify.authentication] }, async (req, reply) => {
    const mail = req.user.mail;
    const articleUser = await fastify.mongo.db.collection('articles').findOne({ owner: mail });
    if (!articleUser) {
      await createArticleUser(mail)
      reply.code(404).send({ status: "error" })
      return;
    }
    const article = articleUser.articles.find(article => article.id === req.params.id)
    if (!article) {
      reply.code(404).send({ status: "error" })
      return;
    }
    reply.code(200).send({ status: "success", article })
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
    const topicsUser = await fastify.mongo.db.collection('topics').findOne({ owner: mail })
    if (!topicsUser) {
      createTopicsUser(mail)
      reply.code(400).send({ status: "error", message: "You can't save text without topics" })
      return;
    }
    const topicsList = topicsUser.topics
    //check if all the topics exist in the topicsList
    const topicsExist = topics.every(topic => topicsList.find(t => t.name === topic))
    if (!topicsExist) {
      reply.code(400).send({ status: "error", message: "You can't save text with topics that don't exist" })
      return;
    }
    let updatePromises = topics.map((topic) => {
      return fastify.mongo.db.collection('topics').updateOne(
        { owner: mail, "topics.name": topic },
        { $inc: { "topics.$.counter": 1 } })
    })

    await Promise.all(updatePromises)
    await fastify.mongo.db.collection('articles').updateOne({ owner: mail }, {
      $set: {
        articles: [...articleUser.articles, {
          id: uuidv4(),
          topics: topics,
          text: text,
          date: date
        }]
      }
    });
    reply.code(200).send({ status: "success", message: "Added the topic" })
  })

}