import anime from './anime.es.js';

var WhyText = $("#why-text")
var UserText = $("#user-text")
var UserInput = $("#user-input")
var UserHistory = $("#user-history")

var isUserPrompt = true;

function userPrompt() {
    if (isUserPrompt) {
        return;
    }

    isUserPrompt = true;

    anime({
        targets: '.letter',
        opacity: 0,
        color: "#fff",
        easing: 'easeInOutSine',
        complete: function () {
            WhyText.css("display", "none");

            anime({
                duration: 300,
                targets: '.body',
                backgroundColor: '#fff',
                easing: 'easeInOutSine'
            });

            UserText.css("display", "flex");

            anime({
                duration: 300,
                targets: '#user-input',
                opacity: 1,
                easing: 'easeInOutSine'
            });

            anime({
                duration: 300,
                targets: '#user-history',
                opacity: 1,
                easing: 'easeInOutSine'
            });
        }
    }); 
}

function tellUser(text, textSize, separate) {
    if (isUserPrompt) {
        $("#why-text").html("");
    }

    // Skip line if its a new message to the user.
    if (!isUserPrompt) {
        $("#why-text").append("<div class='break'></div>")
    }

    if (separate) {
        // Add each individual letter that are in the message
        for (var i = 0; i < text.length; i++) {
            let letter = text[i] == " " ? "&nbsp;" : text[i];
            $("#why-text").append(`<span class='letter' style='font-size: ${textSize}'>${letter}</span>`);
        }
    } else {
        $("#why-text").append(`<span class='letter' style='font-size: ${textSize}'>${text}</span>`);
    }
    
    // If it's a second message, then animate it directly.
    if (!isUserPrompt) {
        $("#why-text").append("<div class='break'></div>")

        anime({
            targets: '.letter',
            opacity: 1,
            color: "#fff",
            easing: 'easeInOutSine',
            scale: anime.stagger([0.7, 1], {from: 'center'}), 
            delay: anime.stagger(100)
        }); 
        
        return;
    }

    isUserPrompt = false;

    anime({
        duration: 300,
        targets: '#user-history',
        opacity: 0,
        easing: 'easeInOutSine'
    })
    
    anime({
        duration: 300,
        targets: '#user-input',
        opacity: 0,
        easing: 'easeInOutSine',
        complete: function() {
            UserText.css("display", "none");

            anime({
                duration: 300,
                targets: '.body',
                backgroundColor: 'rgb(20, 20, 20)',
                easing: 'easeInOutSine'
            });
        
            WhyText.css("display", "flex");
            
            anime({
                targets: '.letter',
                opacity: 1,
                color: "#fff",
                easing: 'easeInOutSine',
                scale: anime.stagger([0.7, 1], {from: 'center'}), 
                delay: anime.stagger(100)
            }); 
        }
    });
}

var idkMessages = [
    "idk",
    "idrk",
    "idek",
    "no clue",
    "no idea",
    "dont know",
    "dont really know",
    "dont even know",
    "don't know",
    "don't really know",
    "don't even know",
    "ask god"
]

var history = [];
var previous;
$(document).keypress(function(e) {
    if(e.target == UserInput[0] && e.which == 13) {
        var input = UserInput.val()
        var lowered = input.toLowerCase();
        if (history.length > 0 && lowered == history[history.length - 1].toLowerCase()) {
            return false;
        }

        history.push(input);
        
        let idk = false;
        for (let idkMessage of idkMessages) {
            if (lowered.includes(idkMessage)) {
                idk = true;
                break;
            }
        }
        
        if (!idk) {
            tellUser("Why?", "90px", true);
            setTimeout(function() {
                UserInput.val("");
                UserInput.attr("placeholder", "Because...");

                if (previous) {
                    previous.attr("class", "history-bottom")
                }

                previous = $(`<span class="history-top">${input}</span><br>`);
                UserHistory.prepend(previous);

                userPrompt();
            }, 2000);
        } else {
            tellUser("You don't know anything...", "90px", true);
            tellUser(`"${history.join(" → ")}"`, "45px", false)
            history = [];
            UserHistory.html("");
        }

        return false;
    }
});