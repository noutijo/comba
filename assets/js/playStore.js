//players store
let playersStore = [{
        name: localStorage.playerOneName,
        src: "./assets/imgs/players/" + localStorage.playerOnePicture + ".png",
    },
    {
        name: localStorage.playerTwoName,
        src: "./assets/imgs/players/" + localStorage.playerTwoPicture + ".png",
    },
];

//weapons store
let weaponsStore = [{
        name: 'Carrot',
        domage: 35,
        src: "./assets/imgs/weapons/carrot.png"
    },
    {
        name: "Orange",
        domage: 10,
        src: "./assets/imgs/weapons/orange.png"
    },
    {
        name: "Grape",
        domage: 40,
        src: "./assets/imgs/weapons/grape.png"
    },
    {
        name: "Apple",
        domage: 20,
        src: "./assets/imgs/weapons/apple.png"
    }
]