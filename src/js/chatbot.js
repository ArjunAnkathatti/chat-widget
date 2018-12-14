document.onreadystatechange = function(e)
{
    if (document.readyState === 'complete')
    {
        //dom is ready, window.onload fires later
        console.log("hi, inside document.onreadystatechange function");
        if(!window.jQuery)
        {
            console.log('jQuery is not loaded');
            loadScript("https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js", loadChatWindow);
            console.log('JQuery is added now');
        } else {
            console.log('JQuery is already loaded');
        }
    }
}
window.onload = function(e)
{
    //document.readyState will be complete, it's one of the requirements for the window.onload event to be fired
    //do stuff for when everything is loaded
    console.log("hi, inside window.onload function");
    
}
function loadStyle(url) {
    var link = document.createElement("link")
    link.type = 'text/css'
    link.rel = "stylesheet";

    if (link.readyState){
        link.onreadystatechange = function(){
            if (link.readyState == "loaded" ||
                link.readyState == "complete"){
                link.onreadystatechange = null;
            }
        };
    } else {
        link.onload = function(){

        };
    }
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}
function loadScript(url, callback){

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function(){
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}
var loadChatWindow = function(){
    console.log("hi, inside loadChatWindow function");
    // api.ai Credentials
    // please change the accessToken to configure this to work with yoru Dialogflow agent
    var baseUrl = "https://api.api.ai/v1/query?v=20160910&";
    var accessToken = "6e5c2c2195084691937add3ae219e397";

    if(typeof($.fn.popover) != 'undefined') {
        console.log("bootstrap is already loaded");
    } else {
        console.log("bootstrap is not loaded");
        loadStyle("https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css");
        console.log("bootstrap is added dynamially");
    }
    // Copy the compiled minified CSS from assets/css/chatbot.css 
    // and set chatCSSStyle variable with the copied content as shown below
    //var chatCSSStyle = "<style type=\"text/css\">.chatbox{position:fixed;bottom:0;right:0;width:350px;height:70vh;background-color:#fff;font-family:'Lato',sans-serif;-webkit-transition:all 600ms cubic-bezier(.19,1,.22,1);transition:all 600ms cubic-bezier(.19,1,.22,1);display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;z-index:1000}.chatbox--tray{bottom:calc(50px - 100vh)}.chatbox--closed{bottom:-100vh}.chatbox .form-control:focus{border-color:#1f2836}.chatbox__body,.chatbox__title{border-bottom:none}.chatbox__title{color:#fdc42e;min-height:50px;padding-right:10px;background-color:#1f2836;border-top-left-radius:4px;border-top-right-radius:4px;cursor:pointer;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center}.chatbox__title h5{height:50px;margin:0 0 0 15px;line-height:50px;position:relative;padding-left:20px;-webkit-flex-grow:1;flex-grow:1}.chatbox__title h5 a{color:#fdc42e;max-width:195px;display:inline-block;text-decoration:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.chatbox__title h5:before{content:'';display:block;position:absolute;top:50%;left:0;width:12px;height:12px;background:#4caf50;border-radius:6px;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.chatbox__title__close,.chatbox__title__tray{width:24px;height:24px;outline:0;border:0;background-color:transparent;opacity:.5;cursor:pointer;-webkit-transition:opacity 200ms;transition:opacity 200ms}.chatbox__title__close:hover,.chatbox__title__tray:hover{opacity:1}.chatbox__title__tray span{width:12px;height:12px;display:inline-block;border-bottom:2px solid #fff}.chatbox__title__close svg{vertical-align:middle;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.2px}.chatbox__body,.chatbox__credentials{padding:15px;border-top:0;background-color:#fff;border-left:1px solid #ddd;border-right:1px solid #ddd;-webkit-flex-grow:1;flex-grow:1}.chatbox__credentials{display:none}.chatbox__credentials .form-control{-webkit-box-shadow:none;box-shadow:none}.chatbox__body{overflow-y:auto}.chatbox__body__message{position:relative}.chatbox__body__message p{padding:10px;border-radius:4px;font-size:14px;background-color:#fff;-webkit-box-shadow:1px 1px rgba(100,100,100,.1);box-shadow:1px 1px rgba(100,100,100,.1)}.chatbox__body__message img{width:40px;height:40px;border-radius:4px;border:2px solid #fcfcfc;position:absolute;top:5px}.chatbox__body__message--left p{width:85%;float:left;text-align:left;background-color:#e5f1d8}.chatbox__body__message--left img{left:-5px}.chatbox__body__message--right p{width:85%;float:right;text-align:right;background-color:#ddeaf1}.chatbox__body__message--right img{right:-5px}.chatbox__message{padding:15px;min-height:50px;outline:0;resize:none;font-size:12px;border:1px solid #ddd;border-bottom:none;background-color:#fefefe}.chatbox--empty{height:300px}.chatbox--empty.chatbox--tray{bottom:-250px}.chatbox--empty.chatbox--closed{bottom:-300px}.chatbox--empty .chatbox__body,.chatbox--empty .chatbox__message{display:none}.chatbox--empty .chatbox__credentials{display:block}</style>";
    //$('head').append(chatCSSStyle);

    // --------- Start Chat Window HTML -------------//
    var chatWindowHTML = "<div class=\"chatbox chatbox--tray chatbox--empty\"> \
    <div class=\"chatbox__title\"> \
    <h5><a href=\"#\">Virtual Agent</a></h5> \
    <!-- minimize button --> \
    <button class=\"chatbox__title__tray\"> \
    <span></span> \
    </button> \
    <!-- minimize button ends --> \
    <!-- Close button which closes the chatbot --> \
    <button class=\"chatbox__title__close\"> \
    <span> \
    <svg viewBox=\"0 0 12 12\" width=\"12px\" height=\"12px\"> \
    <line stroke=\"#FFFFFF\" x1=\"11.75\" y1=\"0.25\" x2=\"0.25\" y2=\"11.75\"></line> \
    <line stroke=\"#FFFFFF\" x1=\"11.75\" y1=\"11.75\" x2=\"0.25\" y2=\"0.25\"></line> \
    </svg> \
    </span> \
    </button> \
    <!-- close button ends --> \
    </div> \
    <div class=\"chatbox__body\" id=\"chatbox_body_content\"> \
    </div> \
    <form class=\"chatbox__credentials\"> \
    <div class=\"form-group\"> \
    <label for=\"inputName\">Name:</label> \
    <input type=\"text\" class=\"form-control\" id=\"inputName\" required> \
    </div> \
    <div class=\"form-group\"> \
    <label for=\"inputEmail\">Email:</label> \
    <input type=\"text\" class=\"form-control\" id=\"inputEmail\" required> \
    </div> \
    <button type=\"submit\" class=\"btn btn-success btn-block\">Enter Chat</button> \
    </form> \
    <input type=\"hidden\" id=\"chat_context\" name=\"conversation_id\" value=\"{}\"> \
    <input type=\"text\" id=\"user_input\" name=\"user_input\" class=\"chatbox__message\" placeholder=\"Write here\"></input> \
    </div>";
    // ---------End Chat Window HTML -------------//

    // --------- append chat window HTML contnet to the body ------------//
    $("body").append(chatWindowHTML); 

    // ------------- declare and intialize chat window widget variables ----------------//
    var $chatbox = $('.chatbox'),
    $chatboxTitle = $('.chatbox__title'),
    $chatboxTitleClose = $('.chatbox__title__close'),
    $chatboxCredentials = $('.chatbox__credentials');

    // ------------
    $chatboxTitle.on('click', function() {
        $chatbox.toggleClass('chatbox--tray');
        if ($chatbox.hasClass('chatbox--closed')) 
            $chatbox.removeClass('chatbox--closed'), 
            $chatbox.addClass('chatbox--tray');

    });

    // -------------  execute this when close button is clicked   ---------------------//
    $chatboxTitleClose.on('click', function(e) {
        e.stopPropagation();
        $chatbox.addClass('chatbox--closed');
    });

    // -------------     ---------------------//
    $chatbox.on('transitionend', function() {
        // if ($chatbox.hasClass('chatbox--closed')) $chatbox.remove();
    });

    // ----------- submit button function in the chatbot window -------------//
    $chatboxCredentials.on('submit', function(e) {
        e.preventDefault();
        $chatbox.removeClass('chatbox--empty');
        var userName = $('#inputName').val();
        var userEmail = $('#inputEmail').val();
        //setBotResponse('<span class="alert alert-warning">suggestions 01</span>');
        sendUserText('My name is ' + userName);
        $("#user_input").focus();
    });


    // given a string set the usertext in the chat window with appropriate styling
    function setUserText(val) {
        var userTextBefore = '<p class="userText">';
        var userTextAfter = '</p>';
        var userTextFinal = userTextBefore + val + userTextAfter;
        $('#chatbox_body_content').append(userTextFinal);
        // set the value of input field to empty string
        $('#user_input').val('');
        // scroll to the bottom of the chatbot body
        $('#chatbox_body_content').scrollTop(1E10);
    }

    function setUserContext(val) {

    }

    // given a string set the bot response in the chat window with appropriate styling
    function setBotResponse(val) {
        if($.trim(val) == '') {
                val = 'I couldn\'t get that. Let\' try something else!';
            } else {
                val = val.replace(new RegExp('\r?\n','g'), '<br />');
            }
        var botResponseBefore = '<p class="botResponse">';
        var botResponseAfter = '</p>';
        var botResponseFinal = botResponseBefore + val + botResponseAfter;
        $('#chatbox_body_content').append(botResponseFinal);
        // scroll to the bottom of the chatbot body
        $('#chatbox_body_content').scrollTop(1E10);
    }

    // send i.e ajax call to the dialog server 
    // pass the user entered text and get the response
    function sendUserText(text, context) {
        //setBotResponse('bot reply goes here');
        //setUserContext();
        $.ajax({
            type: "GET",
            url: baseUrl+"query="+text+"&lang=en-us&sessionId="+mysession,
            contentType: "application/json",
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            // data: JSON.stringify({ query: text, lang: "en", sessionId: "somerandomthing" }),
            success: function(data) {
                main(data);
                // console.log(data);
            },
            error: function(e) {
                console.log (e);
            }
        });
    }

    // execute this when user hits enter button in the chat window input
    $("#user_input").keypress(function(e){
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13){
            // get user query text
            var userText = $('#user_input').val();
            var contextJSON = $('#chat_context').val();

            // set the user text in the chat window 
            setUserText(userText);

            // send the user text to the chat server
            sendUserText(userText, contextJSON);

        } // end of if condition
    }); // end of keypress function

    // Session Init (is important so that each user interaction is unique)-----------
    var session = function() {
        // Retrieve the object from storage
        if(sessionStorage.getItem('session')) {
            var retrievedSession = sessionStorage.getItem('session');
        } else {
            // Random Number Generator
            var randomNo = Math.floor((Math.random() * 1000) + 1);
            // get Timestamp
            var timestamp = Date.now();
            // get Day
            var date = new Date();
            var weekday = new Array(7);
            weekday[0] = "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";
            var day = weekday[date.getDay()];
            // Join random number+day+timestamp
            var session_id = randomNo+day+timestamp;
            // Put the object into storage
            sessionStorage.setItem('session', session_id);
            var retrievedSession = sessionStorage.getItem('session');
        }
        return retrievedSession;
        // console.log('session: ', retrievedSession);
    }

    // Call Session init
    var mysession = session();

    // Main function: this method has the logic to handle differen parts of the response returned from the chat server
    function main(data) {
        var action = data.result.action;
        var speech = data.result.fulfillment.speech;
        // use incomplete if you use required in api.ai questions in intent
        // check if actionIncomplete = false
        var incomplete = data.result.actionIncomplete;
        if(data.result.fulfillment.messages) { // check if messages are there
            if(data.result.fulfillment.messages.length > 0) { //check if quick replies are there
                var suggestions = data.result.fulfillment.messages[1];
            }
        }
        switch(action) {
            // case 'your.action': // set in api.ai
            // Perform operation/json api call based on action
            // Also check if (incomplete = false) if there are many required parameters in an intent
            // if(suggestions) { // check if quick replies are there in api.ai
            //   addSuggestion(suggestions);
            // }
            // break;
            default:
                setBotResponse(speech);
                if(suggestions) { // check if quick replies are there in api.ai
                    addSuggestion(suggestions);
                }
                break;
        }
    }

    // Suggestions -----------------------------------------------------------------------------------------
    function addSuggestion(textToAdd) {
        setTimeout(function(){
            var suggestions = textToAdd.replies;
            var suggLength = textToAdd.replies.length;

            var botResponseBefore = '<div class="suggestions"><div class="sugg-title">Suggestions:</div>';
            var botResponseAfter = '</div>';


            var val = '';
            

            // Loop through suggestions
            for(i=0;i<suggLength;i++) {
                val += '<span class="sugg-options">' + suggestions[i] + '</span>';
            }

            var botResponseFinal = botResponseBefore + val + botResponseAfter;
            $('#chatbox_body_content').append(botResponseFinal);

            // scroll to the bottom of the chatbot body
            $('#chatbox_body_content').scrollTop(1E10);

        }, 1000);
    }

    // on click of suggestions get value and send to API.AI
    $(document).on("click", ".suggestions span", function() {
        var text = this.innerText;
        setUserText(text);
        sendUserText(text);
        $('.suggestions').remove();
    });
    // Suggestions end -----------------------------------------------------------------------------------------

}
