class Graph {
    constructor(MAXN) {
      this.graph = Array.from({ length: MAXN }, () => []); // lista de adj
      this.node_pos = [];
      this.maxn = MAXN;
    }
  
    addNode(x, y, type_floor) {
      this.node_pos.push(new Node(x, y, type_floor));
    }
    
    euclidianDistance(x1, y1, x2, y2){
      return Math.sqrt(Math.pow((x1 - x2, 2) + Math.pow(y1 - y2), 2));
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
          if(i != j && this.euclidianDistance(this.node_pos[i].getX(), this.node_pos[i].getY(), this.node_pos[j].getX(), this.node_pos[j].getY()) <= 2 * hex_radius * Math.sin(60 * (Math.PI / 180))) {
             this.graph[i].push(new Pair(j, this.getWeight()));
          }
        }
      }
    }
    
    getGraph(){
      return this.graph;
    }
    
  }
  