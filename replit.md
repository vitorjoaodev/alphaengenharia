# replit.md

## Overview

This is a full-stack web application built with React and Express.js that features a modern, responsive contact form system. The application is designed as a business/portfolio website with a contact form that allows visitors to submit inquiries. The frontend is built with React and styled using Tailwind CSS with shadcn/ui components, while the backend provides API endpoints for handling contact form submissions and data storage.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and developer experience
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, accessible UI components
- **State Management**: TanStack React Query for server state management and API calls
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Components**: Radix UI primitives with custom styling through shadcn/ui for accessibility and consistency

### Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **API Design**: RESTful API endpoints for contact form operations
- **Data Storage**: In-memory storage with MemStorage class (designed to be easily replaceable with database storage)
- **Schema Validation**: Zod for runtime type checking and data validation
- **Development**: Hot module replacement and error handling with custom middleware

### Database Schema
- **ORM**: Drizzle ORM configured for PostgreSQL with type-safe database operations
- **Schema Location**: Shared schema definitions in `/shared/schema.ts`
- **Tables**: 
  - `users` table with id, username, and password fields
  - `contact_messages` table with id, nome, email, telefone, assunto, mensagem, and createdAt fields
- **Migrations**: Managed through Drizzle Kit with migrations stored in `/migrations` directory

### API Structure
- **POST /api/contact**: Endpoint for submitting contact form data with validation
- **GET /api/contact**: Admin endpoint for retrieving all contact messages
- **Error Handling**: Centralized error handling with proper HTTP status codes and user-friendly messages
- **Logging**: Request/response logging middleware for API monitoring

### Development Environment
- **Hot Reloading**: Vite development server with Express.js integration
- **TypeScript**: Full TypeScript support across frontend, backend, and shared code
- **Path Aliases**: Configured aliases for clean imports (@/, @shared/, @assets/)
- **Environment**: Replit-optimized with specific plugins and configurations

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database adapter for Neon database hosting
- **drizzle-orm** and **drizzle-kit**: Type-safe ORM and migration toolkit for PostgreSQL
- **@tanstack/react-query**: Server state management and caching for React
- **wouter**: Lightweight routing library for React applications

### UI Component Libraries
- **@radix-ui/react-***: Accessible, unstyled UI primitives (accordion, dialog, dropdown, etc.)
- **tailwindcss**: Utility-first CSS framework for styling
- **class-variance-authority**: Utility for creating consistent component variants
- **lucide-react**: Icon library for consistent iconography

### Form Handling and Validation
- **react-hook-form**: Performance-focused form library with minimal re-renders
- **@hookform/resolvers**: Resolvers for integrating validation libraries with react-hook-form
- **zod**: Schema validation library for runtime type checking

### Development and Build Tools
- **vite**: Fast build tool and development server
- **@vitejs/plugin-react**: Vite plugin for React support
- **tsx**: TypeScript execution engine for Node.js development
- **esbuild**: Fast JavaScript bundler for production builds

### Utility Libraries
- **date-fns**: Date manipulation and formatting utilities
- **clsx** and **tailwind-merge**: Utility functions for conditional CSS classes
- **nanoid**: Secure URL-friendly unique string ID generator