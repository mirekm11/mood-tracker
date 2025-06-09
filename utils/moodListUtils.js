export const removeMoodById = (list, id) =>
  list.filter((mood) => mood.id !== id);

export const updateMoodComment = (list, id, comment) =>
  list.map((mood) => (mood.id === id ? { ...mood, comment } : mood));
