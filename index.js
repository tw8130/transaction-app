const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
// const items = [

// {id: 1,  desc:"Flower", amount:"4000"},
// {id: 2 , desc:"Flower" ,amount:"4000"},
// {id: 3 , desc:"Flower" ,amount:"4000"}

// ]

// let transaction = items;

const addList = (transaction) => {


    const sign = transaction.amount < 0 ? "-" : "+"
    const item = document.createElement('li')
    item.classList.add(transaction.amount < 0 ? "minus" : "plus")
    item.innerHTML = `${transaction.text} <span> ${sign} ${Math.abs(transaction.amount)} </span>
 <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>`


    list.appendChild(item)
    console.log(transaction)
}


const localStorageTrans = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTrans : [];



// Add transaction
function addTransaction(e) {
    e.preventDefault();
    if (text.value.trim() == "" || amount.value.trim() == "") {
        alert("Please enter a description and amount")

    } else {
        const transaction = {
            id: uniqueId(),
            text: text.value,
            amount: +amount.value
        };
        transactions.push(transaction)
        addList(transaction)
        updateValues();
        updateLocalStorage();
        text.value = "";
        amount.value = "";



    }
}

// Generate random ID
function uniqueId() {
    return Math.floor(Math.random() * 100000)

}

// Update the balance, income and expense
function updateValues() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc += item), 0)
        .toFixed(2);
    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
        -1
    ).toFixed(2);
    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}
// Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}

// Update local storage transactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}
// Init app
function init() {
    list.innerHTML = '';
    transactions.forEach(addList);
    updateValues();
}
init();

form.addEventListener("submit", addTransaction)