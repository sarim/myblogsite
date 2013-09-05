---
layout: post
title: "Using twitter's embedded timeline as data source"
date: 2013-09-06 00:15
comments: true
categories: [twitter, javascript]
---

The title is kinda ambiguous, i know. We all know that twitter has introduced api 1.1 and removed api 1.0. Now in 1.0 we could get any public user'r timeline without auth. So we could just get users timeline as jsonp and create a twitter widget like "Recent Tweets" without any server side code. But…… those good old days are gone. Now you need a twitter client and need to make oauth-authorized request to get that data. And obviously that rules out the client side implementation as no one would publish his token,secret,key etc.. in a public accessible javascript file.

<!--more-->

Now twitter provides a widget with limited customizing functionality to embed one's tweets. But you can't use your own design with that, you are stuck with two "light" and "dark" theme twitter is so kind to provide.

Today i came up with a hack around this widget, you still need to create a widget from twitter, but you can create your own widget with it. How ?

Check the [DEMO](http://jsfiddle.net/sarim/S7AeM/embedded/result/)  first.

Now check the sources, things are pretty self-explanatory. The twitter widget creates a iframe. Interesting thing is, instead of just loading the iframe from twitter, it creates a empty iframe, then writes the html inside the iframe. the src attr of iframe remains empty, that enables us to access it freely. Thats what i did, i let it load, made it invisible but sending it off the page using css. Now i just parsed the tweets from the iframe and created my own widget.

Now can also see it in my site's sidebar.

Let me know your ideas about this in the comments section below.