import { Request, Response } from 'express';
import { prisma } from '../config/db.js';

export async function getJourneySteps(req: Request, res: Response) {
  try {
    const steps = await prisma.journeyStep.findMany({
      orderBy: { step: 'asc' }
    });

    const data = steps.map(s => ({
      id: s.id,
      step: s.step,
      title: s.title,
      description: s.description,
      status: s.status,
      technologies: JSON.parse(s.technologies || '[]'),
      icon: s.icon
    }));

    return res.json({ success: true, count: data.length, data });
  } catch (error) {
    console.error('getJourneySteps error:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve journey steps' });
  }
}

export async function createJourneyStep(req: Request, res: Response) {
  try {
    const { step, title, description, status, technologies, icon } = req.body;
    if (step === undefined || !title || !description) {
      return res.status(400).json({ success: false, message: 'Step number, title, and description are required' });
    }

    const newStep = await prisma.journeyStep.create({
      data: {
        step: Number(step),
        title,
        description,
        status: status || 'In Progress',
        technologies: JSON.stringify(technologies || []),
        icon: icon || 'Sparkles'
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Journey step created',
      data: {
        ...newStep,
        technologies: JSON.parse(newStep.technologies)
      }
    });
  } catch (error) {
    console.error('createJourneyStep error:', error);
    return res.status(500).json({ success: false, message: 'Failed to create journey step' });
  }
}

export async function updateJourneyStep(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { step, title, description, status, technologies, icon } = req.body;

    const updated = await prisma.journeyStep.update({
      where: { id },
      data: {
        step: step !== undefined ? Number(step) : undefined,
        title: title ?? undefined,
        description: description ?? undefined,
        status: status ?? undefined,
        technologies: technologies ? JSON.stringify(technologies) : undefined,
        icon: icon ?? undefined
      }
    });

    return res.json({
      success: true,
      message: 'Journey step updated',
      data: {
        ...updated,
        technologies: JSON.parse(updated.technologies)
      }
    });
  } catch (error) {
    console.error('updateJourneyStep error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update journey step' });
  }
}

export async function deleteJourneyStep(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.journeyStep.delete({ where: { id } });
    return res.json({ success: true, message: 'Journey step deleted successfully' });
  } catch (error) {
    console.error('deleteJourneyStep error:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete journey step' });
  }
}
