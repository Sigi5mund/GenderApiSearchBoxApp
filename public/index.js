

// {"name":"diana","gender":"female","samples":36,"accuracy":100,"duration":"41ms"}


// Dealing with name and preventing API being requested on name that already has been queried.




var arrayOfHashObjects = [];

var arrayOfNamesSearchedThisSession =[];
// var arrayOfHashObjects = [];
// var diana = {"name":"diana","gender":"female","samples":36,"accuracy":100,"duration":"41ms"};
// var andrew = {"name": "andrew", gender: "male", samples: 82448, accuracy: 99, duration: "40ms"};
// arrayOfHashObjects.push(diana);
// arrayOfHashObjects.push(andrew);



var searchExistingNames = function(typedName){
  if (doesNameExist(typedName) == true){

    return;
  } else {
    queryName(typedName);

  }
}


var addNameToLastestSearchesInfo= function(newElement){
  var alreadyExists = false;
  for (element of arrayOfNamesSearchedThisSession){
    if (element['name'] == newElement['name']){
      return alreadyExists = true;
    } else {
      alreadyExists = false;
    }
  }
  if (alreadyExists == true) {
    outputToArrayOfLatestSearches();
  } else {
    arrayOfNamesSearchedThisSession.push(newElement);
    outputToArrayOfLatestSearches();
  }
}


var outputToArrayOfLatestSearches = function(){
  var arrayOutput= document.querySelector('#array-output');
  arrayOutput.innerHTML ='';
  let array1 = arrayOfNamesSearchedThisSession.reverse();
  for (element of array1){
    var newLi = document.createElement("li");
    newLi.innerText = "name: " + element['name'] + " : "+ element['gender']+ " : " + element['samples'] + " : " + element['accuracy'] + "%  accuracy"
    arrayOutput.appendChild(newLi);
  }
  array1.reverse();
}


var doesNameExist = function(typedName){
  var nameDoesntExist = false;
  for (element of arrayOfHashObjects){
    if (element['name'] == typedName){
      printToLatestInfoBox(element);
      addNameToLastestSearchesInfo(element);
      return true;
    } else {
      nameDoesntExist = false;
    }
  }
  return nameDoesntExist;
}

var printToLatestInfoBox = function(nameInfoToPrint){
  var objectToPrint = nameInfoToPrint;
  var name = objectToPrint['name'];
  var output = document.querySelector('#output')
  output.innerText ="Result: " + objectToPrint['name'] + " : "+ objectToPrint['gender']+ " with " + objectToPrint['samples'] + " samples at " + objectToPrint['accuracy'] + "%  accuracy"
};



// Dealing with API request and receiving reply

var queryName = function(name){
  urlConstructor(name);
  console.log('API has been pinged!');
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
  returnInfo = JSON.parse(jsonString);
  arrayOfHashObjects.push(returnInfo);
  console.log(returnInfo);
  console.log(arrayOfHashObjects);
  addNameToLastestSearchesInfo(returnInfo);
  printToLatestInfoBox(returnInfo);
  let jsonString2 = JSON.stringify(arrayOfHashObjects);
  localStorage.setItem('namesGenders', jsonString2);
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
      var nameTyped = searchBox.value;
      searchExistingNames(nameTyped);
      searchBox.value ="";
    }

  })
  var jsonString1 = localStorage.getItem('namesGenders');
  arrayOfHashObjects = JSON.parse(jsonString1);
  console.log(arrayOfHashObjects);
};





window.addEventListener('load', app);


// var capitalizeFirstLetter =function(string) {
// return string.charAt(0).toUpperCase() + string.slice(1)};
