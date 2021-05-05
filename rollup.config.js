import serve from 'rollup-plugin-serve';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default [{
    input: './app.js',
    output: {
        file: './build/bundle.min.js',
        format: 'iife',
        name: 'bundle'
    },
    watch: {
        chokidar: {
            usePolling: true
        }
    },
    plugins: [
        serve({"port": "3000", "contentBase": ""}),
        babel({
            exclude: 'node_modules/**'
        }),
        resolve({ browser: true }),
        commonjs()
    ],
    onwarn: function(warning) {
        // Skip certain warnings
    
        // should intercept ... but doesn't in some rollup versions
        if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }
    
        // console.warn everything else
        console.warn( warning.message );
    }
}]