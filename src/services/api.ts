import {
  personalInfo as defaultPersonalInfo,
  educationData as defaultEducationData,
  skillCategories as defaultSkillCategories,
  projectsData as defaultProjectsData,
  journeySteps as defaultJourneySteps,
  experienceData as defaultExperienceData
} from '../data/portfolioData';
import type {
  PersonalInfo,
  EducationItem,
  SkillCategory,
  ProjectItem,
  JourneyStep,
  ExperienceCard
} from '../types/portfolio';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Standard fetch wrapper with timeout
 */
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 4000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    return response;
  } finally {
    clearTimeout(id);
  }
}

/**
 * Fetch personal information from backend with fallback
 */
export async function fetchPersonalInfo(): Promise<PersonalInfo> {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/personal`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json.success && json.data) {
      return json.data as PersonalInfo;
    }
    return defaultPersonalInfo;
  } catch {
    // Graceful fallback to static data
    return defaultPersonalInfo;
  }
}

/**
 * Fetch projects from backend with fallback
 */
export async function fetchProjects(): Promise<ProjectItem[]> {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/projects`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data as ProjectItem[];
    }
    return defaultProjectsData;
  } catch {
    // Graceful fallback to static data
    return defaultProjectsData;
  }
}

/**
 * Fetch skills from backend with fallback
 */
export async function fetchSkills(): Promise<SkillCategory[]> {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/skills`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data as SkillCategory[];
    }
    return defaultSkillCategories;
  } catch {
    // Graceful fallback to static data
    return defaultSkillCategories;
  }
}

/**
 * Fetch education history from backend with fallback
 */
export async function fetchEducation(): Promise<EducationItem[]> {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/education`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data as EducationItem[];
    }
    return defaultEducationData;
  } catch {
    // Graceful fallback to static data
    return defaultEducationData;
  }
}

/**
 * Fetch experience details from backend with fallback
 */
export async function fetchExperience(): Promise<ExperienceCard> {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/experience`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json.success && json.data) {
      return json.data as ExperienceCard;
    }
    return defaultExperienceData;
  } catch {
    // Graceful fallback to static data
    return defaultExperienceData;
  }
}

/**
 * Fetch journey steps from backend with fallback
 */
export async function fetchJourneySteps(): Promise<JourneyStep[]> {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/journey`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data as JourneyStep[];
    }
    return defaultJourneySteps;
  } catch {
    // Graceful fallback to static data
    return defaultJourneySteps;
  }
}

/**
 * Submit contact form to backend
 */
export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  errors?: { field: string; message: string }[];
}

export async function submitContactMessage(data: ContactSubmission): Promise<ContactResponse> {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }, 8000);

    const json = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: json.message || 'Failed to submit message. Please try again.',
        errors: json.errors
      };
    }

    return {
      success: true,
      message: json.message || 'Message sent successfully!'
    };
  } catch (error: any) {
    console.error('API submitContactMessage error:', error);
    return {
      success: false,
      message: 'Network error: Unable to connect to the backend server. Please verify your connection or try again later.'
    };
  }
}

/**
 * Fetch live visitor count from backend with local fallback
 */
export async function fetchVisitorCount(): Promise<number | null> {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/visitor`, {}, 3000);
    if (!res.ok) return null;
    const json = await res.json();
    if (json.success && typeof json.visitCount === 'number') {
      return json.visitCount;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Increment visitor count on backend with local fallback
 */
export async function recordVisitorHit(): Promise<number | null> {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/visitor/increment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: 'home' })
    }, 3000);

    if (!res.ok) return null;
    const json = await res.json();
    if (json.success && typeof json.visitCount === 'number') {
      return json.visitCount;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * ============================================================================
 * ADMIN PORTAL API SERVICES
 * ============================================================================
 */

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface AdminLoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: AdminUser;
}

export interface AdminContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  ipAddress?: string;
  createdAt: string;
}

export async function loginAdmin(identifier: string, password: string): Promise<AdminLoginResponse> {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password })
    }, 8000);

    const data = await res.json();
    return data;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || 'Unable to connect to authentication server'
    };
  }
}

export async function getAdminMe(token: string): Promise<{ success: boolean; user?: AdminUser }> {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    }, 5000);

    if (!res.ok) return { success: false };
    return await res.json();
  } catch {
    return { success: false };
  }
}

export async function getAdminContactMessages(
  token: string,
  status?: string
): Promise<{ success: boolean; data?: AdminContactMessage[]; message?: string }> {
  try {
    const query = status && status !== 'all' ? `?status=${encodeURIComponent(status)}` : '';
    const res = await fetchWithTimeout(`${API_BASE_URL}/contact${query}`, {
      headers: { Authorization: `Bearer ${token}` }
    }, 8000);

    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function updateAdminContactStatus(
  token: string,
  id: string,
  status: 'unread' | 'read' | 'replied' | 'archived'
): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/contact/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    }, 8000);

    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deleteAdminContactMessage(
  token: string,
  id: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/contact/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    }, 8000);

    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function createAdminProject(
  token: string,
  projectData: Partial<ProjectItem>
): Promise<{ success: boolean; message?: string; data?: ProjectItem }> {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(projectData)
    }, 8000);

    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function updateAdminProject(
  token: string,
  id: string,
  projectData: Partial<ProjectItem>
): Promise<{ success: boolean; message?: string; data?: ProjectItem }> {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(projectData)
    }, 8000);

    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deleteAdminProject(
  token: string,
  id: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    }, 8000);

    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

