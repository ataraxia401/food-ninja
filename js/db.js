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

//add new recipe
const form = document.querySelector('form')
form.addEventListener('submit', evt => {
    evt.preventDefault()

    const recipe = {
        title: form.title.value,
        ingredients: form.ingredients.value
    }

    db.collection('recipes').add(recipe)
        .catch(err => console.log(err))

    form.title.value = ''
    form.ingredients.value = ''

})