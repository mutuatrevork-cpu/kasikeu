(() => {
  const endpoint = 'https://api.github.com/repos/mutuatrevork-cpu/kasikeu/contents/school-content.json';
  const baseKey = SCHOOL_STORAGE_KEY + '_base';
  const button = document.getElementById('open-publish');
  const status = document.getElementById('publish-status');
  const dialog = document.getElementById('publish-dialog');
  const form = document.getElementById('publish-form');
  const tokenInput = document.getElementById('publish-token');
  const submit = document.getElementById('publish-submit');
  let baseSha;

  const showStatus = text => {
    status.textContent = text;
    status.hidden = false;
  };

  function rememberBase(sha) {
    baseSha = sha;
    try {
      localStorage.setItem(baseKey, sha);
    } catch {
      // The editor can still publish during this session.
    }
  }

  async function loadPublishedVersion() {
    const response = await fetch('/school-content.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Live content is unavailable.');
    const bytes = new Uint8Array(await response.arrayBuffer());
    const prefix = new TextEncoder().encode(`blob ${bytes.length}\0`);
    const blob = new Uint8Array(prefix.length + bytes.length);
    blob.set(prefix);
    blob.set(bytes, prefix.length);
    // GitHub checks this Git blob identifier before replacing the file.
    const digest = new Uint8Array(await crypto.subtle.digest('SHA-1', blob));
    return {
      content: JSON.parse(new TextDecoder().decode(bytes)),
      sha: Array.from(digest, byte => byte.toString(16).padStart(2, '0')).join(''),
    };
  }

  function bytesToBase64(bytes) {
    let binary = '';
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return btoa(binary);
  }

  async function initPublishing() {
    try {
      const published = await loadPublishedVersion();
      let savedBase;
      try {
        savedBase = localStorage.getItem(baseKey);
      } catch {
        // Draft storage may be unavailable.
      }
      if (!initialDraft && !readSchoolDraft()) {
        D = mergeSchoolContent(published.content);
        fillAll();
      }
      rememberBase(initialDraft && /^[a-f\d]{40}$/.test(savedBase || '') ? savedBase : published.sha);
      button.disabled = false;
    } catch {
      showStatus('Could not load the live version. Reload this page to enable publishing.');
    }
  }

  button.addEventListener('click', () => {
    saveAll();
    dialog.showModal();
  });
  document.getElementById('publish-cancel').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => { tokenInput.value = ''; });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (submit.disabled || !baseSha) return;
    const token = tokenInput.value.trim();
    if (!/^github_pat_[A-Za-z0-9_]+$/.test(token)) {
      tokenInput.setCustomValidity('Enter a fine-grained GitHub publishing token.');
      tokenInput.reportValidity();
      return;
    }
    tokenInput.value = '';
    saveAll();
    submit.disabled = true;
    button.disabled = true;
    dialog.close();
    showStatus('Sending this draft to GitHub for deployment…');
    try {
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
        redirect: 'error',
        body: JSON.stringify({
          message: 'Publish school website content from admin',
          content: bytesToBase64(new TextEncoder().encode(JSON.stringify(D, null, 2) + '\n')),
          sha: baseSha,
          branch: 'main',
        }),
      });
      if (response.status === 409) {
        showStatus('The live content changed. Export a backup before loading the latest version.');
        const refresh = document.createElement('button');
        refresh.type = 'button';
        refresh.className = 'btn btn-out btn-sm';
        refresh.textContent = 'Load latest published content';
        refresh.addEventListener('click', async () => {
          if (!confirm('Replace this browser draft with the currently deployed content?')) return;
          try {
            const published = await loadPublishedVersion();
            D = mergeSchoolContent(published.content);
            fillAll();
            persist();
            rememberBase(published.sha);
            showStatus('Latest deployed content loaded. You can apply your edits again.');
          } catch {
            showStatus('Could not load the latest content. Your draft is still available.');
          }
        });
        status.append(' ', refresh);
      } else if ([401, 403, 404].includes(response.status)) {
        showStatus('GitHub denied access. Check the token, repository selection, and Contents write permission.');
      } else if (!response.ok) {
        showStatus(`GitHub did not accept the update (HTTP ${response.status}). Your draft is still available.`);
      } else {
        const update = await response.json();
        rememberBase(update.content.sha);
        showStatus('Submitted to GitHub. The update goes live when Vercel deploys it.');
        const commit = document.createElement('a');
        commit.href = 'https://github.com/mutuatrevork-cpu/kasikeu/commit/' + encodeURIComponent(update.commit.sha);
        commit.textContent = 'View commit';
        commit.target = '_blank';
        commit.rel = 'noopener';
        status.append(' ', commit);
      }
    } catch {
      showStatus('Could not confirm the publish result. Check the repository before retrying. Your draft is still available.');
    } finally {
      submit.disabled = false;
      button.disabled = false;
    }
  });

  tokenInput.addEventListener('input', () => tokenInput.setCustomValidity(''));
  initPublishing();
})();
