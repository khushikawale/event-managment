// manage-events.js
// Simple client-side events manager (localStorage persistence)
// Event schema: { id, title, date, startTime, endTime, venue, description, status }

const LS_KEY = 'college_events_v1';
let events = JSON.parse(localStorage.getItem(LS_KEY) || '[]');

// DOM
const btnAddEvent = document.getElementById('btnAddEvent');
const eventModal = document.getElementById('eventModal');
const eventForm = document.getElementById('eventForm');
const cancelModal = document.getElementById('cancelModal');
const eventsTableBody = document.querySelector('#eventsTable tbody');
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');
const clearAllBtn = document.getElementById('clearAll');

// calendar DOM
const calendarEl = document.getElementById('calendar');
const monthYear = document.getElementById('monthYear');
const prevMonth = document.getElementById('prevMonth');
const nextMonth = document.getElementById('nextMonth');

let currentDate = new Date();
let editingId = null;

// Helpers
function save(){
  localStorage.setItem(LS_KEY, JSON.stringify(events));
}

function uid(){
  return Date.now().toString(36) + Math.random().toString(36).slice(2,8);
}

// Render table
function renderTable(){
  const q = searchInput.value.trim().toLowerCase();
  const status = statusFilter.value;
  eventsTableBody.innerHTML = '';
  const filtered = events.filter(ev => {
    if(status !== 'all' && ev.status !== status) return false;
    if(q && !ev.title.toLowerCase().includes(q)) return false;
    return true;
  }).sort((a,b)=> a.date.localeCompare(b.date));

  if(filtered.length === 0){
    eventsTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:#6b7280;padding:18px">No events found</td></tr>`;
    return;
  }

  filtered.forEach(ev => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHtml(ev.title)}</td>
      <td>${formatDate(ev.date)}</td>
      <td>${ev.startTime || '-'} ${ev.endTime ? ' - ' + ev.endTime : ''}</td>
      <td>${escapeHtml(ev.venue||'')}</td>
      <td>${capitalize(ev.status)}</td>
      <td class="actions">
        <button class="btn small" data-action="edit" data-id="${ev.id}">Edit</button>
        <button class="btn small neutral" data-action="delete" data-id="${ev.id}">Delete</button>
      </td>
    `;
    eventsTableBody.appendChild(tr);
  });
}

// Calendar rendering (simple month grid)
function renderCalendar(date = new Date()){
  calendarEl.innerHTML = '';
  const year = date.getFullYear();
  const month = date.getMonth();
  monthYear.textContent = date.toLocaleString(undefined, { month:'long', year:'numeric' });

  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay(); // 0..6
  const daysInMonth = new Date(year, month+1, 0).getDate();

  // Render 6 rows of 7 (42 cells) to keep grid stable
  const totalCells = 42;
  for(let i=0;i<totalCells;i++){
    const cell = document.createElement('div');
    cell.className = 'cell';
    const dayIndex = i - startDay + 1;
    if(dayIndex > 0 && dayIndex <= daysInMonth){
      const dtStr = `${year}-${pad(month+1)}-${pad(dayIndex)}`; // YYYY-MM-DD
      const dateEl = document.createElement('div');
      dateEl.className = 'date';
      dateEl.textContent = dayIndex;
      cell.appendChild(dateEl);

      // show events for this date
      const evs = events.filter(e => e.date === dtStr);
      evs.slice(0,3).forEach(ev => {
        const chip = document.createElement('span');
        chip.className = 'event-chip';
        chip.textContent = ev.title;
        chip.title = ev.title + (ev.startTime ? ' • ' + ev.startTime : '');
        cell.appendChild(chip);
      });

      if(evs.length > 3){
        const more = document.createElement('div');
        more.className = 'muted small';
        more.style.marginTop = '6px';
        more.textContent = `+${evs.length - 3} more`;
        cell.appendChild(more);
      }
    } else {
      cell.style.background = 'transparent';
      cell.style.border = 'none';
    }
    calendarEl.appendChild(cell);
  }
}

// Utility functions
function pad(n){ return n.toString().padStart(2,'0') }
function formatDate(iso){ // iso: YYYY-MM-DD
  if(!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString();
}
function capitalize(s){ return s ? s.charAt(0).toUpperCase()+s.slice(1) : '' }
function escapeHtml(s){ return (s||'').replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]); }

// Modal control
function openModal(editId = null){
  editingId = editId;
  eventModal.setAttribute('aria-hidden','false');
  if(editId){
    document.getElementById('modalTitle').textContent = 'Edit Event';
    const ev = events.find(x=>x.id===editId);
    if(!ev) return;
    document.getElementById('eventId').value = ev.id;
    document.getElementById('title').value = ev.title;
    document.getElementById('date').value = ev.date;
    document.getElementById('startTime').value = ev.startTime || '';
    document.getElementById('endTime').value = ev.endTime || '';
    document.getElementById('venue').value = ev.venue || '';
    document.getElementById('description').value = ev.description || '';
    document.getElementById('status').value = ev.status || 'draft';
  } else {
    document.getElementById('modalTitle').textContent = 'Create Event';
    eventForm.reset();
    document.getElementById('eventId').value = '';
  }
}

function closeModal(){
  editingId = null;
  eventModal.setAttribute('aria-hidden','true');
  eventForm.reset();
}

// Event handlers
btnAddEvent.addEventListener('click', ()=> openModal());

cancelModal.addEventListener('click', ()=> closeModal());

eventForm.addEventListener('submit', function(e){
  e.preventDefault();
  const id = document.getElementById('eventId').value || uid();
  const title = document.getElementById('title').value.trim();
  const date = document.getElementById('date').value;
  if(!title || !date){
    alert('Title and date are required.');
    return;
  }
  const startTime = document.getElementById('startTime').value;
  const endTime = document.getElementById('endTime').value;
  const venue = document.getElementById('venue').value.trim();
  const description = document.getElementById('description').value.trim();
  const status = document.getElementById('status').value;

  const obj = { id, title, date, startTime, endTime, venue, description, status };

  const existsIndex = events.findIndex(x=>x.id===id);
  if(existsIndex >= 0){
    events[existsIndex] = obj;
  } else {
    events.push(obj);
  }

  save();
  renderTable();
  renderCalendar(currentDate);
  closeModal();
});

// table actions (edit/delete)
eventsTableBody.addEventListener('click', function(e){
  const btn = e.target.closest('button');
  if(!btn) return;
  const action = btn.getAttribute('data-action');
  const id = btn.getAttribute('data-id');
  if(action === 'edit'){
    openModal(id);
  } else if(action === 'delete'){
    if(confirm('Delete this event?')){
      events = events.filter(x=>x.id !== id);
      save();
      renderTable();
      renderCalendar(currentDate);
    }
  }
});

// search & filter
searchInput.addEventListener('input', renderTable);
statusFilter.addEventListener('change', renderTable);

// clear all (dangerous)
clearAllBtn.addEventListener('click', () => {
  if(!confirm('Delete all events? This cannot be undone.')) return;
  events = [];
  save();
  renderTable();
  renderCalendar(currentDate);
});

// calendar navigation
prevMonth.addEventListener('click', () => {
  currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth()-1, 1);
  renderCalendar(currentDate);
});
nextMonth.addEventListener('click', () => {
  currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth()+1, 1);
  renderCalendar(currentDate);
});

// close modal by clicking outside
eventModal.addEventListener('click', function(e){
  if(e.target === eventModal) closeModal();
});

// initial render
renderTable();
renderCalendar(currentDate);
