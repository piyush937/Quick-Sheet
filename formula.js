for(let i = 0 ; i < rows ; i++){
    for(let j = 0 ; j < cols ; j++){
       let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`) ;
       cell.addEventListener("blur" , (e) => {
        let address = addressBar.value;
        let [activecell , cellProp] = activeCell(address);
        let enteredData = activecell.innerText;

        if (enteredData === cellProp.value) return;

        cellProp.value = enteredData;
        // If data entered is Hard coded then we have to perform the same operations again breaking parent child relation and then updating children cells also
        removeChildFromParent(cellProp.formula);
        cellProp.formula = "" ;
        updateChildrenCells(address);
        console.log(cellProp);

       })

    }
}

let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown", async (e) => {
    let inputFormula = formulaBar.value;
    if(e.key === "Enter" && inputFormula){
      

       // If all of a sudden you change formula for a given cell  , then old formula will not be valid and you need to break the old parent chid relationship and update new formula with new parent chid relationship
       let address = addressBar.value;
       let [cell , cellProp] = activeCell(address);
       if(inputFormula !== cellProp.formula) removeChildFromParent(cellProp.formula);

       addChildToGraphComponent(inputFormula , address);
    // Check Formula is Cyclic or not . Then only Evaluate.
    // True Denotes Cyclic and False Denotes Non-Cyclic
    let cycleResponse = isGraphCyclic(graphComponentMatrix);
    if(cycleResponse){
      //  alert("Your formula is cyclic");
       let response = confirm("Your formula is cyclic Do you want to Trace your path? ");

      while(response == true){
        // Keep on tracking the path until user cancels it or is satisfied .
      await isGraphCyclicTracePath(graphComponentMatrix , cycleResponse); // I want to complete full iteration of color tracking, so i will attach wait here also .
        response = confirm("Your formula is cyclic Do you want to Trace your path? ");
      }


        removeChildFromGraphComponent( inputFormula , address);
        return;
    }

       let evaluatedValue = evaluateFormula(inputFormula);

       

       // To update UI and DB
       setCellUIAndCellProp(evaluatedValue , inputFormula , address);
       addChildToParent(inputFormula);
       console.log("Ye hai Object",sheetDB);
       updateChildrenCells(address);

    }
})

function addChildToGraphComponent(formula , childAddress){
   let [crid ,ccid] =  decodeRidCidFromAddress(childAddress);

   let encodedFormula = formula.split(" ");
   //let childAddress = addressBar.value;
   for(let i = 0 ; i < encodedFormula.length ; i++){
       let asciiValue = encodedFormula[i].charCodeAt(0);
   
       if(asciiValue >= 65 && asciiValue <= 90){
       let [prid , pcid] =  decodeRidCidFromAddress(encodedFormula[i]);
        graphComponentMatrix[prid][pcid].push([crid , ccid]);
       }
       
       }
}

function removeChildFromGraphComponent( formula , childAddress){
    let [crid ,ccid] =  decodeRidCidFromAddress(childAddress);

    let encodedFormula = formula.split(" ");

    for(let i = 0 ; i < encodedFormula.length ; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
    
        if(asciiValue >= 65 && asciiValue <= 90){
        let [prid , pcid] =  decodeRidCidFromAddress(encodedFormula[i]);
         graphComponentMatrix[prid][pcid].pop();
        }
        
        }

}

function updateChildrenCells(parentAddress){
    let [parentCell , parentCellProp] = activeCell(parentAddress);
    let children = parentCellProp.children;

    for(let i = 0 ; i < children.length; i++){
        let childAddress = children[i];
        let [childCell , childCellProp] = activeCell(childAddress);
        let childFormula = childCellProp.formula;

        let evaluatedValue =  evaluateFormula(childFormula);
        setCellUIAndCellProp(evaluatedValue , childFormula , childAddress);
        updateChildrenCells(childAddress);
    }

}

function addChildToParent(formula){
    let encodedFormula = formula.split(" ");
    let childAddress = addressBar.value;
    for(let i = 0 ; i < encodedFormula.length ; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
    
        if(asciiValue >= 65 && asciiValue <= 90){
           let [parentCell , parentCellProp] = activeCell(encodedFormula[i]); 
           parentCellProp.children.push(childAddress);
        
        }
        
        }

}

function removeChildFromParent(formula){
    let encodedFormula = formula.split(" ");
    let childAddress = addressBar.value;
    for(let i = 0 ; i < encodedFormula.length ; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
    
        if(asciiValue >= 65 && asciiValue <= 90){
           let [parentCell , parentCellProp] = activeCell(encodedFormula[i]); 
          let idx = parentCellProp.children.indexOf(childAddress);
          parentCellProp.children.splice(idx ,1);
        }
        
        }
}

function evaluateFormula(formula){
    let encodedFormula = formula.split(" ");
    for(let i = 0 ; i < encodedFormula.length ; i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
     //   console.log("piyush",asciiValue);
        if(asciiValue >= 65 && asciiValue <= 90){
           let [cell , cellProp] = activeCell(encodedFormula[i]);  
           encodedFormula[i] = cellProp.value;
           console.log("encoded bhalue", cellProp.value);
        }

    }
    let decodedFormula = encodedFormula.join(" ");

    console.log("Decoded Formula:", decodedFormula); // Debugging output
    
        return eval(decodedFormula);
    
}

function setCellUIAndCellProp(evaluatedValue , formula , address){
 //let address = addressBar.value;
 let [cell , cellProp] = activeCell(address);

 cell.innerText = evaluatedValue ; //UI update 
 cellProp.value = evaluatedValue; // DB update
 cellProp.formula = formula ;     // DB update
}