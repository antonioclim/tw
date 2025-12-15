const path = require('path');
const express = require('express');
const { spawn } = require('child_process');
const kill = require('tree-kill');

const DASHBOARD_PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const ROOT = path.resolve(__dirname, '..');

// NOTE (Windows): depending on Node.js / npm installation details, spawning
// npm via "npm.cmd" can fail with `spawn EINVAL`.
// Running through the system shell is more robust on lab machines.
const IS_WIN = process.platform === 'win32';
const npmCmd = 'npm';

const TARGETS = {
  step1: {
    label: 'Step 1 – React Router',
    cwd: path.join(ROOT, 'steps', 'step1_router'),
    port: 3001,
    kind: 'react'
  },
  step2: {
    label: 'Step 2 – useReducer',
    cwd: path.join(ROOT, 'steps', 'step2_useReducer'),
    port: 3002,
    kind: 'react'
  },
  step3: {
    label: 'Step 3 – Redux (sync)',
    cwd: path.join(ROOT, 'steps', 'step3_redux'),
    port: 3003,
    kind: 'react'
  },
  step4: {
    label: 'Step 4 – Redux (async)',
    cwd: path.join(ROOT, 'steps', 'step4_redux_async'),
    port: 3004,
    kind: 'react'
  },
  tool: {
    label: 'Tool – API Playground (Postman Lite)',
    cwd: path.join(ROOT, 'steps', 'tool_postman_lite'),
    port: 3005,
    kind: 'react'
  },
  api: {
    label: 'Notes API (for Step 4)',
    cwd: path.join(ROOT, 'servers', 'notes-api'),
    port: 8080,
    kind: 'node'
  }
};

const processes = {}; // { targetId: ChildProcess }

function isRunning(targetId) {
  return Boolean(processes[targetId] && processes[targetId].pid);
}

async function startTarget(targetId) {
  const target = TARGETS[targetId];
  if (!target) throw new Error(`Unknown target: ${targetId}`);
  if (isRunning(targetId)) return { alreadyRunning: true };

  const env = { ...process.env };

  // Common behaviour: do not auto-open browsers for step apps.
  env.BROWSER = env.BROWSER || 'none';

  // Assign ports explicitly (avoids interactive prompts).
  env.PORT = String(target.port);

  // For CRA, keep CI false (otherwise warnings may fail builds).
  env.CI = env.CI || 'false';

  const args = ['start'];

  return await new Promise((resolve, reject) => {
    let child;
    try {
      child = spawn(npmCmd, args, {
        cwd: target.cwd,
        env,
        stdio: 'inherit',
        shell: IS_WIN,
        windowsHide: false
      });
    } catch (err) {
      return reject(err);
    }

    // If spawning fails, Node may either throw synchronously (caught above)
    // or emit an `error` event (handled here).
    child.once('error', (err) => {
      console.error(`[dashboard] spawn error for ${targetId}:`, err);
      if (processes[targetId] === child) delete processes[targetId];
      reject(err);
    });

    // Start tracking only after the process successfully spawns.
    child.once('spawn', () => {
      processes[targetId] = child;
      resolve({ started: true, pid: child.pid });
    });

    child.on('exit', (code, signal) => {
      console.log(`[dashboard] ${targetId} exited (code=${code}, signal=${signal})`);
      if (processes[targetId] === child) delete processes[targetId];
    });
  });
}

function stopTarget(targetId) {
  const target = TARGETS[targetId];
  if (!target) throw new Error(`Unknown target: ${targetId}`);

  const child = processes[targetId];
  if (!child) return { alreadyStopped: true };

  const pid = child.pid;

  return new Promise((resolve) => {
    kill(pid, 'SIGTERM', (err) => {
      if (err) {
        // On Windows, SIGTERM may fail for some process trees; try forceful kill.
        kill(pid, 'SIGKILL', () => resolve({ stopped: false, error: String(err) }));
      } else {
        resolve({ stopped: true });
      }
    });
  });
}

const app = express();
app.use(express.json());

// Static UI
app.use('/', express.static(path.join(__dirname, 'public')));

// Expose resources (subtitles, docx, etc.)
app.use('/resources', express.static(path.join(ROOT, 'resources')));

// API
app.get('/api/status', (req, res) => {
  const status = {};
  for (const [id, t] of Object.entries(TARGETS)) {
    status[id] = {
      label: t.label,
      port: t.port,
      url: id === 'api' ? `http://localhost:${t.port}` : `http://localhost:${t.port}`,
      running: isRunning(id)
    };
  }
  res.json(status);
});

app.post('/api/start/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await startTarget(id);
    res.json({ ok: true, id, ...result });
  } catch (e) {
    res.status(400).json({ ok: false, error: String(e) });
  }
});

app.post('/api/stop/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await stopTarget(id);
    res.json({ ok: true, id, ...result });
  } catch (e) {
    res.status(400).json({ ok: false, error: String(e) });
  }
});

app.get('/api/targets', (req, res) => {
  res.json(TARGETS);
});

app.listen(DASHBOARD_PORT, () => {
  console.log(`[dashboard] running at http://localhost:${DASHBOARD_PORT}`);
  console.log(`[dashboard] root: ${ROOT}`);
});
