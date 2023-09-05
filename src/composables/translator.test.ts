import {describe, test, expect, beforeAll} from 'vitest'
import { useTranslator } from './translator'

describe('translator composable', () => {
  beforeAll(() => {
    const { setLanguage } = useTranslator()
    setLanguage('de')
  })

  test('set language to fr', () => {
    const { getLanguage } = useTranslator()
    const result = getLanguage()
    expect(result).toBe('de')
  })

  test('testing "open changelog" translation', () => {
    const { translate } = useTranslator()
    const result = translate('Open changelog')
    expect(result).toBe('Öffne changelog')
  })
})
