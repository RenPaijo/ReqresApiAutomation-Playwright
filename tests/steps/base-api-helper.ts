import { faker } from '@faker-js/faker';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiResponse {
    status: number;
    statusText: string;
    data: unknown;
}

export interface ApiWorld {
    currentData?: unknown;
    testResponse?: ApiResponse;
}

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

export async function sendAPIRequest(method: HttpMethod, endpoint: string, data?: unknown): Promise<ApiResponse> {
    const baseUrl = process.env.API_BASE_URL || 'https://reqres.in/api';
    const url = baseUrl + endpoint;
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    if (process.env.REQRES_API_KEY) {
        headers['x-api-key'] = process.env.REQRES_API_KEY;
    }

    const config: RequestInit = {
        method,
        headers
    };
    if (data !== undefined) {
        config.body = JSON.stringify(data);
    }
    console.log(`[INFO] ${method} ${url}`);
    try {
        const response = await fetch(url, config);
        const contentType = response.headers.get('content-type') || '';
        let responseData: unknown;
        if (contentType.includes('application/json')) {
            responseData = await response.json();
        } else {
            responseData = await response.text();
        }
        console.log(`Status: ${response.status}`);
        return {
            status: response.status,
            statusText: response.statusText,
            data: responseData
        };
    } catch (error) {
        console.error('Error:', error instanceof Error ? error.message : String(error));
        throw error;
    }
}
