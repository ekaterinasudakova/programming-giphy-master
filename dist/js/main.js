let getGif=function(n,e,i){const o="https://api.giphy.com/v1/gifs/search?api_key="+GIPHY_API_KEY+"&limit="+i+"&offset=15&rating=G&";axios.get(o+"q="+n).then((function(n){e(n.data.data)})).catch((function(n){console.warn(n)}))},mainContentWrapper=document.querySelector(".main .main-content-wrapper");function markSelection(){(mainContentWrapper.children.classList="cat")?console.log("good"):console.log("wrong")}for(console.log(mainContentWrapper.children),i=0,len=mainContentWrapper.children.length;i<len;i++)mainContentWrapper.children[i].onclick=markSelection;getGif("cat",(function(n){console.log(n),n.forEach(((n,e)=>{mainContentWrapper.children[e].style.backgroundImage="url("+n.images.original.url+")",mainContentWrapper.children[e].classList.add("cat")}))}),8),getGif("dog",(function(n){console.log(n[0].images.original.url),mainContentWrapper.children[8].style.backgroundImage="url("+n[0].images.original.url+")"}),1);
//# sourceMappingURL=main.js.map