
var editor = CodeMirror.fromTextArea(document.getElementById("commandInput"), {
    lineNumbers: true,
    mode: "prolog",  // You can change the mode based on the type of code you expect
    theme: "material-darker",  // Optional: You can change the theme
    viewportMargin: Infinity
});

function executeCommand() {
    var commandInput = editor.getValue(); // Use editor.getValue() to get the code from CodeMirror
    var resultDiv = document.getElementById('result');
    var historyList = document.getElementById('historyList');

    // You can add logic here to send the command to the server and handle the response
    // For simplicity, we'll just display a message in this example
    var response = 'Placeholder';

    // Update command history
    var historyItem = document.createElement('div');
    historyItem.classList.add('history-item');
    // Create a div for the command
    var commandDiv = document.createElement('div');
    commandDiv.innerHTML = '<strong>Command:</strong>';
    commandDiv.appendChild(document.createElement('br'));
    commandDiv.appendChild(document.createTextNode(commandInput));
    historyItem.appendChild(commandDiv);

    // Create a div for the response
    var responseDiv = document.createElement('div');
    responseDiv.innerHTML = '<strong>Response:</strong>';
    responseDiv.appendChild(document.createElement('br'));
    responseDiv.appendChild(document.createTextNode(response));
    historyItem.appendChild(responseDiv);
    historyList.prepend(historyItem);

    // Clear the CodeMirror editor
    editor.setValue('');
}



// Attach event listener to the document for the keydown event
document.addEventListener('keydown', function(event) {
    // Check if Ctrl+Enter is pressed
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        executeCommand();
        event.preventDefault(); // Prevent the default behavior of the Enter key in the input field
    }
});

// Attach submit event listener to the form
document.getElementById('commandForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting and reloading the page
});


