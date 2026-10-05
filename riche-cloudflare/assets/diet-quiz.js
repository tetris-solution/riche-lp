(() => {
  const questions = [
    { title: 'どんなペースで取り組みたい？', options: ['2か月、期間を決めて集中したい', '4か月、生活と両立しながら進めたい', '6か月、少しずつ習慣にしたい'] },
    { title: '食事ルールに取り組めそうな日数は？', options: ['週6日。しっかり時間を使いたい', '週4日。外食や予定とも両立したい', 'まずは週2日から始めたい'] },
    { title: '続けるために、一番大切にしたいのは？', options: ['期限とやることを決めて集中すること', '頑張る日と、普段の生活のバランス', 'ハードルを下げて小さく始めること'] }
  ];
  const results = [
    { title: '短期集中タイプ', copy: '期限を決めて、取り組む時間をしっかり確保したいあなた。食事ルールを実践する日を多めに設定する集中コースが候補です。', course: 'スパルタ痩せコース｜2か月・16回・食事週6日｜198,000円', id: 'course-spartan' },
    { title: 'バランス重視タイプ', copy: '仕事や外食も大切にしながら、ダイエットに取り組みたいあなた。生活とのバランスを考える4か月コースが候補です。', course: 'マジ痩せコース｜4か月・24回・食事週4日｜264,000円', id: 'course-serious' },
    { title: 'ゆっくり習慣タイプ', copy: 'まずは小さな一歩から始めたいあなた。食事ルールを週2日から実践する6か月コースが候補です。', course: 'ゆる痩せコース｜6か月・30回・食事週2日｜330,000円', id: 'course-easy' }
  ];
  // Food-rule availability is the practical limit when the desired pace differs.
  function selectType(answers) {
    const average = answers.reduce((sum, value) => sum + value, 0) / answers.length;
    return Math.max(Math.round(average), answers[1]);
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = { selectType };
  if (typeof document === 'undefined') return;
  const el = id => document.getElementById(id);
  let step = 0;
  let answers = [];
  function renderQuestion() {
    el('quiz-start').hidden = true;
    el('quiz-result').hidden = true;
    el('quiz-questions').hidden = false;
    el('quiz-counter').textContent = `${step + 1} / 3`;
    el('quiz-progress').value = step + 1;
    el('quiz-question').textContent = questions[step].title;
    el('quiz-back').disabled = step === 0;
    el('quiz-options').replaceChildren();
    questions[step].options.forEach((label, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'quiz-option';
      button.textContent = label;
      button.setAttribute('aria-pressed', String(answers[step] === index));
      button.addEventListener('click', () => {
        answers[step] = index;
        if (step < 2) { step += 1; renderQuestion(); } else renderResult();
      });
      el('quiz-options').append(button);
    });
    el('quiz-question').focus({ preventScroll: true });
  }
  function renderResult() {
    const result = results[selectType(answers)];
    el('quiz-questions').hidden = true;
    el('quiz-result').hidden = false;
    el('quiz-result-title').textContent = result.title;
    el('quiz-result-copy').textContent = result.copy;
    el('quiz-course-match').textContent = result.course;
    el('quiz-course-link').setAttribute('href', '#' + result.id);
    el('quiz-result-title').focus({ preventScroll: true });
  }
  function restart() { answers = []; step = 0; renderQuestion(); }
  el('quiz-start-button').addEventListener('click', restart);
  el('quiz-restart').addEventListener('click', restart);
  el('quiz-back').addEventListener('click', () => { if (step > 0) { step -= 1; renderQuestion(); } });
})();
