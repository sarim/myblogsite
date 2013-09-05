function parsetwitter(tweetcount){
    frms = document.getElementsByTagName("iframe");
    for (i=0;i<frms.length;++i){
        if (frms[i].id.search("twitter-widget-") != -1){
            tweets = frames[frms[i].id].document.body.getElementsByClassName("e-entry-content");
            if (tweets.length == 0) return setTimeout(parsetwitter,500);
            
            tweetmeta = frames[frms[i].id].document.body.getElementsByClassName("permalink");
            content = "";
            
            for (p=0;p<tweets.length;++p){
                txt = tweets[p].innerText;
                link = tweetmeta[p].href;
                ttime = tweetmeta[p].innerText;
                content += '<li>'+'<p>'+'<a href="' + link + '">'+ ttime +'</a>'+ linkifyTweet(txt.replace(/\n/g, '<br>')) +'</p>'+'</li>';
                
            }
            
            document.getElementById('tweets').innerHTML = content;
        }
    }
}


function linkifyTweet(text) {
    console.log(text);
  // Linkify urls, usernames, hashtags
  text = text.replace(/(https?:\/\/)([\w\-:;?&=+.%#\/]+)/gi, '<a href="$1$2">$2</a>')
    .replace(/(^|\W)@(\w+)/g, '$1<a href="http://twitter.com/$2">@$2</a>');
  
  console.log(text);
  return text;
}