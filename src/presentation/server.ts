import express from 'express';


export class Server {

  private app = express();


  constructor(
    private staticAsset: string,
  ) {}

  async start () {
    

    this.app.use( express.static( this.staticAsset ) );

    this.app.listen( 8080, () => {
      console.log('Server is running on port 8080');
    });

  }

}