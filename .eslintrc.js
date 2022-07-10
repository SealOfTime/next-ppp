module.exports = {
  extends: ['next/core-web-vitals', 'airbnb'],
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
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'react/prop-types': 'off', // IDK, we're using Typescript that should do smth I hope
  },
};
