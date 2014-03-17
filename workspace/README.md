
The [PINF JavaScript Loader](https://github.com/pinf/loader-js) is used to provide a development environment and package releases for this project.

**NOTE:** It is assumed you have the _PINF JavaScript Loader_ mapped to the `commonjs` command and are using the `node` platform by default as explained [here](https://github.com/pinf/loader-js/blob/master/docs/Setup.md).

Documentation
=============

    commonjs --script docs ./ -v --port 8080

    open http://localhost:8080/



Tests
=====

Run all tests:

    commonjs -v --script test ./

Toolchain
---------

**NOTE: At this time these tests will only work on OSX!**

    commonjs -v --script setup ./packages/test

    commonjs -v ../tests/toolchain/firefox_5-firebug_1_7-firephpextension_0_5-zendframework_1_11/
    open http://zendframework.firefox_5-firebug_1_7-firephpextension_0_5-zendframework_1_11.macbook.home.cadorn.net:10089/?test=1

    commonjs -v ../tests/toolchain/firefox_5-firebug_1_7-firephpextension_0_5-firephpcore_0_3/
    open http://firephpcore.firefox_5-firebug_1_7-firephpextension_0_5-firephpcore_0_3.macbook.home.cadorn.net:10089/?test=1

    commonjs -v --script teardown ./packages/test

PHPUnit
-------

    cd ../tests/firephp
    phpunit .
    
    cd ../tests/sub/firephp-core
    phpunit .

    cd ../tests/sub/wildfire-php
    phpunit .


Sub-project code syncing
========================

Dependencies are recorded in `../package.json'. Run the following to import the dependencies into their
respective directories in `../lib/`.

**WARNING: Running this will over-write most of the files in `../lib/` and all in `../tests/sub/`! Make sure to sync changes to sub-projects first.**

    commonjs -v --script import ./


Publishing
==========

    git tag v...
    
    commonjs --script build .
    
TODO: Auto-upload to PEAR channel server at http://pear.firephp.org/

NOTE: For PEAR RC releases: Change release stability to "beta" and capitalize "RC" in release version in package.xml
