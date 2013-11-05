function parsetwitter(){
    frms = document.getElementsByTagName("iframe");
    for (i=0;i<frms.length;++i){
        if (frms[i].id.search("twitter-widget-") !== -1){
            tweets = frms[i].contentWindow.document.body.getElementsByClassName("e-entry-content");
            if (tweets.length == 0) return setTimeout(parsetwitter,500);
            
            tweetmeta = frms[i].contentWindow.document.body.getElementsByClassName("permalink");
            content = "";
            
            for (p=0;p<tweets.length;++p){
                txt = tweets[p].textContent;
                link = tweetmeta[p].href;
                ttime = tweetmeta[p].textContent;
                content += '<li>'+'<p>'+'<a class="tweetdate" href="' + link + '">'+ ttime +'</a>'+ linkifyTweet(txt.replace(/\n/g, '<br>')) +'</p>'+'</li>';
                
            }
            
            document.getElementById('tweets').innerHTML = content;
        }
    }
}


function linkifyTweet(text) {
  // Linkify urls, usernames
  text = text.replace(/(https?:\/\/)([\w\-:;?&=+.%#\/]+)/gi, '<a href="$1$2">$2</a>')
    .replace(/(^|\W)@(\w+)/g, '$1<a href="http://twitter.com/$2">@$2</a>');
  
  return text;
}