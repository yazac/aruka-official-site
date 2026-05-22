<template>
  <CommonContentsInner>
    <div class="u-under-page-head-margin"></div>
    <CommonTextH1>
      <span style="display: inline-flex; align-items: center; gap: 0.5em;">
        <span class="u-icon p-works-filter-button-icon" :style="`mask-image: url('/assets/images/common/mountain.svg')`"></span>
        <span>Privacy Policy</span>
      </span>
    </CommonTextH1>
    <CommonSplitter />

    <CommonTextNormalLarge>
      this site considers the proper handling of user personal information to be an important responsibility and hereby establishes the following privacy policy.
    </CommonTextNormalLarge>

    <CommonTextH2>
      Purpose of Use of Personal Information
    </CommonTextH2>

    <CommonTextNormalLarge>
      This site may request personal information such as name and email address when users contact me.
      Personal information provided will not be used for any purpose other than the following:
      <ul>
        <li>To respond to inquiries and provide necessary information</li>
        <li>To analyze and improve our services and Website</li>
      </ul>
    </CommonTextNormalLarge>

    <CommonTextH2>
      Disclosure of Personal Information to Third Parties
    </CommonTextH2>

    <CommonTextNormalLarge>
      I will not disclose personal information to third parties without the consent of the user, except as required by law.
    </CommonTextNormalLarge>

    <CommonTextH2>
      Security Measures
    </CommonTextH2>

    <CommonTextNormalLarge>
      I implement appropriate security measures to protect personal information from loss, damage, or unauthorized access.
    </CommonTextNormalLarge>

    <CommonTextH2>
      Changes to This Privacy Policy
    </CommonTextH2>

    <CommonTextNormalLarge>
      I may update this privacy policy without notice. Users are encouraged to review this policy regularly.
    </CommonTextNormalLarge>

    <CommonTextH2>
      Contact
    </CommonTextH2>

    <CommonTextNormalLarge>
      For inquiries regarding this privacy policy, please contact me at <NuxtLink class="external-icon" href="mailto:aruka.music.pon@gmail.com" target="_blank">aruka.music.pon@gmail.com</NuxtLink>
    </CommonTextNormalLarge>
    <div class="p-spacer"></div>
  </CommonContentsInner>
</template>

<script setup>
</script>

<style lang="scss" scoped>
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
