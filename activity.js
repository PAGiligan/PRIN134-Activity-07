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