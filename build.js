var rollup = require("rollup");
var babel = require("rollup-plugin-babel");

rollup.rollup({
  input: "index.js",
  plugins: [ babel() ]
}).then(function (bundle) {
  bundle.write({
    format: "umd",
    name: "react-bangle",
    output: {
        dir: 'dist'
    }
  });
});