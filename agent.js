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

  manhattanDistance(node, food_pos_x, food_pos_y) {
    let nodeX = this.graph.getListNodes()[node].getX();
    let nodeY = this.graph.getListNodes()[node].getY();
    
    return Math.abs(nodeX - food_pos_x) + Math.abs(nodeY - food_pos_y);
  }
  
  dfs_all_path(startNode, food_pos_x, food_pos_y) {
    let stack = [];
    let path2 = [];
    this.mark[startNode] = true;
    stack.push({ node: startNode, path: [startNode] });
    path2.push(startNode);

    while (stack.length > 0) {
        let { node, path } = stack.pop(); // Usando pop() para obter o último elemento da pilha (DFS)

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
                stack.push({ node: id_neighbor, path: [...path, id_neighbor] }); // Adicionando ao final da pilha para DFS
                path2.push(id_neighbor);
            }
        }
    }

    console.log("Path2: ", path2);
    return path2;
  }

  dfs_ans(startNode, food_pos_x, food_pos_y) {
    let stack = [];
    let path = [];
    this.mark[startNode] = true;
    stack.push({ node: startNode, path: [startNode] });

    while (stack.length > 0) {
        let { node, path } = stack.pop(); // Usando pop() para obter o último elemento da pilha (DFS)

        if (this.graph.getListNodes()[node].getX() === food_pos_x && this.graph.getListNodes()[node].getY() === food_pos_y) {
            console.log("heuristic");
            return path;
        }

        for (let neighbor of this.graph.getGraph()[node]) {
            let id_neighbor = neighbor.getSecond();
            let weight_neighbor = neighbor.getFirst();

            if (this.mark[id_neighbor] === false && weight_neighbor < 10000000009) {
                this.mark[id_neighbor] = true;
                stack.push({ node: id_neighbor, path: [...path, id_neighbor] }); // Adicionando ao final da pilha para DFS
            }
        }
    }

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
  
  dijkstra_all_path(src, food_pos_x, food_pos_y) {
    const n = this.graph.getHowManyNodes();
    let dist = Array(n).fill(Number.POSITIVE_INFINITY);
    let pq = [];

    dist[src] = 0;
    pq.push({ distance: 0, node: src, path: [src] });

    let visitedNodes = []; // Armazena todos os nós visitados durante a busca

    while (pq.length > 0) {
      pq.sort((a, b) => a.distance - b.distance);
      let { node, distance, path } = pq.shift();

      if (this.graph.getListNodes()[node].getX() === food_pos_x && this.graph.getListNodes()[node].getY() === food_pos_y) {
          visitedNodes.push(...path); // Adiciona todos os nós visitados ao vetor
          return visitedNodes;
      }

      if (distance > dist[node]) continue;

      for (let edge of this.graph.getGraph()[node]) {
          let weight = edge.getFirst();
          let neighbor = edge.getSecond();

          if (dist[neighbor] > dist[node] + weight) {
              dist[neighbor] = dist[node] + weight;
              pq.push({ distance: dist[neighbor], node: neighbor, path: [...path, neighbor] });
          }
      }

      visitedNodes.push(node); // Adiciona o nó atual ao vetor de nós visitados
    }

    return visitedNodes;
  }
  
  dijkstra_ans(src, food_pos_x, food_pos_y) {
    const n = this.graph.getHowManyNodes();
    let dist = Array(n).fill(Number.POSITIVE_INFINITY);
    let pq = [];

    dist[src] = 0;
    pq.push({ distance: 0, node: src, path: [src] });

    while (pq.length > 0) {
      pq.sort((a, b) => a.distance - b.distance);
      let { node, distance, path } = pq.shift();

      if (this.graph.getListNodes()[node].getX() === food_pos_x && this.graph.getListNodes()[node].getY() === food_pos_y) {
          return path;
      }

      if (distance > dist[node]) continue;

      for (let edge of this.graph.getGraph()[node]) {
          let weight = edge.getFirst();
          let neighbor = edge.getSecond();

          if (dist[neighbor] > dist[node] + weight) {
              dist[neighbor] = dist[node] + weight;
              pq.push({ distance: dist[neighbor], node: neighbor, path: [...path, neighbor] });
          }
      }
    }

    return [];
  }

  gbfs_all_path(startNode, food_pos_x, food_pos_y) {
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

        let neighbors = this.graph.getGraph()[node];
        neighbors.sort((a, b) => this.manhattanDistance(a.getSecond(), food_pos_x, food_pos_y) - this.manhattanDistance(b.getSecond(), food_pos_x, food_pos_y));

        for (let neighbor of neighbors) {
            let id_neighbor = neighbor.getSecond();
            let weight_neighbor = neighbor.getFirst();

            if (this.mark[id_neighbor] === false && weight_neighbor < 10000000009) {
                this.mark[id_neighbor] = true;
                queue.push({ node: id_neighbor, path: [...path, id_neighbor] });
                path2.push(id_neighbor); // Adiciona o nó vizinho aos nós visitados
            }
        }
    }

    console.log("Path2: ", path2);
    return path2;
  }

  gbfs_ans(startNode, food_pos_x, food_pos_y) {
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

        let neighbors = this.graph.getGraph()[node];
        neighbors.sort((a, b) => this.manhattanDistance(a.getSecond(), food_pos_x, food_pos_y) - this.manhattanDistance(b.getSecond(), food_pos_x, food_pos_y));

        for (let neighbor of neighbors) {
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

  astar_all_path(src, food_pos_x, food_pos_y) {
    const n = this.graph.getHowManyNodes();
    let gcost = Array(n).fill(Number.POSITIVE_INFINITY);
    let fcost = Array(n).fill(Number.POSITIVE_INFINITY);
    let pq = [];

    gcost[src] = 0;
    fcost[src] = this.manhattanDistance(src, food_pos_x, food_pos_y);

    pq.push({ f: fcost[src], g: gcost[src] ,  node: src, path: [src] });

    let visitedNodes = []; // Armazena todos os nós visitados durante a busca

    while (pq.length > 0) {
      pq.sort((a, b) => a.f - b.f);
      let { node, path, g } = pq.shift();

      if(this.graph.getListNodes()[node].getX() === food_pos_x && this.graph.getListNodes()[node].getY() === food_pos_y){
        visitedNodes.push(...path);
        return visitedNodes;
      }

      if(fcost[node] < g) continue;

      for(let edge of this.graph.getGraph()[node]){
        let weight = edge.getFirst();
        let neighbor = edge.getSecond();

        let tentative_g = g + weight;

        if(tentative_g < gcost[neighbor]){
          path.push(neighbor);
          gcost[neighbor] = tentative_g;
          fcost[neighbor] = gcost[neighbor] + this.manhattanDistance(neighbor, food_pos_x, food_pos_y);
          pq.push({ f: fcost[neighbor], g: gcost[neighbor], node: neighbor, path: [...path] });
        }
      }
      visitedNodes.push(node);

    }
      return visitedNodes;
  }

  astar_ans(src, food_pos_x, food_pos_y) {
    const n = this.graph.getHowManyNodes();
    let gcost = Array(n).fill(Number.POSITIVE_INFINITY);
    let fcost = Array(n).fill(Number.POSITIVE_INFINITY);
    let pq = [];

    gcost[src] = 0;
    fcost[src] = this.manhattanDistance(src, food_pos_x, food_pos_y);

    pq.push({ f: fcost[src], g: gcost[src] ,  node: src, path: [src] });

    while (pq.length > 0) {
      pq.sort((a, b) => a.f - b.f);
      let { node, g, path } = pq.shift();

      if(this.graph.getListNodes()[node].getX() === food_pos_x && this.graph.getListNodes()[node].getY() === food_pos_y) {
        return path;
      }
      
      if(fcost[src] < g) continue;

      for(let edge of this.graph.getGraph()[node]){
        let weight = edge.getFirst();
        let neighbor = edge.getSecond();

        let tentative_g = g + weight;

        if(tentative_g < gcost[neighbor]){
          gcost[neighbor] = tentative_g;
          fcost[neighbor] = gcost[neighbor] + this.manhattanDistance(neighbor, food_pos_x, food_pos_y);
          pq.push({ f: fcost[neighbor], g: gcost[neighbor], node: neighbor, path: [...path, neighbor] });
        }
      }
    }
    return []; // não foi encontrado caminho
  }

  find_first_method(food_x, food_y){ // DFS
    for (let i = 0; i < this.graph.getHowManyNodes(); i++) {
      this.mark[i] = false;
    }

    let path2 = this.dfs_all_path(this.my_node, food_x, food_y);
    console.log(path2);

    let ans2 = [];
    for (let i = 0; i < path2.length; i++) {
        ans2.push(this.graph.getListNodes()[path2[i]]);
    }

    this.seek(ans2, 255, 0, 0, () => {
      for (let i = 0; i < this.graph.getHowManyNodes(); i++) {
          this.mark[i] = false;
      }

      let path = this.dfs_ans(this.my_node, food_x, food_y);
      console.log(path);

      let ans = [];
      for (let i = 0; i < path.length; i++) {
          ans.push(this.graph.getListNodes()[path[i]]);
      }

      this.seek(ans, 0, 255, 0);
    });
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
  
  find_third_method(food_x, food_y){ // Dijkstra
    for (let i = 0; i < this.graph.getHowManyNodes(); i++) {
      this.mark[i] = false;
    }

    let path2 = this.dijkstra_all_path(this.my_node, food_x, food_y);
    console.log(path2);

    let ans2 = [];
    for (let i = 0; i < path2.length; i++) {
        ans2.push(this.graph.getListNodes()[path2[i]]);
    }

    this.seek(ans2, 255, 0, 0, () => {
      for (let i = 0; i < this.graph.getHowManyNodes(); i++) {
          this.mark[i] = false;
      }

      let path = this.dijkstra_ans(this.my_node, food_x, food_y);
      console.log(path);

      let ans = [];
      for (let i = 0; i < path.length; i++) {
          ans.push(this.graph.getListNodes()[path[i]]);
      }

      this.seek(ans, 0, 255, 0);
    });
  }

  find_fourth_method(food_x, food_y) { // GBFS
    for (let i = 0; i < this.graph.getHowManyNodes(); i++) {
      this.mark[i] = false;
    }

    let path2 = this.gbfs_all_path(this.my_node, food_x, food_y);
    console.log(path2);

    let ans2 = [];
    for (let i = 0; i < path2.length; i++) {
        ans2.push(this.graph.getListNodes()[path2[i]]);
    }

    this.seek(ans2, 255, 0, 0, () => {
      for (let i = 0; i < this.graph.getHowManyNodes(); i++) {
          this.mark[i] = false;
      }

      let path = this.gbfs_ans(this.my_node, food_x, food_y);
      console.log(path);

      let ans = [];
      for (let i = 0; i < path.length; i++) {
          ans.push(this.graph.getListNodes()[path[i]]);
      }

      this.seek(ans, 0, 255, 0);
    });
  }

  find_fifth_method(food_x, food_y) {
    for (let i = 0; i < this.graph.getHowManyNodes(); i++) {
      this.mark[i] = false;
    }

    let path2 = this.astar_all_path(this.my_node, food_x, food_y);
    console.log(path2);

    let ans2 = [];
    for (let i = 0; i < path2.length; i++) {
        ans2.push(this.graph.getListNodes()[path2[i]]);
    }

    this.seek(ans2, 255, 0, 0, () => {
      for (let i = 0; i < this.graph.getHowManyNodes(); i++) {
          this.mark[i] = false;
      }

      let path = this.astar_ans(this.my_node, food_x, food_y);
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