module.exports = {
    signupSchema: {
        body: {
            type: 'object',
            required: ['mail', 'password', 'name'],
            properties: {
                mail: { type: 'string' },
                password: { type: 'string' },
                name: { type: 'string' }
            }
        }
    },
    loginSchema: {
        body: {
            type: 'object',
            required: ['mail', 'password'],
            properties: {
                mail: { type: 'string' },
                password: { type: 'string' }
            }
        }
    }
};