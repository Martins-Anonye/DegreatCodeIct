(function(){
  function createFab(){
    const container = document.createElement('div');
    container.className = 'nav-fab-container';

    const btnHome = document.createElement('a');
    btnHome.className = 'nav-fab nav-fab--primary';
    btnHome.href = 'index.html';
    btnHome.title = 'Home';
    btnHome.innerHTML = '<span>🏠</span>';

    const btnBack = document.createElement('button');
    btnBack.className = 'nav-fab';
    btnBack.title = 'Back';
    btnBack.type = 'button';
    btnBack.innerHTML = '<span>↩</span>';
    btnBack.addEventListener('click', ()=>{
      if (document.referrer && document.referrer !== window.location.href){
        window.history.back();
      } else {
        // fallback to home
        window.location.href = 'index.html';
      }
    });

    container.appendChild(btnHome);
    container.appendChild(btnBack);

    // hide on index page (optional)
    const path = window.location.pathname.toLowerCase();
    if (path.endsWith('/index.html') || path === '/' || path.endsWith('index.htm')){
      // still show home (but redundant), optionally hide both
      // we'll hide back button on home
      btnBack.style.display = 'none';
    }

    document.body.appendChild(container);

    // keyboard shortcuts: H = home, B = back
    window.addEventListener('keydown', (e)=>{
      if (e.key === 'h' || e.key === 'H') window.location.href = 'index.html';
      if (e.key === 'b' || e.key === 'B') btnBack.click();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', createFab);
  else createFab();
})();
