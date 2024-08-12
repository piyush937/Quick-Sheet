//Storage
let collectedSheetDB = []; // Contains All SheetDb
 let sheetDB = [];

 {
 let addSheetBtn = document.querySelector(".sheet-add-icon");
 addSheetBtn.click();

 }


 //
 //for(let i = 0; i < rows ; i++){
 // let sheetRow = [];
 //for(let j = 0; j < cols ; j++){
 //    let cellProp = {
 //       bold : false,
 //       italic : false,
 //       underline : false,
 //       alignment : "left",
 //       fontFamily : "monospace",
 //       fontSize : "14",
 //       fontColor : "#000000",
 //       bgColor : "#000000",
 //       value: "",
 //       formula: "",
 //       children: [],
 //
 //    }
 //    sheetRow.push(cellProp);
 //}
 //sheetDB.push(sheetRow);
 //
 //}

//Selectors for cell properties

let bold = document.querySelector('.bold');
let italic = document.querySelector('.italic');
let underline = document.querySelector('.underline');
let fontSize = document.querySelector('.font-size-prop');
let fontFamily = document.querySelector('.font-family-prop');
let fontColor = document.querySelector('.font-color-prop');
let bgColor = document.querySelector('.bg-color-prop');
let alignment = document.querySelectorAll('.alignment');
let leftAlign = alignment[0];
let centerAlign = alignment[1];
let rightAlign = alignment[2];

//let addressBar = document.querySelector(".address-bar");  addressBar ko select krne ki jarurat nahi h wo phle se hi grid.js m declared h

let activeColorProp = "#d1d8e0";
let inactivecolorProp = "#ecf0f1";

//Attach Property Listners

bold.addEventListener("click" , (e) =>{
    let address = addressBar.value;
    let [cell , cellProp] =  activeCell(address);

    //Modification
    
    cellProp.bold = !cellProp.bold; //Data change in object
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";//UI change
    bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactivecolorProp ; //UI change
})

italic.addEventListener("click" , (e) =>{
    let address = addressBar.value;
    let [cell , cellProp] =  activeCell(address);

    //Modification
    
    cellProp.italic = !cellProp.italic; //Data change in object
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";//UI change
    italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactivecolorProp ; //UI change
})

underline.addEventListener("click" , (e) =>{
    let address = addressBar.value;
    let [cell , cellProp] =  activeCell(address);

    //Modification
    
    cellProp.underline = !cellProp.underline; //Data change in object
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";//UI change
    underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactivecolorProp ; //UI change
})

fontSize.addEventListener("change" , (e) =>{
    let address = addressBar.value;
    let [cell , cellProp] =  activeCell(address);

    cellProp.fontSize = fontSize.value; //Data change in object
    cell.style.fontSize = cellProp.fontSize + "px";
    fontSize.value = cellProp.fontSize;
})

fontFamily.addEventListener("change" , (e) =>{
    let address = addressBar.value;
    let [cell , cellProp] =  activeCell(address);

    cellProp.fontFamily = fontFamily.value; //Data change in object
    cell.style.fontFamily = cellProp.fontFamily 
    fontFamily.value = cellProp.fontFamily;
})

fontColor.addEventListener("change" , (e) => {
    let address = addressBar.value;
    let [cell , cellProp] =  activeCell(address);

    cellProp.fontColor = fontColor.value; //Data change in object
    cell.style.color = cellProp.fontColor 
    fontColor.value = cellProp.fontColor;

})

bgColor.addEventListener("change" , (e) => {
    let address = addressBar.value;
    let [cell , cellProp] =  activeCell(address);

    cellProp.bgColor = bgColor.value; //Data change in object
    cell.style.backgroundColor = cellProp.bgColor; 
    bgColor.value = cellProp.bgColor;
})

alignment.forEach((alignElem) =>{
    alignElem.addEventListener("click" , (e) => {
        let address = addressBar.value;
        let [cell , cellProp] =  activeCell(address);

        let alignValue = e.target.classList[0];
        cellProp.alignment = alignValue; //Data change in object
        cell.style.textAlign = cellProp.alignment;

        switch(alignValue){
            case "left":
             leftAlign.style.backgroundColor = activeColorProp;
             centerAlign.style.backgroundColor = inactivecolorProp;
             rightAlign.style.backgroundColor = inactivecolorProp;

                break;

                case "center":
                    leftAlign.style.backgroundColor = inactivecolorProp;
                    centerAlign.style.backgroundColor = activeColorProp;
                    rightAlign.style.backgroundColor = inactivecolorProp;
       
                    break;

                    case "right":
                        leftAlign.style.backgroundColor = inactivecolorProp;
                        centerAlign.style.backgroundColor = inactivecolorProp;
                        rightAlign.style.backgroundColor = activeColorProp;
           
                        break;
                
        }

        
    })
})

let allCells = document.querySelectorAll(".cell");
for(let i = 0 ; i < allCells.length ; i++){
    addListenerToAttachCellProperties(allCells[i]);
}

function addListenerToAttachCellProperties(cell){
 
 cell.addEventListener("click" , (e) => {

    let address = addressBar.value;
    let [rid ,cid]= decodeRidCidFromAddress(address);
    let cellProp = sheetDB[rid][cid];
 
    // Apply Cell properties
    cell.style.fontWeight = cellProp.bold ? "bold" : "normal";
    cell.style.fontStyle = cellProp.italic ? "italic" : "normal";
    cell.style.textDecoration = cellProp.underline ? "underline" : "none";
    cell.style.fontSize = cellProp.fontSize + "px";
    cell.style.fontFamily = cellProp.fontFamily ;
    cell.style.color = cellProp.fontColor ;
    cell.style.backgroundColor = cellProp.bgColor === "#000000" ? "transparent": cellProp.bgColor;
    cell.style.textAlign = cellProp.alignment;

   

        // Apply UI wali Properties 
        bold.style.backgroundColor = cellProp.bold ? activeColorProp : inactivecolorProp ;
        italic.style.backgroundColor = cellProp.italic ? activeColorProp : inactivecolorProp ;
        underline.style.backgroundColor = cellProp.underline ? activeColorProp : inactivecolorProp ; 
      //  fontSize.value = cellProp.fontSize;
      //  fontFamily.value = cellProp.fontFamily;
        fontColor.value = cellProp.fontColor;
        bgColor.value = cellProp.bgColor;

        switch(cellProp.alignment){
            case "left":
             leftAlign.style.backgroundColor = activeColorProp;
             centerAlign.style.backgroundColor = inactivecolorProp;
             rightAlign.style.backgroundColor = inactivecolorProp;
    
                break;
    
                case "center":
                    leftAlign.style.backgroundColor = inactivecolorProp;
                    centerAlign.style.backgroundColor = activeColorProp;
                    rightAlign.style.backgroundColor = inactivecolorProp;
       
                    break;
    
                    case "right":
                        leftAlign.style.backgroundColor = inactivecolorProp;
                        centerAlign.style.backgroundColor = inactivecolorProp;
                        rightAlign.style.backgroundColor = activeColorProp;
           
                        break;
                
        }

        let formulaBar =  document.querySelector(".formula-bar");
        formulaBar.value = cellProp.formula;
        cell.innerText = cellProp.value;
       
 })
}





function activeCell(address){
   let [rid , cid] = decodeRidCidFromAddress(address);
   //Acess cell & storage object
   let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
   let cellProp = sheetDB[rid][cid];
   return [cell , cellProp];
}

function decodeRidCidFromAddress(address){
    // address -> "A1"
    let rid = Number(address.slice(1)-1);
    let cid = Number(address.charCodeAt(0)-65);
    return [rid , cid];

}