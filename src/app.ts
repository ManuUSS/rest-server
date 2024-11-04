import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

(() => {


  main();

})();


function main () {
  console.log('main');

  const server = new Server({
    port: envs.port,
    routes: AppRoutes.routes,
    publicPath: envs.publicPath,
  });

  server.start();

}