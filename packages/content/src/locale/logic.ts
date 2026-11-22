import type { ExerciseLocaleEnrichment } from "./types.js";

export const LOGIC_LOCALE_ENRICHMENT: Record<string, ExerciseLocaleEnrichment> = {
  "lg-ded-1": {
    "optionsEn": [
      "C (B)",
      "A",
      "B",
      "D"
    ]
  },
  "lg-ded-2": {
    "optionsEn": [
      "3rd floor",
      "2nd floor",
      "4th floor",
      "1st floor"
    ]
  },
  "lg-ded-3": {
    "optionsEn": [
      "X is a knight, Y is a knave",
      "Both are knights",
      "Both are knaves",
      "X is a knave, Y is a knight"
    ]
  },
  "lg-ded-4": {
    "optionsEn": [
      "No, a knight cannot make a false statement about himself",
      "Yes, if the second person is a knight",
      "Yes, always",
      "Indeterminate"
    ]
  },
  "lg-ded-5": {
    "optionsEn": [
      "No (fallacy of affirming the consequent: error could be type error or linker error)",
      "Yes, necessarily a syntax error",
      "Errors never occur",
      "Code runs successfully"
    ]
  },
  "lg-ded-6": {
    "optionsEn": [
      "Some coffee lovers can google",
      "All coffee lovers are developers",
      "No coffee lovers can google",
      "All developers love coffee"
    ]
  },
  "lg-ded-7": {
    "optionsEn": [
      "Oranges cannot be there; it is the mixed box",
      "Apples",
      "Impossible to determine",
      "The box is empty"
    ]
  },
  "lg-ded-8": {
    "optionsEn": [
      "P must be false",
      "P must be true",
      "P is undefined",
      "P equals Q"
    ]
  },
  "lg-ded-9": {
    "optionsEn": [
      "Switch doors (probability rises to 2/3)",
      "Stay with door 1 (probability 2/3)",
      "Probability is 1/2 either way, switching does not matter",
      "Open both doors"
    ]
  },
  "lg-ded-10": {
    "optionsEn": [
      "1/3 (out of BB, BG, GB)",
      "1/2",
      "1/4",
      "3/4"
    ]
  },
  "lg-ded-11": {
    "optionsEn": [
      "5 students",
      "10 students",
      "0 students",
      "15 students"
    ]
  },
  "lg-ded-13": {
    "optionsEn": [
      "4 hours (A → B → C → E)",
      "5 hours",
      "3 hours",
      "2 hours"
    ]
  },
  "lg-ded-14": {
    "optionsEn": [
      "Deadlock",
      "Race condition",
      "Starvation",
      "Memory leak"
    ]
  },
  "lg-ded-15": {
    "optionsEn": [
      "Boris",
      "Victor",
      "Anna",
      "Cannot be determined"
    ]
  },
  "lg-ded-16": {
    "optionsEn": [
      "No, this is a direct logical contradiction",
      "Yes, always",
      "Sometimes in release builds",
      "Depends on programming language"
    ]
  },
  "lg-ded-17": {
    "optionsEn": [
      "Post hoc ergo propter hoc (correlation is not causation)",
      "Ad hominem (personal attack)",
      "False dilemma",
      "Appeal to authority"
    ]
  },
  "lg-ded-18": {
    "optionsEn": [
      "False dilemma (black-and-white thinking ignoring alternatives)",
      "Rigorous deductive proof",
      "Critical thinking",
      "Law of contraposition"
    ]
  },
  "lg-ded-19": {
    "optionsEn": [
      "[A] and [7]",
      "[A] and [4]",
      "Only [A]",
      "All four cards"
    ]
  },
  "lg-ded-20": {
    "optionsEn": [
      "(1) is true, (2) is false",
      "Both are true",
      "Both are false",
      "(1) is false, (2) is true"
    ]
  },
  "lg-ded-21": {
    "optionsEn": [
      "3 socks",
      "11 socks",
      "2 socks",
      "20 socks"
    ]
  },
  "lg-ded-22": {
    "optionsEn": [
      "At least one server is not running reliably",
      "No server is running reliably",
      "All servers crashed",
      "Servers are unstable at night"
    ]
  },
  "lg-dbg-1": {
    "optionsEn": [
      "Current remainingHearts = 0 and deductHeart() is called -> -1",
      "remainingHearts = 5 and zero calls",
      "remainingHearts = 3 with maxHearts = 5",
      "UI button color change"
    ]
  },
  "lg-dbg-2": {
    "optionsEn": [
      "page = 0, page = 1, empty list (0 records), last partial page",
      "Only page = 2 with 100 records",
      "Renaming the table",
      "Average day of the week"
    ]
  },
  "lg-dbg-4": {
    "optionsEn": [
      "Discard DB crash hypothesis and check client payload against schema",
      "Recreate the PostgreSQL cluster",
      "Rewrite frontend in another framework",
      "Clear browser cache three times without checking Network"
    ]
  },
  "lg-dbg-e1": {
    "optionsEn": [
      "One row with status = 'done' and completedAt = null",
      "One hundred rows with status = 'todo' and completedAt = null",
      "One row with status = 'done' and valid date",
      "Average title length is 12 characters"
    ]
  },
  "lg-dbg-e2": {
    "optionsEn": [
      "Each test halves the space of suspect changes (binary search)",
      "Test only recent UI buttons",
      "Rerun git status without diff",
      "Push commit directly to master"
    ]
  },
  "lg-p1": {
    "optionsEn": [
      "Valid deductive conclusion from two premises",
      "Syntactic mistake",
      "Random hypothesis",
      "Paradox"
    ]
  },
  "lg-p2": {
    "optionsEn": [
      "Sound (factually true premises + valid structure)",
      "Valid but unsound",
      "Inductive guess",
      "Circular logic"
    ]
  },
  "lg-p3": {
    "optionsEn": [
      "Fallacy: affirming the consequent (traffic can surge for other reasons)",
      "Sound deductive deduction",
      "Modus ponens",
      "Proof by contradiction"
    ]
  },
  "lg-p4": {
    "optionsEn": [
      "Modus tollens (if P then Q; not Q; therefore not P)",
      "Affirming the consequent",
      "Circular reasoning",
      "Denying the antecedent"
    ]
  },
  "lg-p5": {
    "optionsEn": [
      "Modus tollens",
      "Modus ponens",
      "Disjunctive syllogism",
      "Ad hominem"
    ]
  },
  "lg-p6": {
    "optionsEn": [
      "Valid deductive inference",
      "False conclusion",
      "Statistical correlation only",
      "Circular logic"
    ]
  },
  "lg-p7": {
    "optionsEn": [
      "A and not-A cannot both be true simultaneously",
      "Everything is true",
      "Nothing is known",
      "Code has zero bugs"
    ]
  },
  "lg-p8": {
    "optionsEn": [
      "A must be either true or false (no third state)",
      "Truth is continuous",
      "Statements are always false",
      "Variables must be integers"
    ]
  },
  "lg-p9": {
    "optionsEn": [
      "A equals A",
      "A equals not-A",
      "A changes every second",
      "A is undefined"
    ]
  },
  "lg-p10": {
    "optionsEn": [
      "Valid deduction: if A implies B and B implies C, then A implies C",
      "Invalid inference",
      "Circular proof",
      "Empirical observation"
    ]
  },
  "lg-p11": {
    "optionsEn": [
      "Hypothetical syllogism",
      "Modus ponens",
      "Affirming consequent",
      "False dilemma"
    ]
  },
  "lg-p12": {
    "optionsEn": [
      "Sound argument",
      "Soundness cannot exist in logic",
      "Fallacious inference",
      "Heuristic only"
    ]
  },
  "lg-t1": {
    "optionsEn": [
      "false",
      "true",
      "null",
      "undefined"
    ]
  },
  "lg-t2": {
    "optionsEn": [
      "true",
      "false",
      "null",
      "NaN"
    ]
  },
  "lg-t3": {
    "optionsEn": [
      "false",
      "true",
      "null",
      "undefined"
    ]
  },
  "lg-t4": {
    "optionsEn": [
      "not (A or B) = (not A) and (not B)",
      "not (A and B) = (not A) and (not B)",
      "A or B = A and B",
      "A = not A"
    ]
  },
  "lg-t5": {
    "optionsEn": [
      "not (A and B) = (not A) or (not B)",
      "not (A or B) = not A",
      "A and B = A or B",
      "A implies not B"
    ]
  },
  "lg-t6": {
    "optionsEn": [
      "Statement that is true under every possible truth assignment",
      "Statement that is always false",
      "Contingent formula",
      "Syntax error"
    ]
  },
  "lg-t7": {
    "optionsEn": [
      "Tautology (always true)",
      "Contradiction",
      "Contingent",
      "Syntax error"
    ]
  },
  "lg-t8": {
    "optionsEn": [
      "Statement that is false under every possible truth assignment",
      "Always true statement",
      "Tautology",
      "Empirical fact"
    ]
  },
  "lg-t9": {
    "optionsEn": [
      "Contradiction (always false)",
      "Tautology",
      "Contingent",
      "Undefined"
    ]
  },
  "lg-t10": {
    "optionsEn": [
      "false (an implication is false ONLY when premise is true and conclusion is false)",
      "true",
      "null",
      "error"
    ]
  },
  "lg-t11": {
    "optionsEn": [
      "true (vacuous truth: false premise makes implication true)",
      "false",
      "null",
      "undefined"
    ]
  },
  "lg-t12": {
    "optionsEn": [
      "true",
      "false",
      "null",
      "NaN"
    ]
  },
  "lg-f1": {
    "optionsEn": [
      "False dilemma (artificially limiting choices to two extremes)",
      "Ad hominem",
      "Slippery slope",
      "Appeal to authority"
    ]
  },
  "lg-f2": {
    "optionsEn": [
      "Post hoc ergo propter hoc (assuming causality from temporal sequence alone)",
      "Ad hominem",
      "Circular reasoning",
      "False equivalence"
    ]
  },
  "lg-f3": {
    "optionsEn": [
      "Ad hominem (attacking the person instead of the argument)",
      "Straw man",
      "Red herring",
      "Begging the question"
    ]
  },
  "lg-f4": {
    "optionsEn": [
      "Straw man (misrepresenting opponent's position to make it easier to attack)",
      "Ad hominem",
      "False dilemma",
      "Appeal to nature"
    ]
  },
  "lg-f5": {
    "optionsEn": [
      "Begging the question / circular reasoning (premise assumes conclusion)",
      "Modus ponens",
      "Reductio ad absurdum",
      "False equivalence"
    ]
  },
  "lg-f6": {
    "optionsEn": [
      "Slippery slope (asserting extreme chain reaction without evidence)",
      "Valid deduction",
      "Modus tollens",
      "Law of excluded middle"
    ]
  },
  "lg-f7": {
    "optionsEn": [
      "Appeal to authority (citing authority outside domain as definitive proof)",
      "Formal deduction",
      "Mathematical proof",
      "Empirical validation"
    ]
  },
  "lg-f8": {
    "optionsEn": [
      "Appeal to popularity / ad populum (assuming widespread belief equals truth)",
      "Deductive proof",
      "Statistical proof",
      "Tautology"
    ]
  },
  "lg-f9": {
    "optionsEn": [
      "Fallacy fallacy (assuming a conclusion is false merely because argument was poor)",
      "Modus ponens",
      "Sound argument",
      "Law of non-contradiction"
    ]
  },
  "lg-f10": {
    "optionsEn": [
      "Texas sharpshooter fallacy (cherry-picking clusters in data to fit hypothesis)",
      "Rigorous regression",
      "Valid sampling",
      "Standard deviation"
    ]
  },
  "lg-f11": {
    "optionsEn": [
      "Anecdotal evidence fallacy (generalizing from a single personal story)",
      "Controlled trial",
      "Statistically significant sample",
      "Deductive proof"
    ]
  },
  "lg-f12": {
    "optionsEn": [
      "False balance / middle ground fallacy (assuming middle compromise is always correct)",
      "Logical deduction",
      "Sound reasoning",
      "Scientific consensus"
    ]
  },
  "lg-adv-comb-1": {
    "optionsEn": [
      "120 combinations (P(5, 5) = 5!)",
      "25",
      "20",
      "60"
    ]
  },
  "lg-adv-comb-2": {
    "optionsEn": [
      "10 ways (C(5, 3) = 10)",
      "15",
      "20",
      "60"
    ]
  },
  "lg-adv-comb-3": {
    "optionsEn": [
      "At least 2 files land on the identical server (Pigeonhole Principle)",
      "No files can be saved",
      "Each server gets 1 file",
      "Exactly 1 server crashes"
    ]
  },
  "lg-adv-comb-4": {
    "optionsEn": [
      "64 subsets (2^6 = 64)",
      "12",
      "36",
      "32"
    ]
  },
  "lg-adv-ded-1": {
    "optionsEn": [
      "C is a knight, D is a knave",
      "Both are knights",
      "Both are knaves",
      "C is a knave, D is a knight"
    ]
  },
  "lg-adv-ded-2": {
    "optionsEn": [
      "Server Gamma crashed",
      "Server Alpha crashed",
      "Server Beta crashed",
      "No servers crashed"
    ]
  },
  "lg-adv-ded-3": {
    "optionsEn": [
      "Yellow team",
      "Red team",
      "Blue team",
      "Green team"
    ]
  },
  "lg-adv-ded-4": {
    "optionsEn": [
      "User 103 (the unique counterexample violating the invariant)",
      "User 101",
      "User 102",
      "None: invariant holds"
    ]
  },
  "lg-adv-bayes-1": {
    "optionsEn": [
      "Increases (Bayesian update: evidence strongly favors the hypothesis)",
      "Decreases",
      "Remains zero",
      "Cannot be updated"
    ]
  },
  "lg-adv-bayes-2": {
    "optionsEn": [
      "Prior probability before observing new evidence",
      "Posterior probability after test",
      "False positive rate",
      "Likelihood ratio"
    ]
  },
  "lg-adv-bayes-3": {
    "optionsEn": [
      "P(B|A) = [P(A|B) * P(B)] / P(A)",
      "P(A and B) = P(A) + P(B)",
      "P(A) = 1 - P(B)",
      "P(B) = P(A) / P(B|A)"
    ]
  },
  "lg-adv-bayes-4": {
    "optionsEn": [
      "Low base rate means most positive screens are false positives",
      "The test is completely defective",
      "Base rate has zero mathematical impact",
      "Probability is always 99%"
    ]
  },
  "lg-fa-1": {
    "optionsEn": [
      "P is true for every element x in the domain",
      "P is true for at least one x",
      "P is false for all x",
      "P is true for most x"
    ]
  },
  "lg-fa-2": {
    "optionsEn": [
      "a single counterexample x for which P(x) is false",
      "proof that P holds for almost all x",
      "an empty domain always",
      "a statistical sample"
    ]
  },
  "lg-fa-3": {
    "optionsEn": [
      "at least one configuration flag is optional",
      "most flags are required",
      "the form is completely empty",
      "user did not submit the form"
    ]
  },
  "lg-ex-1": {
    "optionsEn": [
      "there exists at least one element x for which P(x) is true",
      "P is true for all x",
      "P is true for exactly one x",
      "P is false everywhere"
    ]
  },
  "lg-ex-2": {
    "optionsEn": [
      "prove that P(x) is false for every element x in the domain",
      "find one x where P is false",
      "find two counterexamples",
      "change the domain"
    ]
  },
  "lg-ex-3": {
    "optionsEn": [
      "at least one administrator user was found",
      "all users are administrators",
      "no admins exist, but moderators do",
      "users table is empty"
    ]
  },
  "lg-qo-1": {
    "optionsEn": [
      "for each x there exists a corresponding (potentially different) y",
      "there is one universal y that works for all x",
      "a single pair (x,y) exists",
      "P is true for all pairs"
    ]
  },
  "lg-qo-2": {
    "optionsEn": [
      "stronger: a single universal y satisfies all x simultaneously",
      "weaker than ∀x ∃y",
      "always equivalent to ∀x ∃y",
      "always false"
    ]
  },
  "lg-qo-3": {
    "optionsEn": [
      "first is ∀x ∃y (each has a key), second is ∃y ∀x (one master key for all)",
      "they are identical statements",
      "the first is ∃y ∀x",
      "neither uses quantifiers"
    ]
  },
  "lg-ve-1": {
    "optionsEn": [
      "true (vacuous truth: no counterexample exists)",
      "false",
      "undefined always",
      "equivalent to ∃x P(x)"
    ]
  },
  "lg-ve-2": {
    "optionsEn": [
      "false (no witness exists in an empty domain)",
      "true",
      "vacuously true",
      "equivalent to ∀"
    ]
  },
  "lg-ve-3": {
    "optionsEn": [
      "true (vacuously true in JavaScript Array.every)",
      "false",
      "throws TypeError",
      "undefined"
    ]
  },
  "lg-sf-1": {
    "optionsEn": [
      "if A is true, then B must be true (A → B)",
      "if B is true, then A is true",
      "A and B are equivalent",
      "without A there is no B"
    ]
  },
  "lg-sf-2": {
    "optionsEn": [
      "a sufficient condition for release under this rule",
      "a necessary and unique condition always",
      "unrelated conditions",
      "a rule prohibiting release"
    ]
  },
  "lg-sf-3": {
    "optionsEn": [
      "yes, because other sufficient conditions may lead to B",
      "no, B is then guaranteed false",
      "only in an empty domain",
      "no, it is a contradiction"
    ]
  },
  "lg-nc-1": {
    "optionsEn": [
      "if B then A (B → A); without A, B cannot occur",
      "if A then B",
      "A is sufficient",
      "A and B are independent"
    ]
  },
  "lg-nc-2": {
    "optionsEn": [
      "a necessary condition for successful login",
      "a sufficient condition always (even offline)",
      "both necessary and sufficient",
      "not a condition"
    ]
  },
  "lg-nc-3": {
    "optionsEn": [
      "produce an instance of B occurring without A",
      "produce an instance of A without B",
      "demonstrate not-B",
      "prove that A is true"
    ]
  },
  "lg-iff-1": {
    "optionsEn": [
      "A → B and B → A (both necessary and sufficient)",
      "only A → B",
      "only B → A",
      "A or B"
    ]
  },
  "lg-iff-2": {
    "optionsEn": [
      "a necessary and sufficient condition",
      "only a sufficient condition",
      "only a necessary condition",
      "an example, not a definition"
    ]
  },
  "lg-iff-3": {
    "optionsEn": [
      "it fails to provide an independent verification criterion (circular)",
      "it is always logically false",
      "iff is forbidden in definitions",
      "definitions cannot use iff"
    ]
  },
  "lg-ha-1": {
    "optionsEn": [
      "more engineers will definitely accelerate delivery without overhead",
      "deadlines do not exist",
      "hiring takes zero time",
      "engineers do not exist"
    ]
  },
  "lg-ha-2": {
    "optionsEn": [
      "ask what must hold true for the conclusion to follow from the premises",
      "reject all premises",
      "count the words",
      "change the topic"
    ]
  },
  "lg-ha-3": {
    "optionsEn": [
      "that this metric accurately measures actual product quality",
      "that metrics are always integers",
      "that growth is impossible",
      "that the product does not exist"
    ]
  },
  "lg-sw-1": {
    "optionsEn": [
      "expand the domain or strengthen the predicate requirements",
      "add exceptions",
      "replace ∀ with ∃",
      "shorten the sentence"
    ]
  },
  "lg-sw-2": {
    "optionsEn": [
      "a weaker statement (easier to satisfy, claims less)",
      "a stronger statement",
      "an equivalent statement",
      "contradictory in itself"
    ]
  },
  "lg-sw-3": {
    "optionsEn": [
      "a universal claim is invalidated by a single counterexample",
      "the word 'always' is forbidden by grammar",
      "security is not a predicate",
      "code reviews do not evaluate claims"
    ]
  },
  "lg-tt-2": {
    "optionsEn": [
      "both are false",
      "at least one is false",
      "when A is true",
      "never"
    ]
  },
  "lg-tt-3": {
    "optionsEn": [
      "false",
      "true",
      "undefined",
      "true and false"
    ]
  },
  "lg-imp-1": {
    "optionsEn": [
      "A is true and B is false",
      "both are false",
      "both are true",
      "A is false and B is true"
    ]
  },
  "lg-imp-3": {
    "optionsEn": [
      "true (vacuous truth: false premise implies anything)",
      "always false",
      "undefined",
      "equals B"
    ]
  },
  "lg-eq-1": {
    "optionsEn": [
      "A and B have identical truth values",
      "A is true",
      "B is false",
      "at least one is true"
    ]
  },
  "lg-eq-2": {
    "optionsEn": [
      "exactly one of A or B is true",
      "both are true",
      "both are false",
      "always"
    ]
  },
  "lg-tau-1": {
    "optionsEn": [
      "tautology (always true)",
      "contradiction",
      "contingency",
      "implication"
    ]
  },
  "lg-tau-2": {
    "optionsEn": [
      "contradiction (always false)",
      "tautology",
      "true when A is true",
      "equivalence"
    ]
  },
  "lg-tau-3": {
    "optionsEn": [
      "contingent formula",
      "tautology",
      "contradiction",
      "axiom"
    ]
  },
  "lg-fh-1": {
    "optionsEn": [
      "ad hominem (attacking the speaker)",
      "valid refutation",
      "tautology",
      "induction"
    ]
  },
  "lg-fh-2": {
    "optionsEn": [
      "appeal to false authority",
      "deduction",
      "contraposition",
      "definition"
    ]
  },
  "lg-fh-3": {
    "optionsEn": [
      "identify error in premises or invalid deduction step",
      "insult the speaker",
      "appeal to popularity",
      "change the subject"
    ]
  },
  "lg-fh-4": {
    "optionsEn": [
      "straw man (attacking an exaggerated distortion)",
      "deduction",
      "analogy",
      "definition"
    ]
  },
  "lg-fh-5": {
    "optionsEn": [
      "slippery slope fallacy",
      "modus ponens",
      "empirical induction",
      "axiom"
    ]
  },
  "lg-fh-6": {
    "optionsEn": [
      "demonstrate concrete causal link and empirical data",
      "simply assert Z is terrifying",
      "repeat that it is inevitable",
      "redefine A"
    ]
  },
  "lg-fh-7": {
    "optionsEn": [
      "intermediate nuances and alternative options",
      "De Morgan's law",
      "tautology",
      "probability of 1"
    ]
  },
  "lg-fh-8": {
    "optionsEn": [
      "circular reasoning (begging the question)",
      "contraposition",
      "induction",
      "syllogism"
    ]
  },
  "lg-fh-9": {
    "optionsEn": [
      "introduce at least one realistic alternative option",
      "repeat the two extremes",
      "reject logic entirely",
      "resort to personal attacks"
    ]
  },
  "lg-fh-10": {
    "optionsEn": [
      "no: correlation does not establish causation",
      "yes: always",
      "yes: if numbers are large",
      "yes: if expressed as percentages"
    ]
  },
  "lg-fh-11": {
    "optionsEn": [
      "common underlying confounder (summer heat causes both)",
      "ice cream causes fires",
      "fires cause ice cream sales",
      "data is always false"
    ]
  },
  "lg-fh-12": {
    "optionsEn": [
      "plausible mechanism, controlled variables, and reproducibility",
      "a single visually appealing chart",
      "larger font on presentation slide",
      "changing the subject"
    ]
  },
  "lg-fh-13": {
    "optionsEn": [
      "post hoc ergo propter hoc",
      "modus tollens",
      "De Morgan's law",
      "controlled induction"
    ]
  },
  "lg-fh-14": {
    "optionsEn": [
      "anecdotal evidence fallacy",
      "exhaustive population sample",
      "controlled experiment",
      "tautology"
    ]
  },
  "lg-fh-15": {
    "optionsEn": [
      "verify sample size, control group, and statistical significance",
      "assume single story represents all cases",
      "ignore all data",
      "change the product"
    ]
  },
  "lg-pr-4": {
    "optionsEn": [
      "probability of A given that B has occurred",
      "P(A)×P(B)",
      "P(A or B)",
      "always P(A)"
    ]
  },
  "lg-pr-7": {
    "optionsEn": [
      "false positives, because the healthy population is vastly larger",
      "almost certainly diseased",
      "exactly 50/50",
      "impossible to determine"
    ]
  },
  "lg-pr-8": {
    "optionsEn": [
      "prior prevalence of the event before the test",
      "test accuracy",
      "number of questions",
      "variance"
    ]
  },
  "lg-pr-9": {
    "optionsEn": [
      "false positive rate can overwhelm rare true cases",
      "99% always guarantees near certainty",
      "accuracy cannot be defined",
      "probability does not apply"
    ]
  },
  "lg-pr-10": {
    "optionsEn": [
      "+2",
      "+10",
      "−6",
      "0"
    ]
  },
  "lg-pr-11": {
    "optionsEn": [
      "probability-weighted average outcome, not necessarily single trial result",
      "the exact outcome of next trial",
      "maximum possible payout",
      "statistical mode"
    ]
  },
  "lg-pr-12": {
    "optionsEn": [
      "rare large jackpot blinds players to frequent small losses",
      "expectation is always positive",
      "probabilities cannot be multiplied",
      "it is a tautology"
    ]
  },
  "lg-pr-15": {
    "optionsEn": [
      "when choices are independent sequential steps taken together",
      "when options are mutually exclusive at a single step",
      "always",
      "never in probability"
    ]
  },
  "lg-gr-1": {
    "optionsEn": [
      "closed path without repeated vertices (except start/end)",
      "any arbitrary edge",
      "a tree",
      "an isolated vertex"
    ]
  },
  "lg-gr-2": {
    "optionsEn": [
      "connected acyclic graph",
      "any graph with a designated root",
      "complete graph",
      "graph with self-loops"
    ]
  },
  "lg-gr-3": {
    "optionsEn": [
      "no: an extra edge introduces a cycle",
      "yes: always",
      "yes: if rooted",
      "only in directed graphs"
    ]
  },
  "lg-gr-4": {
    "optionsEn": [
      "twice the number of edges (Handshaking Lemma)",
      "total number of vertices",
      "number of cycles",
      "always an odd number"
    ]
  },
  "lg-gr-5": {
    "optionsEn": [
      "an even number of vertices with odd degrees",
      "an odd number",
      "exactly one vertex",
      "arbitrary with no restriction"
    ]
  },
  "lg-gr-6": {
    "optionsEn": [
      "no: sum of degrees would be odd (7), violating Handshaking Lemma",
      "yes",
      "yes: it forms a tree",
      "yes: if multigraph"
    ]
  },
  "lg-inv-1": {
    "optionsEn": [
      "a property or quantity that remains invariant under valid moves",
      "a random number",
      "vertex label",
      "probability of 1"
    ]
  },
  "lg-inv-2": {
    "optionsEn": [
      "on squares of the same color throughout the entire game",
      "changes color every move",
      "only on the a1-h8 diagonal",
      "on the rim"
    ]
  },
  "lg-inv-3": {
    "optionsEn": [
      "parity of token count is an invariant (increments/decrements by 2)",
      "always random",
      "always becomes 0",
      "does not exist"
    ]
  },
  "lg-inv-4": {
    "optionsEn": [
      "permutation parity of the numbered tiles",
      "pure randomness",
      "frame border color",
      "sum of tile numbers"
    ]
  },
  "lg-inv-5": {
    "optionsEn": [
      "no: parity of illuminated lamps is conserved (0 is even, 1 is odd)",
      "yes: in a single move",
      "yes: working backwards",
      "always"
    ]
  },
  "lg-inv-6": {
    "optionsEn": [
      "no: parity of total sum is conserved (start has sum 0, target 100 has sum 1)",
      "yes: in one move",
      "yes: in three moves",
      "always"
    ]
  },
  "lg-cx-1": {
    "optionsEn": [
      "a single non-white swan",
      "a thousand white swans",
      "a public survey",
      "dictionary definition of swan"
    ]
  },
  "lg-cx-2": {
    "optionsEn": [
      "no counterexample: the statement is true",
      "the number 2",
      "the number 9",
      "the number 1"
    ]
  },
  "lg-cx-3": {
    "optionsEn": [
      "search may be incomplete; rigorous proof is required",
      "absence of counterexample is definitive proof",
      "counterexamples do not exist in math",
      "induction is forbidden"
    ]
  }
};
