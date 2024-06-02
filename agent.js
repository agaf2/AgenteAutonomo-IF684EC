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

    seek_first_method(food){ // DFS
        // builda o vetor dos marcados
        // chama a função dfs
    }

    

}