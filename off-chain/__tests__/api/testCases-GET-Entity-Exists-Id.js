const {
    validToken,
    invalidToken,
    validEntity,
    invalidEntity,
    validEntityId,
    invalidEntityId,
    validNonExistsEntityId,
    validTimeResponse,
    validTimeResponseUnderLoad,
    numberOfRequests,
} = require('./baseTestCases');

const testCases = [
    // Valid scenarios
    {
        category: 'Positive and Negative Scenarios',
        description: 'should return 200 and swExists true when valid entity, ID, and token are provided',
        method: 'GET',
        url: '/api/{entity}/exists/{id}',
        entity: validEntity,
        id: validEntityId,
        token: validToken,
        expectedStatus: 200,
        expectedBody: { swExists: true },
    },
    // Invalid ID
    {
        category: 'Data Validation',
        description: 'should return 400 when invalid ID is provided',
        method: 'GET',
        url: '/api/{entity}/exists/{id}',
        entity: validEntity,
        id: invalidEntityId,
        token: validToken,
        expectedStatus: 400,
        expectedBody: {},
    },
    // Non Exists ID
    {
        category: 'Positive and Negative Scenarios',
        description: 'should return 200 when Non Exists ID is provided',
        method: 'GET',
        url: '/api/{entity}/exists/{id}',
        entity: validEntity,
        id: validNonExistsEntityId,
        token: validToken,
        expectedStatus: 200,
        expectedBody: { swExists: false },
    },
    // Invalid entity
    {
        category: 'Error Handling',
        description: 'should return 404 when invalid entity is provided',
        method: 'GET',
        url: '/api/{entity}/exists/{id}',
        entity: invalidEntity,
        id: validEntityId,
        token: validToken,
        expectedStatus: 404,
        expectedBody: {},
    },
    // Invalid token
    {
        category: 'Authentication and Authorization',
        description: 'should return 401 when invalid token is provided',
        method: 'GET',
        url: '/api/{entity}/exists/{id}',
        entity: validEntity,
        id: validEntityId,
        token: invalidToken,
        expectedStatus: 401,
        expectedBody: {},
    },
    // Missing entity
    {
        category: 'Data Validation',
        description: 'should return 404 when entity is missing',
        method: 'GET',
        url: '/api/{entity}/exists/{id}',
        entity: '',
        id: validEntityId,
        token: validToken,
        expectedStatus: 404,
        expectedBody: {},
    },
    // Missing ID
    {
        category: 'Data Validation',
        description: 'should return 400 when ID is missing',
        method: 'GET',
        url: '/api/{entity}/exists/{id}',
        entity: validEntity,
        id: '',
        token: validToken,
        expectedStatus: 400,
        expectedBody: {},
    },
    // Missing token
    {
        category: 'Authentication and Authorization',
        description: 'should return 401 when token is missing',
        method: 'GET',
        url: '/api/{entity}/exists/{id}',
        entity: validEntity,
        id: validEntityId,
        token: '',
        expectedStatus: 401,
        expectedBody: {},
    },
    // Valid entity and ID but invalid token
    {
        category: 'Authentication and Authorization',
        description: 'should return 401 when valid entity and ID are provided but token is invalid',
        method: 'GET',
        url: '/api/{entity}/exists/{id}',
        entity: validEntity,
        id: validEntityId,
        token: invalidToken,
        expectedStatus: 401,
        expectedBody: {},
    },
    // Invalid entity and valid ID
    {
        category: 'Error Handling',
        description: 'should return 404 when invalid entity and valid ID are provided',
        method: 'GET',
        url: '/api/{entity}/exists/{id}',
        entity: invalidEntity,
        id: validEntityId,
        token: validToken,
        expectedStatus: 404,
        expectedBody: {},
    },
    // Valid entity and invalid ID
    {
        category: 'Data Validation',
        description: 'should return 400 when valid entity and invalid ID are provided',
        method: 'GET',
        url: '/api/{entity}/exists/{id}',
        entity: validEntity,
        id: invalidEntityId,
        token: validToken,
        expectedStatus: 400,
        expectedBody: {},
    },
    // Performance testing
    {
        category: 'Performance Testing',
        description: 'should assess response time',
        method: 'GET',
        url: '/api/{entity}/exists/{id}',
        entity: validEntity,
        id: validEntityId,
        token: validToken,
        expectedStatus: 200,
        expectedBody: { swExists: true },
        maxTimeResponse: validTimeResponse,
    },
    // Performance testing under load
    {
        category: 'Performance Testing',
        description: 'should assess response times under load',
        method: 'GET',
        url: '/api/{entity}/exists/{id}',
        entity: validEntity,
        id: validEntityId,
        token: validToken,
        expectedStatus: 200,
        expectedBody: { swExists: true },
        numberOfRequests: numberOfRequests,
        maxTimeResponse: validTimeResponse,
        maxTimeResponseForParallelRequest: validTimeResponseUnderLoad,
    },
    // Security testing - SQL injection
    {
        category: 'Security Testing',
        description: 'should handle SQL injection attempts gracefully',
        method: 'GET',
        url: '/api/{entity}/exists/{id}',
        entity: validEntity,
        id: '1 OR 1=1',
        token: validToken,
        expectedStatus: 400,
        expectedBody: {},
    },
    // Security testing - XSS
    {
        category: 'Security Testing',
        description: 'should handle XSS attempts gracefully',
        method: 'GET',
        url: '/api/{entity}/exists/{id}',
        entity: validEntity,
        id: '<script>alert("XSS")</script>',
        token: validToken,
        expectedStatus: 400,
        expectedBody: {},
    },
];

module.exports = {
    testCases,
};