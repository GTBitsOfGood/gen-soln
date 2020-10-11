const IMPORT_ORDER_CONFIG = {
  groups: ["builtin", "external", "internal"],
  pathGroups: [
    {
      pattern: "react",
      group: "external",
      position: "before"
    },
    {
      pattern: "components/**",
      group: "internal"
    },
    {
      pattern: "@core/**",
      group: "internal"
    },
    {
      pattern: "config",
      group: "internal"
    },
    {
      pattern: "requests/**",
      group: "internal"
    },
    {
      pattern: "server/**",
      group: "internal"
    },

    {
      pattern: "utils/**",
      group: "internal"
    }
  ],
  pathGroupsExcludedImportTypes: ["react"],
  "newlines-between": "always",
  alphabetize: {
    order: "asc",
    caseInsensitive: true
  }
};

const SHARED_RULES = {
  "no-return-await": "error",
  "react/prop-types": "off",
  "react/display-name": "off",
  "import/no-unresolved": "off",
  "import/order": ["warn", IMPORT_ORDER_CONFIG]
};

const SHARED_EXTENDS = [
  "eslint:recommended",
  "plugin:react/recommended",
  "plugin:react-hooks/recommended",
  "plugin:jsx-a11y/recommended",
  "plugin:import/errors",
  "plugin:import/warnings",
  "plugin:prettier/recommended"
];

module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  parser: "babel-eslint",
  extends: SHARED_EXTENDS,
  rules: SHARED_RULES,
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json"
      },
      plugins: ["@typescript-eslint"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:import/typescript",
        "prettier/@typescript-eslint",
        ...SHARED_EXTENDS
      ],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/ban-ts-ignore": "off",
        "@typescript-eslint/require-await": "warn",
        "@typescript-eslint/ban-ts-comment": [
          "warn",
          {
            "ts-ignore": "allow-with-description"
          }
        ],
        ...SHARED_RULES
      }
    }
  ]
};
