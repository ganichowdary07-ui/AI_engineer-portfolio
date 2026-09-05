import { Request, Response } from 'express';
import { prisma } from '../config/db.js';

export async function getVisitorCount(req: Request, res: Response) {
  try {
    const page = (req.query.page as string) || 'home';
    let stat = await prisma.visitorStat.findUnique({
      where: { page }
    });

    if (!stat) {
      stat = await prisma.visitorStat.create({
        data: { page, visitCount: 142 }
      });
    }

    return res.json({
      success: true,
      page: stat.page,
      visitCount: stat.visitCount,
      lastVisitedAt: stat.lastVisitedAt
    });
  } catch (error) {
    console.error('getVisitorCount error:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve visitor count' });
  }
}

export async function incrementVisitorCount(req: Request, res: Response) {
  try {
    const page = (req.body.page as string) || 'home';

    const stat = await prisma.visitorStat.upsert({
      where: { page },
      update: {
        visitCount: { increment: 1 },
        lastVisitedAt: new Date()
      },
      create: {
        page,
        visitCount: 143,
        lastVisitedAt: new Date()
      }
    });

    return res.json({
      success: true,
      page: stat.page,
      visitCount: stat.visitCount,
      lastVisitedAt: stat.lastVisitedAt
    });
  } catch (error) {
    console.error('incrementVisitorCount error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update visitor count' });
  }
}
