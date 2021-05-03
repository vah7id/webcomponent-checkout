import serve from 'rollup-plugin-serve';

export default [{
    input: 'app.js',
    output: {dir: 'dist/lib', format: 'esm'},
    plugins: [
        serve({"port": "3000", "contentBase": "", "open": true})
    ]
}]