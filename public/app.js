import { STORES } from './catalog.js';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const els = {
  intro: $('#intro'),
  enterWorld: $('#enterWorld'),
  game: $('#game'),
  worldScene: $('#worldScene'),
  interiorScene: $('#interiorScene'),
  worldCharacter: $('#worldCharacter'),
  interiorCharacter: $('#interiorCharacter'),
  contextAction: $('#contextAction'),
  interiorAction: $('#interiorAction'),
  cashier: $('#cashier'),
  cashierName: $('#cashierName'),
  cashierRole: $('#cashierRole'),
  interiorDoor: $('#interiorDoor'),
  bookOverlay: $('#bookOverlay'),
  book: $('#book'),
  bookTitle: $('#bookTitle'),
  bookSubtitle: $('#bookSubtitle'),
  bookBack: $('#bookBack'),
  bookClose: $('#bookClose'),
  catalogSearch: $('#catalogSearch'),
  cardGrid: $('#cardGrid'),
  emptyState: $('#emptyState'),
  rightDefault: $('#rightDefault'),
  productDetail: $('#productDetail'),
  detailClose: $('#detailClose'),
  detailBadge: $('#detailBadge'),
  detailMark: $('#detailMark'),
  detailTitle: $('#detailTitle'),
  detailDescription: $('#detailDescription'),
  detailPrice: $('#detailPrice'),
  detailStock: $('#detailStock'),
  detailTags: $('#detailTags'),
  buyButton: $('#buyButton'),
  checkoutSheet: $('#checkoutSheet'),
  checkoutClose: $('#checkoutClose'),
  checkoutOkay: $('#checkoutOkay'),
  checkoutTitle: $('#checkoutTitle'),
  checkoutPrice: $('#checkoutPrice'),
  quickShop: $('#quickShop'),
  quickShopPanel: $('#quickShopPanel'),
  quickClose: $('#quickClose'),
  quickStoreGrid: $('#quickStoreGrid'),
  homeButton: $('#homeButton'),
  soundButton: $('#soundButton'),
  toast: $('#toast'),
  movementTip: $('.movement-tip')
};

const state = {
  scene: 'world',
  currentStore: null,
  bookLevel: 'categories',
  currentCategory: null,
  selectedProduct: null,
  worldPos: { x: 50, y: 88 },
  interiorPos: { x: 50, y: 88 },
  nearbyStore: null,
  interiorTarget: null,
  audioOn: false,
  movementTimer: null
};

const BUILDING_TARGETS = {
  accounts: { x: 25, y: 74 },
  services: { x: 29, y: 57 },
  subscriptions: { x: 75, y: 74 },
  support: { x: 71, y: 57 },
  townhall: { x: 50, y: 55 }
};

const INTERIOR_TARGETS = {
  cashier: { x: 50, y: 65 },
  exit: { x: 82, y: 80 }
};

function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
function distance(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
function normalize(value) { return String(value || '').trim().toLowerCase(); }

function setCharacterPosition(element, pos, previous) {
  element.classList.add('walking');
  if (previous && pos.x < previous.x) element.classList.add('facing-left');
  if (previous && pos.x > previous.x) element.classList.remove('facing-left');
  element.style.left = `${pos.x}%`;
  element.style.top = `${pos.y}%`;
  clearTimeout(state.movementTimer);
  state.movementTimer = setTimeout(() => element.classList.remove('walking'), 760);
}

function moveWorld(x, y, callback) {
  const previous = { ...state.worldPos };
  state.worldPos = { x: clamp(x, 10, 90), y: clamp(y, 53, 92) };
  setCharacterPosition(els.worldCharacter, state.worldPos, previous);
  els.contextAction.classList.add('is-hidden');
  els.movementTip.classList.add('fade');
  setTimeout(() => {
    updateWorldContext();
    callback?.();
  }, 720);
}

function moveInterior(x, y, callback) {
  const previous = { ...state.interiorPos };
  state.interiorPos = { x: clamp(x, 12, 88), y: clamp(y, 58, 92) };
  setCharacterPosition(els.interiorCharacter, state.interiorPos, previous);
  els.interiorAction.classList.add('is-hidden');
  setTimeout(() => {
    updateInteriorContext();
    callback?.();
  }, 720);
}

function updateWorldContext() {
  let best = null;
  for (const [id, target] of Object.entries(BUILDING_TARGETS)) {
    const d = distance(state.worldPos, target);
    if (!best || d < best.distance) best = { id, distance: d };
  }
  state.nearbyStore = best && best.distance < 11 ? best.id : null;
  if (!state.nearbyStore) return els.contextAction.classList.add('is-hidden');

  if (state.nearbyStore === 'townhall') {
    els.contextAction.textContent = 'View Town Hall Notice';
  } else {
    els.contextAction.textContent = STORES[state.nearbyStore].enterLabel;
  }
  els.contextAction.classList.remove('is-hidden');
}

function updateInteriorContext() {
  const dCashier = distance(state.interiorPos, INTERIOR_TARGETS.cashier);
  const dExit = distance(state.interiorPos, INTERIOR_TARGETS.exit);
  if (dCashier < 14) {
    state.interiorTarget = 'cashier';
    els.interiorAction.textContent = `Browse ${STORES[state.currentStore].shortName}`;
    els.interiorAction.classList.remove('is-hidden');
  } else if (dExit < 14) {
    state.interiorTarget = 'exit';
    els.interiorAction.textContent = 'Exit to Village';
    els.interiorAction.classList.remove('is-hidden');
  } else {
    state.interiorTarget = null;
    els.interiorAction.classList.add('is-hidden');
  }
}

function enterStore(storeId) {
  const store = STORES[storeId];
  if (!store) return;
  state.currentStore = storeId;
  state.scene = 'interior';
  els.worldScene.classList.add('is-hidden');
  els.interiorScene.classList.remove('is-hidden');
  els.cashierName.textContent = store.clerk;
  els.cashierRole.textContent = store.clerkRole;
  state.interiorPos = { x: 50, y: 88 };
  setCharacterPosition(els.interiorCharacter, state.interiorPos);
  els.interiorAction.classList.add('is-hidden');
  toast(`Entered ${store.name}`);
}

function exitStore() {
  if (!state.currentStore) return;
  const target = BUILDING_TARGETS[state.currentStore];
  state.worldPos = { x: target.x, y: Math.min(90, target.y + 9) };
  setCharacterPosition(els.worldCharacter, state.worldPos);
  state.scene = 'world';
  els.interiorScene.classList.add('is-hidden');
  els.worldScene.classList.remove('is-hidden');
  const storeName = STORES[state.currentStore].name;
  state.currentStore = null;
  setTimeout(updateWorldContext, 80);
  toast(`Back outside ${storeName}`);
}

function showTownHallNotice() {
  toast('Town Hall will become the offers, announcements and profile hub in the next phase.', 3500);
}

function openBook(storeId = state.currentStore) {
  const store = STORES[storeId];
  if (!store) return;
  state.currentStore = storeId;
  state.bookLevel = 'categories';
  state.currentCategory = null;
  state.selectedProduct = null;
  els.catalogSearch.value = '';
  els.bookTitle.textContent = store.name;
  els.bookSubtitle.textContent = 'Choose a collection.';
  els.bookBack.classList.add('is-hidden');
  resetDetail();
  renderCatalogue();
  els.bookOverlay.classList.remove('is-hidden');
  requestAnimationFrame(() => els.catalogSearch.focus({ preventScroll: true }));
}

function closeBook() {
  els.bookOverlay.classList.add('is-hidden');
  els.book.classList.remove('show-detail');
  state.selectedProduct = null;
  if (state.scene === 'interior') updateInteriorContext();
}

function categoryMatches(category, query) {
  if (!query) return true;
  const fields = [category.name, category.subtitle, ...(category.keywords || [])].map(normalize);
  if (fields.some(x => x.includes(query))) return true;
  return category.products.some(product => productMatches(product, query));
}

function productMatches(product, query) {
  if (!query) return true;
  const fields = [product.title, product.description, product.badge, product.price, ...(product.tags || [])].map(normalize);
  return fields.some(x => x.includes(query));
}

function renderCatalogue() {
  const store = STORES[state.currentStore];
  if (!store) return;
  const query = normalize(els.catalogSearch.value);
  let cards = [];

  if (state.bookLevel === 'categories') {
    cards = store.categories.filter(category => categoryMatches(category, query)).map(category => ({
      type: 'category',
      id: category.id,
      mark: category.mark,
      title: category.name,
      subtitle: category.subtitle,
      category
    }));
  } else {
    const category = store.categories.find(c => c.id === state.currentCategory);
    if (!category) return;
    cards = category.products.filter(product => productMatches(product, query)).map(product => ({
      type: 'product',
      id: product.id,
      mark: category.mark,
      title: product.title,
      subtitle: product.badge,
      price: product.price,
      product,
      category
    }));
  }

  els.cardGrid.innerHTML = '';
  els.emptyState.classList.toggle('is-hidden', cards.length > 0);

  for (const card of cards) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'binder-card';
    button.innerHTML = `
      <div class="binder-art">${escapeHTML(card.mark)}</div>
      ${card.price ? `<span class="price-stamp">${escapeHTML(card.price)}</span>` : ''}
      <h4>${escapeHTML(card.title)}</h4>
      <p>${escapeHTML(card.subtitle || '')}</p>`;
    button.addEventListener('click', () => card.type === 'category' ? openCategory(card.category) : selectProduct(card.product, card.category));
    els.cardGrid.appendChild(button);
  }
}

function openCategory(category) {
  state.bookLevel = 'products';
  state.currentCategory = category.id;
  state.selectedProduct = null;
  els.catalogSearch.value = '';
  els.bookTitle.textContent = category.name;
  els.bookSubtitle.textContent = 'Choose an item or search by character, tag or keyword.';
  els.bookBack.classList.remove('is-hidden');
  resetDetail();
  renderCatalogue();
  els.catalogSearch.focus({ preventScroll: true });
}

function goBackInBook() {
  if (state.bookLevel === 'products') {
    state.bookLevel = 'categories';
    state.currentCategory = null;
    els.catalogSearch.value = '';
    const store = STORES[state.currentStore];
    els.bookTitle.textContent = store.name;
    els.bookSubtitle.textContent = 'Choose a collection.';
    els.bookBack.classList.add('is-hidden');
    resetDetail();
    renderCatalogue();
  }
}

function selectProduct(product, category) {
  state.selectedProduct = product;
  els.detailBadge.textContent = product.badge;
  els.detailMark.textContent = category.mark;
  els.detailTitle.textContent = product.title;
  els.detailDescription.textContent = product.description;
  els.detailPrice.textContent = product.price;
  els.detailStock.textContent = product.stock;
  els.detailTags.innerHTML = product.tags.map(tag => `<span>${escapeHTML(tag)}</span>`).join('');
  els.rightDefault.classList.add('is-hidden');
  els.productDetail.classList.remove('is-hidden');
  els.book.classList.add('show-detail');
}

function resetDetail() {
  state.selectedProduct = null;
  els.productDetail.classList.add('is-hidden');
  els.rightDefault.classList.remove('is-hidden');
  els.book.classList.remove('show-detail');
}

function openCheckout() {
  if (!state.selectedProduct) return;
  els.checkoutTitle.textContent = state.selectedProduct.title;
  els.checkoutPrice.textContent = state.selectedProduct.price;
  els.checkoutSheet.classList.remove('is-hidden');
}

function closeCheckout() { els.checkoutSheet.classList.add('is-hidden'); }

function renderQuickShop() {
  els.quickStoreGrid.innerHTML = '';
  Object.values(STORES).forEach(store => {
    const count = store.categories.reduce((sum, c) => sum + c.products.length, 0);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'quick-store';
    button.innerHTML = `<strong>${escapeHTML(store.name)}</strong><span>${count} catalogue items • open merchant book</span>`;
    button.addEventListener('click', () => {
      els.quickShopPanel.classList.add('is-hidden');
      openBook(store.id);
    });
    els.quickStoreGrid.appendChild(button);
  });
}

function toast(message, duration = 2200) {
  clearTimeout(toast.timer);
  els.toast.textContent = message;
  els.toast.classList.remove('is-hidden');
  toast.timer = setTimeout(() => els.toast.classList.add('is-hidden'), duration);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[char]));
}

function eventPercent(event, container) {
  const rect = container.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * 100,
    y: ((event.clientY - rect.top) / rect.height) * 100
  };
}

function nearestBuildingFromElement(element) {
  return element?.closest?.('[data-store]')?.dataset?.store || null;
}

els.enterWorld.addEventListener('click', () => {
  els.intro.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 520, easing: 'ease', fill: 'forwards' });
  setTimeout(() => {
    els.intro.classList.add('is-hidden');
    els.game.classList.remove('is-hidden');
    toast('Welcome to HiddenVillage');
  }, 500);
});

els.worldScene.addEventListener('click', event => {
  if (event.target.closest('button')) return;
  const storeId = nearestBuildingFromElement(event.target);
  if (storeId) {
    const target = BUILDING_TARGETS[storeId];
    if (target) moveWorld(target.x, target.y + (storeId === 'townhall' ? 6 : 7));
    return;
  }
  const p = eventPercent(event, els.worldScene);
  if (p.y < 51) return;
  moveWorld(p.x, p.y);
});

$$('[data-store]', els.worldScene).forEach(building => {
  building.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    const id = building.dataset.store;
    const target = BUILDING_TARGETS[id];
    if (target) moveWorld(target.x, target.y + 7);
  });
});

els.contextAction.addEventListener('click', () => {
  if (!state.nearbyStore) return;
  if (state.nearbyStore === 'townhall') return showTownHallNotice();
  enterStore(state.nearbyStore);
});

els.interiorScene.addEventListener('click', event => {
  if (event.target.closest('button')) return;
  if (event.target.closest('#cashier') || event.target.closest('.counter')) {
    moveInterior(INTERIOR_TARGETS.cashier.x, INTERIOR_TARGETS.cashier.y, () => openBook());
    return;
  }
  if (event.target.closest('#interiorDoor')) {
    moveInterior(INTERIOR_TARGETS.exit.x, INTERIOR_TARGETS.exit.y);
    return;
  }
  const p = eventPercent(event, els.interiorScene);
  if (p.y < 54) return;
  moveInterior(p.x, p.y);
});

els.interiorAction.addEventListener('click', () => {
  if (state.interiorTarget === 'cashier') openBook();
  if (state.interiorTarget === 'exit') exitStore();
});

els.catalogSearch.addEventListener('input', () => {
  resetDetail();
  renderCatalogue();
});
els.bookBack.addEventListener('click', goBackInBook);
els.bookClose.addEventListener('click', closeBook);
els.detailClose.addEventListener('click', resetDetail);
els.buyButton.addEventListener('click', openCheckout);
els.checkoutClose.addEventListener('click', closeCheckout);
els.checkoutOkay.addEventListener('click', closeCheckout);

els.quickShop.addEventListener('click', () => {
  renderQuickShop();
  els.quickShopPanel.classList.remove('is-hidden');
});
els.quickClose.addEventListener('click', () => els.quickShopPanel.classList.add('is-hidden'));
els.quickShopPanel.addEventListener('click', event => { if (event.target === els.quickShopPanel) els.quickShopPanel.classList.add('is-hidden'); });
els.checkoutSheet.addEventListener('click', event => { if (event.target === els.checkoutSheet) closeCheckout(); });

els.homeButton.addEventListener('click', () => {
  if (!els.bookOverlay.classList.contains('is-hidden')) closeBook();
  if (state.scene === 'interior') exitStore();
});

els.soundButton.addEventListener('click', () => {
  state.audioOn = !state.audioOn;
  els.soundButton.textContent = state.audioOn ? '♫' : '♪';
  toast(state.audioOn ? 'Ambience placeholder enabled — audio assets can be added later.' : 'Ambience muted.');
});

window.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (!els.checkoutSheet.classList.contains('is-hidden')) return closeCheckout();
  if (!els.quickShopPanel.classList.contains('is-hidden')) return els.quickShopPanel.classList.add('is-hidden');
  if (!els.bookOverlay.classList.contains('is-hidden')) return closeBook();
});

renderQuickShop();
