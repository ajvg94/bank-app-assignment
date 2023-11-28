import request from 'supertest';
import { app } from '../src/app'; // Import the app instance

describe('App Configuration', () => {
    it('sets security headers', async () => {
        const response = await request(app).get('/');
        expect(response.headers['x-powered-by']).toBeUndefined();
    });

    it('should handle CORS headers', async () => {
        const response = await request(app).options('/');
        expect(response.headers['access-control-allow-credentials']).toBe('true');
        expect(response.headers['access-control-allow-methods']).toBe('GET,POST');
    });
});