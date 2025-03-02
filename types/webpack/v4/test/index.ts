import webpack = require('webpack');
import { Tapable } from 'tapable';
import { RawSourceMap } from 'source-map';

const {
    optimize,
} = webpack;

let plugins: webpack.Plugin[];

/**
 * Plugins
 */

/**
 * optimize
 */

const {
    AggressiveMergingPlugin,
} = optimize;

plugins = [
    new AggressiveMergingPlugin(),
    new AggressiveMergingPlugin({}),
    new AggressiveMergingPlugin({
        entryChunkMultiplicator: 10,
        minSizeReduce: 1.5,
        moveToParents: false,
    }),
];

let configuration: webpack.Configuration;
let rule: webpack.Rule;
let plugin: webpack.Plugin;
declare const __dirname: string;

rule = { test: /\.png$/, loader: "url-loader?mimetype=image/png" };

rule = {
    test: /\.png$/,
    loader: "url-loader",
    query: { mimetype: "image/png" }
};

//
// https://webpack.js.org/configuration/entry-context/#dynamic-entry
//

configuration = {
    entry: () => './demo'
};

configuration = {
    entry: () => ['./demo', './demo2']
};

configuration = {
    entry: () => ({
        p1: "./page1",
        p2: "./page2",
        p3: "./page3"
    })
};

configuration = {
    entry: () => new Promise((resolve) => resolve('./demo'))
};

configuration = {
    entry: () => new Promise((resolve) => resolve(['./demo', './demo2']))
};

configuration = {
    entry: () => new Promise((resolve) => resolve({
        p1: "./page1",
        p2: "./page2",
        p3: "./page3"
    }))
};

//
// https://webpack.js.org/configuration/externals/
//
configuration = {
    externals : {
        react: 'react'
    },
};

configuration = {
    externals : {
        lodash : {
            commonjs: 'lodash',
            amd: 'lodash',
            root: '_' // indicates global variable
        }
      },
};

configuration = {
    externals : {
        subtract : {
            root: ['math', 'subtract']
        }
    }
};

configuration = {
    externals: [
        // Disable TSLint for allowing non-arrow functions
        /* tslint:disable-next-line:only-arrow-functions */
        function(context, request, callback) {
            if (/^yourregex$/.test(request)) {
                // Disable TSLint for allowing non-arrow functions
                /* tslint:disable-next-line:no-void-expression */
                return callback(null, 'commonjs ' + request);
            }
            if (request === 'foo') {
                // Disable TSLint for allowing non-arrow functions
                /* tslint:disable-next-line:no-void-expression */
                return callback(null, ['path', 'to', 'external']);
            }
            if (request === 'bar') {
                // Disable TSLint for allowing non-arrow functions
                /* tslint:disable-next-line:no-void-expression */
                return callback(null, {}, 'commonjs');
            }
            if (request === 'baz') {
                // Disable TSLint for allowing non-arrow functions
                /* tslint:disable-next-line:no-void-expression */
                return callback(null, {});
            }

            // Callback can be invoked with an error
            callback('An error');
            callback(new Error('Boom!'));

            // A null error should include external parameters
            // $ExpectError
            callback(null);

            // An error should include no other parameters
            // $ExpectError
            callback('An error', 'externalName');

            // Continue without externalizing the import
            // Disable TSLint for allowing non-arrow functions
            /* tslint:disable-next-line:no-void-expression */
            return callback();
        },
    ],
};

configuration = {
    externals: [
        {
            // String
            react: 'react',
            // Object
            lodash : {
                commonjs: 'lodash',
                amd: 'lodash',
                root: '_' // indicates global variable
            },
            // Array
            subtract: ['./math', 'subtract']
            },
            // Disable TSLint for allowing non-arrow functions
            /* tslint:disable-next-line:only-arrow-functions */
            function(context, request, callback) {
              if (/^yourregex$/.test(request)) {
                // Disable TSLint for bypassing 'no-void-expression' to align with Webpack documentation
                /* tslint:disable-next-line:no-void-expression */
                return callback(null, 'commonjs ' + request);
              }
              callback(null, {});
            },
            // Regex
            /^(jquery|\$)$/i
    ]
};

configuration = {
    externals: [
        "add",
        {
            subtract: {
                root: "subtract",
                commonjs2: "./subtract",
                commonjs: ["./math", "subtract"],
                amd: "subtract"
            }
        }
    ]
};

//
// https://webpack.github.io/docs/optimization.html
//

configuration = {
    entry: {
        p1: "./page1",
        p2: "./page2",
        p3: "./page3"
    },
    output: {
        filename: "[name].entry.chunk.js"
    }
};

configuration = {
    entry: {
        p1: "./page1",
        p2: "./page2",
        p3: "./page3",
        ap1: "./admin/page1",
        ap2: "./admin/page2"
    },
    output: {
        filename: "[name].js"
    },
};

//
// https://webpack.github.io/docs/long-term-caching.html
//

configuration = {
    output: {
        path: path.join(__dirname, "assets", "[hash]"),
        publicPath: "assets/[hash]/",
        filename: "output.[hash].bundle.js",
        chunkFilename: "[id].[hash].bundle.js",
        hashFunction: 'sha256',
        hashDigestLength: 64,
    }
};

configuration = { output: { chunkFilename: "[chunkhash].bundle.js" } };

//
// https://webpack.github.io/docs/configuration.html
//

configuration = {
    entry: [
        "./entry1",
        "./entry2"
    ]
};

configuration = {
    devtool: "inline-source-map"
};

configuration = {
    devtool: false
};

configuration = {
    resolve: {
        modules: [__dirname]
    }
};

rule = {
    test: /\.jsx$/,
    include: [
        path.resolve(__dirname, "app/src"),
        path.resolve(__dirname, "app/test")
    ],
    exclude: [
        path.resolve(__dirname, "node_modules")
    ],
    loader: "babel-loader"
};

rule = {
    test: /\.css$/,
    resourceQuery: /module/,
    loader: 'css-loader',
    options: {
        modules: true
    }
};

declare const require: any;
declare const path: any;
configuration = {
  plugins: [
    function apply(this: webpack.Compiler, compiler: webpack.Compiler) {
      const prevTimestamps = new Map<string, number>();
      const startTime = Date.now();

      this.hooks.emit.tap(
        'SomePlugin',
        (compilation: webpack.compilation.Compilation) => {
          for (const filepath in compilation.fileTimestamps.keys()) {
            const prevTimestamp = prevTimestamps.get(filepath) || startTime;
            const newTimestamp =
              compilation.fileTimestamps.get(filepath) || Infinity;
            if (prevTimestamp < newTimestamp) {
              this.inputFileSystem.readFileSync(filepath).toString('utf-8');
            }
          }
        },
      );

      compiler.hooks.afterCompile.tap(
        'SomePlugin',
        (compilation: webpack.compilation.Compilation) => {
          ['path/to/extra/dep', 'another/extra/dep'].forEach(path =>
            compilation.fileDependencies.add(path),
          );
        },
      );

      this.hooks.afterEmit.tapAsync('afterEmit', (stats, callback) => {
        this.outputFileSystem.writeFile(
          path.join(__dirname, '...', 'stats.json'),
          JSON.stringify(stats.getStats().toJson()),
          callback,
        );
      });

      this.hooks.beforeRun.tap(
        'SomePlugin',
        (compiler: webpack.Compiler) => {},
      );
      this.hooks.run.tap('SomePlugin', (compiler: webpack.Compiler) => {});

      compiler.hooks.compilation.tap('SomePlugin', compilation => {
        const { mainTemplate } = compilation;
        mainTemplate.requireFn.trimLeft();
        mainTemplate.outputOptions.crossOriginLoading;
        mainTemplate.hooks.require.tap('SomePlugin', resource => {
            return `console.log('A module is required'); ${resource}`;
        });
        mainTemplate.hooks.requireExtensions.tap('SomePlugin', resource => {
          return resource.trimLeft();
        });
        mainTemplate.hooks.requireEnsure.tap('SomePlugin', (resource, chunk, hash, chunkIdExpression: string) => {
          mainTemplate.renderRequireFunctionForModule(hash, chunk, 'moduleId');
          mainTemplate.renderAddModule(hash, chunk, 'moduleId', JSON.stringify({ ok: true }));
          return `${resource};/* additional requests for ${chunkIdExpression} */`;
        });
        mainTemplate.hooks.localVars.tap('SomePlugin', resource => {
          return resource.trimLeft();
        });
        mainTemplate.hooks.afterStartup.tap('SomePlugin', (resource, chunk) => {
            if (chunk.name) {
                return `/* In named chunk: ${chunk.name} */ ${resource};`;
            } else {
                return resource;
            }
        });
        mainTemplate.hooks.hash.tap('SomePlugin', hash => {
            hash.update('SomePlugin');
            hash.update('1');
        });
        mainTemplate.hooks.hashForChunk.tap('SomePlugin', (hash, chunk) => {
            if (chunk.name) {
                hash.update(chunk.name);
            }
        });
        if (mainTemplate.hooks.jsonpScript == null) {
          return;
        }
        mainTemplate.hooks.jsonpScript.tap(
          'SomePlugin',
          (source, chunk, hash) => {
            source.trimLeft();
            hash.trimLeft();
            return chunk.name;
          },
        );
      });
    },
  ],
};

//
// https://webpack.github.io/docs/list-of-plugins.html
//

declare const resourceRegExp: any;
declare const newResource: any;
declare const contextRegExp: any;
declare const newContentResource: any;
declare const newContentRecursive: any;
declare const newContentRegExp: any;
declare const requestRegExp: any;
declare const options: any;
declare const definitions: any;
declare const paths: any;
const preferEntry = true;
declare const context: any;
declare const request: any;
declare const types: any;
declare const banner: any;

plugin = new webpack.NormalModuleReplacementPlugin(resourceRegExp, newResource);
plugin = new webpack.ContextReplacementPlugin(
    resourceRegExp,
    newContentResource,
    newContentRecursive,
    newContentRegExp);
plugin = new webpack.ContextReplacementPlugin(
    resourceRegExp,
    newContentResource,
    newContentRecursive);
plugin = new webpack.ContextReplacementPlugin(
    resourceRegExp,
    newContentResource);
plugin = new webpack.ContextReplacementPlugin(resourceRegExp);
plugin = new webpack.DllPlugin({
    context: 'dir-context',
    name: 'dll-name',
    path: 'manifest-path'
});
plugin = new webpack.DllPlugin([{
    context: 'dir-context',
    name: 'dll-name',
    path: 'manifest-path'
}]);
plugin = new webpack.DllReferencePlugin({
    content: 'dll content',
    context: 'dir-context',
    manifest: {
        content: 'dll content',
        name: 'dll name'
    },
    name: 'dll name',
    scope: 'dll prefix',
    sourceType: 'var'
});
plugin = new webpack.ExternalsPlugin('this', 'react');
plugin = new webpack.ExternalsPlugin('this', {jquery: 'jQuery'});
plugin = new webpack.ExternalsPlugin('this', (context, request, callback) => {
    if (request === 'jquery') {
        callback(null, 'jQuery');
    }
    callback();
});
plugin = new webpack.IgnorePlugin(requestRegExp);
plugin = new webpack.IgnorePlugin(requestRegExp, contextRegExp);

plugin = new webpack.PrefetchPlugin(context, request);
plugin = new webpack.PrefetchPlugin(request);
plugin = new webpack.BannerPlugin('banner');
plugin = new webpack.BannerPlugin({
    banner: 'banner'
});
plugin = new webpack.BannerPlugin({
    banner: 'banner',
    entryOnly: true,
    exclude: /index/,
    include: 'test',
    raw: false,
    test: ['test', /index/]
});
plugin = new webpack.optimize.DedupePlugin();
plugin = new webpack.optimize.LimitChunkCountPlugin(options);
plugin = new webpack.optimize.MinChunkSizePlugin(options);
plugin = new webpack.optimize.OccurrenceOrderPlugin(preferEntry);
plugin = new webpack.optimize.OccurrenceOrderPlugin(preferEntry);
plugin = new webpack.optimize.UglifyJsPlugin(options);
plugin = new webpack.optimize.UglifyJsPlugin();
plugin = new webpack.optimize.UglifyJsPlugin({
    parallel: true
});
plugin = new webpack.optimize.UglifyJsPlugin({
    parallel: {
        cache: true,
        workers: 2
    }
});
plugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        dead_code: true,
        collapse_vars: true,
        drop_debugger: true,
    },
    warnings: false,
});
plugin = new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    comments: true,
    beautify: true,
    test: 'foo',
    exclude: /node_modules/,
    include: 'test'
});
plugin = new webpack.optimize.UglifyJsPlugin({
    mangle: {
        reserved: ['$super', '$', 'exports', 'require']
    }
});
plugin = new webpack.optimize.UglifyJsPlugin({
    comments: (astNode: any, comment: any) => false
});
plugin = new webpack.DefinePlugin(definitions);
plugin = new webpack.DefinePlugin({
    VERSION: JSON.stringify("5fa3b9"),
    BROWSER_SUPPORTS_HTML5: true,
    TWO: "1+1",
    "typeof window": JSON.stringify("object"),
    OBJECT: {
        foo: "bar",
        bar: {
            DEEP_RUNTIME: webpack.DefinePlugin.runtimeValue(
                () => JSON.stringify("DEEP_RUUNTIME")
            ),
            foofoo: {
                barbar: false
            }
        }
    },
    RUNTIME: webpack.DefinePlugin.runtimeValue(
        () => JSON.stringify("TEST_VALUE")
    )
});
plugin = new webpack.DefinePlugin({
    TEST_RUNTIME: webpack.DefinePlugin.runtimeValue(
        ({ module }) => JSON.stringify(module.context)
    )
});
plugin = new webpack.DefinePlugin({
    TEST_RUNTIME: webpack.DefinePlugin.runtimeValue(
        () => JSON.stringify("TEST_VALUE"),
        ["value.txt"]
    )
});
plugin = new webpack.DefinePlugin({
    TEST_RUNTIME: webpack.DefinePlugin.runtimeValue(
        () => JSON.stringify("TEST_VALUE"),
        true
    )
});
plugin = new webpack.ProvidePlugin(definitions);
plugin = new webpack.ProvidePlugin({
    $: "jquery"
});
plugin = new webpack.SourceMapDevToolPlugin({
    //// asset matching
    test: /\.js$/,
    // include: Condition | Condition[],
    exclude: [
        /node_modules/
    ],
    //
    //// file and reference
    filename: null, // | string
    // append: false | string,
    //// sources naming
    // moduleFilenameTemplate: string,
    // fallbackModuleFilenameTemplate: string,
    //
    //// quality/performance
    module: true,
    columns: true,
    lineToLine: false // | { test?: Condition | Condition[], ... }
});
plugin = new webpack.EvalSourceMapDevToolPlugin(false);
plugin = new webpack.HotModuleReplacementPlugin();
plugin = new webpack.ExtendedAPIPlugin();
plugin = new webpack.NoEmitOnErrorsPlugin();
plugin = new webpack.WatchIgnorePlugin(paths);
plugin = new webpack.LoaderOptionsPlugin({
    debug: true
});
plugin = new webpack.EnvironmentPlugin(['a', 'b']);
plugin = new webpack.EnvironmentPlugin({ a: true, b: 'c' });
plugin = new webpack.ProgressPlugin((percent: number, message: string) => { });
plugin = new webpack.ProgressPlugin((percent: number, message: string, moduleProgress?: string, activeModules?: string, moduleName?: string) => { });
plugin = new webpack.ProgressPlugin({ profile: true });
plugin = new webpack.ProgressPlugin({ activeModules: true, entries: false });
plugin = new webpack.HashedModuleIdsPlugin();
plugin = new webpack.HashedModuleIdsPlugin({
    hashFunction: 'sha256',
    hashDigest: 'hex',
    hashDigestLength: 20
});
plugin = new webpack.SingleEntryPlugin(
    '/home',
    './main.js',
    'main'
);

//
// http://webpack.github.io/docs/node.js-api.html
//

// returns a Compiler instance
webpack({
    // configuration
}, (err, stats) => {
    // ...
});

// returns a Compiler instance
let compiler = webpack({
    // configuration
});

compiler.run((err, stats) => {
    // ...
});
// or
compiler.watch({ // watch options:
    aggregateTimeout: 300, // wait so long for more changes
    poll: true // use polling instead of native watchers
    // pass a number to set the polling interval
}, (err, stats) => {
    // ...
});
// or
compiler.watch({ // watch options:
    ignored: 'foo/**/*'
}, (err, stats) => {
    // ...
});
// or
compiler.watch({ // watch options:
    ignored: /node_modules/
}, (err, stats) => {
    // ...
});

declare function handleFatalError(err: Error): void;
declare function handleSoftErrors(errs: string[]): void;
declare function handleWarnings(errs: string[]): void;
declare function successfullyCompiled(): void;

webpack({
    // configuration
}, (err, stats) => {
    if (err) {
        handleFatalError(err);
        return;
    }
    const jsonStats = stats.toJson();
    const jsonStatsWithAllOptions = stats.toJson({
        assets: true,
        assetsSort: "field",
        builtAt: true,
        cached: true,
        children: true,
        chunks: true,
        chunkGroups: true,
        chunkModules: true,
        chunkOrigins: true,
        chunksSort: "field",
        context: "../src/",
        errors: true,
        errorDetails: true,
        hash: true,
        modules: true,
        modulesSort: "field",
        publicPath: true,
        reasons: true,
        source: true,
        timings: true,
        version: true,
        warnings: true,
        warningsFilter: ["filter", /filter/],
        excludeAssets: ["filter", "excluded"]
    });

    if (jsonStats.errors.length > 0) {
        handleSoftErrors(jsonStats.errors);
        return;
    }
    if (jsonStats.warnings.length > 0) {
        handleWarnings(jsonStats.warnings);
    }
    successfullyCompiled();
});

declare const fs: any;

compiler = webpack({});
compiler.outputFileSystem = fs;
compiler.run((err, stats) => {
    // ...
    const fileContent = fs.readFileSync("...");
});

//
// https://github.com/webpack/webpack/blob/master/test/configCases/rule-set/simple/webpack.config.js
//

rule = {
    test: {
        or: [
            require.resolve("./a"),
            require.resolve("./c"),
        ]
    },
    loader: "./loader",
    options: "third"
};

configuration = {
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: {
                            and: [
                                /a.\.js$/,
                                /b\.js$/
                            ]
                        },
                        loader: "./loader?first"
                    },
                    {
                        test: [
                            require.resolve("./a"),
                            require.resolve("./c"),
                        ],
                        issuer: require.resolve("./b"),
                        use: [
                            "./loader?second-1",
                            {
                                loader: "./loader",
                                options: "second-2"
                            },
                            {
                                loader: "./loader",
                                options: {
                                    get: () => "second-3"
                                }
                            }
                        ]
                    },
                    {
                        test: {
                            or: [
                                require.resolve("./a"),
                                require.resolve("./c"),
                            ]
                        },
                        loader: "./loader",
                        options: "third"
                    }
                ]
            }
        ]
    }
};

class TestResolvePlugin implements webpack.ResolvePlugin {
    apply(resolver: any) {
        resolver.plugin('before-existing-directory', (request: any, callback: any) => {
            callback();
        });
    }
}

const performance: webpack.Options.Performance = {
    hints: 'error',
    maxEntrypointSize: 400000,
    maxAssetSize: 100000,
    assetFilter: assetFilename => assetFilename.endsWith('.js'),
};

configuration = {
    performance,
};

function loader(this: webpack.loader.LoaderContext, source: string | Buffer, sourcemap?: RawSourceMap): void {
    this.cacheable();

    this.async();

    this.addDependency('');

    this.loadModule('path', (err: Error | null, result: string, sourceMap: RawSourceMap, module: webpack.Module) => { });
    this.resolve('context', 'request', (err: Error, result: string) => { });

    this.emitWarning('warning message');
    this.emitWarning(new Error('warning message'));

    this.emitError('error message');
    this.emitError(new Error('error message'));

    this.callback(null, source);
}

(loader as webpack.loader.Loader).raw = true;
(loader as webpack.loader.Loader).pitch = function(this: webpack.loader.LoaderContext, remainingRequest: string, precedingRequest: string, data: any) { };
const loaderRef: webpack.loader.Loader = loader;
console.log(loaderRef.raw === true);

/**
 * New v4 tests
 */
configuration = {
};

configuration = {
    mode: "development"
};

configuration = {
    mode: "production"
};

configuration = {
    mode: "development",
    optimization: {
        removeAvailableModules: true,
        removeEmptyChunks: true,
        mergeDuplicateChunks: true,
        flagIncludedChunks: false,
        occurrenceOrder: false,
        providedExports: true,
        usedExports: false,
        sideEffects: false,
        concatenateModules: false,
        splitChunks: false,
        runtimeChunk: true,
        noEmitOnErrors: false,
        namedModules: true,
        namedChunks: true,
        nodeEnv: "development",
        minimize: false,
        portableRecords: false
    }
};

configuration = {
    mode: "production",
    optimization: {
        removeAvailableModules: true,
        removeEmptyChunks: true,
        mergeDuplicateChunks: true,
        flagIncludedChunks: true,
        occurrenceOrder: true,
        providedExports: true,
        usedExports: true,
        sideEffects: true,
        concatenateModules: true,
        splitChunks: { chunks: "async", minChunks: 2 },
        runtimeChunk: true,
        noEmitOnErrors: true,
        namedModules: false,
        namedChunks: false,
        nodeEnv: "production",
        minimize: true,
        portableRecords: true
    }
};

configuration = {
    mode: "production",
    optimization: {
        splitChunks: {
            minSize: 30000,
            maxSize: 50000,
            cacheGroups: {
                default: false,
                vendor: {
                    chunks: "initial",
                    test: "node_modules",
                    name: "vendor",
                    minSize: 30000,
                    maxSize: 50000,
                    enforce: true
                }
            }
        }
    },
};

configuration = {
    mode: "production",
    optimization: {
        splitChunks: {
            cacheGroups: {
                common: {
                    name: 'common',
                    chunks(chunk: webpack.compilation.Chunk) {
                        const allowedChunks = [
                            'renderer',
                            'component-window',
                        ];
                        return allowedChunks.indexOf(chunk.name) >= 0;
                    },
                    minChunks: 2
                }
            }
        }
    },
};

plugin = new webpack.SplitChunksPlugin({ chunks: "async", minChunks: 2 });

class SingleEntryDependency extends webpack.compilation.Dependency {}
class MultiEntryDependency extends webpack.compilation.Dependency {}
class MultiModuleFactory extends Tapable {}
class MultiEntryPlugin extends webpack.Plugin {
    apply(compiler: webpack.Compiler) {
        compiler.hooks.compilation.tap(
            "MultiEntryPlugin",
            (compilation, { normalModuleFactory }) => {
                compilation.dependencyFactories.set(MultiEntryDependency, new MultiModuleFactory());
            }
        );
        compiler.hooks.make.tapAsync(
            "MultiEntryPlugin",
            (compilation, callback) => {
                const dep = new MultiEntryPlugin();
                compilation.addEntry("", {}, "", () => {});
            }
        );
    }
}

class IgnorePlugin extends webpack.Plugin {
    checkIgnore(result: any) {
    }

    apply(compiler: webpack.Compiler) {
        compiler.hooks.normalModuleFactory.tap("IgnorePlugin", nmf => {
            nmf.hooks.beforeResolve.tap("IgnorePlugin", this.checkIgnore);
        });
        compiler.hooks.contextModuleFactory.tap("IgnorePlugin", cmf => {
            cmf.hooks.beforeResolve.tap("IgnorePlugin", this.checkIgnore);
        });
    }
}

class DllEntryDependency extends webpack.compilation.Dependency {}
class DllModuleFactory extends Tapable {}
class DllEntryPlugin extends webpack.Plugin {
    apply(compiler: webpack.Compiler) {
        compiler.hooks.compilation.tap(
            "DllEntryPlugin",
            (compilation, { normalModuleFactory }) => {
                const dllModuleFactory = new DllModuleFactory();
                compilation.dependencyFactories.set(
                    DllEntryDependency,
                    dllModuleFactory
                );
                compilation.dependencyFactories.set(
                    SingleEntryDependency,
                    normalModuleFactory
                );
            }
        );
        compiler.hooks.make.tapAsync("DllEntryPlugin", (compilation, callback) => {
            compilation.addEntry("", new DllEntryDependency(), "", callback);
        });
    }
}

class BannerPlugin extends webpack.Plugin {
    apply(compiler: webpack.Compiler) {
        compiler.hooks.compilation.tap("BannerPlugin", compilation  => {
            compilation.hooks.optimizeChunkAssets.tap("BannerPlugin", chunks => {
                for (const chunk of chunks) {
                    if (!chunk.canBeInitial()) {
                        continue;
                    }
                    for (const file of chunk.files) {
                        const pathA = compilation.getPath("", {});
                        const pathB = compilation.getPath("", {
                            contentHash: "abc",
                            contentHashType: "javascript",
                        });
                    }
                }
            });
        });
    }
}

class DefinePlugin extends webpack.Plugin {
    apply(compiler: webpack.Compiler) {
        compiler.hooks.compilation.tap(
            "DefinePlugin",
            (compilation, { normalModuleFactory }) => {
                normalModuleFactory.hooks.parser
                    .for("javascript/auto")
                    .tap("DefinePlugin", (parser) => {
                        parser.hooks.evaluateIdentifier
                            .for("TEST")
                            .tap("DefinePlugin", () => {});
                    });
            }
        );
    }
}

class ChunkGroupTestPlugin extends webpack.Plugin {
    apply(compiler: webpack.Compiler) {
        compiler.hooks.compilation.tap("ChunkGroupTestPlugin", compilation  => {
            const namedChunkGroupA = compilation.addChunkInGroup('vendors-a');
            const namedChunkGroupB = compilation.addChunkInGroup({ name: 'vendors-b' });
            const unnamedChunkGroup = compilation.addChunkInGroup({});
            if (namedChunkGroupA.getNumberOfChildren() > 0) {
                for (const chunk of namedChunkGroupA.chunks) {}
            }
            Array.from(namedChunkGroupA.childrenIterable).forEach(childGroup => {
                namedChunkGroupA.removeChild(childGroup);
                namedChunkGroupA.addChild(childGroup);
            });
            Array.from(namedChunkGroupA.parentsIterable).forEach(parentGroup => {});
            namedChunkGroupA.setParents([namedChunkGroupB]);
            namedChunkGroupA.setParents(new Set([unnamedChunkGroup]));
            compilation.hooks.optimizeModules.tap("ChunkGroupTestPlugin", modules => {
                for (const module of modules) {
                    const group = compilation.addChunkInGroup('module', module, { start: { line: 0 } }, 'module.js');
                    if (module.index) {
                        group.setModuleIndex(module, module.index);
                    }
                    if (module.index2) {
                        group.setModuleIndex2(module, module.index2);
                    }
                    console.log(group.getModuleIndex(module), group.getModuleIndex2(module));
                    break;
                }
            });
            compilation.hooks.optimizeChunks.tap("ChunkGroupTestPlugin", chunks => {
                const firstChunk = chunks[0];
                for (const groupChunk of namedChunkGroupA.chunks) {
                    namedChunkGroupA.insertChunk(firstChunk, groupChunk);
                }
            });
        });
    }
}

configuration = {
    module: {
        rules: [
            {
                test: /\.css$/,
                oneOf: [
                    { resourceQuery: /global/, use: ["style-loader", "css-loader"] },
                    { use: ["to-string-loader", "css-loader"] }
                ]
            }
        ]
    }
};

configuration = {
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: '/foo/bar',
                exclude: path => path.startsWith('/foo'),
                resourceQuery: ['foo', 'bar'],
                resolve: {
                    roots: [process.cwd()],
                    mainFields: ['foo'],
                    aliasFields: [['bar']],
                },
                loader: 'foo-loader',
                loaders: [
                    'foo-loader',
                    {
                        loader: 'bar-loader',
                        query: 'baz'
                    }
                ],
                use: () => ([
                    'foo-loader',
                    {
                        loader: 'bar-loader',
                        query: {
                            baz: 'qux'
                        }
                    },
                ])
            }
        ]
    }
};

let profiling = new webpack.debug.ProfilingPlugin();
profiling = new webpack.debug.ProfilingPlugin({ outputPath: './path.json' });

configuration = {
    plugins: [profiling]
};

compiler.hooks.done.tap('foo', stats => {
  if (stats.startTime === undefined || stats.endTime === undefined) {
    throw new Error('Well, this is odd');
  }

  console.log(`Compiled in ${stats.endTime - stats.startTime}ms`);
});

const multiCompiler = webpack([{}, {}]);

multiCompiler.hooks.done.tap('foo', (multiStats) => {
    const [firstStat] = multiStats.stats;

    if (multiStats.hasWarnings() || multiStats.hasErrors()) {
        throw new Error(multiStats.toString('errors-warnings'));
    }
    multiStats.toJson(); // $ExpectType ToJsonOutput

    if (firstStat.startTime === undefined || firstStat.endTime === undefined) {
        throw new Error('Well, this is odd');
    }

    console.log(`Compiled in ${firstStat.endTime - firstStat.startTime}ms`, multiStats.hash);
});

webpack.Template.getFunctionContent(() => undefined).trimLeft();
webpack.Template.toIdentifier('a').trimLeft();
webpack.Template.toComment('a').trimLeft();
webpack.Template.toNormalComment('a').trimLeft();
webpack.Template.toPath('a').trimLeft();
webpack.Template.numberToIdentifer(2).trimLeft();
webpack.Template.indent('a').trimLeft();
webpack.Template.indent(['a']).trimLeft();
webpack.Template.prefix('a', 'a').trimLeft();
webpack.Template.prefix(['a'], 'a').trimLeft();
webpack.Template.asString('a').trimLeft();
webpack.Template.asString(['a']).trimLeft();
webpack.Template.getModulesArrayBounds([{ id: 'a' }]);

function testTemplateFn() {
  const result = webpack.Template.getModulesArrayBounds([{ id: 1 }]);
  if (result === false) {
    return;
  }
  Math.max(...result);
}

const chunk = new webpack.compilation.Chunk('name');

chunk.sortModules((module1, module2) => {
  if (module1)
      return 1;
  else if (module2)
      return -1;
  return 0;
});
chunk.addMultiplierAndOverhead(12, {});
chunk.addMultiplierAndOverhead(12, {
  chunkOverhead: 1,
  entryChunkMultiplicator: 2
});
chunk.size();
chunk.size({});
chunk.size({
  chunkOverhead: 1,
  entryChunkMultiplicator: 2
});
chunk.hasModuleInGraph(
  m => m.type === "webassembly/async",
  chunk => chunk.name === "vendor"
);

const moduleTemplate = ({} as any) as webpack.compilation.ModuleTemplate;
webpack.Template.renderChunkModules(
  chunk,
  (_, num) => {
    Math.max(num, 2);
    return true;
  },
  moduleTemplate,
  [],
);

webpack.Template.renderChunkModules(
  chunk,
  () => false,
  moduleTemplate,
  [],
  'a',
);

// https://webpack.js.org/configuration/output/#outputfilename
configuration = {
    output: {
        filename: chunkData => {
            return chunkData.chunk.name === 'main' ? '[name].js' : '[name]/[name].js';
        },
    },
};

// https://webpack.js.org/api/logging/
class LoggingPlugin extends webpack.Plugin {
    apply(compiler: webpack.Compiler): void {
        const infrastructureLogger: webpack.Logger = compiler.getInfrastructureLogger('LoggingPlugin');
        infrastructureLogger.error("File not found");
        infrastructureLogger.warn("Ignoring unknown configuration option");
        infrastructureLogger.info("Maintaining flux");
        infrastructureLogger.debug("Dynamic reloads are inside the frobnitz");
        infrastructureLogger.trace("Something might have gone wrong here");
        infrastructureLogger.group("Start of messages");
        infrastructureLogger.groupEnd();
        infrastructureLogger.groupCollapsed("Start of collapsed messages");
        infrastructureLogger.groupEnd();
        infrastructureLogger.status("50% complete");
        infrastructureLogger.clear();
        infrastructureLogger.profile("How long does this take");
        infrastructureLogger.profileEnd();

        compiler.hooks.emit.tap('LoggingPlugin', compilation => {
            const logger = compilation.getLogger('LoggingPlugin');
            logger.error("File not found");
            logger.warn("Ignoring unknown configuration option");
            logger.info("Maintaining flux");
            logger.debug("Dynamic reloads are inside the frobnitz");
            logger.trace("Something might have gone wrong here");
            logger.group("Start of messages");
            logger.groupEnd();
            logger.groupCollapsed("Start of collapsed messages");
            logger.groupEnd();
            logger.status("50% complete");
            logger.clear();
            logger.profile("How long does this take");
            logger.profileEnd();
        });
    }
}

// Stats Microsoft/DefinitelyTyped#43952
const { Stats } = webpack;

compiler.hooks.compilation.tap('SomePlugin', compilation => {
    const stats = new Stats(compilation); // $ExpectType Stats
    Stats.filterWarnings([], [(warning: string) => true]); // $ExpectType string[]
    stats.formatFilePath('app/src/'); // $ExpectType string
    stats.normalizeFieldKey('field'); // $ExpectType string
    stats.sortOrderRegular('!field'); // $ExpectType boolean
});

const config1: webpack.ConfigurationFactory = (env) => {
    env; // $ExpectType string | Record<string, string | number | boolean> | undefined
    return {};
};

const config2: webpack.MultiConfigurationFactory = (env) => {
    env; // $ExpectType string | Record<string, string | number | boolean> | undefined
    return [];
};

configuration = {
    infrastructureLogging: {
        level: 'info',
        debug: [
            'MyPlugin',
            /MyPlugin/,
            (name) => name.includes('MyPlugin'),
        ],
    }
};
