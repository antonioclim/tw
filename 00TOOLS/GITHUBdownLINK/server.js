const express = require('express');
const fetch = require('node-fetch');
const JSZip = require('jszip');
const app = express();

// Serve static files from the public folder
app.use(express.static('public'));

function parseGitHubUrl(urlString) {
  try {
    const u = new URL(urlString);
    if (!u.hostname.includes('github.com')) {
      throw new Error('URL trebuie să fie pe domeniul github.com');
    }
    const parts = u.pathname.split('/').filter(Boolean);
    // expected: user, repo, 'tree', ref, ...directory
    if (parts.length < 4 || parts[2] !== 'tree') {
      throw new Error('URL trebuie să fie de forma https://github.com/user/repo/tree/branch/path');
    }
    const [user, repo, , ...rest] = parts;
    const ref = rest[0];
    const directory = rest.slice(1).join('/');
    return { user, repo, ref, directory };
  } catch (e) {
    throw new Error('URL invalid: ' + e.message);
  }
}

async function fetchRepoTree(user, repo, ref, token) {
  const treeUrl = `https://api.github.com/repos/${user}/${repo}/git/trees/${ref}?recursive=1`;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await fetch(treeUrl, { headers });
  if (!response.ok) {
    throw new Error(`Eroare la obținerea arborelui: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return data.tree;
}

async function fetchFileContent(user, repo, ref, filePath, token) {
  const apiUrl = `https://api.github.com/repos/${user}/${repo}/contents/${filePath}?ref=${encodeURIComponent(ref)}`;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await fetch(apiUrl, { headers });
  if (!response.ok) {
    throw new Error(`Eroare la descărcarea fișierului ${filePath}: ${response.status} ${response.statusText}`);
  }
  const fileData = await response.json();
  // Prefer download_url for large files, if available
  let buffer;
  if (fileData.download_url) {
    const rawResp = await fetch(fileData.download_url, { headers });
    if (!rawResp.ok) {
      throw new Error(`Eroare la descărcarea fișierului ${filePath}: ${rawResp.status} ${rawResp.statusText}`);
    }
    buffer = await rawResp.buffer();
  } else if (fileData.content) {
    const content = fileData.content.replace(/\n/g, '');
    buffer = Buffer.from(content, 'base64');
  } else {
    throw new Error(`Fișierul ${filePath} nu conține date`);
  }
  return buffer;
}

app.get('/api/download', async (req, res) => {
  const url = req.query.url;
  const token = req.query.token;
  if (!url) {
    return res.status(400).send('Parametrul url lipsește');
  }
  let info;
  try {
    info = parseGitHubUrl(url);
  } catch (err) {
    return res.status(400).send(err.message);
  }
  const { user, repo, ref, directory } = info;
  try {
    const tree = await fetchRepoTree(user, repo, ref, token);
    // Filter only blobs within the directory
    const prefix = directory ? directory + '/' : '';
    const files = tree.filter(item => item.type === 'blob' && item.path.startsWith(prefix));
    if (files.length === 0) {
      return res.status(404).send('Nu s-au găsit fișiere în directorul specificat');
    }
    const zip = new JSZip();
    for (const file of files) {
      const filePath = file.path;
      try {
        const buffer = await fetchFileContent(user, repo, ref, filePath, token);
        const relativePath = prefix ? filePath.substring(prefix.length) : filePath;
        zip.file(relativePath, buffer);
      } catch (e) {
        console.error('Eroare la fișierul', filePath, e.message);
        // Continuă cu următoarele fișiere
      }
    }
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
    const safeDir = directory ? directory.replace(/\//g, '-') : 'root';
    const fileName = `${user}-${repo}-${ref}-${safeDir}.zip`;
    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename=${fileName}`,
    });
    res.send(zipBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('A apărut o eroare: ' + err.message);
  }
});

// Start server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Serverul rulează la http://localhost:${PORT}`);
});
