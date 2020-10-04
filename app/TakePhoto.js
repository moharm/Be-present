var NodeWebcam = require( "node-webcam" );

module.exports = function(Num_Camera) {

    //Default options
 
var opts = {
 
    //Picture related
 
    width: 1280,
 
    height: 720,
 
    quality: 100,
 
 
    //Delay in seconds to take shot
    //if the platform supports miliseconds
    //use a float (0.1)
    //Currently only on windows
 
    delay: 0,
 
 
    //Save shots in memory
 
    saveShots: false,
 
 
    // [jpeg, png] support varies
    // Webcam.OutputTypes
 
    output: "jpeg",
 
 
    //Which camera to use
    //Use Webcam.list() for results
    //false for default device
 
    device: Num_Camera,
 
 
    // [location, buffer, base64]
    // Webcam.CallbackReturnTypes
 
    callbackReturn: "base64",
 
 
    //Logging
 
    verbose: true
 
};
 
 
//Creates webcam instance
 
var Webcam = NodeWebcam.create( opts );
Webcam.list( l => { console.log(" -> " + l); })

return Webcam

}