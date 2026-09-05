import { Request, Response } from 'express';
import { prisma } from '../config/db.js';

function formatProject(p: any) {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    longDescription: p.longDescription || undefined,
    category: JSON.parse(p.category || '[]'),
    technologies: JSON.parse(p.technologies || '[]'),
    githubUrl: p.githubUrl,
    liveDemoUrl: p.liveDemoUrl,
    featured: p.featured,
    image: p.image,
    highlights: p.highlights ? JSON.parse(p.highlights) : undefined,
    orderIndex: p.orderIndex,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt
  };
}

export async function getProjects(req: Request, res: Response) {
  try {
    const { category, featured } = req.query;

    const whereClause: any = {};
    if (featured !== undefined) {
      whereClause.featured = featured === 'true';
    }

    const projects = await prisma.project.findMany({
      where: whereClause,
      orderBy: { orderIndex: 'asc' }
    });

    let formatted = projects.map(formatProject);

    if (category && typeof category === 'string' && category !== 'All') {
      formatted = formatted.filter(p => p.category.includes(category));
    }

    return res.json({ success: true, count: formatted.length, data: formatted });
  } catch (error) {
    console.error('getProjects error:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve projects' });
  }
}

export async function getProjectById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({
      where: { id }
    });

    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    return res.json({ success: true, data: formatProject(project) });
  } catch (error) {
    console.error('getProjectById error:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve project' });
  }
}

export async function createProject(req: Request, res: Response) {
  try {
    const {
      id,
      title,
      description,
      longDescription,
      category,
      technologies,
      githubUrl,
      liveDemoUrl,
      featured,
      image,
      highlights,
      orderIndex
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }

    const newProject = await prisma.project.create({
      data: {
        id: id || `proj-${Date.now()}`,
        title,
        description,
        longDescription: longDescription || null,
        category: JSON.stringify(category || []),
        technologies: JSON.stringify(technologies || []),
        githubUrl: githubUrl || '#',
        liveDemoUrl: liveDemoUrl || '#',
        featured: Boolean(featured),
        image: image || 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
        highlights: highlights ? JSON.stringify(highlights) : null,
        orderIndex: orderIndex !== undefined ? Number(orderIndex) : 0
      }
    });

    return res.status(201).json({ success: true, message: 'Project created successfully', data: formatProject(newProject) });
  } catch (error) {
    console.error('createProject error:', error);
    return res.status(500).json({ success: false, message: 'Failed to create project' });
  }
}

export async function updateProject(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      longDescription,
      category,
      technologies,
      githubUrl,
      liveDemoUrl,
      featured,
      image,
      highlights,
      orderIndex
    } = req.body;

    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const updated = await prisma.project.update({
      where: { id },
      data: {
        title: title ?? undefined,
        description: description ?? undefined,
        longDescription: longDescription !== undefined ? longDescription : undefined,
        category: category ? JSON.stringify(category) : undefined,
        technologies: technologies ? JSON.stringify(technologies) : undefined,
        githubUrl: githubUrl ?? undefined,
        liveDemoUrl: liveDemoUrl ?? undefined,
        featured: featured !== undefined ? Boolean(featured) : undefined,
        image: image ?? undefined,
        highlights: highlights !== undefined ? (highlights ? JSON.stringify(highlights) : null) : undefined,
        orderIndex: orderIndex !== undefined ? Number(orderIndex) : undefined
      }
    });

    return res.json({ success: true, message: 'Project updated successfully', data: formatProject(updated) });
  } catch (error) {
    console.error('updateProject error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update project' });
  }
}

export async function deleteProject(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    await prisma.project.delete({ where: { id } });
    return res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    console.error('deleteProject error:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete project' });
  }
}
