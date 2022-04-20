module.exports = {
    addTopicSchema: {
        body: {
            type: 'object',
            required: ['topicName'],
            properties: {
                topicName: { type: 'string' }
            }
        }
    },
};