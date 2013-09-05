---
layout: post
title: "Site version plugin for jekyll/octopress"
date: 2013-09-06 01:34
comments: true
categories: [octopress, jekyll, plugin]
---

Disclaimer: I dont know ruby. Not even know how to print hello world. So dont blame me for using bash :P

Check my site's footer. You'll see a `site version ####`. What is it ? Its just a fancy jekyll plugin i created that shows a version based on git commit. Everytime you add a new commit to your site source, the version increases.

<!--more-->

<br>  
  
Q: Why need it ?

A: It looks cool. It gives me internal peace of mind. Moreover If you publish your site in places like github pages, from version you can check if your site is deployed yet.

##Installation
0. Get [getversion.rb](https://raw.github.com/sarim/sarim.github.com/source/plugins/getversion.rb) and place it in your `plugins` folder.
0. Now open any layout and add {% raw  %}`{% get_version %}`{% endraw  %} in it. Example: I added it in my `_includes/custom/footer.html`
    
    ``` html
    {% raw  %}<span class="credit">site version {% get_version %}</span>{% endraw  %}
    ```
        
0. Since it works based on git, you need a git tag to generate a version number. If you dont have any git-tag yet, create a new tag. Note that tag name will be used as prefix in the version. To create a tag named `MySite`
    
    ``` sh
    git tag -a MySite
    ```
        
0. Now regenerate your site using `rake generate` and you are done.



Let me know how much you like this plugin :)