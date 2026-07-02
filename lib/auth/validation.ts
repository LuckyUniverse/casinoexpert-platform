/**
 * Input validation for registration/login. Mirrors casinogpt's rules
 * (alias 3-30 alphanumeric+underscore, standard email) plus first name,
 * which casinoexpert collects and casinogpt does not.
 */

const ALIAS_REGEX = /^[a-zA-Z0-9_]+$/;
const ALIAS_MIN = 3;
const ALIAS_MAX = 30;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_MAX = 50;

const RESERVED_ALIASES = new Set([
  "admin", "administrator", "casinoexpert", "casinogpt", "system", "support",
  "mod", "moderator", "staff", "help", "info", "official", "luckyuniverse",
  "lucky", "expert", "bot", "api", "root", "null", "undefined",
]);

export function validateAlias(alias: unknown): string | null {
  if (typeof alias !== "string") return "Username is required";
  const a = alias.trim();
  if (a.length < ALIAS_MIN) return `Username must be at least ${ALIAS_MIN} characters`;
  if (a.length > ALIAS_MAX) return `Username must be ${ALIAS_MAX} characters or fewer`;
  if (!ALIAS_REGEX.test(a)) return "Username can only contain letters, numbers, and underscores";
  if (RESERVED_ALIASES.has(a.toLowerCase())) return "That username is reserved";
  return null;
}

export function validateEmail(email: unknown): string | null {
  if (typeof email !== "string") return "Email is required";
  const e = email.trim();
  if (!e) return "Email is required";
  if (e.length > 254 || !EMAIL_REGEX.test(e)) return "Please enter a valid email address";
  return null;
}

export function validateFirstName(name: unknown): string | null {
  if (typeof name !== "string") return "First name is required";
  const n = name.trim();
  if (!n) return "First name is required";
  if (n.length > NAME_MAX) return `First name must be ${NAME_MAX} characters or fewer`;
  // Letters (any script), spaces, hyphens, apostrophes - no digits/symbols/URLs
  if (!/^[\p{L}][\p{L}\s'\-.]*$/u.test(n)) return "Please enter a valid first name";
  return null;
}
