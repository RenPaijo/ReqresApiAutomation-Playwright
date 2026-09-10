import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import * as helper from './base-api-helper.ts';

Given('I have a valid update user endpoint', async function () {
    console.log('[READY] Endpoint ready for PUT /users');
});

When('I prepare updated data for user', function (this: helper.ApiWorld) {
    this.currentData = helper.generatePatchData();
});

When('I make a PUT request to update user with ID {string}', async function (this: helper.ApiWorld, userId: string) {
    this.testResponse = await helper.sendAPIRequest('PUT', `/users/${userId}`, this.currentData);
});

Then('the response status should be updated successfully', function (this: helper.ApiWorld) {
    expect(this.testResponse?.status).to.equal(200);
});

Then('the updated user should reflect the new changes', function (this: helper.ApiWorld) {
    expect(this.testResponse?.data).to.have.property('updatedAt');
});

Then('the updated user should contain {string}', function (this: helper.ApiWorld, property: string) {
    expect(this.testResponse?.data).to.have.property(property);
});
