module.exports = {
    body: {
        type: 'object',
        required: ['mail', 'password', 'name'],
        properties: {
            mail: { type: 'string' },
            password: { type: 'string' },
            name: { type: 'string' }
        }
    }
};