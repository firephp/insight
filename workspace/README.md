
The [PINF JavaScript Loader](https://github.com/pinf/loader-js) is used to provide a development environment and package releases for this project.

**NOTE:** It is assumed you have the _PINF JavaScript Loader_ mapped to the `commonjs` command and are using the `node` platform by default as explained [here](https://github.com/pinf/loader-js/blob/master/docs/Setup.md).

Demo
====

    commonjs -v https://github.com/firephp/firephp


Development
===========

    git clone git://github.com/firephp/firephp.git
    cd firephp
    commonjs -v ./

    // force internal modules to be reloaded with every request
    commonjs -v ./ --reloading
