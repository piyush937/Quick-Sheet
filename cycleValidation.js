 // Storage -> 2D array
 let collectedGraphComponent = [];
 let graphComponentMatrix = [];
//
// for(let i = 0 ; i< rows ; i++){
//    let row = [];
// for (let j  = 0 ; j< cols ; j++){
//// There will be more than one parent chid relation so we are using Array instead of Objects
//     row.push([]);
//
// }
// graphComponentMatrix.push(row);
// }


// True Denotes Cyclic and False Denotes Non-Cyclic
 function isGraphCyclic(graphComponentMatrix){
// Dependency Visited & DFSvisited 2D Array
 let visited =  []; // Node visit Trace
 let dfsVisited = []; // Stack visit trace

  for(let i = 0 ; i< rows ; i++){
    let visitedRow = [];
    let dfsVisitedRow = [];
    for(let j = 0 ; j< cols ; j++){
        visitedRow.push(false);
        dfsVisitedRow.push(false);
    }
    visited.push(visitedRow);
    dfsVisited.push(dfsVisitedRow); 
  }


 for(let i = 0 ; i< rows ; i++){
    for(let j = 0 ; j < cols ; j++){
        if(visited[i][j] == false){
            let response =  dfsCycleDetection(graphComponentMatrix , i ,j , visited , dfsVisited);
            if(response == true){
              return [i , j];
            }
        }
     
    }
    return null;
 }


 } 
// At  Start what we will do is -> Visited = True , dfsVisited = True
// At End what we will do is -> dfsVisited = False
// If visited[i][j] == True then it means already Explored path , go back no use to explore path again.
// Cycle Detection Main Condition -> If ( Visited[i][j] == True && dfsVisited[i][j] == True ) -> Cycle is there send Immediate Alert

 function dfsCycleDetection (graphComponentMatrix ,srcr ,srcc ,visited ,dfsVisited) {

    visited[srcr][srcc] = true;
    dfsVisited[srcr][srcc] = true;
  
    for(let children = 0 ; children < graphComponentMatrix[srcr][srcc].length ; children++){
     let [crid , ccid]  =  graphComponentMatrix[srcr][srcc][children] 
     if(visited[crid][ccid] === false){
      let response =   dfsCycleDetection(graphComponentMatrix , crid ,ccid , visited  , dfsVisited);
      if(response === true) return true; // Found cycle so return immediately , no need to explore more path
     }
     else if(visited[crid][ccid] === true && dfsVisited[crid][ccid] === true) {
        // Found cycle so return immediately , no need to explore more path
        return true;
     }
        
    }


    dfsVisited[srcr][srcc] = false;
    return false ;

    
    
 }