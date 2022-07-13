module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "settings": {
        "import/resolver": {
            "typescript": {}
        }
    },
    rules: {
		'@uc/uc/file-name': 'off',
		'@uc/uc/case': 'off',
		'object-curly-spacing': 'off',
		'no-console': 'off',
		'comma-spacing': 'off',
		'quote-props': 'off',
		'key-spacing': 'off',
		'@typescript-eslint/semi': 'off',
		'react/function-component-definition': 'off',
        "react/jsx-filename-extension": ["warn", { "extensions": [".tsx",] }],
		'@typescript-eslint/ban-ts-comment': 'off',
		'react/jsx-no-useless-fragment': 'off',
		// Below Rules will sonn be moved to error severity
		'@typescript-eslint/ban-types': 'warn',
		'react/no-unused-class-component-methods': 'warn',
		'eqeqeq': 'warn',
		'default-param-last': 'warn',
		'react/jsx-no-constructed-context-values': 'warn',
		'camelcase': 'warn',
		'react/no-unstable-nested-components': 'warn',
		'react/destructuring-assignment': 'warn',
		'react/require-default-props': 'warn',
		'react/no-unused-prop-types': 'warn',
		'no-param-reassign': 'warn',
		'@typescript-eslint/no-empty-function': 'warn',
		'no-restricted-syntax': 'warn',
		'prefer-promise-reject-errors': 'warn',
		'guard-for-in': 'warn',
		'react/sort-comp': 'warn',
		'react/static-property-placement': 'warn',
		'default-case': 'warn',
		'react/no-array-index-key': 'warn',
		'no-plusplus': 'warn',
		'consistent-return': 'warn',
		'no-return-await': 'warn',
		'class-methods-use-this': 'warn',
		'new-cap': 'warn',
		'@typescript-eslint/no-use-before-define': 'warn',
		'no-self-compare': 'warn',
		'no-bitwise': 'warn',
		'no-case-declarations': 'warn',
		'react/no-unused-state': 'warn',
		'no-empty-pattern': 'warn',
		'react/no-access-state-in-setstate': 'warn',
		'array-callback-return': 'warn',
		'no-await-in-loop': 'warn',
		'no-prototype-builtins': 'warn',
		'@uc/uc/no-class': 'off',
		'lines-between-class-members': ['warn', 'always', { 'exceptAfterSingleLine': true }]
	},
};
