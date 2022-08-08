/// Jest Mock Modules

/// mocking react-native-reanimated
require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests();
// jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
global.console = {
	...console,
	// log: jest.fn(),
	debug: jest.fn(),
	warn: jest.fn(),
	error: jest.fn(),
};
global.__reanimatedWorkletInit = jest.fn();
