import { Request, Response } from 'express';
import { prisma } from '../config/db.js';

export async function getExperience(req: Request, res: Response) {
  try {
    const exp = await prisma.experience.findFirst();

    if (!exp) {
      return res.status(404).json({ success: false, message: 'Experience record not found' });
    }

    const data = {
      id: exp.id,
      title: exp.title,
      status: exp.status,
      description: exp.description,
      highlights: JSON.parse(exp.highlights || '[]')
    };

    return res.json({ success: true, data });
  } catch (error) {
    console.error('getExperience error:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve experience' });
  }
}

export async function updateExperience(req: Request, res: Response) {
  try {
    const { title, status, description, highlights } = req.body;

    let exp = await prisma.experience.findFirst();

    const dataToSave = {
      title: title || 'Fresher & Motivated Technical Learner',
      status: status || 'Fresher',
      description: description || '',
      highlights: JSON.stringify(highlights || [])
    };

    if (exp) {
      exp = await prisma.experience.update({
        where: { id: exp.id },
        data: dataToSave
      });
    } else {
      exp = await prisma.experience.create({
        data: dataToSave
      });
    }

    return res.json({
      success: true,
      message: 'Experience updated successfully',
      data: {
        id: exp.id,
        title: exp.title,
        status: exp.status,
        description: exp.description,
        highlights: JSON.parse(exp.highlights || '[]')
      }
    });
  } catch (error) {
    console.error('updateExperience error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update experience' });
  }
}
