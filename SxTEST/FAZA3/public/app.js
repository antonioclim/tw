const LID = 101;
const $ = (s)=>document.querySelector(s);

async function loadLesson(){
  const r = await fetch(`/api/lessons/${LID}`);
  const j = await r.json();
  $('#lesson').innerHTML = j.html;
}
async function loadQuiz(){
  const r = await fetch(`/api/lessons/${LID}/quiz`);
  const q = await r.json();
  const fs = document.createElement('fieldset');
  fs.innerHTML = `<legend>Quiz</legend>` + q.items.map(it=>{
    if(it.type==='single'){
      return `<div><p>${it.stem}</p>` + it.options.map((opt,i)=>`
        <label><input type="radio" name="${it.id}" value="${i}"> ${opt}</label>`).join('') + `</div>`;
    } else if(it.type==='multiple'){
      return `<div><p>${it.stem}</p>` + it.options.map((opt,i)=>`
        <label><input type="checkbox" name="${it.id}" value="${i}"> ${opt}</label>`).join('') + `</div>`;
    }
    return '';
  }).join('') + `<div><button id="submit">Trimite</button></div>`;
  $('#quiz').appendChild(fs);

  $('#submit').addEventListener('click', ()=>{
    let score=0, total=0, feedback=[];
    q.items.forEach(it=>{
      total++;
      const correct = new Set(it.correct);
      if(it.type==='single'){
        const sel = document.querySelector(`input[name="${it.id}"]:checked`);
        const idx = sel ? Number(sel.value) : -1;
        if(correct.has(idx)) score++;
        feedback.push(it.feedback[idx] ?? 'Neselectat.');
      } else {
        const sels = [...document.querySelectorAll(`input[name="${it.id}"]:checked`)].map(x=>Number(x.value));
        const ok = sels.length===correct.size && sels.every(v=>correct.has(v));
        if(ok) score++;
        feedback.push('Alege corect toate opțiunile adevărate.');
      }
    });
    $('#result').textContent = `Scor: ${score}/${total}`;
  });
}

loadLesson();
loadQuiz();
