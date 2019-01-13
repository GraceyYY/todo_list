function initLocalStorage() {
  if (localStorage.getItem('active') === null && localStorage.getItem('completed') === null) {
    localStorage.setItem('active', 0);
    localStorage.setItem('completed', 0);
  }
}

function needClearBtn(){
    return localStorage.getItem('completed') > 0 && currentTab != 'active';
}

function switchToTab(tab) {
    let prevTab = currentTab;
    currentTab = tab;
    toggleActiveTab(prevTab);
    toggleActiveTab(currentTab);
}