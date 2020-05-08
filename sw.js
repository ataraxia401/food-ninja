// install service worker
self.addEventListener('install', evt => {
    console.log('service worker has been isntall')
})

//active service worker
self.addEventListener('active', evt => {
    console.log('service worker has been actived')
})