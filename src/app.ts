import { envs } from './config/envs';
import { Server } from './presentation/server';

(() => {


  main();

})();


function main () {
  console.log('main');

  const server = new Server({
    port: envs.port,
    publicPath: envs.publicPath,
  });

  server.start();

}