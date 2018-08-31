$(document).ready(function(){
    $("p").click(function(){
        $(this).hide();
    });
    appendText();
    appendChatWindow();
});

function appendText() {
    var txt1 = "<p>Text.</p>";               // Create element with HTML  
    var txt2 = $("<p></p>").text("Text.");   // Create with jQuery
    var txt3 = document.createElement("p");  // Create with DOM
    txt3.innerHTML = "Text.";
    $("body").append(txt1, txt2, txt3);      // Append the new elements 
}

function appendChatWindow() {
    var text = "<div class=\"chatbox chatbox--tray chatbox--empty\"> \
    <div class=\"chatbox__title\"> \
    <h5><a href=\"#\">VIDURA Advisor</a></h5> \
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
    <div class=\"chatbox__body__message chatbox__body__message--left\"> \
    <img src=\"assets/img/vidura.jpg\" alt=\"VIMAN\"> \
    <p>Hello, Welcome to CyNeuro portal, I am VIDURA your virtual agent.How can I help you?</p> \
    </div> \
    <!-- <div class=\"chatbox__body__message chatbox__body__message--right\"> \
    <img src=\"{{asset('images/user_icon.png')}}\" alt=\"User\"> \
    <p>Nulla vel turpis vulputate, tincidunt lectus sed, porta arcu.</p> \
    </div> --> \
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
    </div>"
    $("body").append(text);      // Append the new elements 
}


$(document).ready(function() {
    var $chatbox = $('.chatbox'),
    $chatboxTitle = $('.chatbox__title'),
    $chatboxTitleClose = $('.chatbox__title__close'),
    $chatboxCredentials = $('.chatbox__credentials');
    $chatboxTitle.on('click', function() {
        $chatbox.toggleClass('chatbox--tray');
            // to scroll down to the bottom of the chat tray  or chat body
            //$('#chatbox_body_content').scrollTop(1E10);
        });
    $chatboxTitleClose.on('click', function(e) {
            e.stopPropagation();
            $chatbox.addClass('chatbox--closed');
            $('#chatbox_body_content').html("<div class=\"chatbox__body__message chatbox__body__message--left\"><img src=\"assets/img/vidura.jpg\" alt=\"VIDURA\"><p>VIDURA: Hello, Welcome to CyNeuro portal, I am VIDURA your virtual agent.How can I help you?</p></div>");
        });
    $chatbox.on('transitionend', function() {
        if ($chatbox.hasClass('chatbox--closed')) $chatbox.remove();
    });
    $chatboxCredentials.on('submit', function(e) {
        e.preventDefault();
        $chatbox.removeClass('chatbox--empty');
            // to scroll down to the bottom of the chat tray  or chat body
            //$('#chatbox_body_content').scrollTop(1E10);
        });

        // this function executes when user hits enter key in chat textarea
        $("#user_input").keypress(function(e){
            var code = (e.keyCode ? e.keyCode : e.which);
            if (code == 13){
                var user_input = $('#user_input').val();
                var context_json = $('#chat_context').val();

                var user_before = '<div class="chatbox__body__message chatbox__body__message--right"><img src="assets/img/user_icon.png" alt="User"><p>';
                var after = '</p></div>';
                var user_finalValue = user_before + user_input + after;
                $('#chatbox_body_content').append(user_finalValue);
                $('#user_input').val('');

                // scroll to the bottom of the chatbot body
                $('#chatbox_body_content').scrollTop(1E10);

                var viman_before = '<div class="chatbox__body__message chatbox__body__message--left"><img src="assets/img/vidura.jpg" alt="VIMAN"><p>';
                var viman_reply = viman_before + "bot reply goes here" + after;
                $('#chatbox_body_content').append(viman_reply);

            //     $.ajax({
            //         url: "http://localhost/CyNeuroCloud/CyNeuroLaravel/public/chatbot",
            //         data: {user_input: user_input, context: context_json},
            //         async: false, 
            //         success: function(result){
            //             var viman_before = '<div class="chatbox__body__message chatbox__body__message--left"><img src="assets/img/vidura.jpg" alt="VIMAN"><p>';

            //             var res = result.split("~");

            //             if (res[0] === 'VIDURA : ActionAction_Step01') {
            //               $("#step01_next_button").click();
            //               res[0] = 'VIDURA: Great lets get started with the requirements</br>In this step you will define geometric properties of a NEURON cell.</br>Please select one of the 3 geometries and specify the length and diameter of the dendri and soma.</br>The unit of length is in micro meters (um). Some sample values can be any number in the range 10 to 500.';
            //           } else if (res[0] === 'VIDURA : ActionAction_Step02') {
            //               $("#step02_next_button").click();
            //               res[0] = 'VIDURA: In this step you choose the ION channels of the NEURON cell. Please check at-least one of the three given ION chaneels.'
            //           } else if (res[0] === 'VIDURA : ActionAction_Step03') {
            //               $("#step03_next_button").click();
            //               res[0] = 'VIDURA: In this step you will choose simulation method and specify its parameters.'
            //           } else if (res[0] === 'VIDURA : ActionAction_Step04') {
            //               $("#step04_next_button").click();
            //               res[0] = 'VIDURA: This is the last step where you choose a graph type to plot the resutls of your simulation.'
            //           }

            //           var viman_finalValue = viman_before + res[0] + after;
            //           $('#chatbox_body_content').append(viman_finalValue);
            //           if (res[0].includes('error')) {
            //               $('#chat_context').val("{}");  
            //           } else {
            //               $('#chat_context').val(res[1]);  
            //           }

            //       },
            //       error: function(error){
            //         $('#chatbox_body_content').append(error);
            //     }
            // });

                // scroll to the bottom of the chatbot body
                $('#chatbox_body_content').scrollTop(1E10);


            } // end of if condition
          }); // end of keypress function
    }); // end of document ready function
