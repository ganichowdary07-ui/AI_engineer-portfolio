import { Request, Response } from 'express';
import { prisma } from '../config/db.js';

export async function getSkills(req: Request, res: Response) {
  try {
    const categories = await prisma.skillCategory.findMany({
      orderBy: { orderIndex: 'asc' },
      include: {
        skills: {
          orderBy: { orderIndex: 'asc' }
        }
      }
    });

    const data = categories.map(cat => ({
      id: cat.id,
      name: cat.name,
      skills: cat.skills.map(s => ({
        id: s.id,
        name: s.name,
        proficiency: s.proficiency,
        level: s.level,
        icon: s.icon || undefined
      }))
    }));

    return res.json({ success: true, count: data.length, data });
  } catch (error) {
    console.error('getSkills error:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve skills' });
  }
}

export async function createCategory(req: Request, res: Response) {
  try {
    const { id, name, orderIndex } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Category name is required' });
    }

    const cat = await prisma.skillCategory.create({
      data: {
        id: id || `cat-${Date.now()}`,
        name,
        orderIndex: orderIndex !== undefined ? Number(orderIndex) : 0
      }
    });

    return res.status(201).json({ success: true, message: 'Category created', data: cat });
  } catch (error) {
    console.error('createCategory error:', error);
    return res.status(500).json({ success: false, message: 'Failed to create skill category' });
  }
}

export async function deleteCategory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.skillCategory.delete({ where: { id } });
    return res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error('deleteCategory error:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete category' });
  }
}

export async function createSkill(req: Request, res: Response) {
  try {
    const { categoryId, name, proficiency, level, icon, orderIndex } = req.body;
    if (!categoryId || !name || proficiency === undefined || !level) {
      return res.status(400).json({ success: false, message: 'categoryId, name, proficiency, and level are required' });
    }

    const skill = await prisma.skill.create({
      data: {
        categoryId,
        name,
        proficiency: Number(proficiency),
        level,
        icon: icon || null,
        orderIndex: orderIndex !== undefined ? Number(orderIndex) : 0
      }
    });

    return res.status(201).json({ success: true, message: 'Skill created', data: skill });
  } catch (error) {
    console.error('createSkill error:', error);
    return res.status(500).json({ success: false, message: 'Failed to create skill' });
  }
}

export async function updateSkill(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, proficiency, level, icon, orderIndex, categoryId } = req.body;

    const skill = await prisma.skill.update({
      where: { id },
      data: {
        name: name ?? undefined,
        proficiency: proficiency !== undefined ? Number(proficiency) : undefined,
        level: level ?? undefined,
        icon: icon !== undefined ? icon : undefined,
        orderIndex: orderIndex !== undefined ? Number(orderIndex) : undefined,
        categoryId: categoryId ?? undefined
      }
    });

    return res.json({ success: true, message: 'Skill updated', data: skill });
  } catch (error) {
    console.error('updateSkill error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update skill' });
  }
}

export async function deleteSkill(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.skill.delete({ where: { id } });
    return res.json({ success: true, message: 'Skill deleted successfully' });
  } catch (error) {
    console.error('deleteSkill error:', error);
    return res.status(500).json({ success: false, message: 'Failed to delete skill' });
  }
}
