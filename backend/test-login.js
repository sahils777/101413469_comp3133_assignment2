const fetch = require('node-fetch');

fetch('http://localhost:5000/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `mutation Signup($username: String!, $email: String!, $password: String!) {
      signup(username: $username, email: $email, password: $password)
    }`,
    variables: {
      username: 'yoyo',
      email: 'paji@gmail.com',
      password: '12345678'
    }
  })
})
  .then(res => res.json())
  .then(data => {
    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
    } else {
      console.log('Signup successful:', data.data.signup);  // The result should be a string message
    }
  })
  .catch(console.error);
