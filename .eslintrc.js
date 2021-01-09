module.exports = {
    root: true,
    extends: [
        'eslint-config-airbnb-base',
    ],
    env: {
        jest: true,
        node: true,
    },
    rules: {
        // Indent with 4 spaces
        indent: ['error', 4],
    },
};
