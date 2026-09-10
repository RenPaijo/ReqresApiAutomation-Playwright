import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import * as helper from './base-api-helper.ts';

function responseData(world: helper.ApiWorld): Record<string, unknown> {
    expect(world.testResponse, 'Expected an API response').to.exist;
    expect(world.testResponse?.data).to.be.an('object');
    return world.testResponse?.data as Record<string, unknown>;
}

Given('I have a valid users endpoint', async function () {
    console.log('[READY] Endpoint ready for users API');
});

When('I make a GET request to users list', async function (this: helper.ApiWorld) {
    this.testResponse = await helper.sendAPIRequest('GET', '/users?page=1');
});

When('I make a GET request to users by ID {string}', async function (this: helper.ApiWorld, userId: string) {
    this.testResponse = await helper.sendAPIRequest('GET', `/users/${userId}`);
});

Then('the response status should be {int}', function (this: helper.ApiWorld, expectedStatus: number) {
    expect(this.testResponse?.status).to.equal(expectedStatus);
});

Then('the response should contain paginated data', function (this: helper.ApiWorld) {
    expect(responseData(this)).to.include.all.keys('data', 'page', 'per_page', 'support', 'total', 'total_pages');
});

Then('the response should contain user data for ID {string}', function (this: helper.ApiWorld, userId: string) {
    const data = responseData(this).data;
    expect(data).to.be.an('object').that.includes({ id: Number(userId) });
    expect(data).to.include.all.keys('email', 'first_name', 'last_name');
});

Then('the response should be of type {string}', function (this: helper.ApiWorld, type: string) {
    expect(this.testResponse?.data).to.be.a(type);
});

Then('the response data field should be an array', function (this: helper.ApiWorld) {
    expect(responseData(this).data).to.be.an('array');
});
