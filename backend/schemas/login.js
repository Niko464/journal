module.exports = {
    body: {
        type: 'object',
        required: ['mail', 'password'],
        properties: {
            mail: { type: 'string' },
            password: { type: 'string' }
        }
    }
}