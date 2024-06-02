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

        if(this.getListNodes()[node].x == food_pos_x && this.getListNodes()[node].y == food_pos_y){
            return path;
        }

        for (let neighbor of this.graph[node]) {
            let id_neighbor = neighbor.getSecond();
            let weight_neighbor = neighbor.getFirst();

            if(!this.mark[id_neighbor] && weight_neighbor != 10000000009){
                return this.dfs(id_neighbor);
            }
        }

        path.pop();
    }

    seek_first_method(food_x, food_y){ // DFS
        // builda o vetor dos marcados
        this.mark = []
        for(let i; i < this.graph.getHowManyNodes(); i++){
            this.mark.push(false);
        }
        // chama a função dfs
        path = []
        path = this.dfs(this.my_node, food_x, food_y, path);

        // Decodifica de ID para posição. Note que há uma relação bijetiva
        ans = []
        for(let i; i < this.path.length; i++) {
            ans.push(graph.getListNodes()[this.path[i]]);
        }

        return ans;
    }

    

}