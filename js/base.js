//Globals and origin request
var APIGalleryRequest = "https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=8eb8da4356796d2c696189ad21f41932&gallery_id=72157668201916531&format=json&nojsoncallback=1&auth_token=72157674671916656-b173885097bbdeab&api_sig=f3192ee08bf78e72b0a8c3bb39493a71";
//Empty array to fill with image URLs
var imgIDArray = [];
//Initial imag URL index for looping & displaying
var imgIndexPosition = 0;

//Anon function executes async once state change is registered
function getRequest(APIurl, JSONResponse) {
    var xmlhttp = new XMLHttpRequest();
    //If state change is a full response of the request
    xmlhttp.onreadystatechange = function() {
        // if the state change is a full response of the request
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            // and if no errors:
            if (xmlhttp.status == 200) {
                // Collect JSON object & parse
                var JSONIdResponse = JSON.parse(xmlhttp.responseText);
                // push JSON blob objects into thumbnail grid
                if (JSONResponse) {
                    JSONResponse(JSONIdResponse);
                }
            }
            else {
                alert('Hmm, something other than 200 was returned');
            }
        }
        // feed API response to anan function once recvd
    };
     xmlhttp.open("GET", APIurl);
     xmlhttp.send();
}

function imgArrayQuery(galleryJSON) {
    imgIDArray = galleryJSON['photos'].photo;
    return galleryJSON['photos'].photo;
}

function imgView(JSONResponse) {
    var images = imgArrayQuery(JSONResponse);
    for (var i = 0; i < images.length; i++) {
        insertImg(images[i]);
        createLtBox(images[i]);
    }
}

function hideLtBox() {
    document.getElementById("ltBoxWrap").style.visibility = "hidden";
}

function displayLtBox(url) {
    document.getElementById("ltBoxWrap").style.visibility = "visible";
    changeLightBoxImage(url);
}

// Previous Image
function navL(JSONResponse){
    if (imgIndexPosition > 0){
        imgIndexPosition --;
        var img = imgIDArray[imgIndexPosition];
        var APIImgUrl = prepareUrl(img);
        changeLightBoxImage(APIImgUrl);
  }
}

// Next Image

function navR(JSONResponse) {
    if (imgIndexPosition < imgIDArray.length - 1) {
         imgIndexPosition ++;
         var img = imgIDArray[imgIndexPosition];
         var APIImgUrl = prepareUrl(img);
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
    var innerBx = '<div class="image-box">' + '<div class="imageholder"><img src="' + APIImgUrl + '"/></div>' + '</div>';

    var newImgDiv = document.createElement("div");
    newImgDiv.setAttribute("class", "thumbnail");
    newImgDiv.setAttribute("onClick", "displayLtBox(\'" + APIImgUrl + "\')");
    newImgDiv.innerHTML = innerBx;
    return newImgDiv;
}

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