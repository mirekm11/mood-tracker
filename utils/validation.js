const MAX_MOOD_LENGTH = 30;
const MAX_COMMENT_LENGTH = 150;

export const validateMood = (text) => {
  const trimmed = text.trim();
  if (!trimmed) return "Mood cannot be empty.";
  if (trimmed.length < 3) return "Mood must be at least 3 characters.";
  if (trimmed.length > MAX_MOOD_LENGTH)
    return `Mood cannot exceed ${MAX_MOOD_LENGTH} characters.`;
  return "";
};

export const validateComment = (text) => {
  const trimmed = text.trim();
  if (!trimmed) return "Comment cannot be empty";
  if (trimmed.length < 5) return "Comment is too short";
  if (trimmed.length > MAX_COMMENT_LENGTH)
    return `Maximum ${MAX_COMMENT_LENGTH} characters`;
  return "";
};
