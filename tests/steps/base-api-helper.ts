import chai from 'chai';
import { faker } from '@faker-js/faker';

export const expect = chai.expect;

export function generateUserData() {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 8 }),
        name: faker.person.firstName() + ' ' + faker.person.lastName()
    };
}

export function generatePatchData() {
    return {
        name: 'Updated ' + faker.person.firstName(),
        job: faker.person.jobTitle()
    };
}

export async function sendAPIRequest(method, endpoint, data) {
    data = data || null;
    const baseUrl = process.env.API_BASE_URL || 'https://reqres.in/api';
    const url = baseUrl + endpoint;
    const config = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    if (data) {
        config.body = JSON.stringify(data);
    }
    console.log(`[INFO] ${method} ${url}`);
    try {
        const response = await fetch(url, config);
        const contentType = response.headers.get('content-type') || '';
        let jsonData;
        if (contentType.includes('application/json')) {
            jsonData = await response.json();
        } else {
            jsonData = await response.text();
        }
        console.log(`Status: ${response.status}`);
        return {
            status: response.status,
            statusText: response.statusText,
            data: jsonData
        };
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}