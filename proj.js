var studentName = "Jarvis Joven";
var gradeSection = "Grade 9 - Emerald";
var schoolYear = "AY 2025-2026";
var portalName = "OB Portal";
 
var validUsername = "student01";
var validPassword = "obmc2026";
 
var quotes = [
  { text: "Education is the passport to the future.", author: "Malcolm X" },
  { text: "The more that you read, the more things you will know.", author: "Dr. Seuss" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { text: "Learning is not attained by chance; it must be sought with ardor.", author: "Abigail Adams" },
  { text: "Strive for progress, not perfection.", author: "Unknown" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" }
];
 
function getQuoteOfTheDay() {
  var today = new Date();
  var dayIndex = today.getDay();
  var idx = dayIndex % quotes.length;
  return quotes[idx];
}
 
function setFooter() {
  var footerEl = document.getElementById('footer-info');
  if (footerEl) {
    footerEl.innerHTML = studentName + "  |  " + gradeSection + "  |  " + schoolYear;
  }
}
 
function setActiveNav() {
  var path = window.location.pathname;
  var filename = path.substring(path.lastIndexOf('/') + 1);
  var links = document.querySelectorAll('.nav-links a');
  links.forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === filename) {
      link.classList.add('active');
    }
  });
}
 
function showQuote() {
  var el = document.getElementById('quote-text');
  if (!el) return;
  var q = getQuoteOfTheDay();
  el.innerHTML = '"' + q.text + '" — <strong>' + q.author + '</strong>';
}
 
function handleLogin(event) {
  if (event) event.preventDefault();
 
  var username = document.getElementById('username').value.trim();
  var password = document.getElementById('password').value.trim();
  var errorEl = document.getElementById('login-error');
 
  if (username === "" || password === "") {
    errorEl.textContent = "Please fill in all fields.";
    errorEl.style.display = "block";
    return false;
  }
 
  if (username === validUsername && password === validPassword) {
    sessionStorage.setItem('loggedIn', 'true');
    sessionStorage.setItem('username', username);
    window.location.href = "dashboard.html";
  } else {
    errorEl.textContent = "Incorrect username or password. Please try again.";
    errorEl.style.display = "block";
    var card = document.querySelector('.login-card');
    card.style.animation = 'shake 0.4s ease';
    setTimeout(function() { card.style.animation = ''; }, 400);
  }
 
  return false;
}
 
function requireLogin() {
  var loggedIn = sessionStorage.getItem('loggedIn');
  if (!loggedIn) {
    window.location.href = "index.html";
  }
}
 
function handleLogout() {
  if (window.confirm("Are you sure you want to log out?")) {
    sessionStorage.clear();
    window.location.href = "index.html";
  }
}
 
function countPendingTasks() {
  var tasks = [
    { subject: "Mathematics", done: false },
    { subject: "Science", done: false },
    { subject: "ICT", done: true },
    { subject: "Values Education", done: false }
  ];
 
  var pending = 0;
  for (var i = 0; i < tasks.length; i++) {
    if (!tasks[i].done) {
      pending++;
    }
  }
  return pending;
}
 
function loadDashboardData() {
  requireLogin();
  setFooter();
  setActiveNav();
  showQuote();
 
  var pendingEl = document.getElementById('pending-count');
  if (pendingEl) {
    pendingEl.textContent = countPendingTasks();
  }
 
  var welcomeEl = document.getElementById('welcome-name');
  if (welcomeEl) {
    var uname = sessionStorage.getItem('username') || studentName;
    welcomeEl.textContent = "Welcome back, " + uname + "!";
  }
 
  var scores = [88, 92, 79, 95, 84];
  var total = 0;
  for (var j = 0; j < scores.length; j++) {
    total = total + scores[j];
  }
  var avg = Math.round(total / scores.length);
  var avgEl = document.getElementById('avg-score');
  if (avgEl) {
    avgEl.textContent = avg;
  }
}
 
function loadTasksPage() {
  requireLogin();
  setFooter();
  setActiveNav();
}
 
function handleTakeActivity(subject, activity) {
  window.alert("Opening activity: " + activity + "\nSubject: " + subject + "\nGood luck!");
}
 
function handleSubmit(subject) {
  var confirmed = window.confirm("Submit your " + subject + " Quarter Project?\nMake sure your work is complete.");
  if (confirmed) {
    document.getElementById('submit-btn-' + subject).innerHTML = 'Submitted!';
    document.getElementById('submit-btn-' + subject).disabled = true;
    window.alert("Your " + subject + " project has been submitted successfully!");
  }
}
 
function handleVideoClip() {
  window.alert("Playing VE Film Critique video clip...\nNote: Connect to the OB Digital Platform to watch the full video.");
}
 
function checkDeadline(deadlineStr) {
  var deadline = new Date(deadlineStr);
  var now = new Date();
  if (now > deadline) {
    return "overdue";
  } else {
    return "upcoming";
  }
}
 
function loadNotebooksPage() {
  requireLogin();
  setFooter();
  setActiveNav();
}
 
function openNotebook(subject) {
  window.alert("Opening " + subject + " Virtual Notebook...\nConnect to OB Digital Platform to view full content.");
}
 
function loadProfilePage() {
  requireLogin();
  setFooter();
  setActiveNav();
}
 
function showChangePasswordModal() {
  var modal = document.getElementById('pw-modal');
  modal.classList.add('show');
}
 
function hideModal() {
  var modal = document.getElementById('pw-modal');
  modal.classList.remove('show');
}
 
function handleChangePassword() {
  var current = document.getElementById('current-pw').value;
  var newpw = document.getElementById('new-pw').value;
  var confirm = document.getElementById('confirm-pw').value;
 
  if (current === "" || newpw === "" || confirm === "") {
    window.alert("Please fill in all password fields.");
    return;
  }
 
  if (current !== validPassword) {
    window.alert("Current password is incorrect.");
    return;
  }
 
  if (newpw.length < 6) {
    window.alert("New password must be at least 6 characters.");
    return;
  }
 
  if (newpw !== confirm) {
    window.alert("New passwords do not match.");
    return;
  }
 
  validPassword = newpw;
  hideModal();
  window.alert("Password changed successfully!");
}
 
function handleFileUpload(input) {
  if (input.files && input.files[0]) {
    var file = input.files[0];
    if (!file.type.startsWith('image/')) {
      window.alert("Please upload an image file only.");
      return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
      var avatar = document.getElementById('avatar-img');
      if (avatar) {
        avatar.innerHTML = '<img src="' + e.target.result + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />';
      }
    };
    reader.readAsDataURL(file);
    window.alert("Profile picture updated: " + file.name);
  }
}
 
window.onload = function() {
  setFooter();
};