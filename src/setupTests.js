// Add additional Jest matchers for RTL
import '@testing-library/jest-dom/extend-expect';

// Polyfill fetch support on Node
import 'cross-fetch/polyfill';

// polyfills for Node.js globals
const { TextDecoder, TextEncoder } = require('node:util');

Object.defineProperties(globalThis, {
    TextDecoder: { value: TextDecoder },
    TextEncoder: { value: TextEncoder },
});
