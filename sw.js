const CACHE="su-cache"

self.addEventListener("install",e=>{

e.waitUntil(

caches.open(CACHE)
.then(c=>c.addAll([
"/",
"/index.html",
"/style.css",
"/app.js"
]))

)

})
