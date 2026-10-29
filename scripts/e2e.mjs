import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

// Own the direct Node children: avoids shell process-tree shutdown on Windows.
const port = 3107;
const origin = `http://localhost:${port}`;
let server;
let runner;
let serverExited = false;
const cleanup = () => {
  runner?.kill();
  server?.kill();
};
process.on("SIGINT", () => {
  cleanup();
  process.exit(130);
});
process.on("SIGTERM", () => {
  cleanup();
  process.exit(143);
});
try {
  try {
    await fetch(origin, { signal: AbortSignal.timeout(1000) });
    throw new Error(
      `Port ${port} is already in use. Stop that server before running this suite.`,
    );
  } catch (error) {
    if (error.message.includes("already in use")) throw error;
  }
  server = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "start", "-p", String(port)],
    { stdio: "inherit", windowsHide: true },
  );
  server.once("exit", () => {
    serverExited = true;
  });
  let ready = false;
  for (let attempt = 0; attempt < 120; attempt++) {
    if (serverExited)
      throw new Error(
        "Production test server exited before becoming ready. Run npm run build first.",
      );
    try {
      const response = await fetch(origin, {
        signal: AbortSignal.timeout(1000),
      });
      if (response.ok) {
        ready = true;
        break;
      }
    } catch {}
    await delay(500);
  }
  if (!ready) throw new Error("Production test server did not become ready.");
  runner = spawn(
    process.execPath,
    ["node_modules/@playwright/test/cli.js", "test", ...process.argv.slice(2)],
    {
      stdio: "inherit",
      windowsHide: true,
      env: { ...process.env, PLAYWRIGHT_EXTERNAL_SERVER: "1" },
    },
  );
  const exitCode = await new Promise((resolve, reject) => {
    runner.once("error", reject);
    runner.once("exit", (code) => resolve(code ?? 1));
  });
  process.exitCode = exitCode;
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  cleanup();
}
