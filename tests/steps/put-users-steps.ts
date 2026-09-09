import { Given, When, Then } from '@cucumber/cucumber';
import chai, { expect } from 'chai';
import * as helper from './base-api-helper.ts';
let testResponse: any = null;

Given('I have a valid update user endpoint', async function () {
    console.log('[READY] Endpoint ready for PUT /users');
});

When('I prepare updated data for user', async function () {
    this.patchData = helper.generatePatchData();
    this.currentData = JSON.stringify(this.patchData);
});

When('I make a PUT request to update user with ID ' + '{string}', async function (userId) {
    const data = this.currentData ? JSON.parse(this.currentData) : null;
    testResponse = await helper.sendAPIRequest('PUT', `/users/${userId}`, data);
});

Then('the response status should be updated successfully', function () {
    expect(testResponse.status).to.equal(200);
});

Then('the updated user should reflect the new changes', function () {
    expect(testResponse.data.updatedAt).to.exist;
});

Then('the updated user should contain ' + '{string}', function (property: string) {
    expect(testResponse.data).to.have.property(property);
});