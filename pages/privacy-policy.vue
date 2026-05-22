<template>
  <CommonContentsInner>
    <div class="u-under-page-head-margin"></div>
    <CommonTextH1 color="lightgreen">
      <span style="display: inline-flex; align-items: flex-start; gap: 0.3em;">
        <span class="u-icon" :style="`mask-image: url('/images/common/moon.svg')`"></span>
        <span>プライバシー<br class="u-is-sp">ポリシー</span>
      </span>
    </CommonTextH1>
    <CommonSplitter />


    <CommonTextNormal>
      当サイトでは、以下のとおりプライバシーポリシーを定めます。
    </CommonTextNormal>


    <CommonTextH2>
      個人情報の利用目的
    </CommonTextH2>

    <CommonTextNormal>
      当サイトでは、お問い合わせの際に、名前、メールアドレス等の個人情報を入力いただく可能性があります。
      これらの個人情報は、以下の目的以外では利用しません。
      <ul>
        <li>お問い合わせに対する回答および必要な情報のご連絡</li>
        <li>サービス向上・サイト改善のための分析</li>
      </ul>
    </CommonTextNormal>

    <CommonTextH2>
      個人情報の第三者提供について
    </CommonTextH2>
    
    <CommonTextNormal>
      当サイトでは、取得した個人情報を、法令に基づく場合を除き、本人の同意なく第三者に提供することはありません。
    </CommonTextNormal>

    <CommonTextH2>
      アクセス解析ツールについて
    </CommonTextH2>

    <CommonTextNormal>
      当サイトでは、サイトの利用状況を把握するために Google Analytics を利用しています。
      Google Analyticsはトラフィックデータの収集のためにCookieを使用していますが、これらのデータは匿名で収集されており、個人を特定するものではありません。

      Cookieを無効にすることで、データの収集を拒否することが可能です。お使いのブラウザの設定をご確認ください。
      Google Analyticsの利用に関する詳細は、Googleのプライバシーポリシーをご確認ください。
    </CommonTextNormal>

    <CommonTextH2>
      Cookie（クッキー）について
    </CommonTextH2>
    
    <CommonTextNormal>
      当サイトでは、一部のコンテンツにおいてCookieを使用する場合があります。
      Cookieは、ユーザーのブラウザを識別するためのものであり、個人を特定する情報は含まれません。
    </CommonTextNormal>

    <CommonTextH2>
      お問い合わせフォームについて
    </CommonTextH2>
    
    <CommonTextNormal>
      当サイトのお問い合わせフォームでは、スパム・不正利用防止および円滑な対応のため、必要な範囲で個人情報を取得する場合があります。
      取得した情報は、お問い合わせ対応以外の目的では使用いたしません。
    </CommonTextNormal>


    <CommonTextH2>
      プライバシーポリシーの変更について
    </CommonTextH2>
    

    <CommonTextNormal>
      当サイトは、法令の変更や運営方針の見直し等により、本プライバシーポリシーを予告なく変更することがあります。
      変更後のプライバシーポリシーは、当サイトに掲載した時点で効力を生じるものとします。
    </CommonTextNormal>


    <CommonTextH2>
      お問い合わせ
    </CommonTextH2>

    <CommonTextNormal>
      当サイトの個人情報の取扱いに関するお問い合わせは、お問い合わせは<NuxtLink class="external-icon" href="mailto:aruka.music.pon@gmail.com" target="_blank">aruka.music.pon@gmail.com</NuxtLink>までご連絡ください。
    </CommonTextNormal>

    <div class="p-spacer"></div>

  </CommonContentsInner>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
h2 {
  margin-top: 80px;
}

p {
  margin-top: 20px;
  line-height: 2;
}

ul {
  margin-top: 20px;
  padding-left: 1.5rem;

  li {
    line-height: 1.5;
  }
}

.p-spacer {
  margin-top: 120px;
}
</style>
