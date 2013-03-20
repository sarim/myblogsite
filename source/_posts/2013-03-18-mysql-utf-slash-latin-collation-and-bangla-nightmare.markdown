---
layout: post
title: "Mysql utf/latin collation and bangla nightmare"
date: 2013-03-18 01:54
comments: true
categories: [mysql, utf8, utf, encoding, charset, collation, bangla, unicode]
---

Those who maintain a non-english/bangla blog, forum or site, this type of problems are kinda common. The most common problem is seeing `??????`, and fix: go and change collation to utf8 :D
But my problem started from this simple (yes it looked simple :S ) problem but ended up a nightmare.

<!--more-->

I was running a [ipboard](http://www.invisionpower.com) instance. When importing a bangla translation, the text was showing as `??????`, so i applied the common fix, changed all table and field collation to utf8_unicode_ci and ipb's encoding to utf8. Now the site became inaccessible, showing a preety "Fatal ERROR : Your settings could not be read by IP.Board". That was fixed by running ipb's `upgradeFinish` script but the real problem starts now.


## The Problem:
All bangla letters became this :

![image](http://f.cl.ly/items/3J083G0k3X1D422z3s0n/Screen%20Shot%202013-03-17.png)

Looks pretty right ? :v

The reason behind this was all bangla chars were inserted in mysql using `latin1` encoding. If I set mysql client's encoding to latin1 and read, i get real bangla. If I set encoding to utf8 and read, i get latin-fied bangla like the picture.

## Failed Attempts:
I immediately went on a long google search and tried several solutions, but unfortunately, none of them were able to solve the problem completely. These two links ([1](http://www.bluebox.net/about/blog/2009/07/mysql_encoding/) [2](http://www.oreillynet.com/lpt/wlg/9022)) were a great help though, which helped to understand the problem thoroughly.

The solution proposed in first link, was a partial success. Change the fields in squence of utf8 > latin1 > blob > utf8. The trick in converting to blob is it fools mysql to convert latin1 to utf8 without running any conversion algorithm. It works when checking a single field, but not for all, the whole database of ipb is kinda complex. Some field were primary field and mysql not allows them to altered to blob. I ran a script to loop through all table,all field and alter them but ended up with a bunch of error and corrupted database. 

Then i changed my focus to the mysql dump file. If i can change the latin text inside the sql file to unicode text, problem will be gone. I tried [enca(1)](http://linux.die.net/man/1/enca) but it failed to change anything. Tried [recode(1)](http://linux.die.net/man/1/recode) without any success.

Then i created a script in php to read the whole sql line by line and feed them through [utf8_encode](www.php.net/manual/en/function.utf8-encode.php). Which made the unreadable latin text to unreadable **capital letter** latin.

That was a mistake, actually i need to use [utf8_decode](www.php.net/manual/en/function.utf8-decode.php). So now, the texts were back to bangla, but also many(almost all) chars are missing. Only first letter of a word or one word of a sentence was there, the rest vanished into the wind.

Next, tried [iconv(1)](http://linux.die.net/man/1/iconv) which striped away half of the database :(

##The Real Solution:
The idea is to insert the db to mysql as latin1, dump the db **as latin1**. Edit the dump to change it to **utf8** and insert it **as utf8**.

0. First task is to insert the mysqldump in latin1 encoding and in latin1 collation. So i took a bit help from sed.
``` sh
sed -i 's/CHARSET=utf8 COLLATE=utf8_unicode_ci/CHARSET=latin1/g' database.sql
sed -i 's/COLLATE utf8_unicode_ci/COLLATE latin1_bin/g' database.sql
```
0. Now i inserted this database.sql into mysql. Now we need to extract it **as latin1**, so applying `--default-character-set=latin1` flag.
``` sh
mysqldump --default-character-set=latin1 -u user -p dbname > database_latin.sql
```
I opened the database_latin.sql and saw the text was written in bangla. :D

0. Now we need to edit the dump file and change it to utf8, as we are gonna insert it as utf8 now. again, sed to rescue.
``` sh
sed -i 's/SET NAMES latin1/SET NAMES utf8/g' database_latin.sql
sed -i 's/CHARSET=latin1/CHARSET=utf8 COLLATE=utf8_unicode_ci/g' database_latin.sql
sed -i 's/COLLATE latin1_bin/COLLATE utf8_unicode_ci/g' database_latin.sql
sed -i 's/CHARACTER SET latin1/CHARACTER SET utf8/g' database_latin.sql
```

0. Finally i inserted this database_latin.sql to mysql and voila :D no error, clear bangla and no chars missing :D

##Ending Thoughts:
If you are making a bangla or non-english site, always start with a proper collation setting. Set all table and field collation to utf8_unicode_ci or utf8_general_ci. Make sure the mysql client (your app) speaks in utf8. If you are running raw mysql query, run `set names utf8` at beginning. If using a framework or toolkit, check where to set this **utf8** config. These will save you from infinite PITA later.

If you indeed missed the utf8 config and ended up in a mess like me, try to apply a solution that doesn't directy convert the encoding of the texts. You may end up with missing or corrupted chars.

NB: If you are following this post, dont copy-paste the commands, understand and adept the commands to your scenario.
Forgive my poor writing and let me know your thoughts in the comment section.