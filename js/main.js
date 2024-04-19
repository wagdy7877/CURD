var proName = document.getElementById("productName");
var proCategory = document.getElementById("productCategory");
var proPrice = document.getElementById("productPrice");
var proDescription = document.getElementById("productDescription");
var btnAdd = document.getElementById("addProduct");
var searchInp = document.getElementById("searchInp");

if (localStorage.getItem("data") == null) {
  proList = [];
} else {
  proList = JSON.parse(localStorage.getItem("data"));
}
displayProduct();

function addProduct() {
  if (validatename() == true && validatecategory() == true && validateprice()==true ) {
    product = {
      name: proName.value,
      category: proCategory.value,
      price: proPrice.value,
      description: proDescription.value,
    };
    proList.push(product);
    localStorage.setItem("data", JSON.stringify(proList));
    displayProduct();
    location.reload();

    // clear();
  }
}

function displayProduct() {
  str = "";
  for (i = 0; i < proList.length; i++) {
    str += `<tr>
               <td>${i + 1}</td>
               <td>${proList[i].name}</td>
               <td>${proList[i].category}</td>
               <td>${proList[i].price}$</td>
               <td>${proList[i].description}</td>
               <td> <button onclick="deleteProduct(${i})" class="btn btn-danger">delete</button></td>
               <td> <button onclick="updatepro(${i})" class="btn btn-warning">update</button></td>
            </tr>`;
  }
  document.getElementById("tbody").innerHTML = str;
}

function deleteProduct(i) {
  proList.splice(i, 1);
  localStorage.setItem("data", JSON.stringify(proList));
  displayProduct();
}

function updatepro(i) {
  proName.value = proList[i].name;
  proCategory.value = proList[i].category;
  proPrice.value = proList[i].price;
  proDescription.value = proList[i].description;
  btnAdd.innerHTML = "update Product";
  btnAdd.className = "btn btn-warning";

  btnAdd.onclick = function () {
    proList[i].name = proName.value;
    proList[i].category = proCategory.value;
    proList[i].price = proPrice.value;
    proList[i].description = proDescription.value;
    btnAdd.innerHTML = "add Product";
    btnAdd.className = "btn btn-info";

    localStorage.setItem("data", JSON.stringify(proList));
    displayProduct();
    btnAdd.onclick = addProduct;
    clear();
  };
}

function clear() {
  proName.value = "";
  proCategory.value = "";
  proPrice.value = "";
  proDescription.value = "";
}

function search() {
  str = "";
  for (var i = 0; i < proList.length; i++) {
    if (proList[i].name.toLowerCase().includes(searchInp.value.toLowerCase())) {
      str += `<tr>
                   <td>${i + 1}</td>
                   <td>${proList[i].name.replace(
                     searchInp.value,
                     `<span style='background-color:yellow;'>${searchInp.value}</span>`
                   )}</td>
                   <td>${proList[i].category}</td>
                   <td>${proList[i].price}$</td>
                   <td>${proList[i].description}</td>
                   <td> <button onclick="deleteProduct(${i})" class="btn btn-danger">delete</button></td>
                   <td> <button onclick="updatepro(${i})" class="btn btn-warning">update</button></td>
                </tr>`;
    }
    document.getElementById("tbody").innerHTML = str;
  }
}



nalert = document.getElementById("nameAlert");
calert = document.getElementById("categoryAlert");
palert = document.getElementById("priceAlert");


function validatename() {
  regex = /^[A-Z][A-Za-z 0-9]{2,15}$/;
  str = proName.value;
  if (regex.test(str)) {
    proName.classList.remove("is-invalid");
    proName.classList.add("is-valid");
    nalert.classList.add("d-none");
    btnAdd.removeAttribute("disabled");
    return true;
  } else {
    proName.classList.add("is-invalid");
    nalert.classList.remove("d-none");
    btnAdd.setAttribute("disabled","true");
    return false;
  }
}

function validatecategory() {
  regex = /^[A-Za-z]{3,15}$/;
  str = proCategory.value;
  if (regex.test(str)) {
    proCategory.classList.remove("is-invalid");
    proCategory.classList.add("is-valid");
    calert.classList.add("d-none");
    btnAdd.removeAttribute("disabled");
    return true;
  } else {
    proCategory.classList.add("is-invalid");
    calert.classList.remove("d-none");
    btnAdd.setAttribute("disabled","true");
    return false;
  }
}
function validateprice() {
  regex =/^(?:[1-9]\d{0,3}|1\d{4}|20000)$/

  str = proPrice.value;
  if (regex.test(str)) {
    proPrice.classList.remove("is-invalid");
    proPrice.classList.add("is-valid");
    palert.classList.add("d-none");
    btnAdd.removeAttribute("disabled");
    return true;
  } else {
    proPrice.classList.add("is-invalid");
    palert.classList.remove("d-none");
    btnAdd.setAttribute("disabled","true");
    return false;
  }
}


proName.addEventListener("keyup", validatename);
proCategory.addEventListener("keyup", validatecategory);
proPrice.addEventListener("keyup", validateprice);
