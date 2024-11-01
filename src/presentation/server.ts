import express from 'express';
import path from 'path';


export class Server {

  private app = express();


  constructor(
    private staticAsset: string,
  ) {}

  async start () {
    

    this.app.use( express.static( this.staticAsset ) );

    this.app.get('*', (req, res) => {
      
      const indexPath = path.join(__dirname + "../../../public/index.html" );
      res.sendFile( indexPath );
      
    });

    this.app.listen( 8080, () => {
      console.log('Server is running on port 8080');
    });

  }

}