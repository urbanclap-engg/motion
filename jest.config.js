module.exports = {
	preset: 'react-native',
	cacheDirectory: '.jest/cache',
	moduleFileExtensions: [
		'tsx',
		'ts',
		'jsx',
		'js',
		'json',
		'node',
	],
	verbose: true,
	transformIgnorePatterns: [
		'node_modules/(?!(jest-)?@?react-native|react-navigation|lodash-es)',
	],
	testPathIgnorePatterns: ['<rootDir>/lib/', '<rootDir>/node_modules/'],
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
	moduleDirectories: ['node_modules', 'src'],
	setupFiles: ['<rootDir>/jest-setup.js'],
	collectCoverage: true,
	coverageReporters: ['json', 'html', "text", "text-summary", "json-summary", "clover", "lcov"],
	collectCoverageFrom: [
		"src/**/*.{js,jsx,ts,tsx}",
		"!src/**/__test__/**/*.{js,jsx,ts,tsx}",
		"!src/**/index.{js,ts}",
		"!src/**/types.{js,ts}",
	],
	setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
	coverageProvider: "v8"
};
