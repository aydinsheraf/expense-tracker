expenseForm.addEventListener('submit', e => {
  e.preventDefault();
  const id = expenseIdIn.value;
  const payload = {
    id: id || uid(),
    title: titleIn.value.trim() || 'Untitled',
    amount: Number(amountIn.value) || 0,
    type: typeIn.value,
    date: dateIn.value,
    category: categoryIn.value,
    note: noteIn.value.trim()
  };

  // LocalStorage saving
  if(id){
    const idx = expenses.findIndex(x => x.id === id);
    if(idx>=0) expenses[idx] = payload;
  } else {
    expenses.push(payload);
  }

  expenseForm.reset();
  expenseIdIn.value = '';
  setDefaultDate();
  render();

// Send to Google Sheets
fetch('https://script.google.com/macros/s/AKfycbw--06OhnmuWHvpZf08RxkHx-GxCdJ9KyYkPrWMV34agkcHTjffjGzuQhvEb4ot9B4ZfQ/exec', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)  // send the same data
})
.then(res => res.json())
.then(data => {
  if(data.status !== "success") console.error("Google Sheets Error:", data);
  else console.log("Saved to Google Sheets:", data);
})
.catch(err => console.error("Fetch Error:", err));

});
