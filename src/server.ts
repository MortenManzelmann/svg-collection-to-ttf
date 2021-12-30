import GlyphApiController from "./controller/api/glyph.api.controller";
import FontApiController from "./controller/api/font.api.controller";
import App from "./app";

const app = new App([new GlyphApiController(), new FontApiController()], 5000);

app.listen();
