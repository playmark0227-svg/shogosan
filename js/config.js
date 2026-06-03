/**
 * ES UUR — Site Configuration
 * --------------------------------------------------------------
 * Instagramの最新投稿を表示するための設定。
 *
 * 表示方法は2つから選べます。
 *
 * 1) Instagram Graph API (Business / Creator アカウント)
 *    - Meta開発者アカウント＋FacebookページとIG連携が必要
 *    - 長期アクセストークンを取得して、accountごとに設定
 *
 * 2) RSS bridge / 公開JSONプロキシ
 *    - APIなしで使える簡易方法 (instagram-scraper等)
 *
 * いずれも未設定の場合は、各Instagramプロフィールへの
 * リンクカードがフォールバック表示されます。
 */
window.ES_UUR_CONFIG = {
  /** Instagram Graph API設定。アカウントID単位で設定 */
  instagram: {
    // Meta Graph API endpoint
    apiBase: "https://graph.instagram.com",
    // 各アカウント。tokenがあるアカウントのみAPI取得を試みる
    accounts: {
      "pianeta_nail_":  { businessId: "", accessToken: "" },
      "___uru.nail":    { businessId: "", accessToken: "" },
      "mu__.nail":      { businessId: "", accessToken: "" },
      "siisfitness426": { businessId: "", accessToken: "" },
      "bar_amis_2026.04": { businessId: "", accessToken: "" },
      "dogsalon.uur":   { businessId: "", accessToken: "" },
      "bw_no_oyatsu":   { businessId: "", accessToken: "" }
    },
    fields: "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp",
    limit: 8
  }
};
