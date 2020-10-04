const faceapi = require("face-api.js")  
const canvas = require("canvas")  
require('@tensorflow/tfjs-node');
const fs = require("fs")  
const { join } = require("path")
module.exports = async function(req,res,labels) {

// mokey pathing the faceapi canvas
const { Canvas, Image, ImageData } = canvas  
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })


const dataFolder = './store/Classes/'+req.body.classeName+'/dataSet'
const facesFileName = 'faces.json'

const faces = []
var Go = 0;


Promise.all([
          // load weights
          faceapi.nets.ssdMobilenetv1.loadFromDisk('./assets/weights'),
          faceapi.nets.faceLandmark68Net.loadFromDisk('./assets/weights'),
          faceapi.nets.faceRecognitionNet.loadFromDisk('./assets/weights')

]).then(loadLabeledImages).catch(reason => { 
    console.log(reason)
  });



async function run() {

    // const labeledFaceDescriptors = await loadLabeledImages()
    const content = JSON.stringify(faces)
    console.log("pp")
    // console.log(content)
    if(!fs.existsSync(dataFolder)){
        fs.mkdirSync(dataFolder, { recursive: true })
        fs.writeFileSync(join(dataFolder, facesFileName), content)

    }else{

    fs.writeFileSync(join(dataFolder, facesFileName), content)
    }
    res.send({"success": true})
}
async function loadLabeledImages() {

    var folder = ``
    console.log(labels)
  return Promise.all(
      labels.map( label => {

        
        const descriptors=[];
        folder = `./store/classes/`+req.body.classeName+`/EtudiantsImages/`+label
        
        fs.readdir(folder,async (err, files) => {
        for (let i = 0; i < files.length; i++) {

                // console.log(`store/classes/`+req.body.classeName+`/EtudiantsImages/`+label+`/`+files[i])

                const img = await canvas.loadImage(`./store/classes/`+req.body.classeName+`/EtudiantsImages/`+label+`/`+files[i])
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
      
              //   descriptions.push(detections.descriptor)
      
                  descriptors.push({
                    path: `./store/classes/`+req.body.classeName+`/EtudiantsImages/`+label+`/`+files[i],
                    descriptor: detections.descriptor
                  })  
              
                  if(files.length == i+1){
                      Go++
                  }         
                  if(Go == labels.length){
                      run()
                  } 
                };
          });
   
        faces.push({
            user: label,
            descriptors: descriptors
          })
        // return faces

        
      })
    ).catch(reason => { 
        console.log(reason)
      });

  }

}