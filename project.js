const tbody = document.getElementById("tbody");
// popup handling
const popup = document.querySelector(".popup");
const popupNew = document.querySelector(".popupNew");
// handle form submission 
const form = document.getElementById("form");
const form1 = document.getElementById("form1");

let employeeId = 1; // 2
let newEditedRow;

function addEmployee(employeeObj) {
    // takes an employee object are parameter adds that data into table
    /**
     <tr>
        <td>1</td>
        <td>Aravind</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
     */
    const tr = document.createElement("tr");
    // <tr><td>1003</td></tr>

    const employeeIdCell = document.createElement("td");
    employeeIdCell.setAttribute("name", "emid");
    employeeIdCell.innerText = employeeId++; // 1
    // <td>1003</td>

    tr.appendChild(employeeIdCell);

    for (let key in employeeObj) {
        const cell = document.createElement("td");
        cell.setAttribute("name",key)
        cell.innerText = employeeObj[key];
        // key = "companyName"
        // employeeObj["companyName"]
        tr.appendChild(cell);
    }

    /**
     * <td>
     *      <button>delete</button>
     *      <button>edit</button>
     * </td>
     */
    const actionsCell = document.createElement("td");
    actionsCell.setAttribute("name","actionsCell")
    const deleteButton = document.createElement("button")
    deleteButton.innerText = "Delete"
    const editButton = document.createElement("button")
    editButton.innerText = "Edit";

    deleteButton.addEventListener("click", deleteRecord);
    editButton.addEventListener("click", editRecord);

    actionsCell.append(deleteButton, editButton);

    tr.appendChild(actionsCell);

    tbody.appendChild(tr);
}

function togglePopup() {
    // toggles the popup
    if (popup.style.display === "none") {
        popup.style.display = "flex";
        form.phoneNumber.value = 3983033030;
    }
    else {
        popup.style.display = "none";
    }
}

function togglePopupNew(editrow){
    // toggles the newPopup
    if (popupNew.style.display === "none") {
        popupNew.style.display = "flex";
        form1.phoneNumber.value = editrow.phoneNumber.innerText;
        form1.role.value=editrow.role.innerText
        form1.salary.value=editrow.salary.innerText
        form1.name.value=editrow.name.innerText
        form1.email.value=editrow.email.innerText
        form1.companyName.value=editrow.companyName.innerText
        newEditedRow=editrow

    }
    else {
        popupNew.style.display = "none";
    }

}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let employee = {
        name: form.name.value,
        role: form.role.value,
        salary: form.salary.value,
        phoneNumber: form.phoneNumber.value,
        email: form.email.value,
        companyName: form.companyName.value
    }
    addEmployee(employee);
    form.reset();
    togglePopup();
})

form1.addEventListener("submit",(e)=>{
e.preventDefault()
newEditedRow.name.innerText=form1.name.value
newEditedRow.role.innerText=form1.role.value
newEditedRow.salary.innerText=form1.salary.value
newEditedRow.email.innerText=form1.email.value
newEditedRow.phoneNumber.innerText=form1.phoneNumber.value
newEditedRow.companyName.innerText=form1.companyName.value
form.reset()
togglePopupNew()
})


function deleteRecord(e) {
    // event listener callback for the delete button
    // e.target = > will be the delete button on which user clicks 
    let tr = e.target.parentNode.parentNode;
    tr.remove();
}

function editRecord(e) {
    // event listener callback for the edit button 
    let editrow=e.target.parentNode.parentNode
    togglePopupNew(editrow.children);
    // TODO: homework
    // TODO: show a popup with the pre filled data of the record , submitting it will update the record in table.
}

