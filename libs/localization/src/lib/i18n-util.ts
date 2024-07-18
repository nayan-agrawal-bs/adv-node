/**
 * Imports all JSON locales files from the './locales' directory and creates an object with their contents.
 * This function uses webpack's require.context to dynamically import translation files.
 *
 * @returns An object where keys are the language codes (filenames without extension) and values are objects containing the translations.
 * @throws Error if there's an issue reading the translation files.
 */

type TResources = Record<string, { translation: Record<string, string> }>;

export function getTranslations(): TResources {
  try {
    // eslint-disable-next-line
    // @ts-ignore
    const dir = require.context('./locales', false, /\.json$/);

    return dir.keys().reduce(
      (acc: TResources, key: string) => {
        const languageCode = key.replace(/^\.\/(.+)\.json$/, '$1');
        acc[languageCode] = { translation: dir(key) };
        return acc;
      },
      { en: { translation: {} } } as TResources
    );
  } catch (error) {
    console.error('Error loading translation files:', error);
    throw new Error('Failed to load translation files');
  }
}
