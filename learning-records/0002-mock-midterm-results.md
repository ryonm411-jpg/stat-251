# Mock midterm (0003): Poisson and transformations are the gaps

On 2026-10-28 the user scored 12/25 on the interleaved mock. Q20 (0.83) was marked wrong by a tolerance bug, which is now fixed. The pattern in the *wrong answers* tells us more than the per-topic scores:

- **Poisson and exponential, 0/3.** They answered 2 for Q14 and Q22: the right μ / exponent, but they stopped there. **They can find the parameter but don't know the pmf or the tail formula.** This is the top priority because it carries a lot of marks (practice set 3 Q3 is worth 9 marks).
- **Transformations, 0/2.** On Q13 they picked (u+1)/4, which leaves out the chain-rule factor of 1/4 when differentiating G(u). E(U) was wrong too.
- **Bayes (Q7 = 0.01).** They computed the numerator P(D|C)P(C) but never divided by P(D). Q2 (0.026 vs 0.029) looks like an arithmetic slip, not a method gap.
- **Sums (Q25 = 12).** They added SDs instead of variances.
- **Normal.** They missed Q3 and Q10 early on, then got Q16 (inverse) and Q23 right after seeing the solutions, so they learned within the session. This needs one spaced retry, not a full lesson.
- **Max/min (Q11).** They guessed on the series system (min of exponentials).
- **Strong:** Ch 1 descriptive, finding k, the median from F, the median of a max, geometric, "at least one in n years", independence check, and the inverse normal.

**Implications:** lesson 0004 drills Poisson/exponential formulas first, then the F-route for transformations with the chain rule, then spaced retries with new numbers (Bayes denominator, forward normal, add variances, min/max). The cheat sheet should give the most space to the Poisson-process block and the transformation recipe.
