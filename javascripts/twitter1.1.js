function parsetwitter() {
    var twitDoc = document.querySelector("iframe.twitter-timeline").contentWindow.document;
    var tweets = twitDoc.body.getElementsByClassName("e-entry-title");
    if (tweets.length == 0) return setTimeout(parsetwitter,500);
    
    var tweetmeta = twitDoc.body.getElementsByClassName("permalink");
    var content = "";
    
    for (p=0;p<tweets.length;++p){
        var txt = tweets[p].textContent;
        var link = tweetmeta[p].href;
        var ttime = tweetmeta[p].textContent;
        content += '<li>'+'<p>'+'<a class="tweetdate" href="' + link + '">'+ ttime +'</a>'+ linkifyTweet(txt.replace(/\n/g, '<br>')) +'</p>'+'</li>';
        
    }    
    document.getElementById('tweets').innerHTML = content;
}


function linkifyTweet(text) {
  // Linkify urls, usernames
  text = text.replace(/(https?:\/\/)([\w\-:;?&=+.%#\/]+)/gi, '<a href="$1$2">$2</a>')
    .replace(/(^|\W)@(\w+)/g, '$1<a href="http://twitter.com/$2">@$2</a>');
  
  return text;
}