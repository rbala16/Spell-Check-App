const spellCheckForm = document.getElementById('spellcheck-form');
const outputField = document.getElementById('output');

// const textInput = document.getElementById('text-input');

spellCheckForm.addEventListener('submit',function(event){
    event.preventDefault();

    const textInput = document.getElementById('text-input').value;
//sending a post request to the server with user input
    fetch('/spellcheck',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({text: textInput}),
    })
    .then(response => response.json())
    .then(data => {
       outputField.textContent = data.correctedText;
    })
    .catch(error => {
        console.error('Error:', error);
        outputField.textContent = 'An error occurred while checking the spelling.';
    });

})

