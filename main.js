const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 500;


const context = carCanvas.getContext("2d");
const networkContext = networkCanvas.getContext("2d");

const road = new Road(carCanvas.width/2,carCanvas.width*0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "AI");
const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 3)
];

animate();

function animate(time){
    for(let i=0; i<traffic.length; i++){
        traffic[i].update(road.borders, []);
    }
    car.update(road.borders, traffic);
    
    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    context.save();
    context.translate(0, -car.y+carCanvas.height*0.7);

    road.draw(context);
    for(let i=0; i<traffic.length; i++){
        traffic[i].draw(context, "red");
    }
    car.draw(context, "blue");

    context.restore();

    networkContext.lineDashOffset = -time / 50;
    Visualizer.drawNetwork(networkContext, car.brain);
    requestAnimationFrame(animate);
}