import idDict from "@/i18n/id.json";

export type Locale = "id";
export const defaultLocale: Locale = "id";

type TranslationSchema = typeof idDict;

const dictionaries: Record<Locale, TranslationSchema> = {
  id: idDict,
};

export function getDictionary(locale: Locale = defaultLocale): TranslationSchema {
  return dictionaries[locale] || dictionaries[defaultLocale];
}

/**
 * Helper to get a nested translation value by key path string (e.g. "hero.titlePrefix")
 */
export function t(path: string, locale: Locale = defaultLocale): string {
  const dict = getDictionary(locale);
  const keys = path.split(".");
  let current: any = dict;

  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = current[key];
    } else {
      return path; // Fallback to path if not found
    }
  }

  return typeof current === "string" ? current : path;
}
