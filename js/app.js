const entryForm = document.querySelector('.form');
const groceryEntry = document.querySelector('.grocery');
const list = document.querySelector('.list'); 

const deleteItem = e =>{
    if(e.target.classList.contains('grocery-item-delete')){
        delFromUI(e.target.parentElement);
        delFromLocalStorage(e.target.previousElementSibling.textContent);
    }
}

//displaying to UI
const displayToUI = text => {
    const row = document.createElement('li')
    row.className = 'item'
    row.innerHTML = `
        <span class="grocery-item">${text}</span>
        <span class="grocery-item-delete">X</span>
    `
    list.appendChild(row);
    const delItem = document.querySelectorAll('.grocery-item-delete');
    delItem.forEach(item => {
        item.addEventListener('click',deleteItem)
    })
}
const delFromUI = el =>{
    el.remove()
}

//localStorage
const getStorage = () =>{
    let groceryList = []
    if(localStorage.getItem("grocery") === null){
        return groceryList
    }else {
        return JSON.parse(localStorage.getItem('grocery'))
    }
}

const storeToStorage = text =>{
    const tempStorage = getStorage()
    tempStorage.push(text)
    localStorage.setItem("grocery", JSON.stringify(tempStorage))
}
function delFromLocalStorage(el){
    const tempStorage = getStorage();
    tempStorage.forEach((item,index) => {
        if(item === el){
            tempStorage.splice(index,1);
        }
    });
    localStorage.setItem('grocery', JSON.stringify(tempStorage));
}
//EventListener
document.addEventListener('DOMContentLoaded', ()=>{
    const tempStorage = getStorage()
    tempStorage.forEach(item => {
        displayToUI(item)
    })
    const delItem = document.querySelectorAll('.grocery-item-delete');
    delItem.forEach(item => {
        item.addEventListener('click',deleteItem)
    })
})
entryForm.addEventListener('submit', e =>{
    e.preventDefault()
    const groceryText = groceryEntry.value;
    if(groceryText !== ''){
        displayToUI(groceryText)
        storeToStorage(groceryText)
    }
})