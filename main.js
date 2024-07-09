const carCanvas=document.getElementById("carCanvas");
carCanvas.width=300;
const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");
const carImage = new Image()
carImage.src='car.png'

const road=new Road(carCanvas.width/2,carCanvas.width*0.9);

const N=400;
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

const traffic=[
    new Car(road.getLaneCenter(0),-100,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(2),-100,30,50,"DUMMY",2.1),
    new Car(road.getLaneCenter(1),-300,30,50,"DUMMY",2.9),
    new Car(road.getLaneCenter(0),-500,30,50,"DUMMY",2.3),
    new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",2.6),
    new Car(road.getLaneCenter(1),-700,30,50,"DUMMY",2.7),
    new Car(road.getLaneCenter(2),-700,30,50,"DUMMY",2.8),

    new Car(road.getLaneCenter(1),-800,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-1000,30,50,"DUMMY",2.1),
    new Car(road.getLaneCenter(2),-1000,30,50,"DUMMY",2.9),
    new Car(road.getLaneCenter(0),-1100,30,50,"DUMMY",2.3),
    new Car(road.getLaneCenter(1),-1200,30,50,"DUMMY",2.6),
    new Car(road.getLaneCenter(1),-1400,30,50,"DUMMY",2.7),
    new Car(road.getLaneCenter(2),-1600,30,50,"DUMMY",2.8),

    new Car(road.getLaneCenter(1),-1700,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-1900,30,50,"DUMMY",2.1),
    new Car(road.getLaneCenter(2),-1900,30,50,"DUMMY",2.9),
    new Car(road.getLaneCenter(0),-2100,30,50,"DUMMY",2.3),
    new Car(road.getLaneCenter(1),-2300,30,50,"DUMMY",2.6),
    new Car(road.getLaneCenter(1),-2500,30,50,"DUMMY",2.7),
    new Car(road.getLaneCenter(2),-2600,30,50,"DUMMY",2.8),

    new Car(road.getLaneCenter(1),-2600,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-2800,30,50,"DUMMY",2.1),
    new Car(road.getLaneCenter(2),-2900,30,50,"DUMMY",2.9),
    new Car(road.getLaneCenter(0),-3100,30,50,"DUMMY",2.3),
    new Car(road.getLaneCenter(1),-3100,30,50,"DUMMY",2.6),
    new Car(road.getLaneCenter(1),-3200,30,50,"DUMMY",2.7),
    new Car(road.getLaneCenter(2),-3400,30,50,"DUMMY",2.8),

    new Car(road.getLaneCenter(1),-3400,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-3500,30,50,"DUMMY",2.1),
    new Car(road.getLaneCenter(2),-3700,30,50,"DUMMY",2.9),
    new Car(road.getLaneCenter(0),-3700,30,50,"DUMMY",2.3),
    new Car(road.getLaneCenter(1),-3800,30,50,"DUMMY",2.6),
    new Car(road.getLaneCenter(1),-4000,30,50,"DUMMY",2.7),
    new Car(road.getLaneCenter(2),-4200,30,50,"DUMMY",2.8),

    new Car(road.getLaneCenter(1),-4200,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-4500,30,50,"DUMMY",2.1),
    new Car(road.getLaneCenter(2),-4606,30,50,"DUMMY",2.9),
    new Car(road.getLaneCenter(1),-4600,30,50,"DUMMY",2.3),
    new Car(road.getLaneCenter(0),-4800,30,50,"DUMMY",2.6),
    new Car(road.getLaneCenter(2),-4900,30,50,"DUMMY",2.7),
    new Car(road.getLaneCenter(2),-5100,30,50,"DUMMY",2.8),

    new Car(road.getLaneCenter(4),-5300,30,50,"DUMMY",2),
    new Car(road.getLaneCenter(0),-5400,30,50,"DUMMY",2.1),
    new Car(road.getLaneCenter(2),-5400,30,50,"DUMMY",2.9),
    new Car(road.getLaneCenter(0),-5500,30,50,"DUMMY",2.3),
    new Car(road.getLaneCenter(1),-5700,30,50,"DUMMY",2.6),
    new Car(road.getLaneCenter(1),-5900,30,50,"DUMMY",2.7),
    new Car(road.getLaneCenter(0),-6000,30,50,"DUMMY",2.8),

    new Car(road.getLaneCenter(0),-6000,30,50,"DUMMY",2.8),
    new Car(road.getLaneCenter(1),-6100,30,50,"DUMMY",2.8),
    new Car(road.getLaneCenter(2),-6600,30,50,"DUMMY",2.8),
    new Car(road.getLaneCenter(1),-6600,30,50,"DUMMY",2.8),


];

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
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI",6));
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
        traffic[i].draw(carCtx,"red");
    }
    carCtx.globalAlpha=0.2;
    for(let i=0;i<cars.length;i++){
        cars[i].draw(carCtx,"blue");
    }
    carCtx.globalAlpha=1;
    bestCar.draw(carCtx,"blue",true);

    carCtx.restore();

    networkCtx.lineDashOffset=-time/50;
    // Visualizer.drawNetwork(networkCtx,bestCar.brain);
    requestAnimationFrame(animate);
}