// Minimal Jest test runner script
const { runCLI } = require('jest');
const path = require('path');

async function runTest() {
  const projectRoot = __dirname;
  const config = {
    rootDir: projectRoot,
    testMatch: ['**/minimal-test.js'],
    verbose: true,
    testEnvironment: 'node',
    transform: {},
    reporters: [['default', {}]],
  };

  try {
    console.log('Starting test run with config:', JSON.stringify(config, null, 2));
    const { results } = await runCLI(config, [projectRoot]);
    console.log('Test results:', JSON.stringify(results, null, 2));
  } catch (error) {
    console.error('Test run failed:', error);
  }
}

runTest();
