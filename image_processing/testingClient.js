var client = require('./lambdaClient.js');

var newAlbum = {};

client.createAlbum("NEWTESTALBUM", function(result, error){
  if (error) throw error;
  newAlbum = {albumName: result.album, albumKey: result.albumkey}
});

var album = { oldAlbumName: 'NEWTESTALBUM',
  newAlbumName: '4QadXMfQOBmshnqPYVNW17aGXPUBp1rFl9jjsnfdUCjJbfqUMyNEWTESTALBUM',
  albumKey: '24af1768cc902f65191c51ecf757e549bba56c441700c8fae7eb3180783f6fa3' }


client.rebuildAlbum(album.newAlbumName, album.albumKey, function(result, error){
  if(error) throw error;
});

client.addTrainingImage(album.newAlbumName, album.albumKey, "bradley", "./images/bradley1.jpg", function(result, error){
  if(error) throw error;
  console.log(result);
});

client.recognizeFace(album.newAlbumName, album.albumKey, "./images/bradley5.jpg", function(result, error){
  if(error) throw error;
  console.log(result.photos[0].tags[0].uids[0].prediction);
});
