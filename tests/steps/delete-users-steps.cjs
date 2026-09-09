const { Given, When, Then } = require('@cucumber/cucumber');
const chai = require('chai');
const { expect } = chai;
const helper = require('./base-api-helper.cjs');
let testResponse = null;

Given('I have a valid delete user endpoint', async function () {
    console.log('[READY] Endpoint ready for DELETE /users');
});

When('I make a DELETE request to delete user with ID ' + '{string}', async function (userId) {
    testResponse = await helper.sendAPIRequest('DELETE', '/users/' + userId);
});

Then('the response status should be deleted successfully', function () {
    expect(testResponse.status).to.equal(204);
});
