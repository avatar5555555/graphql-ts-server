module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      modules: true
    }
  },
  plugins: [
    "@typescript-eslint",
    "prettier",
    "import",
    "promise"
  ],
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".mjs", ".json", ".js", ".ts", ".d.ts"],
      }
    },
  },
  rules: {
    "prettier/prettier": "error",
    "no-dupe-keys": "error",
    "no-unused-vars": ["warn", "all"],
    curly: "error",
    "no-unneeded-ternary": "error",
    "no-nested-ternary": "error",
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "multiline-block-like", next: "*" },
      { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
      { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
      {
        blankLine: "always",
        prev: "*",
        next: ["return", "throw", "try", "while", "do", "if", "switch", "function", "for", "multiline-const"],
      },
      { blankLine: "always", prev: "multiline-const", next: "*" },
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-object-literal-type-assertion": "off",

    // import
    "import/order": [
      "error",
      {
        "newlines-between": "always"
      }
    ],
    "import/newline-after-import": "warn",
    "import/no-anonymous-default-export": "warn",
    "import/no-default-export": "error",

    // prettier
    "prettier/prettier": [
      "error",
      {
        trailingComma: "all",
        singleQuote: false,
        arrowParens: "always",
        parser: "typescript"
      }
    ],

    // promise
    "promise/prefer-await-to-then": "error",
    "promise/prefer-await-to-callbacks": "error",
  },
  // HACK https://github.com/typescript-eslint/typescript-eslint/issues/46
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-unused-vars': [2, { args: 'none' }]
      }
    }
  ]
};
