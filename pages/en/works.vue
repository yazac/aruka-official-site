<template>
  <div>
    <CommonContentsInner>
      <div class="u-under-page-head-margin"></div>
      <CommonTextH1Large lang="en">
        WORKS
      </CommonTextH1Large>

      <CommonSplitter />

      <div class="p-works-filter-button-wrap">
        <button 
          v-for="item, i in displayCategories"
          :key="item.id"
          @click="setCategory(item.id)"
          :class="{ 'js-active': currentCategory === item.id }"
          type="button"
          aria-label="Filter works"
        >
          <span class="p-works-filter-button-inner u-font-en">
            <span class="u-icon p-works-filter-button-icon" :style="`mask-image: url('/assets/images/common/${icons[i]}.svg')`"></span>
            <span>{{item.label}}</span>
          </span>
        </button>
      </div>

      <Transition name="fade2">
        <div class="p-works-card-wrap" :key="currentCategory">
          <WorksCard
            v-for="item in filteredWorks"
            :key="item.id"
            :id="item.id"
            :image="item.image === null? 'https://placehold.jp/800x800.png': `/assets/images/works${item.image}`"
            :title=item.title.en
            :desc=item.description.en
          />
        </div>
      </Transition>
    </CommonContentsInner>
  </div>
</template>

<script setup lang="ts">
import meta from '@/assets/json/meta.json'
const { path } = useRoute()
useHead({
  title: meta.pages.works.title,
  meta: [
    { name: 'description', content: meta.pages.works.description.en },
    { property: 'og:title', content: meta.pages.works.title },
    { property: 'og:description', content: meta.pages.works.description.en },
    { property: 'og:url', content: `${meta.domain}${path}` },
    { name: 'twitter:title', content: meta.pages.works.title },
    { name: 'twitter:description', content: meta.pages.works.description.en },
  ]
})


import worksData from '@/assets/json/works.json'

const categoriesData = worksData.categories
const worksDetailData = worksData.works

const displayCategories = [
  { "id": "all", "label": "All"},
  ...categoriesData
]

const icons = [
  "flower01",
  "mountain",
  "firework",
  "leaf"
]

const currentCategory = ref<string>("all")

function setCategory(categoryId: string) {
  currentCategory.value = categoryId
}

const filteredWorks = computed(() => {
  if (currentCategory.value === "all") {
    return worksDetailData
  }

  return worksDetailData.filter(item =>
    item.categories.includes(currentCategory.value)
  )
})

</script>

<style lang="scss" scoped>
@use '@/assets/css/_var.scss';
@use '@/assets/css/_mixin.scss';

.p-works-card-wrap {
  display: grid;
  @include mixin.pc {
    gap: 20px;
    grid-template-columns: repeat(3, 1fr);
    margin-top: 60px;
    margin-bottom: 260px;
  }
  @include mixin.sp {
    gap: mixin.vw(20, var.$dsSp);
    grid-template-columns: repeat(2, 1fr);
    margin-top: mixin.vw(30, var.$dsSp);
    margin-bottom: mixin.vw(120, var.$dsSp);
  }
}

.p-works-filter-button-wrap {
  display: flex;
  align-items: center;
  background: #ffffff;
  box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.2);

  @include mixin.pc {
    padding: 20px;
    border-radius: 0 0 10px 10px;
  }

  @include mixin.sp {
    padding: mixin.vw(20, var.$dsSp) mixin.vw(10, var.$dsSp);
    gap: mixin.vw(10, var.$dsSp);
    border-radius: 0 0 mixin.vw(10, var.$dsSp) mixin.vw(10, var.$dsSp);
    flex-wrap: wrap;
  }

  button {
    background: linear-gradient(0deg, rgba(230, 230, 218, 1) 0%, rgba(255, 255, 255, 1) 100%);

    @include mixin.pc {
      border-top: 1px solid var.$color-gray;
      border-bottom: 1px solid var.$color-gray;
      &:first-child {
        border-left: 1px solid var.$color-gray;
        border-right: 1px solid var.$color-gray;
        border-radius: 10px 0 0 10px;
      }
      &:last-child {
        border-right: 1px solid var.$color-gray;
        border-radius: 0 10px 10px 0;
      }
      + button {
        border-right: 1px solid var.$color-gray;
      }
    }

    @include mixin.sp {
      border: 1px solid var.$color-gray;
      border-radius: mixin.vw(10, var.$dsSp);
    }

    &.js-active {
      background: linear-gradient(180deg, rgba(230, 230, 218, 1) 0%, rgba(255, 255, 255, 1) 100%);
    }
  }
}

.p-works-filter-button-inner {
  display: block;
  color: var.$color-light-green;
  @include mixin.pc {
    padding: 2px 10px;
  }
  @include mixin.sp {
    padding: mixin.vw(1, var.$dsSp) mixin.vw(15, var.$dsSp);
  }

  display: inline-flex;
  align-items: center;
  gap: 1em;
}

.fade2-enter-active,
.fade2-leave-active {
  transition: all 0.4s ease-out;
}

.fade2-enter-from {
  opacity: 1;
  
}
.fade2-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
