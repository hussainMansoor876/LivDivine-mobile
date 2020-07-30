import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://192.168.43.235:8000',
});

// const client = new ApolloClient({
//     uri: 'https://48p1r2roz4.sse.codesandbox.io',
// });


export default client;