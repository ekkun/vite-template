import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'vite';

test('開発サーバーのルートでPugをHTMLとして表示する', async (context) => {
  const server = await createServer({
    configFile: new URL('../vite.config.mjs', import.meta.url).pathname,
    mode: 'watch',
    server: { host: '127.0.0.1', port: 0 },
  });

  context.after(() => server.close());
  await server.listen();

  const address = server.httpServer.address();
  const response = await fetch(`http://127.0.0.1:${address.port}/`);
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /text\/html/);
  assert.match(html, /<title>INDEX \| サンプルウェブサイト<\/title>/);
});
