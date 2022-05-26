const auth = firebase.auth();
const db = firebase.firestore();


let submitters = []
let asignees = []
db.collection('GraphData').get().then(function (querySnapshot) {
    querySnapshot.docs.forEach(function (doc) {
        asignees.push(doc.data().Asignee)
        submitters.push(doc.data().Submitter)

        console.log(doc.data().Asignee + doc.data().Submitter)

    });
});


const map1 = new Map();
let length01 = submitters.length;

for (let i = 0; i < length01; i++) {
    // map1.set(submitters[i], asignees[i])
    const dict = {
        name: 'sdf',
        path: 'sdfsdfsdf',

    }
    links.push(dict)


}
