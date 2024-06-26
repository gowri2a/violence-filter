// script.js
//import { globalimageUrls } from './results.js';
// Function to handle image classification
// Define addMessageListener() outside of any other function


// Call myFunction() when needed


chrome.runtime.onMessage.addListener((msg, sender) => {
        console.log('Message received:', msg);
        console.log('Sender says hiii:', sender);
  
        if (msg && msg.action === 'background:scrapeProcessed' && msg.imageUrls) {
            window.globalVariable = msg.imageUrls;
            console.log('Received image URLs:', msg.imageUrls);
        } else {
            console.log('Invalid message format or missing data.');
        }
});


// Call addMessageListener() whenever you need to add the listener
//addMessageListener();

async function classifyImage() {
     // Call addMessageListener() whenever you need to add the listener
    //addMessageListener();
    //const imageInput = document.getElementById('imageFile');
    //const imageInput = document.getElementById('msg.imageUrls').addEventListener("click", classifyImage);
    //const imageInput = msg.imageUrls;
    var elem = document.getElementsByClassName('output');
    var txt = elem.textContent || elem.innerText;
    
    //var value = getGlobalVariable();
    //console.log(value); // 10
    console.log('script imageurl',window.globalVariable);
    imageInput = window.globalVariable;
    console.log(typeof(imageInput));
    //const resultDiv = document.getElementById('result').addEventListener("click", classifyImage);

    // Check if an image is selected
    if (imageInput.length === 0) {
        resultDiv.innerText = 'Please select an image.';
        return;
    }

    // Load the TensorFlow.js model
    const model = await loadModel();

    // Read and preprocess the selected image
    //const imageFile = imageInput.files[0];
    const imageFile = imageInput;
    const imageElement = document.createElement('img');
    const reader = new FileReader();
    reader.onload = async function(event) {
        imageElement.src = event.target.result;

        // Resize and normalize the image
        const imageTensor = tf.browser.fromPixels(imageElement)
            .resizeNearestNeighbor([224, 224]) // Resize to match the input size of the model
            .toFloat()
            .div(255) // Normalize pixel values to [0, 1]

        // Expand dimensions to create a batch of 1
        const inputTensor = imageTensor.expandDims();

        // Perform inference
        const predictions = await model.predict(inputTensor).data();

        // Display results
        const result = predictions[0] > 0.5 ? 'Violent' : 'Non-Violent';
        resultDiv.innerText = `Prediction: ${result} (${(predictions[0] * 100).toFixed(2)}% confidence)`;

        // Clean up
        imageTensor.dispose();
    };
    reader.readAsDataURL(imageFile);
    
}

