/* faculty-dashboard-script.js
   Simple charts and lightweight interactions for faculty dashboard.
   This uses Chart.js (CDN referenced in HTML).
*/

// Quick button handlers (demo)
document.getElementById('btn-create-notice').addEventListener('click', function(){
  alert('Open notice creation modal (implement in next step).');
});
document.getElementById('btn-request-event').addEventListener('click', function(){
  alert('Open event request form (implement in next step).');
});

/* Event Participation Chart (bar) */
const ctxE = document.getElementById('facultyEventChart').getContext('2d');
const facultyEventChart = new Chart(ctxE, {
  type: 'bar',
  data: {
    labels: ['Seminar', 'Workshop', 'Guest Lecture', 'Sports Day'],
    datasets: [{
      label: 'Registered',
      data: [40, 30, 60, 20],
      backgroundColor: '#007bff'
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  }
});

/* Notice Engagement Chart (line) */
const ctxN = document.getElementById('facultyNoticeChart').getContext('2d');
const facultyNoticeChart = new Chart(ctxN, {
  type: 'line',
  data: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Views',
      data: [25,45,32,70],
      borderColor: '#28a745',
      tension: 0.2,
      fill: false
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  }
});
