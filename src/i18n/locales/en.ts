import type { Dictionary } from "@/src/i18n/dictionaries";

export const en: Dictionary = {
  common: {
    appName: "TypeDash",
    appShort: "TypeDash",
    test: "Test",
    practice: "Practice",
    ranking: "Ranking",
    dashboard: "Dashboard",
    about: "About",
    login: "Login",
    logout: "Logout",
    loggedIn: "Logged in",
    github: "GitHub",
    repository: "Repository",
    project: "Project",
    navigation: "Navigation",
    version: "Version",
    toggleLanguage: "Toggle language",
    user: "User",
    wpm: "WPM",
    accuracy: "Accuracy",
    date: "Date",
    duration: "Duration",
    sort: "Sort",
    showMore: "Show more",
    remaining: "remaining",
    loading: "Loading...",
    top: "Top",
    competitors: "competitors",
    rank: "Rank",
  },
  header: {
    logoAlt: "TypeDash logo",
    userAvatarAlt: "User",
    saveProgress: "Login to save progress",
    brandSuffix: "typing practice",
  },
  footer: {
    description:
      "Practice with focus, track your progress and compare your best results in a clear, simple experience.",
    projectDescription: "Typing practice with saved progress and a global ranking.",
    rights: "All rights reserved.",
    bottomNote: "Speed, accuracy and consistency in one place.",
  },
  home: {
    badge: "Focused practice",
    title: "Train speed, accuracy and rhythm in a clear, direct experience.",
    description:
      "See your performance in real time, follow your progress and turn practice into steady improvement.",
    aboutBadge: "About the project",
    aboutTitle: "A better way to practice every day",
    aboutText:
      "TypeDash was built to make practice more useful. You can start quickly, understand your result right away and come back to the next session with a clear sense of what to improve.",
    featuresTitle: "Why is TypeDash different?",
    featuresSubtitle: "Everything is designed to keep practice light, clear and repeatable.",
    features: [
      {
        title: "Immediate feedback",
        description: "See your pace and accuracy while you type, without waiting for the session to end.",
      },
      {
        title: "Comfortable reading",
        description: "A clean interface helps you stay focused on the text and your rhythm.",
      },
      {
        title: "Live ranking",
        description: "Compare your best results with other people and see where you stand today.",
      },
      {
        title: "Ongoing progress",
        description: "Return to your history, review trends and follow your consistency over time.",
      },
      {
        title: "Practice anywhere",
        description: "Train on desktop or mobile with the same smooth flow.",
      },
      {
        title: "Quick sessions",
        description: "Open it, practice and move on with your day without friction.",
      },
    ],
    trainingTitle: "How does the training work?",
    trainingSubtitle: "Three simple steps to start improving now.",
    steps: [
      {
        title: "Type the text",
        description: "Start typing and the session begins automatically on your first key press.",
      },
      {
        title: "Correct mistakes",
        description: "Follow mistakes and hits in real time so you can keep accuracy under control.",
      },
      {
        title: "See your result",
        description: "At the end of the session, review your result, save your progress and check the ranking.",
      },
    ],
    faqTitle: "Frequently asked questions (FAQ)",
    faqSubtitle: "The key answers to get more from every session.",
    faqs: [
      {
        question: "What does WPM mean and how is it calculated?",
        answer:
          "WPM means words per minute. It shows how many words you can sustain with speed and control during a session.",
      },
      {
        question: "Why should I focus on accuracy before speed?",
        answer:
          "When accuracy improves, speed becomes more stable. Build control first, then push pace.",
      },
      {
        question: "How do consistency and corrections affect my score?",
        answer:
          "A steadier rhythm usually leads to stronger results. Too many corrections break flow and reduce consistency.",
      },
      {
        question: "Do I need to sign in to use TypeDash?",
        answer:
          "You can practice without signing in. When you log in, your progress is saved and your results can appear in the ranking.",
      },
    ],
    ctaLoggedInText:
      "Your progress is saved. Keep practicing, improve your rhythm and see how far you can go.",
    practiceMode: "Practice mode",
    viewDashboard: "View my dashboard",
    ctaLoggedOutTitle: "Ready to record your long-term progress?",
    ctaLoggedOutText:
      "Log in to save your progress, follow your improvement and appear in the ranking with your best results.",
    ctaLoggedOutButton: "Create account / login",
    loggedInTitle: (name: string) => `You are all set, ${name}!`,
    fallbackPilot: "there",
  },
  liveStats: {
    time: "time",
    accuracy: "accuracy",
    wpm: "wpm",
  },
  typingArea: {
    ariaLabel: "Typing area, start typing to begin the test",
    overlay: "Tap here or start typing to begin",
  },
  results: {
    accuracy: "Accuracy",
    correct: "Correct",
    incorrect: "Errors",
    chartTitle: "WPM over time",
    retry: "Try again",
  },
  telemetry: {
    duration: "Duration",
    telemetry: "Summary",
    ranking: "Ranking",
    live: "active",
    global: "global",
    loginNotice: "Results are only saved when you are logged in.",
    loginCta: "Login to save progress",
  },
  ranking: {
    sectionLabel: "Ranking",
    title: "Best results",
    subtitle: "One result per person, using the best score for the selected period.",
    periods: {
      day: "Today",
      week: "Week",
      month: "Month",
      all: "All",
    },
    periodDescriptions: {
      day: "Daily ranking",
      week: "Weekly ranking",
      month: "Monthly ranking",
      all: "All-time ranking",
    },
    loading: "Loading ranking...",
    emptyStart: "No results in the",
    emptyEnd: "ranking yet. Be the first.",
    headers: {
      user: "User",
      accuracy: "Accuracy",
      date: "Date",
      acc: "Acc",
    },
    cardLabels: {
      rank: "Rank",
      user: "User",
      accuracy: "Accuracy",
      date: "Date",
    },
  },
  rankingPage: {
    badge: "Top results",
    title: "Compare the best results by period.",
    subtitle:
      "Each person appears with one best result per period, which keeps the ranking clearer and fairer.",
    startTest: "Start a test",
    cards: [
      {
        title: "One best result",
        text: "Each person enters with their strongest session in the selected period.",
      },
      {
        title: "Views by period",
        text: "Follow what changes today, this week, this month or across all time.",
      },
      {
        title: "Speed with control",
        text: "Strong results come from pace, accuracy and consistency working together.",
      },
    ],
  },
  practicePage: {
    badge: "Practice resources",
    title: "Short sessions that make improvement easier to read.",
    subtitle:
      "Use these ideas to practice with more intention and turn repetition into real progress.",
    openTest: "Open test",
    drills: [
      {
        title: "30-second sprint",
        text: "Run three short sessions and keep the best result. It is simple and easy to repeat.",
      },
      {
        title: "Correction discipline",
        text: "Correct only when needed. Fewer interruptions help you keep pace and accuracy together.",
      },
      {
        title: "Pattern focus",
        text: "When mistakes repeat, slow down for one session and rebuild control before speeding up again.",
      },
      {
        title: "Consistency check",
        text: "A strong run of results matters more than one isolated peak.",
      },
    ],
    recommendedTitle: "Recommended loop",
    recommendedText:
      "Start with a controlled session, complete three full tests and review your history before changing your goal.",
  },
  dashboardPage: {
    title: "Your progress",
    subtitle: "Review your history, follow trends and understand how your rhythm is improving.",
    historyTitle: "Test history",
    loadingAuth: "You need to be authenticated to view your history.",
    loadingError: "Could not load metrics. Try again.",
    networkError: "Could not connect to the server.",
    loginCta: "Login",
    emptyHistory: "No tests found. Complete a test to see your history.",
    chartsEmpty: "Complete at least 2 tests to see your progress.",
    performanceOverTime: "Progress over time",
    chartAxisTest: "Test",
    chartLabel: "Test #",
    chartCards: {
      wpm: {
        title: "WPM",
        subtitle: "Your typing pace",
      },
      accuracy: {
        title: "Accuracy",
        subtitle: "How well you stay in control",
      },
      duration: {
        title: "Duration",
        subtitle: "Total time for each session",
      },
    },
    stats: {
      bestWpm: "Best WPM",
      averageWpm: "Average WPM",
      averageAccuracy: "Average accuracy",
      completedTests: "Completed tests",
    },
    sortOptions: {
      recent: "Newest",
      wpm_desc: "Highest WPM",
      wpm_asc: "Lowest WPM",
      accuracy_desc: "Highest accuracy",
      accuracy_asc: "Lowest accuracy",
      duration_desc: "Longest duration",
    },
  },
  loginPage: {
    title: "Login",
    subtitle: "Log in to save your progress, follow your improvement and join the ranking.",
    continueWithGithub: "Continue with GitHub",
  },
  aboutPage: {
    badge: "About the project",
    title: "TypeDash",
    subtitle:
      "TypeDash helps you practice with clarity, understand your rhythm and follow your progress over time.",
    startTest: "Start a test",
    heroImageAlt: "TypeDash dashboard screen",
    pillars: [
      {
        title: "Instant reading",
        description: "You understand your result the moment the session ends.",
      },
      {
        title: "Saved progress",
        description: "Your history stays organized so your improvement is easy to follow.",
      },
      {
        title: "Fair ranking",
        description: "The ranking highlights each person's best result in every period.",
      },
    ],
    engineeringLabel: "Experience",
    engineeringTitle: "Made for repeating, comparing and improving",
    engineeringText:
      "Each part of the experience is designed to reduce friction and help you return to the next session with a clearer sense of progress.",
    userDataTitle: "Your progress",
    userDataText:
      "When you log in, your results stay saved so your progress has context and continuity.",
    technicalBaseTitle: "Daily use",
    technicalBaseText:
      "Short sessions, simple reading and clear comparison make it easier to stay consistent without adding friction to your routine.",
  },
};
