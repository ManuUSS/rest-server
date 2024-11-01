import http from 'http';

const server = http.createServer(( req, res ) => {

  console.log( req.url );

  // Server Side rendering of HTML
  // res.writeHead( 200, { 'Content-Type': 'text/html' } );
  // res.write('<h1>Hello World</h1>');
  // res.end();

  // JSON Response
  // const data = {
  //   name: 'John Doe',
  //   age: 30,
  //   email: 'jonhdoe@gmail.com'
  // };
  // res.writeHead( 200, { 'Content-Type': 'application/json' } );
  // res.end( JSON.stringify( data ) );

});

server.listen( 8080, () => {
  console.log('Server is running on port 8080');
});

console.log('first line');

