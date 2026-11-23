const game = document.querySelector('.handoff-game');
const choices = [...game.querySelectorAll('[data-person]')];
const reset = game.querySelector('[data-reset]');
const blocker = game.querySelector('[data-block]');
const board = game.querySelector('[data-board]');
const log = game.querySelector('ol');
const result = game.querySelector('[data-result]');
game.querySelector('[data-controls]').hidden = false;
for (const choice of choices) {
  choice.addEventListener('click', () => {
    choice.disabled = true;
    if (choice.dataset.person === 'Dev') {
      board.textContent = 'In progress';
      const entry = document.createElement('li');
      entry.textContent = 'Dev started the review.';
      log.append(entry);
      result.textContent = 'Saved. Dev owns the task. The board and activity history updated together.';
    } else {
      result.textContent = 'Save rejected. Nina handed off ownership. The board and activity history stayed as they were.';
    }
    const next = choices.find(button => !button.disabled);
    if (next) next.focus();
    else {
      result.textContent += ' Challenge complete. You tested both sides of the handoff.';
      reset.hidden = false;
      blocker.hidden = false;
      blocker.focus();
    }
  });
}
reset.addEventListener('click', () => {
  choices.forEach(button => { button.disabled = false; });
  board.textContent = 'To do';
  while (log.children.length > 1) log.lastElementChild.remove();
  blocker.hidden = true;
  blocker.textContent = 'Try a blocker';
  result.textContent = 'Challenge reset.';
  reset.hidden = true;
  choices[0].focus();
});

const steps = [
  ['Report missing brief', 'Dev reported a missing brief.', 'Blocked', 'The brief is missing. As Dev, report what is stopping the review.'],
  ['Review as team lead', 'Team lead reviewed the blocker.', 'Blocked', 'The blocker is visible. Switch to the lead’s view to review it.'],
  ['Share brief and resume', 'Lead supplied the brief. Dev resumed the review.', 'In progress', 'The lead has the brief. Share it so Dev can resume.']
];
let step = -1;
blocker.addEventListener('click', () => {
  if (step >= 0) {
    const entry = document.createElement('li');
    entry.textContent = steps[step][1];
    log.append(entry);
    board.textContent = steps[step][2];
  }
  step++;
  if (step < steps.length) {
    result.textContent = steps[step][3];
    blocker.textContent = steps[step][0];
  } else {
    result.textContent = 'Blocker resolved. The activity history shows who helped Dev get moving again.';
    blocker.hidden = true;
    reset.focus();
  }
});
reset.addEventListener('click', () => { step = -1; });
