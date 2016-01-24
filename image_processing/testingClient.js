var client = require('./lambdaClient.js');

// var newAlbum = {};
//
// client.createAlbum("NEWTESTALBUM", function(result, error){
//   if (error) throw error;
//   newAlbum = {albumName: result.album, albumKey: result.albumkey}
// });

var album = { albumName: 'vhuvp5LKlqmsh8SRrw5l6H08eJnDp1MJDr2jsnCe40HSfVS6P9Our_House',
  albumKey: '7d48dab9cd0f5679338dd72d8c0d3c8d0da0767cdac87d710096ca10917bf406' }


// client.rebuildAlbum(album.albumName, album.albumKey, function(result, error){
//   if(error) throw error;
// });

client.addTrainingImage(album.albumName, album.albumKey, '56a49e61236d0c22063bf49d', "./p1.jpg", function(result, error){
  if(error) throw error;
  console.log(result);
});

client.addTrainingImage(album.albumName, album.albumKey, '56a49e61236d0c22063bf49d', "./p2.jpg", function(result, error){
  if(error) throw error;
  console.log(result);
});

client.addTrainingImage(album.albumName, album.albumKey, '56a49e61236d0c22063bf49d', "./p3.jpg", function(result, error){
  if(error) throw error;
  console.log(result);
});

client.addTrainingImage(album.albumName, album.albumKey, '56a49e61236d0c22063bf49d', "./p4.jpg", function(result, error){
  if(error) throw error;
  console.log(result);
});

client.addTrainingImage(album.albumName, album.albumKey, '56a49e61236d0c22063bf49d', "./p5.jpg", function(result, error){
  if(error) throw error;
  console.log(result);
});

client.addTrainingImage(album.albumName, album.albumKey, '56a49e61236d0c22063bf49d', "./p6.jpg", function(result, error){
  if(error) throw error;
  console.log(result);
});

client.addTrainingImage(album.albumName, album.albumKey, '56a49e61236d0c22063bf49d', "./p7.jpg", function(result, error){
  if(error) throw error;
  console.log(result);
});

client.addTrainingImage(album.albumName, album.albumKey, '56a49e61236d0c22063bf49d', "./p8.jpg", function(result, error){
  if(error) throw error;
  console.log(result);
});

client.addTrainingImage(album.albumName, album.albumKey, '56a49e61236d0c22063bf49d', "./p9.jpg", function(result, error){
  if(error) throw error;
  console.log(result);
});

// client.recognizeFace(album.albumName, album.albumKey, "./images/bradley5.jpg", function(result, error){
//   if(error) throw error;
//   console.log(result.photos[0].tags[0].uids[0].prediction);
// });
