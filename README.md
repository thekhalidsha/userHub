# 🚀 UserHub - User Management Dashboard

<div align="center">

![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)

**A modern, production-ready user management dashboard built with React 19**

[Live Demo](https://userhub.mohammedkhalid.in)

</div>

---

## 🎯 Overview

UserHub is a simple user dashboard showcasing modern React development practices. It features a clean, intuitive interface for managing each users posts with full CRUD operations, advanced search, and a beautiful dark/light theme system.

### Key Highlights

- ✅ **Production-Ready**: Optimized with code splitting, lazy loading, and memoization
- ✅ **Fully Responsive**: Seamless experience across mobile, tablet, and desktop
- ✅ **Docker Containerized**: Multi-stage build with Nginx, ready for deployment
- ✅ **State Management**: Context API with useReducer for complex state
- ✅ **Performance Optimized**: React.memo, useMemo, useCallback strategically applied
- ✅ **Modern UI/UX**: Tailwind CSS v4 with dark mode support
- ✅ **Keyboard Shortcuts**: Power-user features (Ctrl+K, Ctrl+B, Ctrl+T)

---

## ✨ Features

### User Management
- 📋 Browse all users in a responsive card grid
- 🔍 Real-time search by name, email, or company
- 📄 Load more pagination (9 initial, +4 increments)
- 👤 Detailed user profiles with complete contact information
- 🎨 Avatar with auto-generated initials

### Post Management (CRUD)
- ➕ **Create**: Add new posts with validated forms
- 📖 **Read**: View all posts with numbered pagination
- ✏️ **Update**: Edit existing posts with pre-filled data
- 🗑️ **Delete**: Remove posts with confirmation dialog
- 🔎 Search posts by title
- 📊 5 posts per page with smart pagination

### User Experience
- 🌓 **Dark/Light Theme**: Persists to localStorage
- ⌨️ **Keyboard Shortcuts**: Ctrl+K (search), Ctrl+B (sidebar), Ctrl+T (theme)
- 📱 **Collapsible Sidebar**: Full/icon-only on desktop, drawer on mobile
- 🔔 **Toast Notifications**: Success/error feedback
- 🎯 **Breadcrumb Navigation**: Easy navigation back to previous pages
- ⏱️ **Live Date & Time**: Real-time clock in navbar
- 📈 **Live Statistics**: User and post counts in sidebar

---

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with auto-optimizations
- **Vite 5** - Next-generation frontend tooling
- **Tailwind CSS v4** - Utility-first CSS framework
- **React Router v7** - Client-side routing with lazy loading
- **Lucide React** - Beautiful icons

### State Management
- **Context API** - Global state management
- **useReducer** - Complex state logic for posts
- **localStorage** - Theme persistence

### Form & Validation
- **React Hook Form** - Performant form handling
- **Custom Validation** - Title (5-100 chars), Description (10-500 chars)

### UI/UX Libraries
- **React Hot Toast** - Elegant notifications

### Deployment
- **Docker** - Containerization
- **Nginx** - Production web server
- **Multi-stage Build** - Optimized image size

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ and npm
- Docker & Docker Compose (for containerized deployment)

### Installation

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/yourusername/userhub.git
cd userhub
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Run development server**
\`\`\`bash
npm run dev
\`\`\`

4. **Open in browser**
\`\`\`
http://localhost:5173
\`\`\`

### Build for Production

\`\`\`bash
npm run build
npm run preview  # Preview production build locally
\`\`\`

### Docker Deployment

\`\`\`bash
# Using Docker Compose (recommended)
docker compose up -d

# Access at http://localhost:8585

# View logs
docker compose logs -f userhub

# Stop
docker compose down
\`\`\`

---

## 📁 Project Structure

\`\`\`
userhub/
├── public/
│   └── data/
│       ├── users.json          # 10 users mock data
│       └── posts.json          # 44 posts mock data
├── src/
│   ├── components/
│   │   ├── common/             # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── LoadMorePagination.jsx
│   │   │   └── NumberedPagination.jsx
│   │   ├── layout/             # Layout components
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Footer.jsx
│   │   ├── user/               # User-specific components
│   │   │   ├── UserCard.jsx
│   │   │   ├── UserInfo.jsx
│   │   │   └── UserSkeleton.jsx
│   │   └── post/               # Post-specific components
│   │       ├── PostCard.jsx
│   │       ├── PostList.jsx
│   │       ├── PostForm.jsx
│   │       └── PostModal.jsx
│   ├── context/
│   │   ├── DataContext.jsx     # Users & Posts state
│   │   └── ThemeContext.jsx    # Theme state
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── UserDetailPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── routes/
│   │   └── AppRoutes.jsx       # Lazy loaded routes
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── Dockerfile                   # Multi-stage build
├── docker-compose.yml          # Compose configuration
├── nginx.conf                  # Nginx configuration
├── vite.config.js
├── tailwind.config.js
└── package.json
\`\`\`

---

## 🏗️ Architecture

### Data Flow

\`\`\`
┌─────────────┐
│   App.jsx   │
└──────┬──────┘
       │
       ├─► ThemeProvider (Theme management)
       │
       └─► DataProvider (Users & Posts)
              │
              ├─► Fetches /public/data/users.json
              ├─► Fetches /public/data/posts.json
              │
              └─► Provides to all components via Context
                     │
                     ├─► HomePage (Users list)
                     │      └─► UserCard components
                     │
                     └─► UserDetailPage
                            ├─► UserInfo component
                            └─► PostList component
                                   └─► PostCard components
\`\`\`

### State Management

**DataContext**
- Manages users (useState) and posts (useReducer)
- Provides CRUD operations: addPost, updatePost, deletePost
- Provides utility functions: getPostsByUserId, searchPosts
- Handles loading and error states

**ThemeContext**
- Manages light/dark theme
- Persists preference to localStorage
- Applies theme class to <html> element

### Performance Optimizations

1. **Code Splitting**: Routes lazy loaded with React.lazy()
2. **Memoization**: 
   - `useMemo` for expensive computations (filtering, pagination)
   - `React.memo` for list components (UserCard, PostCard)
   - `useCallback` for stable function references
3. **Debouncing**: Search input debounced (300ms)
4. **Optimized Re-renders**: Strategic use of memo hooks

---

### Optimizations Applied

- ✅ Lazy loading routes (-40% initial bundle)
- ✅ Code splitting by route
- ✅ React.memo on list items
- ✅ useMemo for filtered data
- ✅ Debounced search
- ✅ Gzip compression (Nginx)
- ✅ Static asset caching (1 year)
- ✅ Skeleton loaders for perceived performance

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Developer

**Mohammed Khalid**

- 💼 Role: Full-Stack Developer
- 📧 Email: hello@mohammedkhalid.in
- 💼 LinkedIn: [linkedin.com/in/thekhalidsha](https://linkedin.com/in/thekhalidsha)
- 🐙 GitHub: [github.com/thekhalidsha](https://github.com/thekhalidsha)
- 🌐 Portfolio: [thekhalidsha.vercel.app](https://thekhalidsha.vercel.app)

---

## 🙏 Acknowledgments

- [React](https://react.dev/) - The library that makes it all possible
- [Vite](https://vitejs.dev/) - Amazing developer experience
- [Tailwind CSS](https://tailwindcss.com/) - Beautiful, utility-first CSS
- [Lucide Icons](https://lucide.dev/) - Gorgeous icon set
- [React Hot Toast](https://jsonplaceholder.typicode.com/) - An amazing Toast library

---

<div align="center">

**Built with ❤️ by Mohammed Khalid for InfinityHub (Interview Purpose*)**

⭐ If you found this project helpful, please consider giving it a star!

[Back to Top](#-userhub---user-management-dashboard)

</div>