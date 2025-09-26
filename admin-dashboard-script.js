// Event Participation Chart
const ctx1 = document.getElementById('eventChart').getContext('2d');
const eventChart = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: ['Event 1', 'Event 2', 'Event 3', 'Event 4'],
        datasets: [{
            label: 'Participants',
            data: [120, 90, 150, 80],
            backgroundColor: '#007bff'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

// Notice Engagement Chart
const ctx2 = document.getElementById('noticeChart').getContext('2d');
const noticeChart = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [{
            label: 'Notice Views',
            data: [200, 300, 250, 400],
            borderColor: '#28a745',
            fill: false,
            tension: 0.2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});
