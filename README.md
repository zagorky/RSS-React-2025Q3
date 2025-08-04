# RSS-React-2025Q3

A modern React application built with Vite, TypeScript, and Tailwind CSS, following best practices for code quality and testing.

## Deploy - [Click](https://zagorky-react2025q3.netlify.app)

## 📦 Features

- ⚡ **Vite** for fast development and builds
- 🏗️ **React 19** with TypeScript support
- 🎨 **Tailwind CSS** for utility-first styling
- ✅ **Vitest** for unit testing with coverage
- 🧹 **ESLint** + **Prettier** + **Stylelint** for code quality
- � **Husky** for Git hooks
- 📚 **Jikan API** integration for anime data

## 🚀 Getting Started

### Prerequisites

- Node.js (v22+ recommended)
- npm (v9+ recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/zagorky/RSS-React-2025Q3.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## 🛠️ Scripts

| Command            | Description                                  |
|--------------------|----------------------------------------------|
| `npm run dev`      | Start development server                     |
| `npm run build`    | Build for production                         |
| `npm run preview`  | Preview production build locally             |
| `npm run lint`     | Run ESLint                                   |
| `npm run stylelint`| Run Stylelint                                |
| `npm run format`   | Run Prettier                                 |
| `npm run type-check` | Check TypeScript types                     |
| `npm test:coverage` | Run tests with coverage report             |
| `npm run lint:fix` | Fix ESLint issues                            |
| `npm run stylelint:fix` | Fix Stylelint issues                  |
| `npm run format:fix` | Fix formatting issues                     |

## 🌐 API Integration

This project uses the [Jikan API](https://docs.api.jikan.moe) for anime data. See the [API documentation](https://docs.api.jikan.moe/#tag/anime/operation/getAnimeSearch) for available endpoints.

## 🧪 Testing

Tests are written using Vitest and Testing Library. To run tests:

```bash
npm test:coverage
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

Made with ❤️ for RSS React 2025Q3 course