import {execSync} from 'child_process';
import { Request, Response, Router } from "express";
import { Controller } from "../../interfaces/controller.interface";

class FontApiController implements Controller {
  PATH = "/api/font";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.post(this.PATH, this.create);
    this.router.get(this.PATH, this.get)
  }

  private get = (_request: Request, response: Response): void => {
    response.download(`${process.cwd()}/example.ttf`);
  }

  private create = (_request: Request, response: Response): void => {
      execSync('python svgs2ttf.py metadata.json');
      response.download(`${process.cwd()}/example.ttf`);
  };  
} 

export default FontApiController;
