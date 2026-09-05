/**
 * Comprehensive Automated API Test Suite
 */
const BASE_URL = 'http://localhost:5000/api';

async function runTests() {
  console.log('🧪 Starting Comprehensive API Automated Test Suite...\n');
  let passed = 0;
  let failed = 0;
  let adminToken = '';

  async function test(name, fn) {
    try {
      await fn();
      console.log(`✅ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`❌ FAIL: ${name} ->`, err.message);
      failed++;
    }
  }

  // 1. Health check
  await test('GET /health returns status healthy and database connected', async () => {
    const res = await fetch(`${BASE_URL}/health`);
    const data = await res.json();
    if (data.status !== 'healthy' || data.database !== 'connected') {
      throw new Error(`Unexpected health payload: ${JSON.stringify(data)}`);
    }
  });

  // 2. Personal Info GET
  await test('GET /personal returns personal profile data', async () => {
    const res = await fetch(`${BASE_URL}/personal`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (!data.success || !data.data || data.data.name !== 'Gurram Ganesh') {
      throw new Error(`Invalid personal info response: ${JSON.stringify(data)}`);
    }
  });

  // 3. Projects GET
  await test('GET /projects returns seeded project array', async () => {
    const res = await fetch(`${BASE_URL}/projects`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (!data.success || !Array.isArray(data.data) || data.data.length === 0) {
      throw new Error(`Invalid projects response: ${JSON.stringify(data)}`);
    }
  });

  // 4. Skills GET
  await test('GET /skills returns skill categories with children', async () => {
    const res = await fetch(`${BASE_URL}/skills`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (!data.success || !Array.isArray(data.data) || data.data.length === 0) {
      throw new Error(`Invalid skills response: ${JSON.stringify(data)}`);
    }
  });

  // 5. Education GET
  await test('GET /education returns education items', async () => {
    const res = await fetch(`${BASE_URL}/education`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (!data.success || !Array.isArray(data.data) || data.data.length === 0) {
      throw new Error(`Invalid education response: ${JSON.stringify(data)}`);
    }
  });

  // 6. Experience GET
  await test('GET /experience returns experience details', async () => {
    const res = await fetch(`${BASE_URL}/experience`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (!data.success || !data.data || !data.data.title) {
      throw new Error(`Invalid experience response: ${JSON.stringify(data)}`);
    }
  });

  // 7. Journey GET
  await test('GET /journey returns journey roadmap steps', async () => {
    const res = await fetch(`${BASE_URL}/journey`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (!data.success || !Array.isArray(data.data) || data.data.length === 0) {
      throw new Error(`Invalid journey response: ${JSON.stringify(data)}`);
    }
  });

  // 8. Visitor GET & Increment
  await test('GET /visitor and POST /visitor/increment', async () => {
    const resGet = await fetch(`${BASE_URL}/visitor`);
    if (!resGet.ok) throw new Error(`Status ${resGet.status}`);
    const dataGet = await resGet.json();

    const resInc = await fetch(`${BASE_URL}/visitor/increment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: 'home' })
    });
    if (!resInc.ok) throw new Error(`Status ${resInc.status}`);
    const dataInc = await resInc.json();

    if (dataInc.visitCount !== dataGet.visitCount + 1) {
      throw new Error(`Expected visit count ${dataGet.visitCount + 1}, got ${dataInc.visitCount}`);
    }
  });

  // 9. Contact Validation Failure
  await test('POST /contact rejects invalid input', async () => {
    const res = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'G', email: 'invalid-email', subject: 'Hi', message: 'short' })
    });
    if (res.status !== 400) throw new Error(`Expected status 400, got ${res.status}`);
  });

  // 10. Contact Submission Success
  await test('POST /contact accepts valid submission', async () => {
    const res = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Visitor',
        email: 'test@example.com',
        subject: 'Inquiry regarding AI Projects',
        message: 'Hello Ganesh, I loved your portfolio and would like to collaborate on an AI project!'
      })
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (!data.success || !data.data.id) {
      throw new Error(`Failed to submit contact: ${JSON.stringify(data)}`);
    }
  });

  // 11. Admin Login & JWT Retrieval
  await test('POST /auth/login authenticates admin user', async () => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        identifier: 'admin',
        password: 'AdminPassword123!'
      })
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (!data.success || !data.token) {
      throw new Error(`Login failed: ${JSON.stringify(data)}`);
    }
    adminToken = data.token;
  });

  // 12. Verified Auth GET /auth/me
  await test('GET /auth/me verifies Bearer token', async () => {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (!data.success || data.user.username !== 'admin') {
      throw new Error(`Get me failed: ${JSON.stringify(data)}`);
    }
  });

  // 13. Authenticated CRUD Test (Project)
  let createdProjId = '';
  await test('POST /projects creates new project with auth token', async () => {
    const res = await fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        title: 'Automated Test Project',
        description: 'Testing CRUD operations via automated test suite',
        category: ['AI', 'Python'],
        technologies: ['TypeScript', 'Express', 'Prisma'],
        githubUrl: 'https://github.com/ganichowdary07',
        liveDemoUrl: 'https://demo.example.com',
        featured: true
      })
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (!data.success || !data.data.id) throw new Error(`Project creation failed: ${JSON.stringify(data)}`);
    createdProjId = data.data.id;
  });

  // 14. Authenticated DELETE Project
  await test('DELETE /projects/:id deletes project with auth token', async () => {
    if (!createdProjId) throw new Error('No project ID to delete');
    const res = await fetch(`${BASE_URL}/projects/${createdProjId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (!data.success) throw new Error(`Project delete failed: ${JSON.stringify(data)}`);
  });

  // 15. 404 handler
  await test('GET /nonexistent returns 404 with JSON error', async () => {
    const res = await fetch(`${BASE_URL}/nonexistent`);
    if (res.status !== 404) throw new Error(`Expected 404, got ${res.status}`);
  });

  console.log(`\n========================================`);
  console.log(`📊 Test Summary: ${passed} passed, ${failed} failed`);
  console.log(`========================================\n`);

  if (failed > 0) process.exit(1);
}

runTests().catch(err => {
  console.error('Fatal error running tests:', err);
  process.exit(1);
});
