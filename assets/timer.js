/*
 * Exam countdown timer component.
 * Usage: <div class="timer" data-timer="50"></div>   (minutes)
 * Start / pause / reset. Keeps counting past zero (shown in red) so you see how far over you went.
 */
(function () {
  document.querySelectorAll("[data-timer]").forEach(el => {
    const total = parseFloat(el.dataset.timer) * 60;
    let left = total, tick = null;
    el.innerHTML = '<span class="timer-clock mono"></span> <button class="btn" type="button">Start</button> <button class="btn ghost" type="button">Reset</button>';
    const clock = el.querySelector(".timer-clock");
    const [go, reset] = el.querySelectorAll("button");
    const fmt = s => { const a = Math.abs(Math.round(s)); return (s < 0 ? "−" : "") + Math.floor(a / 60) + ":" + String(a % 60).padStart(2, "0"); };
    const draw = () => { clock.textContent = fmt(left); clock.classList.toggle("over", left < 0); };
    go.onclick = () => {
      if (tick) { clearInterval(tick); tick = null; go.textContent = "Resume"; }
      else { tick = setInterval(() => { left--; draw(); }, 1000); go.textContent = "Pause"; }
    };
    reset.onclick = () => { clearInterval(tick); tick = null; left = total; go.textContent = "Start"; draw(); };
    draw();
  });
})();
