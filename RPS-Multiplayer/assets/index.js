$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyBXQKntAL0tdQs69DDupRfIERjcTehwYuo",
        authDomain: "project2-3dc1d.firebaseapp.com",
        databaseURL: "https://project2-3dc1d.firebaseio.com",
        projectId: "project2-3dc1d",
        storageBucket: "project2-3dc1d.appspot.com",
        messagingSenderId: "167853691940"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    function winsLosses(wins, ties, losses) {
        firebase.database().ref().set({
            wins: wins,
            ties: ties,
            losses: losses
        });
    }

    var wins = 0;
    var ties = 0;
    var losses = 0;

    firebase.database().ref().once('value').then(function (snapshot) {
        console.log(snapshot.val())
        wins = snapshot.val().wins
        ties = snapshot.val().ties
        losses = snapshot.val().losses
    });


    // Valid game choices
    var validChoices = ['r', 'p', 's'];

    // Get reference to UI elements
    var winsElement = document.getElementById("wins-display");
    var tiesElement = document.getElementById("ties-display");
    var lossesElement = document.getElementById("losses-display");
    // Listen for key press and execute the
    // event handler function each time a key is pressed
    document.onkeyup = function (event) {

        // Check if user made invalid choice
        // so not: r, p, or s
        var userChoice = event.key;
        console.log('user:', userChoice);
        if (validChoices.indexOf(userChoice) < 0) {
            return;
        }

        // Generate a random index in range 0-2
        var randomIndex = Math.floor(Math.random() * 3);

        // Use random index to get computer choice
        var computerChoice = validChoices[randomIndex];
        console.log('computer:', computerChoice);

        // Determine round outcome
        var isUserWin =
            (userChoice == 'r' && computerChoice == 's') ||
            (userChoice == 'p' && computerChoice == 'r') ||
            (userChoice == 's' && computerChoice == 'p');
        var isUserTie = userChoice == computerChoice;

        // User win
        if (isUserWin) {
            wins++;
        }
        // User tie
        else if (isUserTie) {
            ties++;
        }
        // User loss
        else {
            losses++;
        }

        // Update text of UI elements
        winsElement.textContent = wins;
        tiesElement.textContent = ties;
        lossesElement.textContent = losses;
        winsLosses(wins, ties, losses)
    }
})