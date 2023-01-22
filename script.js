const madal = document.querySelector(".modal");
const add = document.querySelector(".add");
const noSubmit = document.querySelector(".no-submit");
const form = document.querySelector(".form");
const thead = document.querySelector(".thead");
const table = document.querySelector(".table");
const devoirFait = document.querySelectorAll(".devoirFait");

// function add element after parent
const addElementAfterChild = (parent, element, child) => {
  parent.insertBefore(element, child.nextSibling);
};

// remove  row in the table
function deleteRow(button) {
  let row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
  // delete in the local storage
  console.log(row.children[6].innerHTML);
  localStorage.removeItem(row.children[6].innerHTML);
}

// remove td in the table
function clearTable(tableId) {
  let rows = table.getElementsByTagName("tr");
  for (let i = 0; i < rows.length; i++) {
    let cells = rows[i].getElementsByTagName("td");
    while (cells.length > 0) {
      cells[0].parentNode.removeChild(cells[0]);
    }
  }
}

// ----- MOADAL -----
add.addEventListener("click", () => {
  madal.classList.add("modal-show");
});

noSubmit.addEventListener("click", () => {
  madal.classList.remove("modal-show");
});
// ----- END MOADAL -----

// ----- FORM & LOCAL STORAGE -----
form.addEventListener("submit", (e) => {
  e.preventDefault();
  madal.classList.remove("modal-show");
  // get the value of the input with new FormData
  const formData = new FormData(form);

  const matiere = formData.get("matiere");
  const date = formData.get("date");
  const description = formData.get("description");
  const titre = formData.get("titre");
  // add in the objct the value of the input with the key
  const data = {
    titre: titre,
    matiere: matiere,
    date: date,
    description: description,
    fait: false,
  };
  // add the object in the local storage
  localStorage.setItem(`${new Date()}`, JSON.stringify(data));
  // clear the table
  clearTable("table");
  // render the table
  renderTable();
});

// ----- END FORM & LOCAL STORAGE -----

const renderTable = () => {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);

    const data = JSON.parse(value);
    console.log(data);
    if (data.fait) {
      thead.insertAdjacentHTML(
        "afterend",
        `
                  <tr class="fait">
                    <td>${data.titre}</td>
                    <td>${data.matiere}</td>
                    <td>${data.date}</td>
                    <td>${data.description}</td>
                    <td><button onclick="fait(this)"" >Devoir fait</button></td>
                    <td><button  onclick="deleteRow(this)">Delete</button></td>
                    <td class="none" >${key}</td>
                      </tr>
                  `
      );
    } else {
      thead.insertAdjacentHTML(
        "afterend",
        `
              <tr>
                <td>${data.titre}</td>
                <td>${data.matiere}</td>
                <td>${data.date}</td>
                <td>${data.description}</td>
                <td><button onclick="fait(this)"" >Devoir fait</button></td>
                <td><button onclick="deleteRow(this)">Delete</button></td>
                <td class="none" >${key}</td>
                  </tr>
              `
      );
    }
  }
};

renderTable();

const fait = (button) => {
  console.log(button.parentNode);
  let row = button.parentNode.parentNode;
  console.log(row);
  row.classList.add("fait");
  console.log(row.children[6].innerHTML);
  let key = row.children[6].innerHTML;
  let value = localStorage.getItem(key);
  const data = JSON.parse(value);
  data.fait = true;
  localStorage.setItem(key, JSON.stringify(data));
};
