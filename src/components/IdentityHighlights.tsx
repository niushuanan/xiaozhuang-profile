"use client";

import { Icon, Text } from "@once-ui-system/core";
import React from "react";
import styles from "./IdentityHighlights.module.scss";

const items = [
  {
    icon: "rocket",
    text: "多段消费电子软硬件产品实习经历、一段闭环的创业经历：覆盖多款前沿AI硬件产品，大学期间自主创业创收10万+，体现用户思维与市场分析能力。",
  },
  {
    icon: "eye",
    text: "科技产品爱好者：喜欢购买、测评、体验各类消费电子产品、AI产品，多次参加OPPO、vivo、地平线智驾等公司的AI产品用户深度访谈活动（每次三小时起）。",
  },
  {
    icon: "xiaohongshu",
    text: '自媒体博主：运营个人小红书账号"向天再借五百亿"，追踪最新的AI产品趋势，主打AI产品&消费电子产品&新能源汽车测评等。收获粉丝500+，点赞13000+。',
  },
  {
    icon: "grid",
    text: "AI产品重度使用者，能高效运用国内外各类前沿AI产品提高工作效率，如Opencode、Gemini in chrome等。",
  },
];

export const IdentityHighlights: React.FC = () => {
  return (
    <div className={styles.container}>
      {items.map((item) => (
        <div key={item.icon} className={styles.item}>
          <div className={styles.iconSection}>
            <div className={styles.iconCircle}>
              <Icon name={item.icon} size="s" />
            </div>
          </div>
          <div className={styles.content}>
            <Text variant="body-default-m" onBackground="neutral-strong">
              {item.text}
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
};
