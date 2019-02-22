import axios from 'axios';
import dompurify  from 'dompurify';

function resultsToHtml (stores) {
  return stores.map(store => {
    return `
      <a href="/stores/${store.slug}" class="search__result">
        <strong>${store.name}</strong>
      </a>
    `;
  }).join('');
}

function handleKeyInputs (el, e) {
  if (![38, 40, 13].includes(e.keyCode)) return;
  const _class = 'search__result';
  const current = el.querySelector(`.${_class}--active`);
  const items = el.querySelectorAll(`.${_class}`);
  var next;

  if([38, 40].includes(e.keyCode)) {
    const first = items[0];
    const last = items[items.length - 1];

    if (e.keyCode === 40){
      //going down
      next = current ? (current.nextElementSibling || first) : first;
    } else {
      //going up
      next = current ? (current.previousElementSibling || last) : last;
    }
  } else {
    //pressing enter
    if(! current.href) return;
    return window.location = current.href;
  }

  if(current) {
    current.classList.remove(`${_class}--active`)
  }
  next.classList.add(`${_class}--active`)
}

function typeAhead(search) {
  if(!search) return;

  const searchInput = search.querySelector('input[name="search"]');
  const searchResults = search.querySelector('.search__results');

  searchInput.on('input', function() {
    if(!this.value) {
      searchResults.style.display = 'none';
      return;
    }
    searchResults.style.display = 'block';
    searchResults.innerHTML = '';

    axios.get(`/api/search?q=${ this.value }`).then(res => {
      if(res.data.length){
        searchResults.innerHTML = dompurify.sanitize(resultsToHtml(res.data));
      } else {
        searchResults.innerHTML = dompurify.sanitize(`<div class="search__result">No results for ${this.value} found</div>`);
      }
    }).catch(err => {
      console.error(err);
    })
  });

  //handle keyboard input
  searchInput.on('keyup', (e) => handleKeyInputs(search, e));
}

export default typeAhead;