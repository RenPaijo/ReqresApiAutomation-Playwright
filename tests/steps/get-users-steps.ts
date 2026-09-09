import { Given, When, Then } from '@cucumber/cucumber';
import chai, { expect } from 'chai';
import * as helper from './base-api-helper.ts';
let testResponse = null;

Given('I have a valid users endpoint', async function () {
    console.log('[READY] Endpoint ready for users API');
});

When('I make a GET request to users list', async function () {
    testResponse = await helper.sendAPIRequest('GET', '/users?page=1');
});

When('I make a GET request to users by ID ' + '{string}', async function (userId: string) {
    testResponse = await helper.sendAPIRequest('GET', `/users/${userId}`);
});

Then('the response status should be ' + '{int}', function (expectedStatus: number) {
    expect(testResponse.status).to.equal(expectedStatus);
});

Then('the response should contain paginated data', function () {
    expect(testResponse.data).to.have.property('data');
    expect(testResponse.data).to.have.property('total');
});

Then('the response should be of type ' + '{string}', function (type: string) {
    expect(testResponse.data).to.be.a(type);
});

Then('the response data field should be an array', function () {
    expect(testResponse.data.data).to.be.an('array');
});