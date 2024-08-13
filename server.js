const express = require('express');
const path = require('path');
const spellcheck = require('./spellcheck'); // Import the function

//create express app
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

app.post('/spellcheck',(req,res)=>{
  const {text} = req.body;

spellcheck(text, (error, data) => {
  if (error) {
    return res.status(500).send('Error occurred while checking the spelling');
}
 else{
 // Now you have the response data from the API in 'data'
const correctedText = replaceWithBestCandidate(data);
res.json({ correctedText });
 } 
   });
});

// Function to replace text with best_candidate
function replaceWithBestCandidate(data) {
    let updatedText = data.original_text;
  
    data.corrections.forEach(correction => {
      const { text, best_candidate } = correction;
      // Replace the text with the best_candidate
      updatedText = updatedText.replace(text, best_candidate);
    });
  
    return updatedText;
}

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});