let cols, rows;
let hexRadius = 10; // raio de cada hexágono
let hexWidth, hexHeight;
let w = 600; // largura do canvas
let h = 600; // altura do canvas
let terrain = [];

let graph;
let food;

function setup() {
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
      } else if (val < 0.6) { // 40% Areia
        fill(255, 204, 102); // Terreno de custo baixo (areia)
        floor_ = 's';
      } else { // 50% Lama
        fill(153, 102, 51); // Terreno de custo médio (lama)
        floor_ = 'm';
      }
      
      drawHexagon(posX, posY, hexRadius);
      graph.addNode(posX, posY, floor_);
    }
  }

  graph.buildGraph(hexRadius);
  
  let partial_id = Math.floor(Math.random() * (cols * rows -1));
  food = new Food(graph.getListNodes()[partial_id].getX(),graph.getListNodes()[partial_id].getY(), 'darkmeat1.png');
  
  let agent_initial_pos = Math.floor(Math.random() * (cols * rows -1));
  agent = new Agent(graph, graph.getListNodes()[agent_initial_pos].getX(),graph.getListNodes()[agent_initial_pos].getY(), agent_initial_pos, 'agent.png');
  
  console.log(agent.find_first_method(food.getX(), food.getY()));
  
}

function draw() {
  
  food.display();
  agent.display();
  
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
