import { esbuildPlugin } from '@web/dev-server-esbuild';
import { playwrightLauncher } from '@web/test-runner-playwright';

// 1x1 transparent PNG — returned for any /hacsfiles/ image request so tests
// don't generate 404 errors for carrier icons that don't exist in the test server
const TRANSPARENT_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
  'base64',
);

async function serveHacsImages(ctx, next) {
  if (ctx.path.startsWith('/hacsfiles/')) {
    ctx.status = 200;
    ctx.type = 'image/png';
    ctx.body = TRANSPARENT_PNG;
    return;
  }
  await next();
}

async function jsonToEsm(ctx, next) {
  await next();
  if (ctx.path.endsWith('.json') && ctx.status === 200) {
    const raw = ctx.body instanceof Buffer ? ctx.body.toString() : String(ctx.body);
    try {
      const data = JSON.parse(raw);
      const lines = [`export default ${raw};`];
      for (const [key, val] of Object.entries(data)) {
        if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(String(key))) {
          lines.push(`export var ${key} = ${JSON.stringify(val)};`);
        }
      }
      ctx.type = 'text/javascript';
      ctx.body = lines.join('\n');
    } catch {
      // Not valid JSON — leave response unchanged
    }
  }
}

export default {
  files: 'test/**/*.test.ts',
  nodeResolve: {
    // Prefer ESM entrypoints over CJS
    mainFields: ['module', 'browser', 'main'],
    exportConditions: ['import', 'browser', 'require'],
    // Resolve extensionless relative imports (e.g. import './editor' → editor.ts)
    extensions: ['.ts', '.tsx', '.mjs', '.js'],
  },
  middleware: [serveHacsImages, jsonToEsm],
  browsers: [playwrightLauncher({ product: 'chromium' })],
  plugins: [
    esbuildPlugin({
      ts: true,
      tsconfig: './tsconfig.json',
    }),
  ],
};
