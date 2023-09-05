import locales from '@/locales/loader'

interface ILocales {
  [key: string]: {
    [key: string]: string
  }
}

const currentLanguage = ref('en')

export function useTranslator() {
  const translate = (key: string): string => {
    const translations: ILocales = locales()
    const languageSpectrum = Object.keys(translations)
    if (languageSpectrum.includes(currentLanguage.value)) {
      return translations[currentLanguage.value][key] || key
    }
    return key
  }

  const setLanguage = (lang: string) => currentLanguage.value = lang

  const getLanguage = () => currentLanguage.value

  return {
    translate,
    setLanguage,
    getLanguage
  }
}
