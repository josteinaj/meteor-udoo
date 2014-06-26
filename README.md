# Meteor for UDOO

Meteor is an ultra-simple environment for building modern web
applications.

This project aims to get Meteor running on UDOO, including the node.js package node-udoo.

Read more about Meteor on [Meteors GitHub project page](http://github.com/meteor/meteor/), and about node-udoo on the [node-udoo GitHub project page](https://github.com/pilwon/node-udoo).

## Step 1: Setting up the environment

 1. [Download and install Debian Wheezy armHF](http://www.udoo.org/downloads/)
 2. Configure WiFi so that it gets connected automatically
 3. (optional) Give the UDOO a fixed IP on your router
 4. (optional) Assign the local IP to DMZ and assign a dynamic DNS to it
 5. Enable the two [network interfaces in /etc/network/interfaces](http://www.unix.com/ip-networking/211031-unable-connect-localhost-debian-6-a.html). You'll probably want to install your favorite text editor (maybe vim) at this point so that you can edit the interface file. After having edited it; reboot to activate the interfaces.
 6. [Set the locale](https://wiki.debian.org/ChangeLanguage)
 7. [Enable the debian testing and unstable repositories](http://serverfault.com/a/382101). You can probably get away with just enabling the testing repo, but I followed the instructions precisely.
 8. `sudo apt-get install screen` (optional, but using screen makes everything easier. I recommend you run all of the following steps through screen.)
 9. `sudo apt-get update && sudo apt-get upgrade`
 10. `sudo apt-get install mongodb mongodb-server mongodb-clients mongodb-dev`
 11. `sudo apt-get install nodejs npm`
 12. `sudo ln --symbolic /usr/bin/nodejs /usr/bin/node` Node.JS is installed as "nodejs" instead of the more common "node" for some reason.

## Step 2: Building Meteor

 13. `sudo apt-get install git`
 14. `cd ~ && git clone https://github.com/josteinaj/meteor-udoo.git`
 15. `cd ~/meteor-udoo && ./scripts/generate-dev-bundle.sh without-dependencies`
 16. ``sudo ln --symbolic ~/meteor-udoo/meteor /usr/bin/meteor``
 17. Now you should be able to use the `meteor` command to your hearts content!

 * TODO: installing udoo npm
