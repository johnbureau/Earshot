export const activityEmojis = {
  // Entertainment
  trivia: "🎯",
  liveMusic: "🎸",
  karaoke: "🎤",
  comedy: "🎭",
  dj: "🎧",
  dance: "💃",
  
  // Food & Drink
  beer: "🍺",
  wine: "🍷",
  cocktails: "🍸",
  food: "🍽️",
  brunch: "🥂",
  tasting: "🍴",
  
  // Sports & Recreation
  sports: "⚽",
  yoga: "🧘",
  fitness: "💪",
  running: "🏃",
  cycling: "🚴",
  
  // Arts & Culture
  art: "🎨",
  poetry: "📚",
  theatre: "🎪",
  film: "🎬",
  crafts: "✂️",
  
  // Education & Business
  workshop: "💡",
  networking: "🤝",
  lecture: "📢",
  meetup: "👥",
  
  // Special Events
  holiday: "🎉",
  festival: "🎪",
  charity: "💝",
  competition: "🏆",
  
  // Default
  default: "📅"
};

export const getActivityEmoji = (activity) => {
  // Check subcategory first
  if (activity.subcategory && activityEmojis[activity.subcategory.toLowerCase()]) {
    return activityEmojis[activity.subcategory.toLowerCase()];
  }
  // Then check category
  if (activity.category && activityEmojis[activity.category.toLowerCase()]) {
    return activityEmojis[activity.category.toLowerCase()];
  }
  // Default emoji if no match
  return activityEmojis.default;
}; 