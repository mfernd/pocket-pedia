<script setup>
import { changeLanguage, getCurrentLang, tr } from '@/services/translator';
import { onMounted } from 'vue';

onMounted(() => {
  const activeLang = document.querySelector(
    `.lang-choices span[data-lang=${getCurrentLang()}]`
  );
  activeLang.classList.add('active');
});

const handlerLang = (lang) => {
  changeLanguage(lang);
  location.reload();
};
</script>

<template>
  <div class="lang-wrapper" :title="tr.messages.lang">
    <img src="/images/translation.svg" alt="logo traduction" />
    <div class="lang-choices" role="listbox">
      <span @click="handlerLang('fr')" data-lang="fr">🇫🇷️ Français</span>
      <span @click="handlerLang('en')" data-lang="en">🇬🇧️ English</span>
      <span @click="handlerLang('jp')" data-lang="jp">🇯🇵 日本語</span>
    </div>
  </div>
</template>

<style>
.lang-wrapper {
  position: relative;
  width: 35px;
  height: 35px;
  padding: 10px;
  cursor: pointer;
}

.lang-wrapper > img {
  width: 100%;
  height: 100%;
}

.lang-wrapper:hover .lang-choices {
  display: flex;
}

.lang-choices {
  position: absolute;
  top: 100%;
  left: 0;
  display: none;
  flex-direction: column;
  border-radius: 15px;
  background-color: #fff;
  width: max-content;
  font-size: 1.2rem;
  border: 2px solid #e0e0e0;
  box-shadow: #ededed 0 10px 10px;
}

@media only screen and (max-width: 1280px) {
  .lang-choices {
    left: unset;
    right: 0;
  }
}

.lang-choices span {
  cursor: pointer;
  padding: 1rem 2rem;
  margin: 0 8px 8px;
  border-radius: 15px;
  text-align: left;
}

.lang-choices span:first-child {
  margin-top: 8px;
}

.lang-choices span:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.lang-choices span.active {
  background-color: rgba(229, 9, 20, 0.08);
}

.lang-choices span.active:hover {
  background-color: rgba(229, 9, 20, 0.11);
}
</style>
