import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';

const port = Number(process.env.PORT || 3000);

const sampleFeed = [
  {
    id: 'post-1',
    creatorId: 'creator-1',
    creatorName: 'Luna',
    mediaType: 'video',
    mediaUrl: 'https://cdn.example.com/video-1.mp4',
    caption: 'Новый ролик дня',
    visibility: 'public'
  },
  {
    id: 'post-2',
    creatorId: 'creator-2',
    creatorName: 'Mira',
    mediaType: 'photo',
    mediaUrl: 'https://cdn.example.com/photo-2.jpg',
    caption: 'Платный пост',
    visibility: 'ppv',
    ppvPrice: 5
  }
];

function sendJson(res, code, payload) {
  res.writeHead(code, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization'
  });
  res.end(JSON.stringify(payload));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host}`);

  if (req.method === 'OPTIONS') {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (req.method === 'GET' && url.pathname === '/healthz') {
    sendJson(res, 200, { status: 'ok' });
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/v1/auth/telegram') {
    const body = await readJson(req);
    sendJson(res, 200, {
      accessToken: `access-${randomUUID()}`,
      refreshToken: `refresh-${randomUUID()}`,
      user: {
        id: randomUUID(),
        telegramId: body.telegramId || 'demo-telegram-id',
        username: body.username || 'demo_user',
        role: 'user'
      }
    });
    return;
  }

  if (req.method === 'GET' && url.pathname === '/api/v1/feed') {
    sendJson(res, 200, { items: sampleFeed, nextCursor: null });
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/v1/subscriptions') {
    sendJson(res, 201, { subscriptionId: randomUUID(), status: 'active' });
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/v1/unlocks') {
    sendJson(res, 201, { unlockId: randomUUID(), accessGranted: true });
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/v1/donations') {
    sendJson(res, 201, { donationId: randomUUID(), status: 'succeeded' });
    return;
  }

  if (req.method === 'GET' && url.pathname === '/api/v1/me/following') {
    sendJson(res, 200, { items: [{ creatorId: 'creator-1', name: 'Luna' }] });
    return;
  }

  if (req.method === 'GET' && url.pathname === '/api/v1/me/subscribers') {
    sendJson(res, 200, { items: [{ userId: 'user-10', name: 'Follower' }] });
    return;
  }

  sendJson(res, 404, { error: 'Not found' });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`API listening on http://0.0.0.0:${port}`);
});
