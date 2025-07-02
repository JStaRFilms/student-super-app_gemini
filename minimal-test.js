// Minimal test file to verify Node can run tests
const test = (name, fn) => {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (error) {
    console.error(`✕ ${name}`);
    console.error(error);
  }
};

const expect = (actual) => ({
  toBe(expected) {
    if (actual !== expected) {
      throw new Error(`Expected ${expected} but got ${actual}`);
    }
  },
});

// Run a simple test
test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});
