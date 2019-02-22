window.onload = initialize;
var file = null;

function initialize() {
    document.getElementById("form-users").addEventListener("submit", submitData);
    document.getElementById("img-file").addEventListener("change", changeImage);
    document.getElementById("photo").addEventListener("click", getImage);
}

function submitData(event) {
    event.preventDefault();

    uploadData(event.target.name.value);
}

function changeImage(event) {
    if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("photo").src = e.target.result;
        }
        file = event.target.files;
        reader.readAsDataURL(event.target.files[0]);
    }
}

function getImage(event) {
    document.getElementById("img-file").click();
}

function uploadData(name){
    var uploadTask = firebase.storage().ref().child('images/' + file[0].name).put(file[0]);
  
    uploadTask.on('state_changed',
      (snapshot) => {
          // show progress here
      },
      (error) => {
        console.log(error);
      }, 
      () => {
        firebase.storage().ref().child('images/' + file[0].name).getDownloadURL().then((url) => {
            firebase.database().ref().child("users").push({
                name: name,
                url: url
            });
          }).catch(function(error) {
            // Handle any errors here
          });
      });
  }