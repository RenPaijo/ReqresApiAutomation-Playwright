const { Given, When, Then } = require('@cucumber/cucumber');
const chai = require('chai');
const { expect } = chai;
const helper = require('./base-api-helper.cjs');
let testResponse = null;

Given('I have a valid create user endpoint', async function () {
    console.log('[READY] Endpoint ready for POST /users');
});

When('I add a user with random data', async function () {
    this.userData = helper.generateUserData();
    this.currentData = JSON.stringify(this.userData);
});

When('I make a POST request to create user', async function () {
    const data = this.currentData ? JSON.parse(this.currentData) : null;
    testResponse = await helper.sendAPIRequest('POST', '/users', data);
});

Then('the response status should be created successfully', function () {
    expect(testResponse.status).to.equal(201);
});

Then('the created user should contain ' + '{string}', function (property) {
    expect(testResponse.data).to.have.property(property);
});
