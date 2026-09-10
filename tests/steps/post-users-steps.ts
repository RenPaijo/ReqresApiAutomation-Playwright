import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import * as helper from './base-api-helper.ts';

Given('I have a valid create user endpoint', async function () {
    console.log('[READY] Endpoint ready for POST /users');
});

When('I add a user with random data', function (this: helper.ApiWorld) {
    this.currentData = helper.generateUserData();
});

When('I make a POST request to create user', async function (this: helper.ApiWorld) {
    this.testResponse = await helper.sendAPIRequest('POST', '/users', this.currentData);
});

Then('the response status should be created successfully', function (this: helper.ApiWorld) {
    expect(this.testResponse?.status).to.equal(201);
});

Then('the created user should contain {string}', function (this: helper.ApiWorld, property: string) {
    expect(this.testResponse?.data).to.have.property(property);
});
