// {"name":"diana","gender":"female","samples":36,"accuracy":100,"duration":"41ms"}
// const MyKey = require('../apiKey.js');


var arrayOfNames =[];

var queryName = function(name){
  urlConstructor(name);

  // makeRequest(url, requestComplete);
}

var isNameNew = function(newName){
  var nameMatch = false;
  for (element of arrayOfNames){
    if (element == newName){
      return true;
    } else {
      var nameMatch = false;
    }
  }
  return nameMatch;
}

var searchInputText = function(name){
  var capitalizeFirstLetter =function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)};
    var upperName= capitalizeFirstLetter(name);
    console.log(isNameNew(upperName));
    if (isNameNew(upperName) == true)
      return;
    else {
      arrayOfNames.push(upperName);
      console.log(arrayOfNames);
      updateArrayOfNamesList(upperName);
      printToLatest(upperName);
      queryName(name);
    }

};

var printToLatest = function(name){
var gender ="";
var output = document.querySelector('#output')
output.innerText ="Latest Name Searched: " + name + " Gender: "+ gender;
};

var updateArrayOfNamesList= function(name){
  var arrayOutput= document.querySelector('#array-output');
  arrayOutput.innerHTML ='';
  for (name of arrayOfNames){
    var newLi = document.createElement("li");
    newLi.innerText= name;
    arrayOutput.appendChild(newLi);
  }
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
  console.log(returnInfo);
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

var urlConstructor= function(name){
  url = 'https://gender-api.com/get?key=' + MyKey + '&name=' + name;
  console.log(url);
  console.log(MyKey);
  // return url;
};


// Gson gson = new Gson();
// JsonObject json = gson.fromJson(reader, JsonObject.class);
// String gender = json.get("gender").getAsString();


window.addEventListener('load', app);
