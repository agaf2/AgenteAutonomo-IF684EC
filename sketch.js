let cols, rows;
let hexRadius = 20; // raio de cada hexágono
let hexWidth, hexHeight;
let w = 600; // largura do canvas
let h = 600; // altura do canvas
let terrain = [];

let graph;
let food;

let selectedAlgo = false
let currentMethod = ""
let buttons = []

buttonRenameMap = {
  'find_first_method': 'DFS',
  'find_second_method': 'BFS', 
  'find_third_method': 'Dijkstra', 
  'find_fourth_method': 'GBFS',
  'find_fifth_method': 'A*',
}

function generateMenu() {
  const algorithms = ['find_first_method', 'find_second_method', 'find_third_method', 'find_fourth_method', 'find_fifth_method']

  createCanvas(w, h);
  background(225);
  
  textSize(30)
  stroke(200);
  strokeWeight(4);
  text('Select algorithm:', 180, 80)
  
  algorithms.forEach((method, index) => {
    let btn = createButton(`Use ${buttonRenameMap[method]}`)
    btn.size(200, 40)
    btn.position(200, 140 + index * 50)
    buttons.push(btn)
    btn.mousePressed(() => {
      currentMethod = method
      console.log(`Selected ${currentMethod}`)
      selectedAlgo = true
      buttons.forEach((button) => button.hide())
      run()
    })
  })
}

function run(){
  createCanvas(w, h);
  hexWidth = sqrt(3) * hexRadius;
  hexHeight = 2 * hexRadius * 0.75;
  cols = floor(w / hexWidth);
  rows = floor(h / hexHeight);
  
  // Inicializa o Perlin noise
  let noiseScale = 0.1;
  for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
      let noiseVal = noise(x * noiseScale, y * noiseScale);
      terrain[x][y] = noiseVal;
    }
  }

  graph = new Graph(cols * rows);
  
  
  background(255);
  
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let val = terrain[x][y];
      let xOffset = (x % 2 == 0) ? 0 : hexHeight / 2; 
      let posX = x * hexWidth;
      let posY = y * hexHeight + xOffset;
      
      let floor_;

      // Define os tipos de terreno baseado no valor de Perlin noise
      if (val < 0.3) { // 10% Água
        fill(51, 153, 255); // Terreno de custo alto (água)
        floor_ = 'w';
      } else if (val < 0.4) { // 40% Areia
        fill(255, 204, 102); // Terreno de custo baixo (areia)
        floor_ = 's';
      } else if(val < 0.6) { // 50% Lama
        fill(153, 102, 51); // Terreno de custo médio (lama)
        floor_ = 'm';
      }else{
        fill(128, 128, 128);
        floor_ = 'o';
      }
      
      drawHexagon(posX, posY, hexRadius);
      graph.addNode(posX, posY, floor_);
    }
  }

  graph.buildGraph(hexRadius);
  
  let food_initial_pos = Math.floor(Math.random() * (cols * rows -1));
  
  while(graph.getListNodes()[food_initial_pos].type_floor == 'o')
    food_initial_pos = Math.floor(Math.random() * (cols * rows -1));
  
  food = new Food(graph.getListNodes()[food_initial_pos].getX(),graph.getListNodes()[food_initial_pos].getY(), 'darkmeat1.png');
  
  let agent_initial_pos = Math.floor(Math.random() * (cols * rows -1));
  
  while(graph.getListNodes()[agent_initial_pos].type_floor == 'o')
    agent_initial_pos = Math.floor(Math.random() * (cols * rows -1));
  
  agent = new Agent(graph, graph.getListNodes()[agent_initial_pos].getX(),graph.getListNodes()[agent_initial_pos].getY(), agent_initial_pos, hexRadius, 'agent.png');
  
  agent[currentMethod](food.getX(), food.getY())
  //console.log(path);
  
  //agent.seek(path);
}

function setup() {
    generateMenu()
}

function draw() {
  if (selectedAlgo) {
    food.display();
    agent.display();
  }
}

function drawHexagon(x, y, radius) {
  beginShape();
  for (let i = 0; i < 6; i++) {
    let angle = TWO_PI / 6 * i;
    let xOffset = radius * cos(angle);
    let yOffset = radius * sin(angle);
    vertex(x + xOffset, y + yOffset);
  }
  endShape(CLOSE);
}