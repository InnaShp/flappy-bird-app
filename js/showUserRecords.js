// export function updateRecordsList(records) {
//   let recordsList = document.getElementById('recordsList');
//   recordsList.innerHTML = '';
//   records.forEach((record) => {
//     const listItem = document.createElement('li');
//     listItem.classList.add('table__item');
//     listItem.innerHTML = `<div class="table__user-name">${record.name}</div><div class="table__user-record">${record.score}</div>`;
//     recordsList.appendChild(listItem);
//   });
// }

// const topScores = JSON.parse(localStorage.getItem('topScores')) || [];
// updateRecordsList(topScores);

// Функція для оновлення списку рекордів на сторінці
// function updateRecordsList(records) {
//   let recordsList = document.getElementById('recordsList');
//   recordsList.innerHTML = '';
//   records.forEach((record) => {
//     const listItem = document.createElement('li');
//     listItem.classList.add('table__item');
//     listItem.innerHTML = `<div class="table__user-name">${record.name}</div><div class="table__user-record">${record.score}</div>`;
//     recordsList.appendChild(listItem);
//   });
// }
// const topScores = JSON.parse(localStorage.getItem('topScores')) || [];
// updateRecordsList(topScores)

function updateRecordsList(records) {
  let recordsList = document.getElementById('recordsList');
  recordsList.innerHTML = '';
  
  // Обрізаємо список до топ 10 позицій
  const top10Records = records.slice(0, 10);

  top10Records.forEach((record) => {
    const listItem = document.createElement('li');
    listItem.classList.add('table__item');
    listItem.innerHTML = `<div class="table__user-name">${record.name}</div><div class="table__user-record">${record.score}</div>`;
    recordsList.appendChild(listItem);
  });
}

// Отримуємо всі рекорди з localStorage
const allTopScores = JSON.parse(localStorage.getItem('topScores')) || [];
updateRecordsList(allTopScores);
