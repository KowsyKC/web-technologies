const balanceEl = document.getElementById('balance');
const incomeAmountEl = document.getElementById('income-amount');
const expenseAmountEl = document.getElementById('expense-amount');
const addIncomeBtn = document.getElementById('add-income');
const addExpenseBtn = document.getElementById('add-expense');
const transactionList = document.getElementById('transaction-list');

let balance = 0;
let transactions = [];

function updateBalance() {
  balanceEl.textContent = balance.toFixed(2);
}

function addTransaction(type, amount) {
  transactions.push({ type, amount });
  updateTransactions();
}

function updateTransactions() {
  transactionList.innerHTML = '';

  transactions.forEach(transaction => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${transaction.type}: $${transaction.amount.toFixed(2)}`;
    transactionList.appendChild(listItem);
  });
}

addIncomeBtn.addEventListener('click', () => {
  const incomeAmount = parseFloat(incomeAmountEl.value);
  if (!isNaN(incomeAmount)) {
    balance += incomeAmount;
    updateBalance();
    addTransaction('Income', incomeAmount);
    incomeAmountEl.value = '';
  }
});

addExpenseBtn.addEventListener('click', () => {
  const expenseAmount = parseFloat(expenseAmountEl.value);
  if (!isNaN(expenseAmount)) {
    balance -= expenseAmount;
    updateBalance();
    addTransaction('Expense', expenseAmount);
    expenseAmountEl.value = '';
  }
});