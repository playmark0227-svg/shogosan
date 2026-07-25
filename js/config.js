/**
 * ES Beauty — Site Configuration (single source of truth)
 * ==============================================================
 * ★ 名称変更はこのファイルだけ直せばOKです。
 *
 * ・company … 統括ブランド名（例: "ES Beauty"。将来 "イズクリエイト" 等へ変更する場合ここだけ変更）
 *   → HTML内の <span data-company> がこの値に自動で置き換わります（全ページ共通）。
 * ・brands  … 各サービスのブランド表示名。名称が決まったら書き換えてください。
 * ・instagram … 店舗ごとのInstagram連携設定。
 *
 * Instagramの表示方法:
 *   Instagram Graph API（Business / Creatorアカウント）で
 *   businessId と accessToken を設定したアカウントのみ、最新投稿を取得します。
 *   未設定のアカウントは「プロフィールへのリンク」、
 *   handle が空（開店準備中）のものは「準備中カード」を表示します。
 */
window.ES_CONFIG = {
  /** 統括ブランド名（会社名変更はここだけ） */
  company: "ES Beauty",
  companyReading: "イズ ビューティー",
  tagline: "complex salon",

  /** 各サービスのブランド表示名（名称検討中は後で変更可） */
  brands: {
    // Nail — 3スタジオ
    nail:    { name: "Yonua",  reading: "ヨヌア",   category: "Nail", area: "円山（準備中）", ig: "mu__.nail" },
    pianeta: { name: "PIANETA NAIL", reading: "ピアネタ", category: "Nail", area: "東区元町", ig: "pianeta_nail_" },
    uru:     { name: "uru",    reading: "ウル",     category: "Nail", area: "札幌市内", ig: "___uru.nail" },
    // その他のサービス
    esthetic:{ name: "Luster", reading: "ラスター", category: "Esthetic", ig: "siisfitness426" },
    eye:     { name: "Noiru",  reading: "ノイル",   category: "Eye" },
    pilates: { name: "Pilates Studio", reading: "（名称検討中）", category: "Pilates", ig: "siisfitness426" },
    dog:     { name: "UUR",    reading: "ウール",   category: "Dog", area: "南幌町", ig: "dogsalon.uur" },
    bar:     { name: "BAR Amis", reading: "アミス",  category: "Bar", area: "南5条西2", ig: "bar_amis_2026.04" }
  },

  /** Instagram Graph API設定。アカウントID単位で設定 */
  instagram: {
    apiBase: "https://graph.instagram.com",
    accounts: {
      // Nail — Yonua傘下の各スタジオ
      "pianeta_nail_":    { businessId: "", accessToken: "" },
      "___uru.nail":      { businessId: "", accessToken: "" },
      "mu__.nail":        { businessId: "", accessToken: "", label: "Yonua 円山" },
      // Esthetic — Luster（暫定でSiiS公式を使用）
      "siisfitness426":   { businessId: "", accessToken: "" },
      // Eye — Noiru（アカウント開設準備中）
      "noiru":            { businessId: "", accessToken: "", comingSoon: true },
      // Bar — BAR Amis
      "bar_amis_2026.04": { businessId: "", accessToken: "" },
      // Dog — UUR
      "dogsalon.uur":     { businessId: "", accessToken: "", label: "UUR" },
      "bw_no_oyatsu":     { businessId: "", accessToken: "" }
    },
    fields: "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp",
    limit: 8
  }
};

/* 後方互換エイリアス（旧コードが ES_UUR_CONFIG を参照していても動くように） */
window.ES_UUR_CONFIG = window.ES_CONFIG;
