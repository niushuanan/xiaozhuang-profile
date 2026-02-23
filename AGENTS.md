# AGENTS.md - 开发规范指南

本文件定义了在此代码库中进行 AI 辅助开发时的规范和要求。

---

## 1. 命令

### 开发命令
```bash
npm run dev          # 启动开发服务器 (localhost:3000)
npm run build        # 生产构建
npm run start        # 启动生产服务器
npm run lint         # ESLint 检查
npm run biome-write  # Biome 格式化（自动修复）
```

### 代码检查
```bash
npx biome check src/              # 检查 src 目录
npx biome check --write src/      # 检查并修复
npx biome format src/             # 仅格式化
```

### 测试命令
```bash
# 本项目暂无单元测试，主要通过构建验证功能
npm run build                    # 构建验证所有页面
```

---

## 2. 代码风格规范

### 2.1 格式化
- **缩进**: 2 空格
- **行宽**: 100 字符
- **引号**: 双引号 `"`
- **分号**: 需要

### 2.2 命名规范
- **组件文件**: PascalCase (如 `Post.tsx`, `TableOfContents.tsx`)
- **工具文件**: camelCase (如 `formatDate.ts`, `utils.ts`)
- **CSS 模块**: camelCase (如 `about.module.scss`)
- **函数**: 动词开头 (如 `getPosts`, `formatDate`)

### 2.3 组件规范
- 使用函数组件 + TypeScript
- Props 接口定义在组件文件顶部
- 客户端组件添加 `"use client"` 指令

### 2.4 导入顺序
```typescript
// 1. React/Next 相关
import React from "react";
import { notFound } from "next/navigation";

// 2. 外部库
import { Avatar, Card } from "@once-ui-system/core";
import classNames from "classnames";

// 3. 内部模块（@/）
import { EditableAvatar } from "@/components/EditableAvatar";
import { getPosts } from "@/utils/utils";
import { blog, person } from "@/resources";

// 4. 类型
import type { Metadata } from "next";
```

### 2.5 TypeScript
- 避免使用 `any`，使用具体类型
- 接口命名: PascalCase（如 `PostProps`）
- 类型导出使用 `type` 关键字

### 2.6 错误处理
- 使用 Next.js `notFound()` 处理 404
- API 路由返回适当的 HTTP 状态码
- 前端组件处理 loading/error 状态

### 2.7 CSS/SCSS
- 使用 SCSS 模块 (`*.module.scss`)
- 类名使用 camelCase
- 避免全局 CSS，优先使用组件级样式

---

## 3. 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 首页
│   ├── layout.tsx         # 根布局
│   ├── blog/              # 博客页面
│   ├── about/             # About 页面
│   └── api/               # API 路由
├── components/            # React 组件
│   ├── blog/              # 博客相关组件
│   ├── about/             # About 相关组件
│   └── *.tsx              # 共享组件
├── resources/             # 配置和数据
│   ├── content.tsx        # 网站内容配置
│   └── once-ui.config.ts  # UI 配置
├── utils/                 # 工具函数
└── types/                 # TypeScript 类型
```

---

## 4. 常用模式

### 4.1 页面组件
```typescript
export async function generateStaticParams() {
  // 获取静态参数
}

export default async function PageName({ params }: Props) {
  const data = await fetchData();
  return <Component data={data} />;
}
```

### 4.2 客户端交互
```typescript
"use client";

import { useState } from "react";

export function InteractiveComponent() {
  const [state, setState] = useState(false);
  return <button onClick={() => setState(!state)}>Toggle</button>;
}
```

### 4.3 使用 Once UI 组件
```typescript
import { Column, Row, Text, Card } from "@once-ui-system/core";

<Column gap="16" fillWidth>
  <Text variant="heading-strong-l">标题</Text>
  <Card>内容</Card>
</Column>
```

---

## 5. 提交前检查清单

- [ ] 运行 `npm run build` 确保构建通过
- [ ] 运行 `npx biome check --write .` 格式化代码
- [ ] 检查无 TypeScript 错误
- [ ] 确认所有页面可正常访问

---

## 6. 注意事项

- 本项目使用 Once UI 组件库
- 支持 MDX 博客文章
- 静态站点生成 (SSG) 为主
- 图片存放在 `public/` 目录
