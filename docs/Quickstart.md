
NOTICE: The information below is taken from the [Quickstart](https://github.com/firephp/quickstart) project.

Install
=======

This project contains everything you need to get started with hands-on learning about [FirePHP 1.0](http://docs.sourcemint.org/firephp.org/firephp/1) 
and includes examples on how to use FirePHP in various scenarios.

You can install this project to:

  * Explore all FirePHP features with examples from popular open source projects
  * Learn how to install and configure FirePHP by example
  * Learn how to integrate FirePHP into frameworks by example
  * Learn how to integrate FirePHP into applications by example

Relevant third party projects are bundled meaning this project is quite large when downloading. If you are looking for documentation
on how to install and use FirePHP, and you do not need in-depth examples, please refer to the official
FirePHP documentation at: [http://docs.sourcemint.org/firephp.org/firephp/1](http://docs.sourcemint.org/firephp.org/firephp/1)

NOTE: This project is not intended to showcase integrations with all or even many projects but rather focus on
various types of use-cases. Reference integrations for third party projects will be published as individual projects.
See [Integrations](http://docs.sourcemint.org/firephp.org/firephp/1/-docs/Integrations).


Install
=======

Assuming:

  * You are running [Apache](http://httpd.apache.org/) or equivalent (in terms of URL rewrite support via `.htaccess` files)
  * You are running [PHP 5.3+](http://php.net/)
  * `/root/` is your document root
  * `http://localhost/` is mapped to your `/root/`

Via manual download and extraction:

  1. Go to [https://github.com/firephp/quickstart/tree/v0.1.0](https://github.com/firephp/quickstart/tree/v0.1.0)
  2. Click on the *Downloads* button and download the `.zip` archive
  3. When downloaded extract the archive to `/root/`
  4. Open `/root/` in a project or file explorer so you can launch files to view and edit
  5. Browse to `http://localhost/` using [Firefox 4+](http://www.mozilla.com/en-US/firefox/new/). You should see a welcome page.

On a UNIX system with `git` installed:

    cd /root/
    git clone git://github.com/firephp/quickstart.git .

  1. Open `/root/` in a project or file explorer so you can launch files to view and edit
  2. Browse to `http://localhost/` using [Firefox 4+](http://www.mozilla.com/en-US/firefox/new/). You should see a welcome page.


Examples
========

  * `/examples/BasicSetupConstants/` - How to use FirePHP in its simplest form.
  * `/examples/BasicSetupFiles/` - Minimal FirePHP setup using configuration files (**RECOMMENDED**).
  * `/examples/ZendFramework-1/` - How to use FirePHP with [ZendFramework](http://framework.zend.com/) based on
    the [ZendFramework Quick Start Application](http://framework.zend.com/manual/en/learning.quickstart.html).