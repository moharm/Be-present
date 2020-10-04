const faceapi = require("face-api.js")  
const canvas = require("canvas")  
require('@tensorflow/tfjs-node');
const fs = require("fs")  
const path = require("path")

module.exports = function(req,res) {

// mokey pathing the faceapi canvas
const { Canvas, Image, ImageData } = canvas  
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

// SsdMobilenetv1Options
const minConfidence = 0.5

const faceDetectionOptions = new faceapi.SsdMobilenetv1Options({ minConfidence })
// D:\disktop\Stage 2\gestion d'absence\login register\store\Classes\IRISI_1\Archive
// simple utils to save files
const baseDir = path.resolve(__dirname, '../store/Classes/'+req.session.classe.lebelle+'/Archive')  
function saveFile(fileName, buf) {  
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir)
    }
    // this is ok for prototyping but using sync methods
    // is bad practice in NodeJS
    fs.writeFileSync(path.resolve(baseDir, fileName), buf)
  }

Promise.all([
          // load weights
    faceapi.nets.ssdMobilenetv1.loadFromDisk('./assets/weights'),
    faceapi.nets.faceLandmark68Net.loadFromDisk('./assets/weights'),
    faceapi.nets.faceRecognitionNet.loadFromDisk('./assets/weights')

]).then(run).catch(reason => { 
    console.log(reason)
  });



async function run() {

  let rawdata = fs.readFileSync('store/Classes/'+req.session.classe.lebelle+'/Dataset/faces.json');
let result = JSON.parse(rawdata);
const test = await loadLabeledImages(result)

    const faceMatcher = new faceapi.FaceMatcher(test, 0.6)

    // load the image
    const image = await canvas.loadImage('store/ClasseImages/Classe_'+req.session.classe.lebelle+'_'+req.session.date+'.jpg')


    // create a new canvas and draw the detection and landmarks
    const can = faceapi.createCanvasFromMedia(image)

    const displaySize = { width: image.width, height: image.height }

        // detect the faces with landmarks
        const detections = await faceapi.detectAllFaces(image, faceDetectionOptions)
        .withFaceLandmarks().withFaceDescriptors()
        const resizedDetections = faceapi.resizeResults(detections, displaySize)
        const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
        let Presences = []
        results.forEach((result, i) => {
            Presences.push(result.toString())
          const box = resizedDetections[i].detection.box
          const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
          drawBox.draw(can)
        })

        
        let EtudiantsPresentId = []
        console.log(req.session.date)
        Presences.forEach((present) => {
          if(present.split(' ')[0] != 'unknown'){
            var ID = present.split('_')[1].split(' ')[0];
            EtudiantsPresentId.push(ID)
          }
        })
        req.session.Presences = EtudiantsPresentId
        console.log(EtudiantsPresentId)
        // seance_model.GetAbsence(req,res,EtudiantsPresentId)
    // save the new canvas as image
    saveFile('Classe_'+req.session.classe.lebelle +'_'+ Date.now()+'.jpg', can.toBuffer('image/jpeg'))
    console.log('done, saved ')

    fs.unlinkSync('store/ClasseImages/Classe_'+req.session.classe.lebelle+'_'+req.session.date+'.jpg')
    res.redirect("/professeur/seance/result")

}
async function loadLabeledImages(data) {
    return Promise.all(
        data.map(async user => {
          // console.log
          let descriptors = user.descriptors.map(desc => {
            if (desc.descriptor) {
              let descArray = []
              for (var i in desc.descriptor) {
                descArray.push(parseFloat(desc.descriptor[i]))
              }
              return new Float32Array(descArray)
            }
          })
          return new faceapi.LabeledFaceDescriptors(user.user, descriptors)
        })
     
    ).catch(reason => { 
        console.log(reason)
      });

  }
}

