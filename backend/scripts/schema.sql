-- ==============================================================================
-- MySQL Workbench Database Script for Gurram Ganesh Portfolio
-- Database: portfolio_db
-- Compatibility: MySQL 8.0+ / MySQL 9.x / MySQL Workbench
-- ==============================================================================

-- 1. Create Database if not exists
CREATE DATABASE IF NOT EXISTS portfolio_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE portfolio_db;

-- ==============================================================================
-- 2. Create Tables
-- ==============================================================================

-- Admin Users Table (For protected CMS endpoints)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(191) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'ADMIN',
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Personal Information Table
CREATE TABLE IF NOT EXISTS personal_info (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    professional_titles TEXT NOT NULL,      -- JSON Array: ["AI Engineer Learner", ...]
    typing_titles TEXT NOT NULL,            -- JSON Array: ["AI Engineer Learner", ...]
    location VARCHAR(200) NOT NULL,
    career_goal VARCHAR(150) NOT NULL,
    email VARCHAR(191) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    current_status VARCHAR(200) NOT NULL,
    college VARCHAR(200) NOT NULL,
    intro_text TEXT NOT NULL,
    about_bio TEXT NOT NULL,                -- JSON Array of bio paragraphs
    github VARCHAR(255) NOT NULL,
    linkedin VARCHAR(255) NOT NULL,
    email_social VARCHAR(255) NOT NULL,
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Personal Statistics / Metric Highlights Table
CREATE TABLE IF NOT EXISTS personal_stats (
    id VARCHAR(36) PRIMARY KEY,
    personal_info_id VARCHAR(36) NOT NULL,
    label VARCHAR(100) NOT NULL,
    value VARCHAR(100) NOT NULL,
    sublabel VARCHAR(150) NOT NULL,
    icon_name VARCHAR(50) NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_personal_stats_info 
        FOREIGN KEY (personal_info_id) 
        REFERENCES personal_info(id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Education History Table
CREATE TABLE IF NOT EXISTS education (
    id VARCHAR(36) PRIMARY KEY,
    institution VARCHAR(200) NOT NULL,
    location VARCHAR(200) NOT NULL,
    degree VARCHAR(200) NOT NULL,
    period VARCHAR(100) NOT NULL,
    status VARCHAR(100) NOT NULL,
    grade VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(50) NOT NULL DEFAULT 'GraduationCap',
    order_index INT NOT NULL DEFAULT 0,
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Skill Categories Table
CREATE TABLE IF NOT EXISTS skill_categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Individual Skills Table
CREATE TABLE IF NOT EXISTS skills (
    id VARCHAR(36) PRIMARY KEY,
    category_id VARCHAR(50) NOT NULL,
    name VARCHAR(100) NOT NULL,
    proficiency INT NOT NULL CHECK (proficiency BETWEEN 0 AND 100),
    level VARCHAR(50) NOT NULL, -- 'Comfortable' | 'Currently Learning'
    icon VARCHAR(100) NULL,
    order_index INT NOT NULL DEFAULT 0,
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
    CONSTRAINT fk_skills_category 
        FOREIGN KEY (category_id) 
        REFERENCES skill_categories(id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT NULL,
    category TEXT NOT NULL,                 -- JSON Array: ["Prompt Engineering", "AI"]
    technologies TEXT NOT NULL,             -- JSON Array: ["Python", "Machine Learning"]
    github_url VARCHAR(255) NOT NULL,
    live_demo_url VARCHAR(255) NOT NULL,
    featured BOOLEAN NOT NULL DEFAULT FALSE,
    image TEXT NOT NULL,
    highlights TEXT NULL,                   -- JSON Array of string highlights
    order_index INT NOT NULL DEFAULT 0,
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Career & Learning Journey Steps Table
CREATE TABLE IF NOT EXISTS journey_steps (
    id VARCHAR(36) PRIMARY KEY,
    step INT NOT NULL UNIQUE,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) NOT NULL,            -- 'Completed' | 'In Progress' | 'Upcoming Goal'
    technologies TEXT NOT NULL,             -- JSON Array
    icon VARCHAR(50) NOT NULL,
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Experience Summary Table
CREATE TABLE IF NOT EXISTS experiences (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    status VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    highlights TEXT NOT NULL,               -- JSON Array
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contact Form Submissions Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(191) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'unread', -- 'unread' | 'read' | 'replied' | 'archived'
    ip_address VARCHAR(45) NULL,
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Portfolio Visitor Statistics Table
CREATE TABLE IF NOT EXISTS visitor_stats (
    id VARCHAR(36) PRIMARY KEY,
    page VARCHAR(100) NOT NULL UNIQUE DEFAULT 'home',
    visit_count INT NOT NULL DEFAULT 0,
    last_visited_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================================
-- 3. Useful Queries for Inspection in MySQL Workbench
-- ==============================================================================
-- SHOW DATABASES;
-- USE portfolio_db;
-- SHOW TABLES;
-- SELECT * FROM personal_info;
-- SELECT * FROM personal_stats;
-- SELECT * FROM projects;
-- SELECT * FROM skill_categories;
-- SELECT * FROM skills;
-- SELECT * FROM education;
-- SELECT * FROM journey_steps;
-- SELECT * FROM experiences;
-- SELECT * FROM contact_messages;
-- SELECT * FROM visitor_stats;
