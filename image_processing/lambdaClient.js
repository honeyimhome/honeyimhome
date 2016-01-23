
var unirest = require('unirest');
var fs = require('fs');

var APIKEY = '4QadXMfQOBmshnqPYVNW17aGXPUBp1rFl9jjsnfdUCjJbfqUMy';

// The API requires that album names be unique
var generateUniqueAlbumName = function(albumName){
  return APIKEY + albumName;
};

// Creates a new album. Gives the callback the result.
exports.createAlbum = function(albumName, callback){
  unirest.post("https://lambda-face-recognition.p.mashape.com/album")
  .header("X-Mashape-Key", APIKEY)
  .header("Content-Type", "application/x-www-form-urlencoded")
  .header("Accept", "application/json")
  .send("album="  + generateUniqueAlbumName(albumName))
  .end(function (result) {
    var error;
    if(result.body.error){
      error = new Error(result.body.error);
    }
    callback(result.body, error);
  });
};

// This function needs to be called whenever you add training images to the album.
exports.rebuildAlbum = function(albumName, albumKey, callback){
  // These code snippets use an open-source library. http://unirest.io/nodejs
  unirest.get("https://lambda-face-recognition.p.mashape.com/album_rebuild?album="+ albumName +"&albumkey=" + albumKey)
  .header("X-Mashape-Key", APIKEY)
  .header("Accept", "application/json")
  .end(function (result) {
    var error;
    if(result.body.error){
      error = new Error(result.body.error);
    }
    callback(result.body, error);
  });
};

exports.addTrainingImage = function(albumName, albumKey, userName, imgPath, callback){
  // These code snippets use an open-source library.
  unirest.post("https://lambda-face-recognition.p.mashape.com/album_train")
  .header("X-Mashape-Key", APIKEY)
  .field("album", albumName)
  .field("albumkey", albumKey)
  .field("entryid", userName)
  .attach("files", fs.createReadStream(imgPath))
  .end(function (result) {
    var error;
    if(result.body.error){
      error = new Error(result.body.error);
    }
    callback(result.body, error);
  });
};

exports.recognizeFace = function(albumName, albumKey, imgPath, callback){
  // These code snippets use an open-source library. http://unirest.io/nodejs
  unirest.post("https://lambda-face-recognition.p.mashape.com/recognize")
  .header("X-Mashape-Key", APIKEY)
  .field("album", albumName)
  .field("albumkey", albumKey)
  .attach("files", fs.createReadStream(imgPath))
  .end(function (result) {
    var error;
    if(result.body.error){
      error = new Error(result.body.error);
    }
    callback(result.body, error);
  });
};
