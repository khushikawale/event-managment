// Lightweight interactions for student dashboard (demo data)
// Quick buttons
document.getElementById('btn-view-events').addEventListener('click', () => {
  window.location.href = 'events.html';
});
document.getElementById('btn-my-registrations').addEventListener('click', () => {
  alert('Open My Registrations panel (you can implement a modal or separate page).');
});

/* Event Attendance Chart (bar) */
const ctx1 = document.getElementById('studentEventChart').getContext('2d');
const studentEventChart = new Chart(ctx1, {
  type: 'bar',
  data: {
    labels: ['Apr','May','Jun','Jul','Aug','Sep'],
    datasets: [{
      label: 'Attended',
      data: [1,2,0,3,2,1],
      backgroundColor: '#007bff'
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  }
});

/* Notice Read Rate (doughnut) */
const ctx2 = document.getElementById('studentNoticeChart').getContext('2d');
const studentNoticeChart = new Chart(ctx2, {
  type: 'doughnut',
  data: {
    labels: ['Read','Unread'],
    datasets: [{
      label: 'Notices',
      data: [8,2],
      backgroundColor: ['#28a745', '#e0e0e0']
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } }
  }
});

// Demo handlers for event action buttons (delegation)
document.querySelectorAll('.action.tiny').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const txt = e.target.textContent.trim();
    alert(`${txt} clicked (implement actual behavior).`);
  });
});
