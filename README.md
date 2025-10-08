# NoteJS 📓

> A local-first, collaborative notebook environment for JavaScript and TypeScript. Because Jupyter shouldn't have all the fun.

An Electron-based notebook editor and runtime built on Automerge CRDTs for real-time collaboration and local-first architecture. Inspired by Jupyter notebooks, designed for JavaScript/TypeScript developers who want cell-based interactive development with modern tooling.

## Overview

NoteJS is a collaborative notebook environment that brings the interactive cell-based workflow of Jupyter to the JavaScript/TypeScript ecosystem. Built on Automerge for conflict-free replicated data types (CRDTs), it enables real-time collaboration while maintaining a local-first architecture where your data lives on your machine.

## Skills Demonstrated

This project showcases desktop application development with modern web technologies:

- **Electron Desktop Application**: Full Electron app with main/renderer process architecture, IPC communication, native Node.js filesystem access via automerge-repo-storage-nodefs, and cross-platform builds for Windows (Squirrel), macOS (ZIP), and Linux (deb/rpm) using Electron Forge.

- **CRDT-Based Collaboration**: Automerge integration for conflict-free collaborative editing with real-time sync via WebSocket networking, BroadcastChannel for multi-window synchronization, and local-first architecture where data remains on-device with optional peer-to-peer sync.

- **Modern React Architecture**: React 18 with TypeScript, React Router v6 for navigation, strict mode development, and component-based UI architecture with Radix UI primitives for accessible components.

- **Vite Build System**: Multi-config Vite setup for main process, renderer process, and preload scripts with TypeScript path aliases, hot module replacement, and optimized production builds with code splitting.

- **Shadcn/ui Component System**: Radix UI primitives styled with TailwindCSS, class-variance-authority for component variants, and tailwind-merge for className composition demonstrating modern component library patterns.

- **TypeScript Configuration**: Strict type checking across Electron main/renderer processes, path alias resolution, and proper type definitions for Electron, React, and Vite integration.

- **Development Tooling**: ESLint with TypeScript parser and import resolution, Husky git hooks for pre-commit linting, lint-staged for incremental linting, and Electron Forge for build automation.

- **Cross-Platform Packaging**: Electron Forge makers for Windows installers (Squirrel), macOS distribution (ZIP), and Linux packages (deb/rpm) with auto-unpack natives plugin and fuses for security hardening.

## Tech Stack

### Core Framework
- **Electron** v31.1.0 - Desktop application framework
- **React** v18.3.1 - UI library with hooks
- **TypeScript** v5.5.3 - Static typing

### Collaboration & Data
- **Automerge** v2.2.4 - CRDT for collaborative editing
- **@automerge/automerge-repo** v1.2.0 - Document repository with sync
- **@automerge/automerge-repo-network-websocket** - WebSocket networking
- **@automerge/automerge-repo-network-broadcastchannel** - Multi-window sync
- **@automerge/automerge-repo-storage-nodefs** - Local filesystem storage
- **@automerge/automerge-repo-react-hooks** - React integration

### UI & Styling
- **React Router** v6.24.1 - Client-side routing
- **Radix UI** - Accessible component primitives (@radix-ui/react-slot, @radix-ui/react-icons)
- **Shadcn/ui** - Component library built on Radix + Tailwind
- **TailwindCSS** v3.4.4 - Utility-first CSS
- **tailwind-merge** - Utility for merging Tailwind classes
- **class-variance-authority** - Component variant management
- **tailwindcss-animate** - Animation utilities

### Build & Tooling
- **Vite** v5.3.3 - Build tool and dev server
- **Electron Forge** v7.4.0 - Build, package, and publish automation
- **ESLint** v8.57.0 - Code linting with TypeScript support
- **Husky** v9.0.11 - Git hooks
- **lint-staged** v15.2.7 - Run linters on staged files

### Packaging
- **@electron-forge/maker-squirrel** - Windows installer
- **@electron-forge/maker-zip** - macOS distribution
- **@electron-forge/maker-deb** - Debian/Ubuntu packages
- **@electron-forge/maker-rpm** - RedHat/Fedora packages
- **@electron/fuses** - Security configuration

## Project Structure

```
note-js/
├── src/
│   ├── client.tsx           # React entry point with router
│   ├── pages/
│   │   ├── layout.tsx      # Root layout component
│   │   ├── home.tsx        # Home page
│   │   ├── notebook.tsx    # Notebook editor
│   │   └── error.tsx       # Error boundary
│   └── components/
│       ├── nav.tsx          # Navigation component
│       └── ui/              # Shadcn/ui components
│           └── button.tsx   # Button component
├── forge.config.ts          # Electron Forge configuration
├── vite.main.config.ts      # Vite config for main process
├── vite.renderer.config.ts  # Vite config for renderer process
├── vite.preload.config.ts   # Vite config for preload scripts
├── vite.base.config.ts      # Shared Vite configuration
├── tailwind.config.js       # TailwindCSS configuration
├── components.json          # Shadcn/ui configuration
└── package.json             # Dependencies and scripts
```

## Getting Started

### Prerequisites
- Node.js >= 18
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ashmortar/note-js.git
cd note-js

# Install dependencies
npm install
```

### Development

```bash
# Start Electron app in development mode with hot reload
npm start

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

### Building

```bash
# Package the app (creates distributable but doesn't create installer)
npm run package

# Create platform-specific distributables
npm run make

# Publish to GitHub releases
npm run publish
```

The `make` command will create platform-specific installers in the `out/make` directory:
- **Windows**: Squirrel installer (`.exe`)
- **macOS**: ZIP archive (`.app` inside)
- **Linux**: `.deb` and `.rpm` packages

## Architecture Highlights

### Electron Process Architecture

NoteJS uses Electron's multi-process architecture:

**Main Process** (Node.js):
- Window management
- Filesystem access via Automerge storage
- Native OS integration

**Renderer Process** (Chromium):
- React UI
- Automerge document editing
- WebSocket collaboration

**Preload Scripts**:
- Secure IPC bridge between main and renderer

### Automerge Collaboration

Documents are managed using Automerge's CRDT architecture:

```typescript
// Automerge repo with multiple network adapters
const repo = new Repo({
  storage: new NodeFSStorageAdapter('./documents'),
  network: [
    new BroadcastChannelNetworkAdapter(),  // Multi-window sync
    new WebSocketNetworkAdapter('ws://...')  // Remote collaboration
  ]
});

// React hooks for document access
const [doc, changeDoc] = useDocument(documentUrl);
```

### Cell-Based Notebook Structure

Each notebook contains multiple cells that can be:
- **Markdown** - Rich text documentation
- **JavaScript/TypeScript** - Executable code cells
- **JSX/TSX** - React component cells

### Shadcn/ui Integration

Components use the Shadcn/ui pattern:

```tsx
// Radix primitives + Tailwind + CVA for variants
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        outline: "border border-input"
      }
    }
  }
)
```

## Roadmap

This project is in active development. Planned features:

- [ ] Basic markdown cell editor/viewer
- [ ] JavaScript/TypeScript cell execution
- [ ] JSX/TSX component rendering
- [ ] Cell output display with error handling
- [ ] Document persistence and auto-save
- [ ] Multi-user collaboration UI
- [ ] Code completion and IntelliSense
- [ ] Import/export notebooks
- [ ] Plugin system for extensions

## Contributing

This is a personal project exploring local-first collaborative editing patterns. Feedback and suggestions welcome via issues.

## License

BSD-3-Clause - Open source for learning and experimentation.

---

**Author:** [Aaron Ross](https://github.com/ashmortar)

*Part of a curated collection exploring modern application architectures. This project investigates whether we can bring the interactive notebook development experience to JavaScript/TypeScript while maintaining the benefits of local-first architecture and real-time collaboration. The goal: Jupyter-style workflows with modern web tooling and peer-to-peer sync instead of server infrastructure.*
