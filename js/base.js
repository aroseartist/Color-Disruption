/* Globals + Origin Request */
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
            //Alert if there's an error
            else {
                alert('Hmm, something other than 200 was returned');
            }
        }
    };
    //Feed API response to anan function once recvd
    xmlhttp.open("GET", APIurl);
    xmlhttp.send();
}
function imgArrayQuery(galleryJSON) {
    //Append img urls from JSON into array
    imgIDArray = galleryJSON['photos'].photo;
    return galleryJSON['photos'].photo;
}
function imgView(JSONResponse) {
    var images = imgArrayQuery(JSONResponse);
    //For each img obj pass to thumbnail & ltbx functions for use
    for (var i = 0; i < images.length; i++) {
        //Thumbnails
        insertImg(images[i]);
        //Lightbox
        createLtBox(images[i]);
    }
}
//Template for thumbnails and lightbox setup
function buildThumbnailDiv(photo) {
    var APIImgUrl  = prepareUrl(photo);
    //Define ltbox elements
    var innerBx = '<div class="image-box">' + '<div class="imageholder"><img src="' + APIImgUrl + '"/>' + '</div></div>';
    var newImgDiv = document.createElement("div");
    newImgDiv.setAttribute("class", "thumbnail");
    newImgDiv.setAttribute("onClick", "displayLtBox(\'" + APIImgUrl + "\',\'" + photo.title + "\')");
    newImgDiv.innerHTML = innerBx;
    return newImgDiv;
}
//Image inserting into the DOM
function insertImg(photo) {
    var thumbnailDiv = buildThumbnailDiv(photo);
    document.getElementById('img-thumbnails').appendChild(thumbnailDiv);
}

/* Lightbox Functions */

//Set lightbox as hidden until called
function hideLtBox() {
    document.getElementById("ltBoxWrap").style.visibility = "hidden";
}
//View lightbox when state change (click)
function displayLtBox(url, title) {
    document.getElementById("ltBoxWrap").style.visibility = "visible";
    changeLightBoxImage(url, title);
}
//Prior Img: pass info
function navL(JSONResponse){
    if (imgIndexPosition > 0) {
        //Step back one index at a time
        imgIndexPosition --;
        var img = imgIDArray[imgIndexPosition];
        var APIImgUrl = prepareUrl(img);
        changeLightBoxImage(APIImgUrl, img.title);
    }
}
//Following Img: pass info
function navR(JSONResponse) {
    if (imgIndexPosition < imgIDArray.length - 1) {
         imgIndexPosition ++;
         //Move forward on index at a time
         var img = imgIDArray[imgIndexPosition];
         var APIImgUrl = prepareUrl(img);
         changeLightBoxImage(APIImgUrl, img.title);
    }
}

/* Helper Functions */

//Develop img URL to pass along to functions
function prepareUrl(imgObject) {
    return 'https://farm8.staticflickr.com/' + imgObject.server + '/'+ imgObject.id + '_' + imgObject.secret + '.jpg';
}
//Lightbox elements to use for each transition
function changeLightBoxImage(imgUrl, title) {
    document.getElementById("ltBoxImg").innerHTML = '<img class="lightboximage"  src="' + imgUrl + '"/>';
    document.getElementById("ltTitle").textContent = title && title.length > 0 ? title: ".....";
}
//Instantiate lightbox use
function createLtBox(photo) {
  var APIImgUrl = prepareUrl(photo); 
  changeLightBoxImage(APIImgUrl, photo.title);
}