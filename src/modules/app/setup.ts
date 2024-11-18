import path from "node:path";
import nunjucks from "nunjucks";
import pluralize from "pluralize";
import { pascalCase } from "src/utils/pascalCase";

const templatesPath = path.join(__dirname, "templates");
const engine = nunjucks.configure(templatesPath, { autoescape: true });

engine.addFilter("pluralize", pluralize);
engine.addFilter("singularize", pluralize.singular);
engine.addFilter("pascalCase", pascalCase);

export { engine };
