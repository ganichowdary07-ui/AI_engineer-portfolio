import { Request, Response } from 'express';
import { prisma } from '../config/db.js';

export async function getEducation(req: Request, res: Response) {
  try {
    const education = await prisma.education.findMany({
      orderBy: { orderIndex: 'asc' }
    });

    const data = education.map(e => ({
      id: e.id,
      institution: e.institution,
      location: e.location,
      degree: e.degree,
      period: e.period,
      status: e.status,
      grade: e.grade,
      description: e.description,
      icon: e.icon
    }));

    return res.json({ success: true, count: data.length, data });
  } catch (error) {
    console.error('getEducation error:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve education data' });
  }
}

export async function createEducation(req: Request, res: Response) {
  try {
    const { id, institution, location, degree, period, status, grade, description, icon, orderIndex } = req.body;
    if (!institution || !degree) {
      return res.status(400).json({ success: false, message: 'Institution and degree are required' });
    }

    const item = await prisma.education.create({
      data: {
        id: id || `edu-${Date.now()}`,
        institution,
        location: location || '',
        degree,
        period: period || '',
        status: status || '',
        grade: grade || '',
        description: description || '',
        icon: icon || 'GraduationCap',
        orderIndex: orderIndex !== undefined ? Number(orderIndex) : 0
      }
    });

    return res.status(201).json({ success: true, message: 'Education item created', data: item });
  } catch (error) {
    console.error('createEducation error:', error);
    return res.status(500).json({ success: false, message: 'Failed to create education item' });
  }
}

export async function updateEducation(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { institution, location, degree, period, status, grade, description, icon, orderIndex } = req.body;

    const item = await prisma.education.update({
      where: { id },
      data: {
        institution: institution ?? undefined,
        location: location ?? undefined,
        degree: degree ?? undefined,
        period: period ?? undefined,
        status: status ?? undefined,
        grade: grade ?? undefined,
        description: description ?? undefined,
        icon: icon ?? undefined,
        orderIndex: orderIndex !== undefined ? Number(orderIndex) : undefined
      }
    });

    return res.json({ success: true, message: 'Education item updated', data: item });
  } catch (error) {
    console.error('updateEducation error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update education item' });
  }
}

export async function deleteEducation(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.education.delete({ where: { id } });
    return res.json({ success: true, message: 'Education item deleted successfully' });
  } catch (error) {
    console.error('deleteEducation error:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete education item' });
  }
}
