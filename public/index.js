

// Global Variables
var arrayOfCachedInfo = [];
var arrayOfNamesSearchedThisSession =[];

// New Query to API

var incomingInformationDissemination = function(incomingParsedData){
  arrayOfCachedInfo.push(incomingParsedData);
  console.log(incomingParsedData);
  console.log(arrayOfCachedInfo);
  addNameToLastestSearchesInfo(incomingParsedData);
  printToLatestInfoBox(incomingParsedData);
}

// Dealing with previously entered names and displaying the information

var searchExistingNames = function(typedName){
  if (doesNameExistInCachedNames(typedName) == true){
    return;
  } else {
    queryName(typedName);
  }
}

var doesNameExistInCachedNames = function(typedName){
  var nameDoesntExist = false;
  for (element of arrayOfCachedInfo){
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

var isLastestSearchAlreadyInLatestSearches = function(latestSearch){
    var alreadyExists = false;
  for (element of arrayOfNamesSearchedThisSession){
    if (element['name'] == latestSearch['name']){
      return alreadyExists = true;
    } else {
      alreadyExists = false;
    }
  }
}


// Output of data to the webpage

var addNameToLastestSearchesInfo= function(newElement){
  if (isLastestSearchAlreadyInLatestSearches(newElement) == true) {
    outputToArrayOfLatestSearches();

  } else {
    arrayOfNamesSearchedThisSession.push(newElement);
    outputToArrayOfLatestSearches();

  }
}

var outputToArrayOfLatestSearches = function(){
  var latestSearchList= document.querySelector('#array-output');
  latestSearchList.innerHTML ='';
  let arrayReversed = arrayOfNamesSearchedThisSession.reverse();
  for (element of arrayReversed){
    var newLi = document.createElement("li");
    newLi.innerText = "name: " + element['name'] + " : "+ element['gender']+ " : " + element['samples'] + " : " + element['accuracy'] + "%  accuracy"
    latestSearchList.appendChild(newLi);
  }
  arrayReversed.reverse();
}

var printToLatestInfoBox = function(nameInfoToPrint){
  var objectToPrint = nameInfoToPrint;
  var output = document.querySelector('#output')
  output.innerText ="Result: " + objectToPrint['name'] + " : "+ objectToPrint['gender']+ " with " + objectToPrint['samples'] + " samples at " + objectToPrint['accuracy'] + "%  accuracy"
};


// Dealing with API request and receiving reply

var queryName = function(name){
  urlConstructor(name);
  makeRequest(url, requestComplete);
}

var urlConstructor= function(name){
  url = 'https://gender-api.com/get?key=' + MyKey + '&name=' + name;
  return url;
};

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
  parsedInfo = JSON.parse(jsonString);
  incomingInformationDissemination(parsedInfo);
  localStorageUpdate();
};


// Local Storage Retrieval and Updating

var localStorageUpdate = function(){
  let jsonString2 = JSON.stringify(arrayOfHashObjects);
  localStorage.setItem('namesGenders', jsonString2);
}

var retrieveInfoFromLocalStorage = function(){
  var jsonString1 = localStorage.getItem('namesGenders');
  arrayOfHashObjects = JSON.parse(jsonString1);
  console.log(arrayOfHashObjects);
}


// EventListener and App

var respondToEnterKey = function(event){
  var searchBox = document.querySelector('#search-box')
  if (event.keyCode == 13){
    var nameTyped = searchBox.value;
    var downcasedNameTyped = nameTyped.toLowerCase();
    searchExistingNames(downcasedNameTyped);
    searchBox.value ="";
  }
}

var app = function(){
  retrieveInfoFromLocalStorage();
  window.addEventListener('keyup', function(event){
    respondToEnterKey(event)
  })
};

window.addEventListener('load', app);
