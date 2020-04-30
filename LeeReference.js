props.listOfClientProfiles.find((x) => x.userID === item.clientID).clientName


// (node:11162) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 change listeners added to [HasteMap]. Use emitter.setMaxListeners() to increase limit - got error when messing with navigation...?

let promise = firebase.firestore().doc("projects").get();
promise.then(snapshot => {
  console.log(snapshot);
})
