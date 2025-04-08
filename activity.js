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

let players = [];

function displayRankings(players) {
    players.sort((a, b) => b.score - a.score);
    let resultArea = document.getElementById("results");
    resultArea.innerHTML = "<h2>🏆 Rankings after this round:</h2>";
    players.forEach((player, index) => {
        resultArea.innerHTML += `${index + 1}️⃣. ${player.name} - ${player.score} points<br>`;
    });
}

function tiebreaker(players) {
    let tiedPlayers = players.filter(p => p.score === players[0].score);
    while (tiedPlayers.length > 1) {
        let resultArea = document.getElementById("results");
        resultArea.innerHTML += `<h3>🔥 Tiebreaker needed between: ${tiedPlayers.map(p => p.name).join(", ")}</h3>`;
        tiedPlayers.forEach(player => player.score = 0);

        tiedPlayers.forEach(player => {
            player.shoot(5);
            resultArea.innerHTML += `${player.name} scored ${player.score} successful shots.🎯<br>`;
        });
        tiedPlayers.sort((a, b) => b.score - a.score);
        tiedPlayers = tiedPlayers.filter(p => p.score === tiedPlayers[0].score);
    }

    const champion = tiedPlayers[0];
    let resultArea = document.getElementById("results");
    resultArea.innerHTML += `<h2>🥇 The Champion is ${champion.name} with ${champion.score} points!</h2>`;
}

function startGame() {
    players.forEach(player => player.shoot(5));
    displayRankings(players);

    let highestScore = players[0].score;
    let tiedPlayers = players.filter(p => p.score === highestScore);

    if (tiedPlayers.length > 1) {
        tiebreaker(tiedPlayers);
    } else {
        let resultArea = document.getElementById("results");
        resultArea.innerHTML += `<h2>🏆 The Champion is ${tiedPlayers[0].name} with ${tiedPlayers[0].score} points!</h2>`;
    }
}

document.getElementById("addPlayerBtn").addEventListener("click", function() {
    const playerName = document.getElementById("playerName").value;
    const playerTeam = document.getElementById("playerTeam").value;
    if (playerName && playerTeam) {
        players.push(new Player(playerName, playerTeam));
        document.getElementById("playerList").innerHTML += `<div>👤 ${playerName} (${playerTeam})</div>`;
        document.getElementById("playerName").value = "";
        document.getElementById("playerTeam").value = "";
    } else {
        alert("⚠️ Please enter both name and team.");
    }
});

document.getElementById("playBtn").addEventListener("click", startGame);

document.getElementById("resetBtn").addEventListener("click", function() {
    players = [];
    document.getElementById("playerList").innerHTML = "";
    document.getElementById("results").innerHTML = "";
    alert("🔄 Game has been reset. You can now add players again.");
});