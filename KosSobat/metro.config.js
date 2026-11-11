// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Force Metro to use CJS version of lucide-react-native instead of ESM
// This fixes "Unable to resolve module ./icons/xxx.mjs" error
config.resolver.unstable_enablePackageExports = false;

module.exports = config;

