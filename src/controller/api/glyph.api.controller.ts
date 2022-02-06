import {readFile, writeFile} from 'fs';
import { Request, Response, Router } from "express";
import { Controller } from "../../interfaces/controller.interface";

class GlyphApiController implements Controller {
  PATH = "/api/glyph";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.put(this.PATH, this.create);
    this.router.get(this.PATH, this.get)
  }

  private get = (request: Request, response: Response): void => {
    const {unicode} = request.query;
    console.log(request.query);
    readFile(`${process.cwd()}/src/svg/${unicode}.svg`, (err, data) => {
      if (err) {
        console.error(err)
        response.sendStatus(404);
        return;
      }
      response.send(data);
    });

  }

  private create = (request: Request, response: Response): void => {
    const {unicode, svg} = request.body;
    writeFile( `${process.cwd()}/src/svg/${unicode}.svg`, svg, err => {
      if (err) {
        console.error(err)
        return
      }
      response.sendStatus(201);
    });
  };  
} 

export default GlyphApiController;
