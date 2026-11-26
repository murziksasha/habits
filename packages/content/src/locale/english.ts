import type { ExerciseLocaleEnrichment } from "./types.js";

export const ENGLISH_LOCALE_ENRICHMENT: Record<string, ExerciseLocaleEnrichment> = {
  "en-1-3": {
    pairsEn: [
      { left: "Hello", right: "Hello" },
      { left: "Bye", right: "Goodbye" },
      { left: "Thanks", right: "Thank you" },
    ],
  },
  "en-4-1": {
    optionsEn: ["apple", "banana", "bread", "water"],
  },
  "en-7-1": {
    pairsEn: [
      { left: "red", right: "red" },
      { left: "blue", right: "blue" },
      { left: "green", right: "green" },
    ],
  },
  "en-7-2": {
    optionsEn: ["father", "mother", "brother", "sister"],
  },
  "en-10-1": {
    pairsEn: [
      { left: "school", right: "school" },
      { left: "shop", right: "shop" },
      { left: "park", right: "park" },
    ],
  },
  "en-12-1": {
    optionsEn: ["boarding pass", "passport", "suitcase", "bus ticket"],
  },
  "en-13-2": {
    optionsEn: [
      "I'd like a room for two nights",
      "I want breakfast",
      "Where is the beach?",
      "How much is a taxi?",
    ],
  },
  "en-14-1": {
    pairsEn: [
      { left: "menu", right: "menu" },
      { left: "bill", right: "bill" },
      { left: "waiter", right: "waiter" },
    ],
  },
  "en-14-3": {
    optionsEn: [
      "I'm allergic to nuts",
      "I love nuts",
      "Check, please",
      "I am a vegetarian",
    ],
  },
  "en-15-3": {
    optionsEn: ["size", "price", "color", "store"],
  },
  "en-16-1": {
    pairsEn: [
      { left: "meeting", right: "meeting" },
      { left: "deadline", right: "deadline" },
      { left: "colleague", right: "colleague" },
    ],
  },
  "en-16-2": {
    optionsEn: [
      "I'll send you an email",
      "I'll call tomorrow",
      "The meeting is cancelled",
      "I'm on vacation",
    ],
  },
  "en-19-1": {
    pairsEn: [
      { left: "I agree", right: "I agree" },
      { left: "I disagree", right: "I disagree" },
      { left: "Maybe", right: "Maybe" },
    ],
  },
  "en-d-false-friends-r4": {
    pairsEn: [
      { left: "magazine", right: "a periodical" },
      { left: "accurate", right: "exact" },
      { left: "sympathetic", right: "compassionate" },
      { left: "receipt", right: "a till slip" },
    ],
  },
  "en-d-prefixes-r4": {
    pairsEn: [
      { left: "re-", right: "again" },
      { left: "mis-", right: "wrongly" },
      { left: "over-", right: "too much" },
      { left: "pre-", right: "before" },
    ],
  },
  "en-d-suffix-adj-r4": {
    pairsEn: [
      { left: "careful", right: "cautious" },
      { left: "careless", right: "not careful" },
      { left: "hardly", right: "almost not" },
      { left: "lately", right: "recently" },
    ],
  },
  "en-d-idioms-body-r4": {
    pairsEn: [
      { left: "get cold feet", right: "become hesitant" },
      { left: "keep an eye on", right: "watch" },
      { left: "see eye to eye", right: "agree" },
      { left: "a pain in the neck", right: "a nuisance" },
    ],
  },
  "en-d-idioms-feel-r4": {
    pairsEn: [
      { left: "lose your temper", right: "explode in anger" },
      { left: "on edge", right: "tense" },
      { left: "break the ice", right: "ease the atmosphere" },
      { left: "not my cup of tea", right: "not to my taste" },
    ],
  },
  "en-d-rd-fact-opinion-r4": {
    pairsEn: [
      { left: "on 12 May", right: "a checkable fact" },
      { left: "careless", right: "a judgement" },
      { left: "allegedly", right: "someone's claim" },
      { left: "might", right: "hedging" },
    ],
  },
  "en-d-ex-cloze-r4": {
    pairsEn: [
      { left: "open cloze", right: "one grammar word" },
      { left: "word formation", right: "a word family" },
      { left: "key-word transformation", right: "2–5 words and a key" },
      { left: "Task 1 graph", right: "an overview of trends" },
    ],
  },
  "en-21-3": {
    pairsEn: [
      { left: "ticket", right: "travel pass / ticket" },
      { left: "passport", right: "passport (ID)" },
      { left: "luggage", right: "baggage / suitcases" },
    ],
  },
  "en-ph-2": {
    pairsEn: [
      { left: "Can I take a message?", right: "May I write down a message?" },
      { left: "You're breaking up", right: "The connection is poor" },
      { left: "I'll call you back", right: "I will return your call" },
    ],
  },
  "en-mt-6": {
    pairsEn: [
      { left: "Action item", right: "Task assigned after the meeting" },
      { left: "Takeaway", right: "Main conclusion" },
      { left: "Follow up", right: "Continue or check in later" },
    ],
  },
  "en-dlg-6": {
    pairsEn: [
      { left: "Across the street", right: "On the opposite side of the road" },
      { left: "Next to the pharmacy", right: "Beside the drugstore" },
      { left: "Around the corner", right: "Just past the turn" },
    ],
  },
  "en-dlg-18": {
    pairsEn: [
      { left: "You're on mute", right: "Your microphone is turned off" },
      { left: "Can everyone see my screen?", right: "Is my shared display visible to all?" },
      { left: "Let's take this offline", right: "Let's discuss this separately after the meeting" },
    ],
  },
  "en-dlg-24": {
    pairsEn: [
      { left: "Scope creep", right: "Uncontrolled expansion of project boundaries" },
      { left: "Trade-off", right: "Compromise between competing goals" },
      { left: "Hard deadline", right: "Fixed due date that cannot slip" },
    ],
  },
  "en-ls-1": {
    pairsEn: [
      { left: "review", right: "go over again" },
      { left: "memorize", right: "commit to memory" },
      { left: "spaced repetition", right: "timed interval review" },
    ],
  },
  "en-d-pp-been-gone-r3": {
    pairsEn: [
      { left: "She has gone to the shop.", right: "She left and is still out" },
      { left: "She has been to the shop.", right: "She went and is back" },
      { left: "Have you ever been there?", right: "A life-experience question" },
    ],
  },
  "en-d-narrative-mix-r2": {
    pairsEn: [
      { left: "I ordered coffee and sat down.", right: "Past Simple — event line" },
      { left: "It was raining and people were talking.", right: "Past Continuous — background" },
      { left: "I realised I had left my wallet at home.", right: "Past Perfect — earlier past" },
    ],
  },
  "en-d-mod-mix-r2": {
    pairsEn: [
      { left: "They must have left.", right: "A past deduction" },
      { left: "You should have written a test.", right: "Criticism or regret" },
      { left: "I needn't have come so early.", right: "Did it in vain" },
      { left: "You're supposed to review it today.", right: "An expectation or rule" },
    ],
  },
  "en-d-link-add-r4": {
    pairsEn: [
      { left: "moreover / furthermore", right: "add a formal point" },
      { left: "for example / such as", right: "give an example" },
      { left: "namely", right: "specify what is meant" },
      { left: "besides", right: "add an “in any case” point" },
    ],
  },
  "en-d-discourse-r4": {
    pairsEn: [
      { left: "actually / in fact", right: "correct or mildly contradict" },
      { left: "anyway", right: "return to the topic" },
      { left: "by the way", right: "a side topic" },
      { left: "as for", right: "move to a specific point" },
    ],
  },
  "en-d-ash-strut-r4": {
    pairsEn: [
      { left: "cat / map / bad", right: "/æ/" },
      { left: "cup / but / love", right: "/ʌ/" },
      { left: "car / father (RP)", right: "/ɑː/" },
      { left: "bed (not bad)", right: "/e/, a different vowel" },
    ],
  },
};
