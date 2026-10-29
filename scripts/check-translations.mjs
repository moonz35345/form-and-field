import fs from "node:fs";
import ts from "typescript";
const dictionary = ts.createSourceFile(
  "translations.ts",
  fs.readFileSync("src/lib/translations.ts", "utf8"),
  ts.ScriptTarget.Latest,
  true,
);
const declaration = dictionary.statements.find(ts.isVariableStatement)
  .declarationList.declarations[0];
const rows = declaration.initializer.elements.map((row) =>
  row.elements.map((value) => value.text),
);
const keys = new Set();
for (const row of rows) {
  if (row.length !== 4 || row.some((value) => !value?.trim()))
    throw Error("Every translation must include four non-empty languages.");
  if (keys.has(row[0])) throw Error("Duplicate translation: " + row[0]);
  keys.add(row[0]);
}
let checked = 0;
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) {
      walk(path);
      continue;
    }
    if (!path.endsWith(".tsx")) continue;
    const source = ts.createSourceFile(
      path,
      fs.readFileSync(path, "utf8"),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    function visit(node) {
      if (
        ts.isCallExpression(node) &&
        node.expression.getText(source) === "t" &&
        node.arguments.length &&
        ts.isStringLiteral(node.arguments[0])
      ) {
        checked++;
        if (!keys.has(node.arguments[0].text))
          throw Error(
            `Missing translation in ${path}: ${node.arguments[0].text}`,
          );
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
}
walk("src");
console.log(
  `${rows.length} complete four-language entries; ${checked} static translation calls verified.`,
);
