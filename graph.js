class Graph {
  constructor(MAXN) {
    this.graph = Array.from({ length: MAXN }, () => []); // lista de adj
    this.node_pos = [];
    this.maxn = MAXN;
    this.how_many = 0;
  }

  addNode(x, y, type_floor) {
    this.node_pos.push(new Node(x, y, type_floor));
  }
  
  euclidianDistance(x1, y1, x2, y2){
    return Math.pow((x1 - x2, 2) + Math.pow(y1 - y2), 2);
  }
  
  getWeight(floor_){
      if(floor_ == 'w'){ // agua
          return 10;
      }else if(floor_ == 's') { //areia
          return 1;
      }else if(floor_ == 'm') { // lama
          return 5;
      }else { // obstaculo, tende a infinito
          return 10000000009; 
      }
  }
  
  buildGraph(hex_radius){
    for(let i = 0; i < this.maxn; i++) {
      for(let j = 0; j < this.maxn; j++) {
       
        if(i != j && ((Math.abs(this.node_pos[i].getX() - this.node_pos[j].getX()) <= 2 * hex_radius && Math.abs(this.node_pos[i].getY() - this.node_pos[j].getY()) <= 2 * hex_radius) )) {

          this.graph[i].push(new Pair(this.getWeight(this.node_pos[j].getTypeFloor()), j));
           this.graph[j].push(new Pair(this.getWeight(this.node_pos[i].getTypeFloor()), i));
         
          
          this.how_many += 1;
          
          // Desenha o ponto verde
          stroke(0, 255, 0); // Verde
          strokeWeight(5); // Espessura do ponto
          point(this.node_pos[i].getX(), this.node_pos[i].getY());

          // Desenha a linha preta
          stroke(0); // Preto
          strokeWeight(1); // Espessura da linha
          line(this.node_pos[i].getX(), this.node_pos[i].getY(), this.node_pos[j].getX(), this.node_pos[j].getY());

        }
      }
    }
  }

  getGraph(){
    return this.graph;
  }

  getListNodes(){
    return this.node_pos;
  }

  getHowManyNodes(){
    return this.how_many;
  }
  
  getNodeIndex(node) {
    return this.node_pos.indexOf(node);
  }
  
}
