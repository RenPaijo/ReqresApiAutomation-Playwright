import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import * as helper from './base-api-helper.ts';

Given('I have a valid delete user endpoint', async function () {
    console.log('[READY] Endpoint ready for DELETE /users');
});

When('I make a DELETE request to delete user with ID {string}', async function (this: helper.ApiWorld, userId: string) {
    this.testResponse = await helper.sendAPIRequest('DELETE', `/users/${userId}`);
});

Then('the response status should be deleted successfully', function (this: helper.ApiWorld) {
    expect(this.testResponse?.status).to.equal(204);
});
