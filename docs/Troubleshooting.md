

Did you just upgraded the FirePHP or DeveloperCompanion Extension and FirePHP is no longer working?
===================================================================================================

ASSUMPTION: It is assumed that **only the client has been updated** and nothing has changed on the server.

ASSUMPTION: It is assumed you have the [FirePHP Extension](Clients#firephp) **or** [DeveloperCompanion](Clients#devcomp) 
installed on the client (**not both**).


First thing to check:
---------------------

**If using the FirePHP Extension with Firebug:**

  * Make sure the **Firebug Console** and *Net* panels are enabled **for the hostname you want to debug**.

**If using DeveloperCompanion:**

  * *TODO*


Second things to try:
---------------------

  1. Restart Firefox
  2. Reboot your computer
  3. Create a new Firefox profile and install the FirePHP client + Firebug only.
     
     SEE: See [http://support.mozilla.com/en-US/kb/Managing-profiles](http://support.mozilla.com/en-US/kb/Managing-profiles)

Finally
-------
{: id="contact-support"}

Contact [Support](OpenSource#support) and provide the following:

  * Firefox version: 
  * FirePHP Extension version (if installed): 
  * DeveloperCompanion version (if installed): 
  * Firebug version (if installed): 
  * FirePHP server library name: (typically FirePHPCore or ZendFramework)
  * FirePHP server library version: 
  * Were things working before upgrading the client?
  * How was the client upgraded?
  * Is anything FirePHP related working?


Are you not seeing any messages in the console?
===============================================

ASSUMPTION: It is assumed that FirePHP has never worked or stopped working after changing something on the server.


If using *FirePHPCore* (or equivalent) on server with *FirePHP Extension* or *DeveloperCompanion* + *Firebug* on client:
------------------------------------------------------------------------------------------------------------------------

SEE: See [Configuration/Traditional](Configuration/Traditional) for how to configure this setup on the server.

  1. Make sure your client works by going to [firephp.org](http://www.firephp.org/) and looking for messages
     in the console. If the client is not working see above.
  2. Make sure the **Firebug Console** and *Net* panels are enabled **for the hostname you want to debug**.
  3. Is *FirePHP* enabled on the client?

     If using *FirePHP Extension*: Go to *Tools* -> *FirePHP* and ensure there is a checkmark next to *FirePHP Enabled*.
     
     If using *DeveloperCompanion*: *TODO*
     
  4. Do you have output buffering enabled? Ensure you are using `ob_start()` at the beginning of your script or
     you have the *output_buffering* PHP ini directive enabled. 

If it is still not working see if you get any `x-wf-` headers for the response in the *Firebug Net* panel and
include these when contacting support (see [Finally](Troubleshooting#contact-support) above).


If using *FirePHP 1.0* configured securely:
-------------------------------------------

ASSUMPTION: It is assumed that *FirePHP* is configured using the [Configure: constants](Configuration/Constants) or 
[Configure: files](Configuration/Files) approaches.

The easiest way to troubleshoot a secure *FirePHP 1.0* installation is to use [DeveloperCompanion](Clients#devcomp) to test the setup.

PLANNED: Docs and tools to troubleshoot manually.

When adding a *Workspace* in *DeveloperCompanion* the setup is automatically tested and any errors are displayed in detail.

If the *Workspace* was already setup but things are not working all of a sudden, the connection can be manually tested:

NOTE: This requires a DeveloperCompanion license. If you do not have a license you can delete the workspace and re-create 
it as the connection will be tested when setting up a new *Workspace*.

  1. Open *DeveloperCompanion* by clicking on the icon in the browser status bar.
  2. Select the first tab (that is the *home* or *companion* tab) and then *Workspaces*.
  3. Double-click the workspace you want to test
  4. When the workspace has launched locate the *Check Workspace Connection* button and click it.

If you need additional help you can get support [here](OpenSource#support).

One of the **most common problems** is an incorrect setting for the */<ServerScript.php>* path. This is evidenced by a
*No wildfire messages detected* message.

The */<ServerScript.php>* path must be set to the path of a PHP script relative to the hostname that includes *FirePHP* just like the
rest of your application does. It typically refers to the homepage of the application. The path is set as follows depending on which configuration
method is used:

### Configure: constants

    CODE: {"lang":"php"}
    
    define('INSIGHT_SERVER_PATH', '/<ServerScript.php>');

### Configure: files

    CODE: {"lang":"php"}
    
    package.json ~ {
      "implements": {
        "cadorn.org/insight/@meta/config/0": {
          "server": {
            "path": "/<ServerScript.php>"
          }
        }
      }
    }

For more information about all configuration options see [Install](Install).

