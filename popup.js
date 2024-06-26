//'use strict';
//console.log('msg.imageUrls:', msg.imageUrls);

/*chrome.runtime.onMessage.addListener((msg, sender) => {
  _.inspect('msg', msg);

  //console.log(msg.imageUrls);
  console.log(msg)
});
*/
(() => { 'use strict';
$$.ready(() => {
  
  //$$.getActiveTab($$.scrapeImages)
  document.querySelector('.button--scrape')
    .addEventListener('click', () => $$.getActiveTab($$.scrapeImages));
    document.querySelector('.button--classify')
    .addEventListener('click', () => {
      //const imageurlshow = parent.document.getElementById("output").innerHTML = msg.imageUrls;
      //alert(imageurlshow);
      //document.getElementById("output").value = msg.imageUrls;
      classifyImage();
    });
  //document.querySelector('.classify--images')
  //  .addEventListener('click', () => $$.getActiveTab($$.clasifyImage));

});
})();
function getGlobalVariable() {
  return globalimageUrls;
}

