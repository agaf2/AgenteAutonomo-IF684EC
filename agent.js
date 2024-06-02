class Agent{
    constructor(graph, x, y, id_node, imgPath){
        this.x = x;
        this.y = y;
        this.my_node = id_node;
        this.speed = 0;
        this.graph = graph;
        this.mark = [];
        this.path = [];
        this.current = 0;
        this.finished = false;
        this.img = loadImage(imgPath);

    }

    display() {
        image(this.img, this.x, this.y);
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
            
            if(this.mark[id_neighbor] === false && weight_neighbor != 10000000009) { 
              return this.dfs(id_neighbor, food_pos_x, food_pos_y, path);
            }
        }

        path.pop();
        return path;
    }

    find_first_method(food_x, food_y){ // DFS
        // builda o vetor dos marcados
        for (let i = 0; i < this.graph.getHowManyNodes(); i++) {
          this.mark[i] = false;
        }
      
        // chama a função dfs
        let path = this.dfs(this.my_node, food_x, food_y, []);
        console.log(path);
        // Decodifica de ID para posição. Note que há uma relação bijetiva
        let ans = []
        for(let i = 0; i < path.length; i++) {
            ans.push(this.graph.getListNodes()[path[i]]);
        }

        return ans;
    }

    seek(movement_list){

    }
    

}