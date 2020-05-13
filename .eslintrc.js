module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "jest": true,

    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "strict": ["error", "global"],
        "quotes": ["error", "single", "avoid-escape"],
        "semi": ["error", "always"],
        "comma-dangle": ["error", {
            "arrays": "never",
            "objects": "always",
            "imports": "never",
            "exports": "never",
            "functions": "never"
        }],
        "global-require": "error",
        "handle-callback-err": "error",
        "camelcase": ["error", {
            "properties": "always",
            "ignoreDestructuring": false
        }],
    }
};
