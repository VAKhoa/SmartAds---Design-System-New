import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const watcher = spawn(process.execPath, ['scripts/site-info.mjs', '--watch'], { stdio: 'inherit' });
const next = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'dev', '--hostname', '127.0.0.1', '--port', '4321'], { stdio: 'inherit' });
next.on('exit', code => { watcher.kill(); process.exit(code ?? 0); });
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => { watcher.kill(); next.kill(); });
