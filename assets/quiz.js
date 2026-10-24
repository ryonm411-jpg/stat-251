/*
 * Reusable quiz component.
 *
 * Markup per question:
 *   <section class="q" data-topic="Probability">
 *     <div class="q-prompt">…</div>
 *     MC:      <ol class="q-opts"><li>…</li><li data-correct>…</li></ol>
 *     Numeric: <div class="q-num" data-answer="0.042" data-tol="0.001"></div>
 *     <div class="q-solution">worked solution, shown after answering</div>
 *   </section>
 *
 * Scoreboard: <div id="scoreboard" data-quiz="unique-id"></div>
 * First attempt is what counts. Answers persist per viewer in localStorage.
 */
(function () {
  const board = document.getElementById("scoreboard");
  const quizId = board ? board.dataset.quiz : location.pathname;
  const key = "stat251-quiz:" + quizId;
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem(key) || "{}"); } catch (e) { saved = {}; }
  const save = () => { try { localStorage.setItem(key, JSON.stringify(saved)); } catch (e) {} };

  const qs = Array.from(document.querySelectorAll("section.q"));

  function parseNum(s) {
    s = String(s).trim().replace(/,/g, "");
    if (!s) return NaN;
    let pct = false;
    if (s.endsWith("%")) { pct = true; s = s.slice(0, -1); }
    let v;
    if (/^-?[\d.]+\s*\/\s*[\d.]+$/.test(s)) { const [a, b] = s.split("/"); v = parseFloat(a) / parseFloat(b); }
    else v = Number(s);
    return pct ? v / 100 : v;
  }

  function finish(q, i, correct, given) {
    const fb = q.querySelector(".q-feedback");
    const sol = q.querySelector(".q-solution");
    fb.innerHTML = correct
      ? '<span class="verdict right">Correct.</span> Check the working below matches how you did it.'
      : '<span class="verdict wrong">Not quite.</span> Read the worked solution, then redo it on paper without looking.';
    if (sol) sol.hidden = false;
    if (!(i in saved)) { saved[i] = { correct, given }; save(); }
    renderBoard();
  }

  qs.forEach((q, i) => {
    const head = document.createElement("div");
    head.className = "q-head";
    head.innerHTML = `<span class="q-label">Q${i + 1}</span><span>${q.dataset.topic || ""}</span>`;
    q.prepend(head);
    const sol = q.querySelector(".q-solution");
    if (sol) sol.hidden = true;
    const fb = document.createElement("div");
    fb.className = "q-feedback";
    (sol ? sol.before(fb) : q.append(fb));

    const opts = q.querySelector(".q-opts");
    if (opts) {
      const lis = Array.from(opts.children);
      lis.forEach((li, j) => {
        const b = document.createElement("button");
        b.type = "button";
        b.innerHTML = String.fromCharCode(65 + j) + ")&ensp;" + li.innerHTML;
        const isRight = li.hasAttribute("data-correct");
        li.removeAttribute("data-correct");
        b.dataset.r = isRight ? "1" : "";
        li.innerHTML = ""; li.append(b);
        b.addEventListener("click", () => {
          opts.querySelectorAll("button").forEach(x => {
            x.disabled = true;
            if (x.dataset.r) x.classList.add("right");
          });
          if (!isRight) b.classList.add("wrong");
          finish(q, i, isRight, String.fromCharCode(65 + j));
        });
      });
      const btns = opts.querySelectorAll("button");
      const pick = (i in saved && /^[A-Z]$/.test(saved[i].given)) ? saved[i].given.charCodeAt(0) - 65 : -1;
      if (pick < 0 || !btns[pick]) delete saved[i];
      else {
        // Re-grade from the answer given, never trust a stored verdict.
        saved[i].correct = !!btns[pick].dataset.r;
        btns.forEach(x => { x.disabled = true; if (x.dataset.r) x.classList.add("right"); });
        if (!saved[i].correct) btns[pick].classList.add("wrong");
        finish(q, i, saved[i].correct, saved[i].given);
      }
    }

    const num = q.querySelector(".q-num");
    if (num) {
      const ans = parseFloat(num.dataset.answer);
      const tol = parseFloat(num.dataset.tol || "0.001");
      num.classList.add("q-num-row");
      num.innerHTML = '<input type="text" inputmode="decimal" placeholder="your answer" aria-label="answer"><button class="btn" type="button">Check</button>';
      const inp = num.querySelector("input"), btn = num.querySelector("button");
      const go = () => {
        const v = parseNum(inp.value);
        if (isNaN(v)) { fb.textContent = "Enter a number (decimals, a fraction like 4/7, or a %)."; return; }
        inp.disabled = btn.disabled = true;
        finish(q, i, Math.abs(v - ans) <= tol, inp.value);
      };
      btn.addEventListener("click", go);
      inp.addEventListener("keydown", e => { if (e.key === "Enter") go(); });
      if (i in saved) {
        const v = parseNum(saved[i].given);
        if (isNaN(v)) delete saved[i];
        else {
          saved[i].correct = Math.abs(v - ans) <= tol;
          inp.value = saved[i].given; inp.disabled = btn.disabled = true;
          finish(q, i, saved[i].correct, saved[i].given);
        }
      }
    }
  });

  function renderBoard() {
    if (!board) return;
    const topics = {};
    qs.forEach((q, i) => {
      const t = q.dataset.topic || "General";
      topics[t] = topics[t] || { n: 0, done: 0, ok: 0, missed: [] };
      topics[t].n++;
      if (i in saved) { topics[t].done++; if (saved[i].correct) topics[t].ok++; else topics[t].missed.push("Q" + (i + 1)); }
    });
    const done = Object.keys(saved).length;
    const ok = Object.values(saved).filter(s => s.correct).length;
    let rows = "";
    for (const [t, s] of Object.entries(topics)) {
      const pct = s.done ? Math.round(100 * s.ok / s.done) : 0;
      rows += `<tr><td>${t}</td><td>${s.ok}/${s.done}${s.done < s.n ? ` <small>(of ${s.n})</small>` : ""}</td><td><div class="bar"><span style="width:${pct}%"></span></div></td><td><small>${s.missed.join(", ")}</small></td></tr>`;
    }
    board.innerHTML = `<h3 style="margin-top:0">Your results: ${ok}/${done} answered correctly${done < qs.length ? ` (${qs.length - done} still to go)` : ""}</h3>
      <table><tr><th>Topic</th><th>Score</th><th></th><th>Missed</th></tr>${rows}</table>
      <p class="no-print"><button class="btn" type="button" id="copy-results">Copy results to paste to Claude</button>
      <button class="btn ghost" type="button" id="reset-results">Reset</button> <small id="copy-msg"></small></p>`;
    board.querySelector("#copy-results").onclick = () => {
      const lines = [`Results for ${quizId}: ${ok}/${done}`];
      for (const [t, s] of Object.entries(topics)) lines.push(`- ${t}: ${s.ok}/${s.done}${s.missed.length ? " (missed " + s.missed.join(", ") + ")" : ""}`);
      const wrong = qs.map((q, i) => (i in saved && !saved[i].correct) ? `  Q${i + 1}: I answered ${saved[i].given}` : null).filter(Boolean);
      if (wrong.length) lines.push("My wrong answers:", ...wrong);
      const text = lines.join("\n");
      const msg = board.querySelector("#copy-msg");
      (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject())
        .then(() => { msg.textContent = "Copied!"; })
        .catch(() => { msg.innerHTML = "<pre style='white-space:pre-wrap'>" + text + "</pre>"; });
    };
    board.querySelector("#reset-results").onclick = () => { saved = {}; save(); location.reload(); };
  }
  save();
  renderBoard();
})();
