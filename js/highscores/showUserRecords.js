function updateRecordsList(records) {
  let recordsList = document.getElementById('recordsList');
  recordsList.innerHTML = '';
  const top10Records = records.slice(0, 10);
  top10Records.forEach((record, index) => {
    const listItem = document.createElement('li');
    const player = record.name.toUpperCase();
    const rank = index + 1;
    listItem.classList.add('table__item');
    listItem.innerHTML = `<div class="table__user-rank">${rank}.</div><div class="table__user-name">${player}</div><div class="table__user-record">${record.score}</div>`;
    recordsList.appendChild(listItem);
  });
}
const allTopScores = JSON.parse(localStorage.getItem('topScores')) || [];
updateRecordsList(allTopScores);