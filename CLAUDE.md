# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Development Server
- `npm run proxy` - Start development server with API proxy (recommended for development)
- `npm run start` - Start basic development server without proxy

### Build and Test
- `npm run build` - Build the project for production
- `npm run watch` - Build with watch mode for development
- `npm test` - Run unit tests with Karma

### Formatting
- Uses Prettier with print width 100 and single quotes
- Angular templates use Angular parser

## Architecture Overview

This is an Angular 20 application for Tacticus game data management with the following structure:

### Core Architecture
- **Signals-based state management** - Uses Angular signals throughout for reactive state
- **Standalone components** - All components are standalone (no NgModules)
- **Route guards** - Authentication guard protects routes
- **HTTP interceptor** - Handles API authentication with dual API key system
- **Proxy configuration** - API calls proxied to `https://api.tacticusgame.com`

### Authentication System
- **Dual API Key System** - Separate Player and Officer API keys
- **AuthService** - Manages both keys with localStorage persistence
- **Signal-based auth state** - `isAuthenticated` and `hasOfficerAccess` computed signals
- **Route protection** - Auth guard on protected routes

### Feature Structure
- **Features-based organization** - Code organized by feature domains
- **Home component** - Main dashboard with tabbed interface (Player, Guild, Raids)
- **Player dashboard** - Comprehensive player data visualization
- **Material Design** - Uses Angular Material for UI components

### Key Services
- **AuthService** (`src/app/core/services/auth.service.ts`) - Authentication and API key management
- **ApiService** (`src/app/core/services/api.service.ts`) - HTTP API communication
- **Auth Interceptor** - Automatically adds appropriate API keys to requests

### Component Architecture
- **Input-based communication** - Parent components pass data to children via inputs
- **Signal-based state** - Components use signals for reactive state management
- **SCSS styling** - Component styles use SCSS
- **Error handling** - Centralized error handling with loading states

### Models
- **Player model** - Player data structure
- **Guild model** - Guild information and response types
- **Guild raid model** - Raid-specific data structures

### Routing
- Default route redirects to `/home`
- `/login` - Authentication page
- `/home` - Main dashboard (requires authentication)
- Lazy-loaded components for better performance