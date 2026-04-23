import { esbuildPlugin } from '@web/dev-server-esbuild';
import { playwrightLauncher } from '@web/test-runner-playwright';

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
  middleware: [jsonToEsm],
  browsers: [playwrightLauncher({ product: 'chromium' })],
  plugins: [
    esbuildPlugin({
      ts: true,
      tsconfig: './tsconfig.json',
    }),
  ],
};
