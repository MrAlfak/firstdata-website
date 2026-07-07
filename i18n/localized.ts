import { dictionaries } from "./dictionaries";
import { localizeDigitsDeep } from "@/lib/i18n/digits";

/** Persian dictionary with all ASCII digits normalized to ۰,۹. */
export const localizedDictionaries = {
  en: dictionaries.en, fa: localizeDigitsDeep(dictionaries.fa), } as typeof dictionaries;
