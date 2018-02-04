

// {"name":"diana","gender":"female","samples":36,"accuracy":100,"duration":"41ms"}


// Dealing with name and preventing API being requested on name that already has been queried.

var arrayOfNames =[];
var returnInfo =  {"name":"diana","gender":"female","samples":36,"accuracy":100,"duration":"41ms"};



var searchInputText = function(name){
    var upperName= capitalizeFirstLetter(name);
    printToLatest(upperName);
    if (isNameNew(upperName) == true)
      return;
    else {
      arrayOfNames.push(upperName);
      console.log(arrayOfNames);
      updateArrayOfNamesList();
      queryName(name);
    }
};

var printToLatest = function(name){
  var gender = returnInfo['gender'];
  var samples = returnInfo['samples'];
  var accuracy = returnInfo['accuracy'];
  console.log(accuracy);
  console.log(gender);
  console.log(sample);
  var output = document.querySelector('#output')
  output.innerText ="Result: " + name + " : "+ gender + " with " + samples + " samples at " + accuracy + "%  accuracy"
};

var isNameNew = function(newName){
  var nameMatch = false;
  for (element of arrayOfNames){
    if (element == newName){
      // var gender = element['gender'];
      // var samples = element['samples'];
      // var accuracy = element['accuracy'];
      return true;
    } else {
      var nameMatch = false;
    }
  }
  return nameMatch;
}

var updateArrayOfNamesList= function(){
  var arrayOutput= document.querySelector('#array-output');
  arrayOutput.innerHTML ='';
  let array1 = arrayOfNames.reverse();
  for (element of array1){
    var newLi = document.createElement("li");
    newLi.innerText= element;
    arrayOutput.appendChild(newLi);
  }
  array1.reverse();
}



// Dealing with API request and receiving reply

var queryName = function(name){
  urlConstructor(name);
  makeRequest(url, requestComplete);
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', callback);
  request.send();
};

var requestComplete = function() {
  if (this.status !== 200)
  return;
  var jsonString = this.responseText;

  // returnInfo = JSON.parse(jsonString);
  console.log(returnInfo);
};

var urlConstructor= function(name){
  url = 'https://gender-api.com/get?key=' + MyKey + '&name=' + name;
  console.log(url);
  console.log(MyKey);
  return url;
};







var app = function(){
  var searchBox = document.querySelector('#search-box')
   window.addEventListener('keyup', function(e){
    if (e.keyCode == 13){
      var name = searchBox.value;
      searchInputText(name);
      searchBox.value ="";
    }
  })
};



var capitalizeFirstLetter =function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)};




// var jsonString = JSON.stringify(pet);
// localStorage.setItem('pet', jsonString);

// var jsonString = localStorage.getItem('pet');
// var savedPet = JSON.parse(jsonString);


window.addEventListener('load', app);
