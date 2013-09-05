---
layout: post
title: "How to use aria2 for downloading in zypper"
date: 2013-03-19 21:40
comments: true
categories: [linux, opensuse, zypper, aria2, downloading]
---

Zypper, the great featureful package manager for opensuse uses curl for downloading as default. On the other side, aria2, is one of the best multi-threaded download manager available for *nix. Zypper has a aria2 plugin for a long time but usually not activated by default.

Let's make zypper download packages in the speed of light using aria2 :D

<!--more-->

0. First install aria2. You can install it from repo, `sudo zypper in aria2` or from [software.opensuse.org](http://software.opensuse.org/package/aria2)

0. Now we need to tell zypper (libzypp to be technically correct) to use aria2, passing ENV Variable `ZYPP_ARIA2C` is needed for this. Open `/etc/bash.bashrc` for editing.
``` sh
sudo nano -w /etc/bash.bashrc
```
0. Keep pressing `Cntrl + v` for scrolling down. At the end of the file, add this line.
``` sh
export ZYPP_ARIA2C=1
```
Save and Exit. (`Cntrl + X`, `Y`, `Enter`)
0. Now Zypper will use aria2 for downloading as root user, but when using sudo, that ENV variable will be striped. To fix this, edit `/etc/sudoers`
``` sh
sudo nano -w /etc/sudoers
```
Look for this line
``` sh
Defaults env_keep = "LANG LC_ADDRESS LC_CTYPE LC_COLLATE LC_IDENTIFICATION LC_MEASUREMENT LC_MESSAGES LC_MONETARY LC_NAME LC_NUMERIC LC_PAPER LC_TELEPHONE LC_TIME LC_ALL LANGUAGE LINGUAS XDG_SESSION_COOKIE"
```
Add `ZYPP_ARIA2C` at the end of this line.
``` sh
Defaults env_keep = "LANG LC_ADDRESS LC_CTYPE LC_COLLATE LC_IDENTIFICATION LC_MEASUREMENT LC_MESSAGES LC_MONETARY LC_NAME LC_NUMERIC LC_PAPER LC_TELEPHONE LC_TIME LC_ALL LANGUAGE LINGUAS XDG_SESSION_COOKIE ZYPP_ARIA2C"
```

Save and Exit.
	

Done. Restart terminal and try to download a package using zypper. Zypper will now use aria2. I noticed a bug though, you wont be seeing the download progress, but i can live with it, dont u ? :)

This guide is written in openSUSE 12.3 KDE, but the process will be similiar for other versions of openSUSE.

Happy Linuxing :D
