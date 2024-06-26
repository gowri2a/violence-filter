//var globalimageUrls;
//var globalimageUrls;
//window.localVar = globalimageUrls;

(() => { 'use strict';

chrome.runtime.onMessage.addListener((msg, sender) => {
  _.inspect('msg', msg);
  _.inspect('sender', sender);

  if (msg.action === 'background:scrapeProcessed') {
    console.log('msg.imageUrls:', msg.imageUrls);
    //globalimageUrls = msg.imageUrls
    console.log(typeof(msg.imageUrls));
    var newArray = [];
    for (var i = 0; i < msg.imageUrls.length; i++) {
    newArray.push(msg.imageUrls[i]);}
    console.log('msg.new imageUrls:', newArray);
    var button = document.getElementsByClassName('output');
    button.textContent = newArray;
  
    //parent.document.getElementById("output").value = msg.imageUrls;

    if (msg.imageUrls && msg.imageUrls.length) {
      appendImages(msg.title, msg.imageUrls);

    } else {
      console.warn('msg.imageUrls is null or empty');
    }
    }
    });

chrome.runtime.sendMessage({
  action: 'results:loaded'
}
);



function appendImages(title, imageUrls) {
  const div = document.createElement('div');
  div.className = 'images-container';

  const heading = document.createElement('h2');
  heading.textContent = title;
  div.appendChild(heading);

  imageUrls.forEach(url => {
    const imgContainer = document.createElement('div');
    imgContainer.className = 'image-container';

    const img = document.createElement('img');
    img.src = url;

    const caption = document.createElement('small');
    caption.textContent = url.slice(url.lastIndexOf('/')+1);

    imgContainer.appendChild(img);
    imgContainer.appendChild(caption);
    div.appendChild(imgContainer);
  });

  document.body.appendChild(div);
}

// end iife
})();
function getGlobalVariable() {
  return globalimageUrls;
}