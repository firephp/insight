
var host = "localhost",
    port = 8003;

var CONNECT = require("connect/connect"),
    PATH = require("nodejs/path"),
    PROMISE = require("jsgi/promise"),
    PROGRAM_SERVER = require("pinf/program-server"),
    LOADER = require("pinf/loader"),
    Q = require("modules/q");

var FORCE_RELOAD = false;

exports.main = function(options)
{
    if (options && options.args && options.args.length > 0)
    {
        if (options.args.indexOf("--reloading") >= 0)
        {
            FORCE_RELOAD = true;
        }
    }
    
    module.print("\n\0cyan(\0bold(Welcome to the project server for the FirePHP project!\0)\0)\n\n");
    module.print("\0yellow(\0bold(Use your browser to navigate to: " + "http://" + host + ":" + port + "/" + "\0)\0)\n\n");

    CONNECT()
        .use('/docs/fetch', jsgi(
            reloadingApp(function(callback)
            {
                module.load(require.id("./jsgi/docs", true), function(id)
                {
                    callback(require(id).app(null, {
                        rootPath: PATH.dirname(PATH.dirname(PATH.dirname(module.id))) + "/docs"
                    }));
                });
            })
        ))
        .use('/', CONNECT.static(PATH.dirname(PATH.dirname(module.id)) + "/www", {
            maxAge: 0
        }))
        .listen(port);
}

var reloadingApp = function(factory)
{
    var bravojs = LOADER.getSandbox().loader.bravojs;

    return function(env)
    {
        var result = Q.defer();

        var modules;
        
        if (FORCE_RELOAD) {
            modules = Object.keys(bravojs.pendingModuleDeclarations).concat(Object.keys(bravojs.requireMemo));
        }

        factory(function(app)
        {
            if (FORCE_RELOAD) {
                Object.keys(bravojs.pendingModuleDeclarations).concat(Object.keys(bravojs.requireMemo)).forEach(function(id)
                {
                    if (modules.indexOf(id) === -1)
                    {
                        delete bravojs.pendingModuleDeclarations[id];
                        delete bravojs.requireMemo[id];
                    }
                });
            }
            
            result.resolve(app(env));
        });

        return result.promise;
    };
}


// TODO: This should move to https://github.com/senchalabs/connect/blob/master/lib/middleware/jsgi.js
var jsgi = function jsgi(app, options)
{
    options = options || {};

    return function(req, res, next)
    {
        var env = {
            pathInfo: req.originalUrl,
            port: port,  // TODO: This should come from req
            host: host   // TODO: This should come from req
        };

        var data = app(env);

        if (typeof data == "object")
        {
            if (typeof data.then == "function")
            {
                function handle(data)
                {
                    res.statusCode = data.status || 200;
                    if (typeof data.headers === "object")
                    {
                        for (var name in data.headers)
                        {
                            // TODO: Camelcase names
                            res.setHeader(name, data.headers[name]);
                        }
                    }
                    res.end(data.body.join(""));
                }
                data.then(
                    handle,
                    function (error)
                    {
                        module.print("Error: " + error.stack);
                        handle({ status:500, headers:{}, body:[error.message] });
                    },
                    function (data)
                    {
                        throw new Error("NYI");
                        // @see https://github.com/kriszyp/jsgi-node/blob/v0.2.4/lib/jsgi-node.js#L128
                        // TODO: handle(data, true);
                    }
                );
                return;
            }
            else
            {
                res.statusCode = data.status || 200;
                if (typeof data.headers === "object")
                {
                    for (var name in data.headers)
                    {
                        // TODO: Camelcase names
                        res.setHeader(name, data.headers[name]);
                    }
                }
                res.end(data.body.join(""));
            }
        }
        else
            throw new Error("NYI");
    }
}
