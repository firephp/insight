
var MARKDOWN = require("markdown/markdown");

exports.app = function(app, options)
{
    return function(env)
    {
        var m = env.pathInfo.match(/^\/docs\/fetch\/(.*)$/);
        if (!m) {
            return {
                status: 404,
                body: [
                    "File not found!"
                ]
            };
        }
        
        var path = options.rootPath + "/" + m[1];
        
        
        var input = "# Heading\n\nParagraph";
        
        var output = MARKDOWN.toHTML( input );
        
        
        return {
            status: 200,
            headers: {
                "Content-Type": "text/plain"
            },
            body: [
                output
            ]
        }
        
    };
}
