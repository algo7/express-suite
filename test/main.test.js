/**
 * @jest-environment node
 */
const { server, } = require('./server');
const axios = require('axios').default;


describe('Testing the Check Route Module', () => {

    test('Sending Request to Existing Route', () => {

        expect.assertions(1);
        return axios.get('http://localhost:5003/')
            .then(data => {
                const redirectCount = data.request._redirectable._redirectCount;
                expect(redirectCount).toBe(0);
            });

    });

    test('Sending Request to Non-Existing Route', () => {

        expect.assertions(1);
        return axios.get('http://localhost:5003/redirect')
            .then(data => {
                const redirectCount = data.request._redirectable._redirectCount;
                expect(redirectCount).toBeGreaterThanOrEqual(1);
            })
            .catch(err => {
                expect(err.response.status).toBeTruthy();
            });
    });


});


afterAll(() => {
    server.close();
});
