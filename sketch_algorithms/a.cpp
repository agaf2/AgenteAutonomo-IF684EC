#include <bits/stdc++.h>

using namespace std;

vector<int> A[110];
int mark[110];

void dfs(int u, vector<int> path){
    mark[u]=1;
    path.push_back(u);
    if(u == 4){
        for(auto x : path) printf("%d -> ", x);
        printf("\n");
    }
    for(auto v : A[u]){
        if(!mark[v]){
            
            dfs(v, path);
        }
    }
    path.pop_back();
}

int main(){

    int N = 5;
    A[0].push_back(1);
    A[0].push_back(2);
    A[1].push_back(3);
    A[3].push_back(4);

    vector<int> path;
    dfs(0, path);    

    return 0;
}