class Player {
    constructor(name, team) {
        this.name = name;
        this.team = team;
        this.score = 0;
    }

    shoot(attempts) {
        for (let i = 0; i < attempts; i++) {
            if (Math.random() > 0.5) {
                this.score++;
            }
        }
    }
}

let players = [
    new Player("Sarah", "Warriors"),
    new Player("Lisa", "Globethrotters"),
    new Player("Mike", "Black Tigers"),
    new Player("Tom", "White Nuggets"),
    new Player("Axel", "Green Farmers"),
    new Player("Irving", "Red Dragons"),
    new Player("Idrisa", "Bucks")
];

function displayRankings(players) {
    players.sort((a, b) => b.score - a.score);
    console.log("\uD83C\uDFC6 Rankings after this round:");
    players.forEach((player, index) => {
        console.log(`${index + 1}. ${player.name} - ${player.score} points`);
    });
}

function tiebreaker(players) {
    let tiedPlayers = players.filter(p => p.score === players[0].score);
    while (tiedPlayers.length > 1) {
        console.log("\uD83D\uDD25 Tiebreaker needed between:", tiedPlayers.map(p => p.name).join(", "));
        tiedPlayers.forEach(player => player.score = 0);

        console.log("\uD83C\uDFC0 Round 2 Begins!");
        tiedPlayers.forEach(player => {
            player.shoot(5);
            console.log(`${player.name} scored ${player.score} successful shots.`);
        });
        tiedPlayers.sort((a, b) => b.score - a.score);
        tiedPlayers = tiedPlayers.filter(p => p.score === tiedPlayers[0].score);
    }

    console.log(`\uD83C\uDFC6 The Champion is ${tiedPlayers[0].name} with ${tiedPlayers[0].score} points!`);
}

function startGame() {
    console.log("\uD83C\uDFC0 Starting the Basketball Shooting Game!\n");
    players.forEach(player => player.shoot(5));

    displayRankings(players);

    let highestScore = players[0].score;
    let tiedPlayers = players.filter(p => p.score === highestScore);

    if (tiedPlayers.length > 1) {
        tiebreaker(tiedPlayers);
    } else {
        console.log(`\uD83C\uDFC6 The Champion is ${tiedPlayers[0].name} with ${tiedPlayers[0].score} points!`);
    }
}

startGame();