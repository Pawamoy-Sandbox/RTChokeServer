// Look after different browser vendors' ways of calling the getUserMedia()
//  API method:
// Opera --> getUserMedia
// Chrome --> webkitGetUserMedia
// Firefox --> mozGetUserMedia
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var stream;

var video = document.querySelector("video");

// Define local variables associated with video resolution selection
// buttons in the HTML page
var vgaButton = document.querySelector("#vga");
var qvgaButton = document.querySelector("#qvga");


// Callback to be called in case of success...
function successCallback(gotStream) 
{
    // Note: make the returned stream available to console for inspection
    window.stream = gotStream;
    if (window.URL) 
    {
        // Chrome case: URL.createObjectURL() converts a MediaStream to a blob URL
        video.src = window.URL.createObjectURL(stream);
    }
    else 
    {
        // Firefox and Opera: the src of the video can be set directly from the stream
        video.src = stream;
    }
    // We're all set. Let's just play the video out!
    video.play();
}
// Callback to be called in case of failures...
function errorCallback(error)
{
    console.log("navigator.getUserMedia error: ", error);
}

// Constraints object for low resolution video
var qvgaConstraints = {
audio: true, 
video: {
mandatory: {
maxWidth: 320,
maxHeight: 240
}
}
};
// Constraints object for standard resolution video
var vgaConstraints = {
    audio: true, 
    video: 
    {
        mandatory: {
        maxWidth: 640,
        maxHeight: 480
            }
    }
};
// Associate actions with buttons:
qvgaButton.onclick = function(){getMedia(qvgaConstraints)};
vgaButton.onclick = function(){getMedia(vgaConstraints)};


function getMedia(constraints)
{
    if (!!stream)
    {
        video.src = null;
        stream.stop();
    }
    
    // Main action: just call getUserMedia() on the navigator object
    navigator.getUserMedia(constraints, successCallback, errorCallback);
}
