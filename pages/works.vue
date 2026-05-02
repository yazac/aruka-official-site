<!-- pages/about.vue -->
<template>
  <div>
    <CommonContentsInner>
      <div class="u-under-page-head-margin"></div>
      <CommonTextH1 lang="en">
        WORKS
      </CommonTextH1>

      <CommonSplitter />

      <div class="p-works-filter-button-wrap">
        <button 
          v-for="item in displayCategories"
          :key="item.id"
          @click="setCategory(item.id)"
          :class="{ 'js-active': currentCategory === item.id }"
        >
          <div class="p-works-filter-button-inner">
            <CommonTextNormal lang="en">
              {{item.label}}
            </CommonTextNormal>
          </div>
        </button>
      </div>

      <Transition name="fade2">
        <div class="p-works-card-wrap" :key="currentCategory">
          <WorksCard
            v-for="item in filteredWorks"
            :key="item.id"
            :id="item.id"
            :image=item.image
            :title=item.title
          />
        </div>
      </Transition>
    </CommonContentsInner>
  </div>
</template>

<script setup lang="ts">
import worksData from '@/assets/json/works.json'

const categoriesData = worksData.categories
const worksDetailData = worksData.works

const displayCategories = [
  { "id": "all", "label": "All"},
  ...categoriesData
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
    margin-top: 20px;
    margin-bottom: 260px;
  }
  @include mixin.sp {
    gap: mixin.vw(20, var.$dsSp);
    grid-template-columns: repeat(2, 1fr);
    margin-top: mixin.vw(20, var.$dsSp);
    margin-bottom: mixin.vw(120, var.$dsSp);
  }
}

.p-works-filter-button-wrap {
  display: flex;
  align-items: center;

  @include mixin.pc {
    gap: 10px;
    margin-top: 80px;
  }

  @include mixin.sp {
    gap: mixin.vw(10, var.$dsSp);
    flex-wrap: wrap;
    margin-top: mixin.vw(40, var.$dsSp);
  }

  button {
    border-style: outset;
    background-color: var.$color-gray;

    &.js-active {
      border-style: inset;
    }
  }
}

.p-works-filter-button-inner {
  border: solid 1px black;
  @include mixin.pc {
    padding: 2px 20px;
  }
  @include mixin.sp {
    padding: mixin.vw(1, var.$dsSp) mixin.vw(15, var.$dsSp);
  }
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
