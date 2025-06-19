# HCEF-LLM: Human-Centric Evaluation Framework for Large Language Models

[English](#english) | [中文](#中文)

---

## English

### 🎯 Overview

HCEF-LLM (Human-Centric Evaluation Framework for Large Language Models) is a comprehensive evaluation framework designed to assess Large Language Models as "Ideal Intelligent Partners" from a human-centric perspective. This repository contains an interactive web-based leaderboard and visualization platform for comparing model performance across multiple dimensions.

### 🌟 Features

- **📊 Interactive Leaderboard**: Real-time ranking of LLMs based on comprehensive evaluation metrics
- **📈 Advanced Visualizations**: Multiple chart types including radar charts, heatmaps, and scatter plots
- **🌐 Bilingual Support**: Full English and Chinese language support
- **📱 Responsive Design**: Optimized for desktop and mobile devices
- **🎨 Modern UI**: Clean, professional interface with smooth animations
- **🔍 Filtering & Sorting**: Advanced filtering options by proficiency level and performance metrics

### 🏗️ Framework Structure

#### Core Capability Dimensions (CD)

1. **CD1: Input Processing & Comprehension** - Ability to understand and process various input formats
2. **CD2: Knowledge Retention & Application** - Capacity to retain and apply learned knowledge
3. **CD3: Logical Reasoning & Problem Solving** - Skills in logical analysis and problem resolution
4. **CD4: Imaginative & Creative Cognition** - Creative thinking and innovative problem approaches
5. **CD5: Human-Centricity & Ethical Alignment** - Alignment with human values and ethical considerations
6. **CD6: Output Generation & Delivery** - Quality and effectiveness of generated responses

#### Proficiency Descriptors (PD)

- **PD1: Emergent** - Basic functionality with significant limitations
- **PD2: Developing** - Improving capabilities with some constraints
- **PD3: Proficient** - Solid performance meeting most requirements
- **PD4: Expert** - Exceptional performance exceeding expectations

### 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/hcef-llm.git
   cd hcef-llm
   ```

2. **Open the website**
   - Simply open `index.html` in your web browser
   - Or serve it using a local web server:
   ```bash
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

3. **Explore the features**
   - Browse the leaderboard on the main page
   - Visit the visualization page for detailed analysis
   - Toggle between English and Chinese languages
   - Filter and sort models by various criteria

### 📁 Project Structure

```
hcef-llm/
├── index.html              # Main leaderboard page
├── visualization.html      # Detailed visualization page
├── styles.css             # Main stylesheet
├── script.js              # Core JavaScript functionality
├── visualization.js       # Visualization-specific scripts
├── README.md              # This file
└── paper.txt              # Original LaTeX research paper
```

### 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Charts**: Chart.js for interactive visualizations
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)
- **Responsive**: CSS Grid and Flexbox

### 📊 Model Data

The leaderboard includes evaluation results for various state-of-the-art language models:

- GPT-4 Turbo
- Claude 3.5 Sonnet
- Gemini 1.5 Pro
- GPT-4o
- Claude 3 Opus
- Llama 3.1 405B
- And more...

Each model is evaluated across all six capability dimensions and assigned an overall proficiency level.

### 🤝 Contributing

We welcome contributions to improve the HCEF-LLM framework and website. Please feel free to:

- Submit bug reports and feature requests
- Contribute code improvements
- Add new model evaluations
- Improve documentation

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### 👥 Authors

- **Pingfan Wang** - Research Lead
- **Linyuan Deng** - Technical Implementation (dolly_dev@163.com)

### 📚 Citation

If you use this framework in your research, please cite:

```bibtex
@article{wang2024hcef,
  title={HCEF-LLM: Human-Centric Evaluation Framework for Large Language Models as Ideal Intelligent Partners},
  author={Wang, Pingfan and Deng, Linyuan},
  year={2024}
}
```

---

## 中文

### 🎯 项目概述

HCEF-LLM（大语言模型人本评估框架）是一个综合性评估框架，旨在从以人为中心的角度评估大语言模型作为"理想智能伙伴"的能力。本仓库包含一个交互式的基于网页的排行榜和可视化平台，用于比较模型在多个维度上的性能。

### 🌟 功能特色

- **📊 交互式排行榜**：基于综合评估指标的LLM实时排名
- **📈 高级可视化**：包括雷达图、热力图和散点图在内的多种图表类型
- **🌐 双语支持**：完整的中英文语言支持
- **📱 响应式设计**：针对桌面和移动设备优化
- **🎨 现代化界面**：简洁专业的界面设计，配有流畅动画
- **🔍 筛选与排序**：按熟练度等级和性能指标进行高级筛选

### 🏗️ 框架结构

#### 核心能力维度 (CD)

1. **CD1: 输入处理与理解** - 理解和处理各种输入格式的能力
2. **CD2: 知识保持与应用** - 保持和应用所学知识的能力
3. **CD3: 逻辑推理与问题解决** - 逻辑分析和问题解决技能
4. **CD4: 想象与创造性认知** - 创造性思维和创新问题解决方法
5. **CD5: 以人为中心与伦理对齐** - 与人类价值观和伦理考量的对齐
6. **CD6: 输出生成与交付** - 生成响应的质量和有效性

#### 熟练度描述符 (PD)

- **PD1: 新兴** - 基本功能，存在显著限制
- **PD2: 发展中** - 能力提升，存在一些约束
- **PD3: 熟练** - 稳定性能，满足大多数要求
- **PD4: 专家** - 卓越性能，超越预期

### 🚀 快速开始

1. **克隆仓库**
   ```bash
   git clone https://github.com/your-username/hcef-llm.git
   cd hcef-llm
   ```

2. **打开网站**
   - 直接在网页浏览器中打开 `index.html`
   - 或使用本地网页服务器：
   ```bash
   python -m http.server 8000
   # 然后访问 http://localhost:8000
   ```

3. **探索功能**
   - 在主页浏览排行榜
   - 访问可视化页面进行详细分析
   - 在中英文之间切换语言
   - 按各种标准筛选和排序模型

### 📁 项目结构

```
hcef-llm/
├── index.html              # 主排行榜页面
├── visualization.html      # 详细可视化页面
├── styles.css             # 主样式表
├── script.js              # 核心JavaScript功能
├── visualization.js       # 可视化专用脚本
├── README.md              # 本文件
└── paper.txt              # 原始LaTeX研究论文
```

### 🛠️ 使用技术

- **前端**: HTML5, CSS3, JavaScript (ES6+)
- **图表**: Chart.js 用于交互式可视化
- **图标**: Font Awesome
- **字体**: Google Fonts (Inter)
- **响应式**: CSS Grid 和 Flexbox

### 📊 模型数据

排行榜包含各种最先进语言模型的评估结果：

- GPT-4 Turbo
- Claude 3.5 Sonnet
- Gemini 1.5 Pro
- GPT-4o
- Claude 3 Opus
- Llama 3.1 405B
- 等等...

每个模型都在所有六个能力维度上进行评估，并被分配一个整体熟练度等级。

### 🤝 贡献

我们欢迎为改进HCEF-LLM框架和网站做出贡献。请随时：

- 提交错误报告和功能请求
- 贡献代码改进
- 添加新的模型评估
- 改进文档

### 📄 许可证

本项目采用MIT许可证 - 详见 [LICENSE](LICENSE) 文件。

### 👥 作者

- **王平凡** - 研究负责人
- **邓林远** - 技术实现 (dolly_dev@163.com)

### 📚 引用

如果您在研究中使用此框架，请引用：

```bibtex
@article{wang2024hcef,
  title={HCEF-LLM: Human-Centric Evaluation Framework for Large Language Models as Ideal Intelligent Partners},
  author={Wang, Pingfan and Deng, Linyuan},
  year={2024}
}
```

---

### 🔗 Links

- [Live Demo](https://your-username.github.io/hcef-llm/)
- [Research Paper](paper.txt)
- [Visualization Page](visualization.html)

### 📞 Contact

For questions or collaboration opportunities, please contact:
- Pingfan Wang: pingfan.wang@example.com
- Linyuan Deng: dolly_dev@163.com

---

*Last updated: December 2024*