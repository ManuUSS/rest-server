import http from 'http';
import fs from 'fs';

const server = http.createServer(( req, res ) => {

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

  if(  req.url === '/' ) {
    const htmlFile = fs.readFileSync( './public/index.html', 'utf-8' );
    res.writeHead( 200, { 'Content-Type': 'text/html' } );
    res.end( htmlFile );
    return;
  }

  if( req.url?.endsWith( '.js' ) ) {
    res.writeHead( 200, { 'Content-Type': 'application/javascript' } );
  }

  if( req.url?.endsWith( '.css' ) ) {
    res.writeHead( 200, { 'Content-Type': 'text/css' } );
  }

  const content = fs.readFileSync(`./public${req.url}`, 'utf-8');
  res.end( content );

});

server.listen( 8080, () => {
  console.log('Server is running on port 8080');
});
