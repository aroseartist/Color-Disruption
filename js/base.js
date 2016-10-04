/* Globals + Origin Request */
var APIGalleryRequest = "https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=8eb8da4356796d2c696189ad21f41932&gallery_id=72157668201916531&format=json&nojsoncallback=1&auth_token=72157674671916656-b173885097bbdeab&api_sig=f3192ee08bf78e72b0a8c3bb39493a71";
//Empty array to fill with image URLs
var imgIDArray = [];
//Initial imag URL index for looping & displaying
var imgIndexPosition = 0;

/*  */
//Anon function executes async once state change is registered
function getRequest(APIurl, JSONResponse) {
    var xmlhttp = new XMLHttpRequest();
    //If state change is a full response of the request
    xmlhttp.onreadystatechange = function() {
        //If state change is a full response of the request
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            //And if no errors:
            if (xmlhttp.status == 200) {
                //Collect JSON object & parse
                var JSONIdResponse = JSON.parse(xmlhttp.responseText);
                //Push JSON blob objects into div as thumbnail
                if (JSONResponse) {
                    JSONResponse(JSONIdResponse);
                }
            }
            //Notice if error
            else {
                alert('Hmm, something other than 200 was returned');
            }
        }
    };
    //Feed API response to anan function once recvd
    xmlhttp.open("GET", APIurl);
    xmlhttp.send();
}

//Propogate imgs into array for use
function imgArrayQuery(galleryJSON) {
    imgIDArray = galleryJSON['photos'].photo;
    return galleryJSON['photos'].photo;
}

//From the array insert offer each indexed obj to following functions
function imgView(JSONResponse) {
    var images = imgArrayQuery(JSONResponse);
    for (var i = 0; i < images.length; i++) {
        insertImg(images[i]);
        createLtBox(images[i]);
    }
}

//Set lightbox as hidden until called
function hideLtBox() {
    document.getElementById("ltBoxWrap").style.visibility = "hidden";
}

//View lightbox when 
function displayLtBox(url) {
    var title = img.title;
    document.getElementById("ltBoxWrap").style.visibility = "visible";
    changeLightBoxImage(url);
}

// Previous Image
function navL(JSONResponse){
    if (imgIndexPosition > 0){
        imgIndexPosition --;
        var img = imgIDArray[imgIndexPosition];
        var APIImgUrl = prepareUrl(img);
        var title = img.title;
        changeLightBoxImage(APIImgUrl);
  }
}

// Next Image
function navR(JSONResponse) {
    if (imgIndexPosition < imgIDArray.length - 1) {
         imgIndexPosition ++;
         var img = imgIDArray[imgIndexPosition];
         var APIImgUrl = prepareUrl(img);
         var title = img.title;
         changeLightBoxImage(APIImgUrl);
  }
}

// DOM Manipulation
function insertImg(photo){
  var thumbnailDiv = buildThumbnailDiv(photo);
  document.getElementById('img-thumbnails').appendChild(thumbnailDiv);
}

// Templating Section 
function buildThumbnailDiv(photo){
    var APIImgUrl  = prepareUrl(photo);
    var innerBx = '<div class="title">' + photo.title + '</div>' + '<div class="image-box">' + '<div class="imageholder"><img src="' + APIImgUrl + '"/>' + '</div></div>';
    var newImgDiv = document.createElement("div");
    newImgDiv.setAttribute("class", "thumbnail");
    newImgDiv.setAttribute("onClick", "displayLtBox(\'" + APIImgUrl + "\')");
    newImgDiv.innerHTML = innerBx;
    return newImgDiv;
}

/* Helper Functions */

function prepareUrl(imgObject){
    return 'https://farm8.staticflickr.com/' + imgObject.server + '/'+ imgObject.id + '_' + imgObject.secret + '.jpg';
}

function changeLightBoxImage(imgurl){
    document.getElementById("ltBoxImg").innerHTML = '<img class="lightboximage"  src="' + imgurl + '"/>';
}

function createLtBox(photo)  {
  var APIImgUrl = prepareUrl(photo); 
  changeLightBoxImage(APIImgUrl);
 }