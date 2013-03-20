---
layout: post
title: "Streaming a mumble session over Icecast"
date: 2013-03-09 19:45
comments: true
categories: [mumble, icecast, linux, pulseaudio, liquidsoap]
---

This guide is heavily based on [derek's guide](http://www.skyehaven.net/blog/2011/03/14/mumble-icecast/) but i used liquidsoap instead of darkice and vnc for headless linux server.

Lets say you have some users talking in a mumble server and want to brodcast that conversation but dont want  people to join and interfare but want people able to listen to. So, here's how to do that.
<!-- more -->
Requirements:
--

- Mumble Client
- PulseAudio
- [Savonet Liquidsoap](http://savonet.sourceforge.net/)
- Icecast

## Installation
Here i'm gonna do it in ubuntu.

``` sh
apt-get install mumble pulseaudio liquidsoap liquidsoap-plugin-lame
```

If you are doing this in a headless server you'll also need vncserver. Realvnc is my favorite but tightvnc will also do.
``` sh
apt-get tightvncserver
```

Now install icecast
``` sh
apt-get install icecast2
```

## Configuration

### Icecast
if you choose not to configure icecast2 during installation here's how to do that manually.

Open `/etc/icecast2/icecast.xml`

``` sh
nano /etc/icecast2/icecast.xml
```

There is many configuration with comments, change them if you want, but at least we need to change the default passwords. change `<source-password>`, `<relay-password>` and `<admin-password>`

Now enable icecast2, open `/etc/default/icecast2`
``` sh
nano /etc/default/icecast2
```
change
``` sh
ENABLE=true
```

Now start icecast2
``` sh
/etc/init.d/icecast2 start
```

Point your browser to SERVER_IP:PORT to see icecast.
- - -
### Vnc
Skip this if you already have installed and access to Desktop Environment.

Now to run mumble, we need a DE. you may install lxde (as a lightweight DE)
``` sh
apt-get install lxde
```

Start a vnc session which will also start the **X** server.
``` sh
vncserver
```
Set a password when asked.

Now go to your own computer's desktop and using any VNC client, connect to you server. Credentials will be like host: `serverip:1` and your vnc password.
- - -
### Pulseaudio

Assuming you were using ssh so far, now switch to DE, and start lxterminal to further complete tasks ahead.

Now we need to create a virtual device in pulseaudio from where we'll be capturing the mumble session and to where mumble should send its output.
To do that, run,
``` sh
pactl load-module module-null-sink sink_name=stream
```
- - -
### Mumble

Start mumble from menu or running `mumble` in terminal. Most important thing to set is 

* Settings->Audio Output
	`System = PulseAudio`
	`Device = Null Output`

You can leave other configs as default.

Now connect to desired mumble server/channel.
- - -
### Liquidsoap

Now the final task, link mumble's output to icecast. It is a good idea to check out [quick start](http://savonet.sourceforge.net/doc-svn/quick_start.html) guide which'll give you a clear idea about Liquidsoap.

We'll create a liq script.
``` sh
nano sk.liq
```

Now the main tricky part, you need to change the content of the script.

``` python
#!/usr/bin/liquidsoap
output.icecast(%mp3,     host = "example_host", port = 8000,      password = "source_password", mount = "gittu",     input.pulseaudio(device = "stream.monitor"))
```
You need to change `example_host` to your icecast server's ip or address. `source_password` to the `<source-password>` set in icecast.

Now everything is set, fire things up :)

``` sh
chmod +x sk.liq
./sk.liq
```

Now go to icecast and listen your mumble conversation :)
- - -
###Toubleshooting
1. If icecast fails to start, check that the port (default 8000) is not being used by another process. It took away 30 minutes of my life, nginx was blocking 8000 port.
2. Try running liquidsoap in verbose mode `liquidsoap -v sk.liq` if you are having trouble with it.


Thats all :D Let me know your thoughts in comment section.