//offline data
db.enablePersistence()
    .catch(err => {
        if (err.code == 'failed-precondition') {
            //probabily multiple tabs open at once
            console.log('persistence failde')
        } else if (err.code == 'unimplemented') {
            //lack of browser suppoprt
            console.log('persistence is not avail')

        }
    })

//add realtime listener
db.collection('recipes').onSnapshot(snapshot => {
    // console.log(snapshot.docChanges())
    snapshot.docChanges().forEach(change => {
        // console.log(change, change.doc.data(), change.doc.id)
        if (change.type === 'added') {
            //add document data to the web page
            renderRecipe(change.doc.data(), change.doc.id)
        }
        if (change.type === 'removed') {
            // remove document data from the web page
        }
    })
})