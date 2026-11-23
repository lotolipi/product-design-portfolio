const puzzle = document.querySelector('.print-game');
const prints = [...document.querySelectorAll('#botanica .print-item')].map(link => ({
  name: link.querySelector('figcaption').textContent.split(' for ')[1],
  image: link.querySelector('img').src
}));
const image = puzzle.querySelector('img');
const options = puzzle.querySelector('[data-options]');
const next = puzzle.querySelector('[data-next]');
const feedback = puzzle.querySelector('[data-feedback]');
let order;
let round;
function shuffle(items) {
  const list = [...items];
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}
function showRound() {
  const print = order[round];
  image.src = print.image;
  image.alt = 'Magnified detail of a botanical print';
  puzzle.classList.remove('solved');
  puzzle.querySelector('[data-round]').textContent = 'Print ' + (round + 1) + ' of ' + order.length;
  next.hidden = true;
  feedback.textContent = '';
  options.replaceChildren();
  const others = shuffle(prints.filter(item => item !== print)).slice(0, 2);
  for (const item of shuffle([print, ...others])) {
    const button = document.createElement('button');
    button.textContent = item.name;
    options.append(button);
    button.addEventListener('click', () => {
      button.disabled = true;
      if (item !== print) {
        feedback.textContent = 'Take another look. Try one of the remaining plants.';
        options.querySelector('button:not(:disabled)').focus();
        return;
      }
      puzzle.classList.add('solved');
      image.alt = 'Full original print of ' + print.name;
      feedback.textContent = 'You found ' + print.name + '.';
      for (const choice of options.children) choice.disabled = true;
      next.textContent = round + 1 === order.length ? 'Shuffle and play again' : 'Next print';
      next.hidden = false;
      next.focus();
    });
  }
}
function start() {
  round = 0;
  order = shuffle(prints);
  showRound();
}
next.addEventListener('click', () => {
  if (++round === order.length) start();
  else showRound();
  options.firstElementChild.focus();
});
puzzle.hidden = false;
start();
