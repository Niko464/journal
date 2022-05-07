module.exports = {
    addArticleSchema: {
        body: {
            type: 'object',
            required: ['topics', 'text', 'date'],
            properties: {
                text: { type: 'string' },
                topics: { type: 'array', items: { type: 'string' } },
                date: { type: 'string' }
            }
        }
    },
};