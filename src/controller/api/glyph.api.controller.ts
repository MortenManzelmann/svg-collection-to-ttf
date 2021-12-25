import {writeFile} from 'fs';
import {execSync} from 'child_process';
import { Request, Response, Router } from "express";
import { Controller } from "../../interfaces/controller.interface";

class GlyphApiController implements Controller {
  PATH = "/api/glyph";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.post(this.PATH, this.create);
    this.router.get(this.PATH, this.get)
  }

  private get = (request: Request, response: Response): void => {
    execSync('sh execute.sh');
    response.download(`${process.cwd()}/example.ttf`);
  }

  private create = (request: Request, response: Response): void => {
    const {unicode, svg} = request.body;
    writeFile( `${process.cwd()}/src/svg/${unicode}.svg`, svg, err => {
      if (err) {
        console.error(err)
        return
      }
      //file written successfully
      execSync('sh execute.sh');
      response.download(`${process.cwd()}/example.ttf`);
    });
  };  
} 

export default GlyphApiController;
