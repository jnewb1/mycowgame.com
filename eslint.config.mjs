export default [
    {
        rules: {
            semi: "error",
            "prefer-const": "error"
        },
        files: ["**/*.js", "**/*.jsx"],
        ignores: ["dist/**"],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            }
        }
    }
];