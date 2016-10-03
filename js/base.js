// globals
var APIGalleryRequest = "https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=0d41bb353ee154a459eeb3dc97854647&gallery_id=72157668201916531&format=rest&auth_token=72157671220547264-7321f6da451d24e9&api_sig=ddffc9970a672456b7ac62ce78e1dda7";
var imgIDArray = [];
var imgIndexPosition = 0;

// anon function executes asyncronously once a state change is registered
function getRequest(APIurl, JSONResponse) {
    var xmlhttp = new XMLHttpRequest();
    // if the state change is a full response of the request
    xmlhttp.onreadystatechange = function() {
        // if the state change is a full response of the request
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            // and if no errors:
            if (xmlhttp.status == 200) {
                // Collect JSON object & parse
                var JSONIdResponse = JSON.parse(xmlhttp.responseText);
                // push JSON blob objects into thumbnail grid
                if (JSONResponse) {
                    JSONResponse(JSONIdResponse)
                };
            // to do if errors:
            else if (xmlhttp.status == 400) {
                alert('Oops!: Error 400');
            } else {
                alert('Hmm, something other than 200 was returned');
            }
        }
        // feed API response to anan function once recvd
        xmlhttp.open("GET", APIGalleryRequest);
        xmlhttp.send();
    }
};

function imgArrayQuery(galleryJSON) {
    imgArray = galleryJSON['photos'].photo;
    return galleryJSON['photos'].photo;
};

function imgView(JSONResponse) {
    var images = imgArrayQuery(JSONResponse);
    for (var i = 0; i < images.length; i++) {
        addToGrid(images[i]);
        createLtBox(images[i]);
    };
}
