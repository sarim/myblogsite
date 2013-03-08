---
layout: post
title: "Installing Smilify plugin in octopress"
date: 2013-03-09 02:42
comments: true
categories: octopress, jekyll
---

So, I just installed octopress and published a hello world post, but the smilies(emoticons) didn't converted to icons :O

No Worry, i asked uncle G and now writing down the procedure in case i forgot it in future :P

<!-- more -->

The smilify plugin is here [jekyll_smilify](https://github.com/SaswatPadhi/jekyll_smilify) 


	git clone git://github.com/SaswatPadhi/jekyll_smilify.git

Assuming we cloned octopress to `~/octopress` and jekyll_smilify to `~/jekyll_smilify`

	cd jekyll_smilify/
	cp plugins/smilify.rb ~/octopress/plugins/
	cp -r source/images/smileys ~/octopress/source/images/
	cp -r source/_include/smileys/ ~/octopress/source/_includes/smileys/
	
Placing things in write place is done. Now need to enable the contents to filter through Smilify.

{% raw %}

1. Open `~/octopress/source/_layouts/default.html` and replace

		{{ content | expand_urls: root_url }}
	
	with

		{{ content | expand_urls: root_url | smilify }}

	
2. Open `~/octopress/source/_layouts/page.html` and replace

		{{ content }}

	with

		{{ content | smilify }}
	
		
{% endraw %}
Optional:
---
I see the css of the octopress theme was making the smiles to have a border around it and drop-shadow applied, which looks ugly. To fix this,

1. Open `~/octopresssass/custom/_styles.scss` and add

		img.smiley {border : none ; box-shadow: 0 0 0 0}


**All Done** :D


