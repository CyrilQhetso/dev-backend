// Testing API locally
const { error } = require('console');
const http = require('http');
const { hostname } = require('os');

const testData = {
    data: "example"
};

const postData = JSON.stringify(testData);

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/sort-string',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
};

console.log('Testing API locally...');
console.log('Input:', testData.data);

const req = http.request(options, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    console.log('Response Headers:', res.headers);

    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const response = JSON.parse(data);
            console.log('Response Body:', response);

            // validate the response
            if (response.word && Array.isArray(response.word)) {
                console.log('Test passed: API is working correctly.');
                console.log('Sorted characters:', response.word.join(''));
            } else {
                console.error('Test failed: Invalid response format.');
            }
        } catch (error) {
            console.error('Test failed: Error parsing response body.', error);
            console.error('Response Body:', data);
        }
    });
});

req.on('error', (error) => {
    console.error('Test failed: Request error:', error.message);
    console.error('Please ensure the API server is running on http://localhost:3000 , run: npm run dev');
});

req.write(postData);
req.end();