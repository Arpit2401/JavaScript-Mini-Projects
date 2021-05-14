var linkedinCount = document.getElementById("linkedinCount");
var instagramCount = document.getElementById("instagramCount");
var twitterCount = document.getElementById("twitterCount");

var count1 = 0;
var count2 = 0;
var count3 = 0;

linkedinTimer = setInterval(function(){
    count1 += 10;
    linkedinCount.innerText = count1+"+";
    if(count1 == 2200)
    clearInterval(linkedinTimer);
},1);

instagramTimer = setInterval(function(){
    count2 += 2;
    instagramCount.innerText = count2+"+";
    if(count2 == 500)
    clearInterval(instagramTimer);
},2);

twitterTimer = setInterval(function(){
    count3 += 1;
    twitterCount.innerText = count3+"+";
    if(count3==60)
    clearInterval(twitterTimer);
},20);