/**
 * @jest-environment node
 */

const { server, } = require('./server');
const axios = require('axios').default;

describe('Testing the Check Route Module', () => {

    test('Sending Request to Existing Route', () => {

        expect.assertions(1);
        return axios.get('http://localhost:5003/', {
            data: {
                testField: 'test_data',
            },
        })
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

describe('Testing the Input Validation Module', () => {

    const request = {
        method: '',
        url: 'http://localhost:5003/',
        data: {
            testField: 'test_data',
        },
    };

    const optRequest = {
        method: 'OPTIONS',
        url: 'http://localhost:5003/',
    };

    test('Sending OPTIONS Request', () => {

        expect.assertions(1);
        return axios(optRequest)
            .then(data => {
                const stCode = data.status;
                expect(stCode).toBe(200);
            });

    });

    test('Sending GET Request', () => {

        request.method = 'GET';
        expect.assertions(1);
        return axios(request)
            .then(data => {
                const resBd = data.data.msg;
                expect(resBd).toBe('test_data');
            });
    });

    test('Sending Empty GET Request', () => {

        request.method = 'GET';
        request.data = '';
        expect.assertions(1);
        return axios(request)
            .catch(err => {
                const errMsg = err.response.data.msg;
                expect(errMsg).toBe('Some fields are missing!');
            });
    });

    test('Sending POST Request', () => {

        request.method = 'POST';
        request.data = {
            testField: 'test_data',
        };
        expect.assertions(1);
        return axios(request)
            .then(data => {
                const resBd = data.data.msg;
                expect(resBd).toBe('test_data');
            });
    });

    test('Sending Empty POST Request', () => {
        request.method = 'POST';
        request.data = '';
        expect.assertions(1);
        return axios(request)
            .catch(err => {
                const errMsg = err.response.data.msg;
                expect(errMsg).toBe('Some fields are missing!');
            });
    });

});


afterAll(() => {
    server.close();
});
