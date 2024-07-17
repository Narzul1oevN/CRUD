let box = document.querySelector(".box")
let Api = "https://666ad4577013419182d116ef.mockapi.io/name/Application"

async function getData () {
    try {
        let response = await fetch(Api)
        let data = await response.json()
        get(data)
    } catch (error) {
        console.error(error)
    }
}
getData()

function get(data) {
    box.innerHTML = ""
    data.forEach(element => {
        
        let div = document.createElement("div")
        div.classList.add("div")

        let img = document.createElement("img")
        img.src = element.img
        img.classList.add("img")

        let stars = document.createElement("h1")
        stars.innerHTML = `
      <div class="rating">
        <input value="5" name="rate${element.id}" id="star5-${element.id}" type="radio">
        <label title="text" for="star5-${element.id}"></label>
        <input value="4" name="rate${element.id}" id="star4-${element.id}" type="radio">
        <label title="text" for="star4-${element.id}"></label>
        <input value="3" name="rate${element.id}" id="star3-${element.id}" type="radio" checked="">
        <label title="text" for="star3-${element.id}"></label>
        <input value="2" name="rate${element.id}" id="star2-${element.id}" type="radio">
        <label title="text" for="star2-${element.id}"></label>
        <input value="1" name="rate${element.id}" id="star1-${element.id}" type="radio">
        <label title="text" for="star1-${element.id}"></label>
      </div>
    `;
        stars.classList.add("stars")


        let name = document.createElement("h2")
        name.innerHTML = element.name
        name.classList.add("name")
       
        let purchased = document.createElement("h1")
        purchased.innerHTML = "purchased"
        purchased.classList.add("purchased")

        
        let status = document.createElement("p")
        status.innerHTML = element.status
        status.classList.add("status")
        if (element.status == true) {
            purchased.style.display = "block"
        }
        

        let lorem = document.createElement("p")
        lorem.innerHTML = element.lorem.slice(0, 60) + "..."
        lorem.classList.add("lorem")

        let priceButtons = document.createElement("biv")
        priceButtons.classList.add("priceButtons")

        let price = document.createElement("p")
        price.innerHTML = `${element.price} $`
        price.classList.add("price")

        let btns = document.createElement("div")
        btns.classList.add("btns")

        let btnDel = document.createElement("h1")
        btnDel.classList = "fa-solid fa-cart-shopping"

        btnDel.onclick = () => {
            deleteUser(element.id)
        }

        let btnEdit = document.createElement("h1")
        btnEdit.classList = "fa-solid fa-pen-to-square"

        btnEdit.onclick = () => {
            editModal.showModal()
            editUser(element)
            editClose.onclick = () => {
                editModal.close()
                actionsModal.close()
            }
            editCloseModal.onclick = () => {
                editModal.close()
                actionsModal.close()
            }
        }

        

        let checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.classList.add("checkbox")

        checkbox.onclick = async () => {
            if (checkbox.checked) {
                element.status = !element.status;
                purchased.style.display = "block";
            } else {
                purchased.style.display = "none";
            }
        }
        
        const updatePurchasedDisplay = async () => {
            if (element.status === true) {
                purchased.style.display = "none";
            } else {
                purchased.style.display = "block";
            }
        };
        
        updatePurchasedDisplay();
        
        
        

        let btnInfo = document.createElement("h1")
        btnInfo.classList = "fa-sharp fa-solid fa-circle-info"


            btnInfo.onclick = () => {
                infoModal.showModal()   
                infoImg.src = element.img
                infoName.innerHTML = element.name
                infoEmail.innerHTML = element.email
                infoPhone.innerHTML = element.price
                infoStatus.innerHTML = element.status == true ? "Хастай" : "Фурухташуд"
                if (element.status == true) {
                    infoStatus.classList.add("active")
                }
                else {
                    infoStatus.classList.add("inactive")
                }
                infoDel.onclick = () => {
                    deleteUser(element.id)
                    infoModal.close()
                }
                infoEdit.onclick = () => {
                    editModal.showModal()
                    editUser(element)
                    infoModal.close()
                }
                infoCity.innerHTML = element.city
                cencel.onclick = () => {
                    infoModal.close()
                }

            }

        btns.append(checkbox, btnDel, btnEdit, btnInfo)
        priceButtons.append(price, btns)
        div.append(purchased, img, stars, name, lorem, priceButtons)
        box.append(div)
    });
}
getData()



    // search
let search = document.querySelector(".search")

search.oninput = async (event) => {
    let val = event.target.value
    try {
        let response = await fetch(`${Api}?name=${val}`)
        let data = await response.json()
        get(data)
    } catch (error) {
        console.error(error);
    }
}
getData()



    // delete
async function deleteUser(id) {
    try {
        let response = await fetch(`${Api}/${id}`, {
            method: 'DELETE',
        })
        getData()
    } catch (error) {
        console.error(error);
    }
}


    // add
let addBtn = document.querySelector(".addBtn")
let addModal = document.querySelector(".addModal")
let addClose = document.querySelector(".addClose")
let addImg = document.querySelector(".addImg")
let addName = document.querySelector(".addName")
let addEmail = document.querySelector(".addEmail")
let addPhone = document.querySelector(".addPhone")
let addSave = document.querySelector(".addSave")
let addCloseModal = document.querySelector(".addCloseModal")

addBtn.onclick = () => {
    addModal.showModal()
    addClose.onclick = () => {
        addModal.close()
    }
    addCloseModal.onclick = () => {
        addModal.close()
    }
}

async function postuser(user) {
    try {
        let response = await fetch (Api, {
            method: "POST",
            headers : {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        getData()
    } catch (error) {
        console.error(error);
    }
}

addSave.onclick = () => {
    let newObj = {
        name: addName.value,
        lorem: addEmail.value,
        price: addPhone.value,
        img: addImg.value
    }
    postuser(newObj)
    addModal.close()
    addName.value = ''
    addEmail.value = ''
    addSelStatus.value = 'all' 
    addSelCity.value = 'All'
    addPhone.value = ''
    addImg.value = ''
}









    // edit
let editModal = document.querySelector(".editModal")
let editClose = document.querySelector(".editClose")
let editImg = document.querySelector(".editImg")
let editName = document.querySelector(".editName")
let editEmail = document.querySelector(".editEmail")
let editSelStatus = document.querySelector(".editSelStatus")
let editSelCity = document.querySelector(".editSelCity")
let editPhone = document.querySelector(".editPhone")
let editSave = document.querySelector(".editSave")
let editCloseModal = document.querySelector(".editCloseModal")





function editUser(user) {
    editImg.value = user.img
    editName.value = user.name
    editEmail.value = user.lorem
    editPhone.value = user.price

    editSave.onclick = async () => {
        try {
            let response = await fetch(`${Api}/${user.id}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                   img: editImg.value,
                    name: editName.value,
                    lorem: editEmail.value,
                    price: editPhone.value 
                })
            })
            getData()
            editModal.close()
        } catch (error) {
            console.error(error);
        }
    }
}





    // info
let infoModal = document.querySelector(".infoModal")
let infoImg = document.querySelector(".infoImg")
let infoName = document.querySelector(".infoName")
let infoEmail = document.querySelector(".infoEmail")
let infoPhone = document.querySelector(".infoPhone")
let infoStatus = document.querySelector(".infoStatus")
let infoCity = document.querySelector(".infoCity")
let infoDel = document.querySelector(".infoDel")
let infoEdit = document.querySelector(".infoEdit")
let cencel = document.querySelector(".cencel")




let selStatus = document.querySelector(".selStatus")

selStatus.onchange = async (event) => {
    let val = event.target.value
    let uri = 
    val !== "all" ? `${Api}?status=${val == 'active' ? true : false}` : Api;
    try {
        let response = await fetch(uri)
        let data = await response.json()
        get(data)
    } catch (error) {
        console.log(error);
    }
}