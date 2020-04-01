module.exports = {
    processors: [],
    plugins: [],
    extends: "stylelint-config-standard", // 这是官方推荐的方式
    rules: {
        "comment-empty-line-before": "never",
        "selector-pseudo-element-colon-notation": ["single", "double"],
        indentation: null,
        "rule-empty-line-before": null,
        "selector-list-comma-newline-after": null,
        "selector-pseudo-class-no-unknown": null,
        "declaration-block-trailing-semicolon": null,
        "function-calc-no-invalid": null,
        "declaration-empty-line-before": null,
    },
};
