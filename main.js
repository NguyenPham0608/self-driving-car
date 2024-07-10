const carCanvas=document.getElementById("carCanvas");
carCanvas.width=220;
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=270;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

const road=new Road(carCanvas.width/2,carCanvas.width*0.9);

const particlesList=[]

let randomLane=0
let laneArray=[
    0,2,1,2,0,1,2,0,0,2,1,0,2,1,0,1,2,2,1,0,2,0,0,0,0,0,1,2,2,1,2,2,1,0,2,1,0,0,1,2,2,0,0,0,2,
    0,2,1,2,0,1,2,0,0,2,1,0,2,1,0,2,1,2,0,1,2,0,0,2,1,0,2,1,0,0,1,2,2,0,0,0,1,2,0,1,2,2,1,0
]

const N=1;
const cars=generateCars(N);
let bestCar=cars[0];
if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
        cars[i].brain=JSON.parse(
            localStorage.getItem("bestBrain"));
        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain,0.1);
        }
    }
}

const traffic=[]

// const traffic=[
//     new Car(road.getLaneCenter(1),-100,40,60,"DUMMY",2),
//     new Car(road.getLaneCenter(0),-300,40,60,"DUMMY",2),
//     new Car(road.getLaneCenter(2),-300,40,60,"DUMMY",2),
//     new Car(road.getLaneCenter(0),-500,40,60,"DUMMY",2),
//     new Car(road.getLaneCenter(1),-500,40,60,"DUMMY",2),
//     new Car(road.getLaneCenter(1),-700,40,60,"DUMMY",2),
//     new Car(road.getLaneCenter(2),-700,40,60,"DUMMY",2),
// ]

for(let i =0;i<220*laneArray.length;i+=220){
    traffic.push(new Car(road.getLaneCenter(laneArray[i/220]),-i,40,60,"DUMMY",2))
}


animate();

function save(){
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));
}

function discard(){
    localStorage.removeItem("bestBrain");
}

function generateCars(N){
    const cars=[];
    for(let i=1;i<=N;i++){
        cars.push(new Car(road.getLaneCenter(1),100,40,60,"KEYS",9,"blue"));
    }
    return cars;
}



function animate(time){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    for(let i=0;i<cars.length;i++){
        cars[i].update(road.borders,traffic);
    }
    bestCar=cars.find(
        c=>c.y==Math.min(
            ...cars.map(c=>c.y)
        ));

    carCanvas.height=window.innerHeight;
    networkCanvas.height=window.innerHeight;

    carCtx.save();
    carCtx.translate(0,-bestCar.y+carCanvas.height*0.7);

    road.draw(carCtx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx);
    }
    carCtx.globalAlpha=0.2;
    for(let i=0;i<cars.length;i++){
        cars[i].draw(carCtx);
    }
    carCtx.globalAlpha=1;
    bestCar.draw(carCtx,true);

    carCtx.restore();

    networkCtx.lineDashOffset=-time/50;
    // Visualizer.drawNetwork(networkCtx,bestCar.brain);
    console.log()

    requestAnimationFrame(animate);
}


