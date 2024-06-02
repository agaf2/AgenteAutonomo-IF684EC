class Agent{
    constructor(graph, x, y, imgPath){
        this.x = x;
        this.y = y;
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

    dfs(node) {
        this.mark[node] = true;
        
        if(food_x)

        for (let neighbor of this.graph[node]) {
            let id_neighbor = neighbor.getSecond();
            let weight_neighbor = neighbor.getFirst();

            if(!this.mark[id_neighbor] && weight_neighbor != 10000000009){
                this.dfs(id_neighbor);
            }
        }
    }

    seek_first_method(food){ // DFS
        // builda o vetor dos marcados
        // chama a função dfs
    }

    

}