<script setup>
import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'

/* ---------------- 顶部导航 ---------------- */
const searchKeyword = ref('')

/* ---------------- 轮播 Banner ---------------- */
const banners = [
  {
    id: 1,
    title: '前端进阶训练营 2026',
    subtitle: '从工程化到性能优化，全面实战',
    gradient: 'linear-gradient(135deg, #1e3c72 0%, #6a3fd4 100%)'
  },
  {
    id: 2,
    title: 'AI Coding 实战季',
    subtitle: '掌握 LLM 辅助开发，提升 10 倍效率',
    gradient: 'linear-gradient(135deg, #2b3a9c 0%, #8e2de2 100%)'
  },
  {
    id: 3,
    title: '全栈进阶计划',
    subtitle: '前端 + Node + 云原生，一站式成长',
    gradient: 'linear-gradient(135deg, #2f80ed 0%, #7b2ff7 100%)'
  }
]

/* ---------------- 精选课程 ---------------- */
const activeTab = ref('全部')
const tabs = ['全部', '前端', 'AI Coding']

const courses = [
  {
    id: 1,
    title: 'Vue3 组件库设计与实现',
    category: '前端',
    teacher: '李伟',
    hours: 24,
    price: 299
  },
  {
    id: 2,
    title: 'React 18 并发渲染原理',
    category: '前端',
    teacher: '王芳',
    hours: 18,
    price: 199
  },
  {
    id: 3,
    title: 'AI 辅助编程实战营',
    category: 'AI Coding',
    teacher: '张磊',
    hours: 16,
    price: 399
  },
  {
    id: 4,
    title: 'TypeScript 类型体操进阶',
    category: '前端',
    teacher: '陈静',
    hours: 20,
    price: 249
  },
  {
    id: 5,
    title: 'Prompt 工程与 LLM 应用开发',
    category: 'AI Coding',
    teacher: '赵强',
    hours: 14,
    price: 349
  },
  {
    id: 6,
    title: 'Vite 构建工具深度剖析',
    category: '前端',
    teacher: '刘洋',
    hours: 12,
    price: 159
  }
]

const filteredCourses = computed(() =>
  activeTab.value === '全部'
    ? courses
    : courses.filter((item) => item.category === activeTab.value)
)

/* ---------------- 学习记录 ---------------- */
const records = [
  {
    id: 1,
    course: 'Vue3 组件库设计与实现',
    chapter: '第 8 章：表单组件封装',
    progress: 65
  },
  {
    id: 2,
    course: 'React 18 并发渲染原理',
    chapter: '第 5 章：Suspense 与并发模式',
    progress: 42
  },
  {
    id: 3,
    course: 'AI 辅助编程实战营',
    chapter: '第 11 章：AI 代码评审',
    progress: 100
  },
  {
    id: 4,
    course: 'TypeScript 类型体操进阶',
    chapter: '第 2 章：条件类型',
    progress: 18
  }
]

const progressStatus = (value) => (value >= 100 ? 'success' : '')
const statusType = (value) => (value >= 100 ? 'success' : 'primary')
const statusText = (value) => (value >= 100 ? '已完成' : '学习中')

const continueStudy = (row) => {
  ElMessage.info(`继续学习《${row.course}》`)
}

/* ---------------- 帮助中心 ---------------- */
const activeHelp = ref(['1'])
const faqs = [
  {
    id: '1',
    question: '如何申请课程退款？',
    answer:
      '购买课程 7 天内且学习进度不超过 30%，可在「我的订单」页面申请全额退款，款项将在 3 个工作日内原路退回。'
  },
  {
    id: '2',
    question: '课程证书如何获取？',
    answer:
      '完成课程全部章节学习并通过期末测验（≥60 分），系统将自动生成电子证书，可在「个人中心-我的证书」下载。'
  },
  {
    id: '3',
    question: '课程有效期是多久？',
    answer:
      '购买后永久有效，可随时回看复习。配套的直播答疑服务自购买之日起 12 个月内有效。'
  }
]
</script>

<template>
  <div class="learning-page">
    <!-- ① 顶部导航栏 -->
    <header class="site-header">
      <div class="container header-inner">
        <div class="brand">
          <el-icon class="brand-icon"><Reading /></el-icon>
          <span class="brand-text">智学云课堂</span>
        </div>

        <div class="header-right">
          <el-input
            v-model="searchKeyword"
            class="header-search"
            placeholder="搜索课程、讲师、分类…"
            clearable
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>

          <el-badge :is-dot="true" :offset="[-2, 4]" class="notify-badge">
            <el-icon class="notify-icon"><Bell /></el-icon>
          </el-badge>
        </div>
      </div>
    </header>

    <main class="page-main">
      <!-- ② 轮播 Banner -->
      <section class="container banner-section">
        <el-carousel height="400px" :interval="4500" arrow="hover" class="banner">
          <el-carousel-item v-for="item in banners" :key="item.id">
            <div class="banner-slide" :style="{ background: item.gradient }">
              <div class="banner-content">
                <h2 class="banner-title">{{ item.title }}</h2>
                <p class="banner-subtitle">{{ item.subtitle }}</p>
                <el-button type="primary" round size="large" class="banner-btn">
                  立即查看
                </el-button>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </section>

      <!-- ③ 精选课程 -->
      <section class="container section">
        <div class="section-head">
          <div class="section-title-wrap">
            <h2 class="section-title">精选课程</h2>
            <p class="section-subtitle">跟随行业一线工程师学习</p>
          </div>
          <el-link type="primary" class="section-more">全部</el-link>
        </div>

        <el-tabs v-model="activeTab" class="course-tabs">
          <el-tab-pane v-for="tab in tabs" :key="tab" :label="tab" :name="tab" />
        </el-tabs>

        <div class="course-grid">
          <el-card
            v-for="course in filteredCourses"
            :key="course.id"
            shadow="hover"
            class="course-card"
            :body-style="{ padding: '20px' }"
          >
            <div class="course-card-top">
              <h3 class="course-title">{{ course.title }}</h3>
              <el-tag size="small" effect="light" class="course-tag">
                {{ course.category }}
              </el-tag>
            </div>
            <p class="course-meta">讲师：{{ course.teacher }} · {{ course.hours }}课时</p>
            <div class="course-bottom">
              <span class="course-price">¥{{ course.price }}</span>
              <el-button type="primary" size="small" round>立即学习</el-button>
            </div>
          </el-card>
        </div>
      </section>

      <!-- ④ 我的学习记录 -->
      <section class="container section">
        <div class="section-head">
          <div class="section-title-wrap">
            <h2 class="section-title">我的学习记录</h2>
            <p class="section-subtitle">坚持学习，持续进步</p>
          </div>
        </div>

        <el-table :data="records" stripe border class="record-table" style="width: 100%">
          <el-table-column prop="id" label="序号" width="80" align="center" />
          <el-table-column prop="course" label="课程名称" min-width="220" />
          <el-table-column prop="chapter" label="当前章节" min-width="260" />
          <el-table-column label="学习进度" width="260">
            <template #default="{ row }">
              <el-progress
                :percentage="row.progress"
                :status="progressStatus(row.progress)"
                :stroke-width="8"
              />
            </template>
          </el-table-column>
          <el-table-column label="状态" width="110" align="center">
            <template #default="{ row }">
              <el-tag :type="statusType(row.progress)" effect="light">
                {{ statusText(row.progress) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="130" align="center">
            <template #default="{ row }">
              <el-button link type="primary" @click="continueStudy(row)">继续学习</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>

      <!-- ⑤ 帮助中心 -->
      <section class="container section">
        <div class="section-head">
          <div class="section-title-wrap">
            <h2 class="section-title">帮助中心</h2>
            <p class="section-subtitle">常见问题解答</p>
          </div>
        </div>

        <el-collapse v-model="activeHelp" class="help-collapse">
          <el-collapse-item
            v-for="faq in faqs"
            :key="faq.id"
            :title="faq.question"
            :name="faq.id"
          >
            <p class="help-answer">{{ faq.answer }}</p>
          </el-collapse-item>
        </el-collapse>
      </section>
    </main>

    <!-- ⑥ 页脚 -->
    <footer class="site-footer">
      <div class="container footer-inner">
        <span>© 2026 智学云课堂 · 仅用于教学示范</span>
        <el-button link type="primary" class="footer-feedback">意见反馈</el-button>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.learning-page {
  padding-top: 64px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ① 顶部导航 */
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 64px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.header-inner {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.brand-icon {
  font-size: 26px;
  color: var(--brand-color);
}

.brand-text {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--text-main);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.header-search {
  width: 260px;
}

.header-search :deep(.el-input__wrapper) {
  border-radius: 18px;
  background-color: #f5f7fa;
  box-shadow: none;
  padding-left: 12px;
}

.header-search :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px var(--brand-color) inset;
  background-color: #ffffff;
}

.notify-badge {
  display: flex;
  align-items: center;
  cursor: pointer;
  line-height: 1;
}

.notify-icon {
  font-size: 22px;
  color: var(--text-regular);
  transition: color 0.2s;
}

.notify-icon:hover {
  color: var(--brand-color);
}

/* ② Banner */
.page-main {
  flex: 1;
  width: 100%;
}

.banner-section {
  margin-top: 24px;
}

.banner {
  border-radius: 8px;
  overflow: hidden;
}

.banner-slide {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.banner-content {
  padding-left: 72px;
  color: #ffffff;
  text-align: left;
}

.banner-title {
  margin: 0 0 12px;
  font-size: 40px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 1px;
}

.banner-subtitle {
  margin: 0 0 28px;
  font-size: 16px;
  opacity: 0.88;
}

.banner-btn {
  padding: 12px 32px;
  font-size: 15px;
  font-weight: 600;
  border: none;
}

/* 通用区块 */
.section {
  margin-top: 32px;
}

.section:last-of-type {
  margin-bottom: 40px;
}

.section-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.section-title-wrap {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.section-title {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  color: var(--text-main);
  position: relative;
  padding-left: 12px;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 6px;
  bottom: 6px;
  width: 4px;
  border-radius: 2px;
  background-color: var(--brand-color);
}

.section-subtitle {
  margin: 0;
  font-size: 14px;
  color: var(--text-secondary);
}

.section-more {
  font-size: 14px;
  margin-top: 6px;
}

/* ③ 精选课程 */
.course-tabs {
  margin-top: 4px;
}

.course-tabs :deep(.el-tabs__header) {
  margin-bottom: 20px;
}

.course-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.course-card {
  border-radius: 8px;
  border: 1px solid #ebeef5;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.course-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(64, 158, 255, 0.16);
}

.course-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.course-title {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.45;
  color: var(--text-main);
  flex: 1;
}

.course-tag {
  flex-shrink: 0;
  border-radius: 4px;
}

.course-meta {
  margin: 10px 0 20px;
  font-size: 13px;
  color: var(--text-secondary);
}

.course-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.course-price {
  font-size: 20px;
  font-weight: 700;
  color: var(--price-color);
}

/* ④ 学习记录 */
.record-table {
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
}

.record-table :deep(.el-table__header th) {
  background-color: #f5f7fa;
  color: var(--text-regular);
  font-weight: 600;
}

.record-table :deep(.el-progress) {
  padding-right: 8px;
}

/* ⑤ 帮助中心 */
.help-collapse {
  margin-top: 20px;
  background-color: #ffffff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  padding: 0 20px;
  border-bottom-color: #ebeef5;
}

.help-collapse :deep(.el-collapse-item__header) {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-main);
  height: 54px;
  line-height: 54px;
}

.help-collapse :deep(.el-collapse-item__content) {
  padding-bottom: 18px;
}

.help-answer {
  margin: 0;
  font-size: 14px;
  line-height: 1.8;
  color: var(--text-regular);
}

/* ⑥ 页脚 */
.site-footer {
  background-color: #f0f2f5;
  border-top: 1px solid #e4e7ed;
  padding: 20px 0;
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  font-size: 13px;
  color: var(--text-secondary);
}

.footer-feedback {
  font-size: 13px;
}

@media (max-width: 992px) {
  .course-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .header-search {
    width: 160px;
  }

  .brand-text {
    font-size: 17px;
  }

  .course-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .banner-content {
    padding-left: 32px;
    padding-right: 24px;
  }

  .banner-title {
    font-size: 26px;
  }

  .section-title-wrap {
    flex-direction: column;
    gap: 4px;
  }
}
</style>
