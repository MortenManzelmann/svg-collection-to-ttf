import GlyphApiController from "./controller/api/glyph.api.controller";
import App from "./app";

const app = new App([new GlyphApiController()], 5000);

app.listen();
