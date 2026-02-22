# AGENTS.md

本文件为 AI 代理提供项目开发指南。

## 项目概述

- **框架**: Next.js 16 (App Router) + React 19
- **UI 库**: @once-ui-system/core
- **样式**: SCSS + CSS Modules
- **语言**: TypeScript (strict 模式)
- **代码规范**: Biome + ESLint

---

## 构建与测试命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 生产环境构建 |
| `npm run start` | 运行生产构建 |
| `npm run lint` | ESLint 代码检查 |
| `npm run biome-write` | Biome 代码格式化 |

### 运行单个测试

本项目未配置测试框架。如需添加测试，建议使用 Vitest 或 Jest。

---

## 代码风格规范

### 格式化配置 (biome.json)

- 缩进: 2 空格
- 行宽: 100 字符
- 引号: 双引号 (JavaScript)
- 启用 recommended linter 规则

### 执行格式化

```bash
npm run biome-write
```

### 执行 Lint

```bash
npm run lint
```

---

## 命名规范

- **组件文件**: PascalCase (如 `ThemeToggle.tsx`)
- **组件名**: PascalCase (如 `ThemeToggle`)
- **变量/函数**: camelCase
- **常量**: PascalCase (组件) 或 UPPER_SNAKE_CASE (配置)
- **目录**: kebab-case (如 `src/components/blog/`)

---

## TypeScript 规范

- 启用 `strict: true`
- 使用 `interface` 定义 props 类型
- 避免使用 `any`
- 使用 `@/` 路径别名 (对应 `src/` 目录)

### 导入路径示例

```typescript
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Row, Button, Flex } from "@once-ui-system/core";
import { routes } from "@/resources";
import type { Post } from "@/types/content.types";
import MyComponent from "@/components/MyComponent";
```

---

## React 组件规范

### 客户端组件

需要客户端交互的组件必须在文件顶部添加 `"use client"` 指令：

```typescript
"use client";

import React, { useState } from "react";
```

### 函数组件定义

使用 `React.FC` 泛型定义函数组件：

```typescript
interface MyComponentProps {
  title: string;
  children?: React.ReactNode;
}

const MyComponent: React.FC<MyComponentProps> = ({ title, children }) => {
  return <div>{title}</div>;
};

export { MyComponent };
```

### Props 类型

- 使用 `interface` 定义组件 props
- 可选属性使用 `?`
- `children` 使用 `React.ReactNode` 类型

---

## 错误处理

- API 调用使用 try-catch 包装
- 组件内设置 error state 用于 UI 反馈
- 使用 TypeScript 确保类型安全
- Next.js 页面使用 `not-found()` 处理 404

---

## 目录结构

```
src/
├── app/              # Next.js App Router 页面
│   ├── api/          # API 路由
│   ├── blog/         # 博客页面
│   ├── work/         # 作品页面
│   └── gallery/      # 画廊页面
├── components/       # React 组件
│   ├── blog/
│   ├── work/
│   └── gallery/
├── resources/        # 配置 (content.tsx, once-ui.config.ts)
├── types/            # TypeScript 类型定义
└── utils/            # 工具函数
```

---

## 常用模式

### 条件渲染

```typescript
if (loading) {
  return <Spinner />;
}

if (!isEnabled) {
  return <NotFound />;
}

return <>{children}</>;
```

### 状态管理

```typescript
const [state, setState] = useState<boolean>(false);
const [error, setError] = useState<string | undefined>(undefined);
```

### Fetch 请求

```typescript
const response = await fetch("/api/endpoint", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ data }),
});

if (response.ok) {
  const result = await response.json();
  // 处理结果
} else {
  setError("Error message");
}
```

---

## 内容配置

网站内容在 `src/resources/content.tsx` 中配置，包括：

- `person`: 个人基本信息
- `home`: 首页配置
- `blog`: 博客设置
- `work`: 作品集设置
- `social`: 社交链接
- `newsletter`: 邮件订阅配置

---

## 环境变量

参考 `.env.example` 创建 `.env.local` 文件。

---

## 注意事项

1. 修改配置前先阅读相关文件
2. 遵循现有代码风格
3. 使用 TypeScript 确保类型安全
4. 客户端组件使用 `"use client"` 指令
5. 提交前运行 `npm run lint` 和 `npm run biome-write`
