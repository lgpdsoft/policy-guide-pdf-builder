// After a service worker is installed and the user navigates to a different page or refreshes,the service worker will begin to receive fetch events
self.addEventListener('fetch', function(event) {
  event.respondWith(caches.open('cache').then(function(cache) {
    return cache.match(event.request).then(function(response) {
      //console.log("cache request: " + event.request.url);
      var fetchPromise = fetch(event.request).then(function(networkResponse) {           
          // If we got a response from the cache, update the cache                   
          //console.log("fetch completed: " + event.request.url, networkResponse);
          if (!(event.request.url.indexOf('http') === 0)) return; // skip the request. if request is not made with http protocol (FIX CHROME BUG IN LOCALHOST)
          if (networkResponse) {
              //console.debug("updated cached page: " + event.request.url, networkResponse);
              cache.put(event.request, networkResponse.clone());
            }
              return networkResponse;
              }, function (e) {   
              // Rejected promise - just ignore it, we're offline!   
              //console.log("Error in fetch()", e);
              e.waitUntil(
              caches.open('cache').then(function(cache) { // Our cache here is named *cache* in the caches.open()
              return cache.addAll
              ([            
              // cache.addAll(), takes a list of URLs, then fetches them from the server and adds the response to the cache.           
              // Add your entire site to the cache- as in the code below; for offline access
              // If you have some build process for your site, perhaps that could generate the list of possible URLs that a user might load.               
              '/', // Do not remove this
              '/index.html', // Default
              '/index.html?launcher=true', // Default
              '/index.html?homescreen=1', // Default
              '/?homescreen=1', // Default
              '/assets/*', // Choose media to keep offline; just an example
              // Do not replace/delete/edit the sw.js/ and manifest.js paths below
              'sw.js',
              'manifest.json'  
              ]);
            })
          );
        });
      // Respond from the cache, or the network
      return response || fetchPromise;
    });
  }));
});