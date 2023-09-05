export type TScreenTypes = 'advisor' | 'marketing' | 'content' | 'changelog' | 'koality'
export type LooseOnionString<T extends string> = T | Omit<string, T>
export interface IChangelogEndpoints {
  getChangelogs: string
  postChangelog: string
}

export interface IContentConfig {
  contentId?: string
  contentUrl?: string
  language?: string
  type?: TScreenTypes
  title?: string
  label?: string
  partnerShopUrl?: string
  iframeButtonLabel?: string | null
  iframeUrl?: string | null
  changelogUrl?: string
  changelogEndpoints?: string
  brandType?: string
  isPartner?: boolean
  brandName?: string
}

export interface IChangelogList {
  id: string
  title: string
  body: string
  url: string
  type: string
  changelogCreatedAt: string
}
