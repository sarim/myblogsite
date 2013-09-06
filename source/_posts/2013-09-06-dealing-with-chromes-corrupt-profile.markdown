---
layout: post
title: "Dealing with Chrome's Corrupt Profile"
date: 2013-09-06 13:55
comments: true
categories: [sqlite3, chrome]
---

This is a common thing for any chrome user. The profile of chrome gets corrupted after sometimes and you will be provided with a "Your Profile is corrupted" etc… error message, and your profile is stuck, it doesn't get saved, saved cookies, site data etc… will be gone each time you close chrome. Chrome uses sqlite3 for various databases for its profile. But sqlite3 database tends to corrupt very often, especially in case of a power failure.

<!--more-->

Unfortunately sqlite doesn't have any native repair feature, unlike mysql. So fixing a sqlite3 means dump it and then create a new db from that dump file. Lets see how to do that with chrome's profile databases.

Close chrome and follow the instructions below in terminal.

0. First we need to get a list of all sqlite3 database in chrome's profile folder.
    
    ``` sh
    find ~/Library/Application\ Support/Google/Chrome/ -print0 | xargs -0 file | grep SQLite | sed 's/\(.*\):.*/\1/' > ~/chromedb.txt
    ```
    Replace `~/Library/Application\ Support/Google/Chrome` with your chrome profile path.
    Here i'm piping 4 commands, firstly i'm using `find` to get all files from chrome profile, secondly using `xargs` i'm checking file type of these files using `file` command, thirdly filtering the SQLite databases using `grep`, at-last using `sed` to extract the file path part from the output. Then saving it in `~/chromedb.txt`
0. Download the [repairsqlite.sh](https://gist.github.com/sarim/6460936) script.

    ``` sh
    curl -o repairsqlite.sh https://gist.github.com/sarim/6460936/raw/repairsqlite.sh
    ```
    or
    
    ``` sh
    wget https://gist.github.com/sarim/6460936/raw/repairsqlite.sh
    ```
    
    Make it executable
    
    ``` sh
    chmod +x repairsqlite.sh
    ```
    
0. Now run this script with our `chromedb.txt`

    ``` sh
    cat chromedb.txt | xargs -I db ~/repairsqlite.sh db
    ```
 
0. You'll see tons of text flowing through your terminal. Wait a few seconds until its done.


Now open chrome and "Profile Corrupt" message will be gone and your profile will be saved again.

Happy browsing with Chrome :)