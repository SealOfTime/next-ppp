/* eslint-disable no-unused-vars */
// Rules severity
const Error = 2;
const Warning = 1;
const Off = 0;

module.exports = {
  extends: ['next/core-web-vitals'],
  globals: {
    React: true,
    JSX: true,
  },
  rules: {
    indent: ['error', 2],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/jsx-filename-extension': [
      2,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': [Error, { namedComponents: 'arrow-function' }],
    'react/prop-types': 'off', // IDK, we're using Typescript that should do smth I hope
    'jsx-a11y/label-has-associated-control': ['error', {
      required: {
        some: ['nesting', 'id'],
      },
    }],
    'jsx-a11y/label-has-for': ['error', {
      required: {
        some: ['nesting', 'id'],
      },
    }],
  },
};
