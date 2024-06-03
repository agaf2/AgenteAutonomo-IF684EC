class Agent{
  constructor(graph, x, y, id_node, hex_radius, imgPath){
      this.x = x;
      this.y = y;
      this.hex_radius = hex_radius;
      this.my_node = id_node;
      this.speed = 0;
      this.graph = graph;
      this.mark = [];
      this.path = [];
      this.current = 0;
      this.finished = false;
      this.img = loadImage(imgPath);

  }

  drawHexagon(x, y, radius) {
    beginShape();
    for (let i = 0; i < 6; i++) {
      let angle = TWO_PI / 6 * i;
      let xOffset = radius * cos(angle);
      let yOffset = radius * sin(angle);
      vertex(x + xOffset, y + yOffset);
    }
    endShape(CLOSE);
  }

  display() {
    image(this.img, this.x, this.y);
    this.drawHexagon(this.x1, this.y1, this.hex_radius)
  }

  dfs(node, food_pos_x, food_pos_y, path=[]) {
    this.mark[node] = true;
    path.push(node);
    
    if(this.graph.getListNodes()[node].getX() === food_pos_x && this.graph.getListNodes()[node].getY() === food_pos_y){
        console.log("heuristic");
        return path;
    }

    for (let neighbor of this.graph.getGraph()[node]) {
        let id_neighbor = neighbor.getSecond();
        let weight_neighbor = neighbor.getFirst();
        
        if(this.mark[id_neighbor] === false && weight_neighbor < 10000000009) { 
          return this.dfs(id_neighbor, food_pos_x, food_pos_y, path);
        }
    }

    //path.pop();
    this.mark[node] = false;
    return path;
  }
  
  bfs_all_path(startNode, food_pos_x, food_pos_y) {
    let queue = [];
    let path2 = [];
    this.mark[startNode] = true;
    queue.push({ node: startNode, path: [startNode] });
    path2.push(startNode);

    while (queue.length > 0) {
        let { node, path } = queue.shift();

        if (this.graph.getListNodes()[node].getX() === food_pos_x && this.graph.getListNodes()[node].getY() === food_pos_y) {
            console.log("heuristic");
            console.log("Path2: ", path2);
            return path2;
        }

        for (let neighbor of this.graph.getGraph()[node]) {
            let id_neighbor = neighbor.getSecond();
            let weight_neighbor = neighbor.getFirst();

            if (this.mark[id_neighbor] === false && weight_neighbor < 10000000009) {
                this.mark[id_neighbor] = true;
                queue.push({ node: id_neighbor, path: [...path, id_neighbor] });
                path2.push(id_neighbor);
            }
        }
    }

    console.log("Path2: ", path2);
    return path2;
  }

  bfs_ans(startNode, food_pos_x, food_pos_y) {
    let queue = [];
    let path = [];
    this.mark[startNode] = true;
    queue.push({ node: startNode, path: [startNode] });

    while (queue.length > 0) {
        let { node, path } = queue.shift();

        if (this.graph.getListNodes()[node].getX() === food_pos_x && this.graph.getListNodes()[node].getY() === food_pos_y) {
            console.log("heuristic");
            return path;
        }

        for (let neighbor of this.graph.getGraph()[node]) {
            let id_neighbor = neighbor.getSecond();
            let weight_neighbor = neighbor.getFirst();

            if (this.mark[id_neighbor] === false && weight_neighbor < 10000000009) {
                this.mark[id_neighbor] = true;
                queue.push({ node: id_neighbor, path: [...path, id_neighbor] });
            }
        }
    }

    return path;
  }


  find_first_method(food_x, food_y){ // DFS
    // builda o vetor dos marcados
    for (let i = 0; i < this.graph.getHowManyNodes(); i++) {
      this.mark[i] = false;
    }
  
    // chama a função dfs
    //let path = this.dfs(this.my_node, food_x, food_y, []);
    let path = this.bfs(this.my_node, food_x, food_y);
    console.log(path);
    // Decodifica de ID para posição. Note que há uma relação bijetiva
    let ans = []
    for(let i = 0; i < path.length; i++) {
        ans.push(this.graph.getListNodes()[path[i]]);
    }

    return ans;
  }

  find_second_method(food_x, food_y){ // DFS
    for (let i = 0; i < this.graph.getHowManyNodes(); i++) {
      this.mark[i] = false;
    }

    let path2 = this.bfs_all_path(this.my_node, food_x, food_y);
    console.log(path2);

    let ans2 = [];
    for (let i = 0; i < path2.length; i++) {
        ans2.push(this.graph.getListNodes()[path2[i]]);
    }

    this.seek(ans2, 255, 0, 0, () => {
      for (let i = 0; i < this.graph.getHowManyNodes(); i++) {
          this.mark[i] = false;
      }

      let path = this.bfs_ans(this.my_node, food_x, food_y);
      console.log(path);

      let ans = [];
      for (let i = 0; i < path.length; i++) {
          ans.push(this.graph.getListNodes()[path[i]]);
      }

      this.seek(ans, 0, 255, 0);
    });
  }

  seek(movement_list, r, g, b, callback) {
    if (movement_list.length === 0) return;

    let current = 0;
    let moving = true;

    fill(r, g, b, 50);

    const move = () => {
      if (current < movement_list.length && moving) {
          let node = movement_list[current];
          this.x1 = node.getX();
          this.y1 = node.getY();
          current++;
          setTimeout(move, 100);
      } else {
          moving = false;
          if (callback) callback();
      }
    };

    move();
  }


}