
(function() {

  function loadModule(id, tagName, styleClass1, styleClass2){
    document.querySelector(id).onchange = function(){
      document.getElementsByTagName(tagName)[0].classList.toggle(styleClass1);
      if(styleClass2)
        document.getElementsByTagName(tagName)[0].classList.toggle(styleClass2);
    }
  }

  loadModule('#privacyNotice','body','show-privacy-notice');
  loadModule('#termsAndConditions','body','show-terms-and-conditions');
  loadModule('#privacyPolicy','body','show-privacy-policy', 'show-cookie-box');
  loadModule('#cookiePolicy','body','show-cookie-policy');
  loadModule('#googleAnalytics','body','show-google-analytics');
  loadModule('#googleAdSense','body','show-google-ad-sense');

})();