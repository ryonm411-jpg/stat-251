# Notes

## Continue on another device
1. `git clone https://github.com/ryonm411-jpg/stat-251.git`, then open Claude Code in the folder.
2. Run `/teach`. The skill ships with the repo in `.claude/skills/teach`. Claude reads MISSION.md, NOTES.md and learning-records/ to pick up where you left off.
3. Open lessons straight from the folder in a browser. Quiz answers are saved per browser, so on a new device the quizzes start blank. Your past results are recorded in learning-records/.
4. Quiz self-tests (optional): `npm i jsdom@24.1.0`, then `node tools/test-0003-mock.js .` and `node tools/test-0004-drill.js .`

**Where things stand (2026-10-29):** mock 0003 = 12/25. Drill 0004 is built, and its results haven't been reported yet. The cheat-sheet template is at reference/my-cheat-sheet.html. Exam: Fri Oct 30, 8:00am.

## Log

- 2026-10-23: First session. The user is cramming for a one-week deadline, so lessons should be short exam-style drills rather than broad explanations.
- Exam rule: the cheat sheet must be handwritten by the student. reference/formula-sheet.html is a template to copy from, not something to print and bring.
- Practice PDFs are scanned images (no text layer). Read them visually.
- Plan: diagnostic (0001) → drill the 2–3 weakest topics → a timed mixed mock (interleaved) around Oct 28 → review the cheat sheet on Oct 29.
- 2026-10-23: The quiz.js header class collided with `.q-num`, so every answer was marked wrong. Fixed it, and saved answers are now re-graded on load. Always test new quiz components in jsdom (scratchpad has jsdom installed).
- The user prefers that I assume weakness everywhere over re-taking a diagnostic. Lesson order: 0002 density→F → 0003 sums/averages + max/min → 0004 normal (Ch 5) → 0005 binomial/geometric/return period → 0006 Poisson process/exponential/Poisson approx → 0007 timed mixed mock (≈Oct 28) → Oct 29 cheat-sheet review.
- 2026-10-28: Two days before the exam with only 0001–0002 done, so the plan changed. Lessons 0003–0006 are replaced by 0003, a 26-question interleaved mock (data-topic groups the scoreboard into a weakness map). Next: the user pastes the copied results → 0004 is a targeted drill on their 2–3 weakest topics, built from the practice-set question types → Oct 29 evening: finalise the cheat sheet. New component: assets/timer.js (sticky countdown). quiz test scripts are in tools/.
- Likely exam patterns seen in the practice sets: normal → binomial chaining ("at least one of n"); N(μ, σ²) variance trap; max of two *different* uniforms (piecewise F); U = aY + b transformation via F; Poisson rate rescaling + exponential waiting time; total probability/Bayes; histogram/boxplot MC; normal approximation with continuity correction (set 3).
- 2026-10-28: Mock score 12/25 (see learning-records/0002). Built 0004 (Poisson/exp → transformations → spaced retries). Grading tolerance for answers ≥ 0.2 is now 0.005, so 2-dp rounding passes. Use that convention in new quizzes. Next: Oct 29, check the 0004 results, do one short final mixed retrieval set if time allows, and finish the cheat sheet.
- 2026-10-29: Built reference/my-cheat-sheet.html, a one-page handwriting template weighted toward the mock's weak spots. Still waiting on the 0004 drill results.
