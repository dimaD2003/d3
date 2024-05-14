//инициализация svg элемента
const width = 400;
const height = 400;
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const startX = 100;
let angle = 0;
const startY = -100;
const animateBtn = d3.select("#start");
const clearBtn = d3.select("#clear");
const movebtn = d3.select("#transition");
let svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

const drawSmile = () => {
    const svg = d3
        .select("svg")
        .attr("x", startX)
        .attr("y", startY)
        .attr("width", width)
        .attr("height", height);

       
        svg.append("circle").attr("cx", 360).attr("cy", 130).attr("r", 25).style("stroke", "black");
        svg.append("circle").attr("cx", 138).attr("cy", 135).attr("r", 25).style("stroke", "black");
         svg.append("circle").attr("cx", 130).attr("cy", 360).attr("r", 25).style("stroke", "black");
         svg.append("circle").attr("cx", 365).attr("cy", 365).attr("r", 25).style("stroke", "black");
        // Добавляем круги, представляющие круги щита 
        svg.append("rect")
        .style("fill", "black")
        .style("stroke", "black")
        .style("stroke-width", "2")
        .attr("x", 300)
        .attr("y", -90)
        .attr("width", 30) 
        .attr("height", 330)
        .attr("transform", "rotate(45, 75, 75)")

        svg.append("rect")
        .style("fill", "black")
        .style("stroke", "black")
        .style("stroke-width", "2")
        .attr("x", 60)
        .attr("y", 160)
        .attr("width", 30) 
        .attr("height", 330)
        .attr("transform", "rotate(-45, 75, 75)")
        
        svg.append("circle").attr("cx", 250).attr("cy", 250).attr("r", 125).attr("fill", "red");
        svg.append("circle").attr("cx", 250).attr("cy", 250).attr("r", 100).attr("fill", "white");
        svg.append("circle").attr("cx", 250).attr("cy", 250).attr("r", 75).attr("fill", "red");
        svg.append("circle").attr("cx", 250).attr("cy", 250).attr("r", 50).attr("fill", "blue");
        
        svg.append("polygon")
            .attr("fill", "white")
            .attr("points", "250,220 258,235 275,239 268,254 272,276 250,265 228,276 232,254 225,239 242,235");
         
       
    // const monkeyHead = svg.append('g')
    //     .attr('transform', 'translate(250, 250)');
    // monkeyHead.append('circle')
    //     .attr('cx', 0)
    //     .attr('cy', 0)
    //     .attr('r', 100)
    //     .style('fill', 'brown');

    // monkeyHead.append('circle')
    //     .attr('cx', -90)
    //     .attr('cy', -100)
    //     .attr('r', 60)
    //     .style('fill', 'brown');

    // monkeyHead.append('circle')
    //     .attr('cx', 90)
    //     .attr('cy', -100)
    //     .attr('r', 60)
    //     .style('fill', 'brown');
    // monkeyHead.append('circle')
    //     .attr('cx', -30)
    //     .attr('cy', -40)
    //     .attr('r', 15)
    //     .style('fill', 'white');

    // monkeyHead.append('circle')
    //     .attr('cx', 30)
    //     .attr('cy', -40)
    //     .attr('r', 15)
    //     .style('fill', 'white');
    // monkeyHead.append('circle')
    //     .attr('cx', -30)
    //     .attr('cy', -40)
    //     .attr('r', 7)
    //     .style('fill', 'black');

    // monkeyHead.append('circle')
    //     .attr('cx', 30)
    //     .attr('cy', -40)
    //     .attr('r', 7)
    //     .style('fill', 'black');

    // monkeyHead.append('line')
    //     .attr('x1', -80)
    //     .attr('y1', 50)
    //     .attr('x2', 80)
    //     .attr('y2', 50)
    //     .style('stroke', 'black')
    //     .style('stroke-width', 2);
    return svg;
};
animateBtn.on("click", () => {
   animation(pict, 200, 2000)
});
//рисуем смайлик
let pict = drawSmile();
pict.attr("transform", `translate(${100}, ${300})`)

clearBtn.on("click", () => {
    pict.remove();
}); 

function animation(selection, size) {
    let duration = Number(d3.select("#duration").property("value"));
    let degree = Number(d3.select("#rotation").property("value"));
    //var data = [[100, 100], [100, 10], [150, 10], [150, 100], [200, 100],[200, 10]];
    
    const squareSize = size / 2;
    const path = d3.path();
    path.moveTo(100, 300); //500
    path.lineTo(100, 10);

    path.moveTo(100, 10);
    path.lineTo(300, 10);

    path.moveTo(300, 10);
    path.lineTo(300, 300);

    path.moveTo(300, 300);
    path.lineTo(600, 300);

    path.moveTo(600, 300);
    path.lineTo(600, 10);
    // // path.lineTo(-squareSize, squareSize);
    // path.closePath();

    const pathElement = selection
        .append("path")
        .attr("d", path)
        .style("fill", "none");

    const t = selection.transition().duration(duration).ease(d3.easeLinear);

    t.attrTween("transform", function () {
        const i = d3.interpolateString("0,0", path.toString());
        return function (t) {
            const point = pathElement
                .node()
                .getPointAtLength(t * pathElement.node().getTotalLength());
            return `translate( ${point.x} , ${point.y}) rotate(${t*degree})`;
        };
    });

    d3.interval(() => {
        d3.transition()
            .tween("position", () => (t) => updatePosition(t));
    }, duration);
}

// function moveAlongContour(selection, size, duration) {
//     const squareSize = size / 2;
//     const coordinates = [{
//             x: -squareSize,
//             y: squareSize
//         },
//         {
//             x: -squareSize,
//             y: -squareSize
//         },
//         {
//             x: squareSize / 2,
//             y: squareSize / 2
//         },
//         {
//             x: squareSize,
//             y: -squareSize / 2
//         },
//         {
//             x: squareSize,
//             y: squareSize
//         },
//     ].reverse();

//     let interpolator = d3.interpolateObject(coordinates[0], coordinates[1]);

//     let currentIndex = 0;

//     let stopAnimation = false;

//     function updatePosition(t) {
//         if (stopAnimation) {
//             return;
//         }
//         const currentCoords = interpolator(t);
//         selection.attr(
//             "transform",
//             `translate(${currentCoords.x}, ${currentCoords.y})`
//         )

//         if (t >= 1) {
//             currentIndex = (currentIndex + 1) % coordinates.length;
//             if (currentIndex === 0) {
//                 stopAnimation = true;
//             }
//             interpolator = d3.interpolateObject(
//                 coordinates[currentIndex],
//                 coordinates[(currentIndex + 1) % coordinates.length]
//             );
//         }
//     }

//     // Запускаем анимацию
//     d3.interval(() => {
//         d3.transition()
//             .tween("position", () => (t) => updatePosition(t));
//     }, duration);
// }

movebtn.on("click", () => {
    moveAlongContour(pict, 200, 1000);
});