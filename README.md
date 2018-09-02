# chat-widget
This is a Javascript project developed using **npm**, **sass** and **gulp**. The Javascript file will embed a chat widget on to your web page. All you need to do is copy assests/js/main.js file to you html file. 

## Prerequisites
Your html page shoul have JQuery and Bootstrap. You can just copy the content of the assests/js/main.js to your html file for embedding.

## Customizing
Clone this repo, install npm and run npm install to install all the required packages. 

Change the *src/css/_variable.scss* and *src/css/chatbot.scss* file to modify the CSS style of the chat widget. 

Note: Please make sure to run gulp to compile the changes and copy the content of the compile minified CSS in *assests/css/chatbot.css* into the *src/js/chatbot.js* file. This step is not necessary for the local development. Do this once you are done with all the edits to the CSS files.

All the logic related bot is written in javascript file. Please take a look at *src/js/chatbot.js*. To configure your own Dialogflow chatbot make sure you change the accessToken variable in the *src/js/chatbot.js* file.

## Installation
```
git clone https://github.com/acarjungowda/chat-widget.git
cd chat-widget
npm install
gulp
```

