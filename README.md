
# ThunderCipher - Cybersecurity Training Platform

![ThunderCipher Logo](https://via.placeholder.com/800x200/000000/00FF41?text=ThunderCipher)

## 🚀 Overview

ThunderCipher is a cutting-edge cybersecurity training platform designed for ethical hackers, penetration testers, and cybersecurity enthusiasts. Built with modern web technologies, it provides immersive CTF (Capture The Flag) challenges and virtual attack boxes for hands-on learning.

### ⚡ Key Features

- **🎯 CTF Challenges**: Real-world cybersecurity challenges across multiple categories
- **💻 Attack Boxes**: Virtual machine environments for practical hacking experience  
- **🏆 Leaderboards**: Global rankings and competitive scoring system
- **📚 Learning Guides**: Comprehensive documentation and tutorials
- **🔐 Secure Authentication**: JWT-based auth with OTP verification
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🌙 Cyberpunk Theme**: Dark, terminal-inspired UI with neon accents

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern JavaScript library for building user interfaces
- **TypeScript** - Type-safe JavaScript for better development experience
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing for single-page application
- **Shadcn/ui** - High-quality, accessible UI components

### Authentication & State Management
- **React Context** - Global state management for user authentication
- **TanStack Query** - Server state management and caching
- **Local Storage** - Persistent user session storage

### Development Tools
- **ESLint** - Code linting and quality enforcement
- **TypeScript** - Static type checking
- **PostCSS** - CSS processing and optimization

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <YOUR_GIT_URL>
cd thundercipher
```

2. **Install dependencies**  
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:8080` to view the application.

### Build for Production

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

## 📂 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components (read-only)
│   ├── Navbar.tsx      # Navigation component
│   └── Footer.tsx      # Footer component
├── hooks/              # Custom React hooks
│   └── useAuth.tsx     # Authentication hook
├── pages/              # Page components
│   ├── Index.tsx       # Landing page
│   ├── SignIn.tsx      # Sign in page
│   ├── SignUp.tsx      # Sign up page  
│   ├── Dashboard.tsx   # User dashboard
│   ├── Challenges.tsx  # CTF challenges
│   ├── Leaderboard.tsx # Global rankings
│   └── Guide.tsx       # Platform guide
├── lib/                # Utility libraries
│   └── utils.ts        # Common utility functions
├── App.tsx            # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles and theme
```

## 🎮 Platform Features

### Authentication System
- **Sign Up**: Create account with email verification
- **Sign In**: Secure login with JWT tokens
- **OTP Verification**: Email-based verification for security
- **Password Reset**: Secure password recovery flow
- **Session Management**: Persistent login sessions

### CTF Challenge Categories
- **Web Exploitation**: SQL injection, XSS, CSRF attacks
- **Binary Exploitation**: Buffer overflows, reverse engineering
- **Cryptography**: Encryption breaking, hash analysis
- **Digital Forensics**: Evidence analysis, memory dumps

### Difficulty Levels
- **Easy**: 25-75 points | Beginner-friendly challenges
- **Medium**: 75-150 points | Intermediate skill level  
- **Hard**: 150-300 points | Advanced expert challenges

### Scoring System
- Points awarded based on challenge difficulty
- Global leaderboard rankings updated in real-time
- Weekly and monthly leaderboard filters
- Achievement badges and progress tracking

## 🎨 Design System

### Color Palette
- **Primary**: Neon Green (#00FF41) - Main accent color
- **Secondary**: Cyber Blue (#00FFFF) - Highlights and links  
- **Background**: Deep Black (#000000) - Main background
- **Surface**: Dark Gray (#1A1A1A) - Card backgrounds
- **Text**: White (#FFFFFF) - Primary text color

### Typography
- **Primary Font**: Inter - Clean, modern sans-serif
- **Monospace Font**: Fira Code - Terminal and code blocks
- **Font Weights**: 300, 400, 500, 600, 700, 800, 900

### Component Design
- **Cards**: Dark backgrounds with neon green borders
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Black inputs with green focus states
- **Navigation**: Fixed header with backdrop blur

## 🔐 Security Features

### Authentication Security
- JWT token-based authentication
- HTTP-only cookie storage (simulated)
- OTP email verification
- Secure password reset flow
- Session timeout management

### Application Security  
- XSS protection with proper escaping
- CSRF protection through SPA architecture
- Input validation and sanitization
- Secure HTTP headers
- Content Security Policy ready

## 🚀 Deployment

### Recommended Platforms
- **Vercel** - Optimized for React applications
- **Netlify** - Static site deployment with CDN
- **AWS S3 + CloudFront** - Scalable cloud deployment
- **GitHub Pages** - Free hosting for public repositories

### Environment Variables
Currently, the application uses mock APIs and doesn't require environment variables. For production deployment with real backend services, you would need to configure:

```bash
VITE_API_BASE_URL=https://api.thundercipher.com
VITE_AUTH_SECRET=your-jwt-secret
VITE_EMAIL_SERVICE_KEY=your-email-service-key
```

### Build Optimization
- Code splitting for optimal loading
- Asset compression and minification  
- CSS purging for smaller bundle sizes
- Progressive Web App (PWA) ready
- SEO optimization with meta tags

## 🤝 Contributing

We welcome contributions to ThunderCipher! Please follow these guidelines:

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/awesome-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add awesome feature'`)
5. Push to the branch (`git push origin feature/awesome-feature`)
6. Open a Pull Request

### Code Standards
- Use TypeScript for all new code
- Follow the existing code style and conventions
- Add JSDoc comments for functions and components
- Ensure responsive design for all new features
- Test your changes across different browsers

### Issue Reporting
- Use the GitHub issue tracker
- Provide detailed reproduction steps
- Include screenshots for UI-related issues
- Tag issues appropriately (bug, feature, enhancement)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework  
- **Shadcn** - For the beautiful UI component library
- **Lucide** - For the comprehensive icon library
- **Vercel** - For the excellent deployment platform

## 📞 Support

### Community
- **Discord Server**: [Join our community](https://discord.gg/thundercipher)
- **Forums**: [Visit our forums](https://forums.thundercipher.com)
- **GitHub Issues**: [Report bugs and request features](https://github.com/thundercipher/platform/issues)

### Contact
- **Email**: support@thundercipher.com
- **Twitter**: [@thundercipher](https://twitter.com/thundercipher)
- **Website**: [https://thundercipher.com](https://thundercipher.com)

---

**⚡ Start your ethical hacking journey with ThunderCipher today! ⚡**

![Cybersecurity](https://via.placeholder.com/400x100/000000/00FF41?text=HACK%20THE%20PLANET)
```
