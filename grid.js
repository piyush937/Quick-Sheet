let rows = 100;
let cols = 26;

let addressColCont = document.querySelector(".address-column-cont")
let addressRowCont = document.querySelector(".address-row-cont")
let cellsCont = document.querySelector(".cells-cont")
let addressBar = document.querySelector(".address-bar")
for(let i = 0 ; i < rows ; i++){
    let addressCol  = document.createElement("div");
    addressCol.setAttribute("class" , "address-col");
    addressCol.innerText = i+1;
    addressColCont.appendChild(addressCol);
}

for(let i = 0 ; i < cols ; i++){
    let addressRow = document.createElement("div");
    addressRow.setAttribute("class" , "address-row");
    addressRow.innerText = String.fromCharCode(65+i);//As the ascii value of "A =65" & "Z=90"
    addressRowCont.appendChild(addressRow);
}

for(let i = 0 ; i < rows ; i++){ // This For loop is For creating 100 rows divs
    let rowCont = document.createElement("div"); 
    rowCont.setAttribute("class" , "row-cont");
    for(let j = 0 ; j < cols ; j++){ // This for loop inside above for loop is creating 26 divs columnwise in a single row
      let cell = document.createElement("div");
      cell.setAttribute("class" , "cell");
      cell.setAttribute("contenteditable", "true");//contenteditable="true": attribute in HTML Makes the element editable  directly on the webpage.
      cell.setAttribute("spellcheck", "false");
      //Attributs for cell and Storage identification
      cell.setAttribute("rid", i); 
      cell.setAttribute("cid", j);

      rowCont.appendChild(cell);
      addListnerForAddressBarDisplay(cell , i , j);
    }
    cellsCont.appendChild(rowCont);
}

function addListnerForAddressBarDisplay(cell, i , j){
cell.addEventListener("click" , (e) =>{
let rowId = i+1;
let colId = String.fromCharCode(65+j);
addressBar.value = `${colId}${rowId}`
})
}

