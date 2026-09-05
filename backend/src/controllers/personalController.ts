import { Request, Response } from 'express';
import { prisma } from '../config/db.js';

export async function getPersonalInfo(req: Request, res: Response) {
  try {
    const info = await prisma.personalInfo.findFirst({
      include: {
        stats: {
          orderBy: { orderIndex: 'asc' }
        }
      }
    });

    if (!info) {
      return res.status(404).json({
        success: false,
        message: 'Personal info not found'
      });
    }

    // Format response to match frontend PersonalInfo interface
    const responseData = {
      name: info.name,
      professionalTitles: JSON.parse(info.professionalTitles || '[]'),
      typingTitles: JSON.parse(info.typingTitles || '[]'),
      location: info.location,
      careerGoal: info.careerGoal,
      email: info.email,
      phone: info.phone,
      currentStatus: info.currentStatus,
      college: info.college,
      introText: info.introText,
      aboutBio: JSON.parse(info.aboutBio || '[]'),
      socials: {
        github: info.github,
        linkedin: info.linkedin,
        email: info.emailSocial
      },
      stats: info.stats.map(s => ({
        label: s.label,
        value: s.value,
        sublabel: s.sublabel,
        iconName: s.iconName
      }))
    };

    return res.json({ success: true, data: responseData });
  } catch (error) {
    console.error('getPersonalInfo error:', error);
    return res.status(500).json({ success: false, message: 'Failed to retrieve personal info' });
  }
}

export async function updatePersonalInfo(req: Request, res: Response) {
  try {
    const {
      name,
      professionalTitles,
      typingTitles,
      location,
      careerGoal,
      email,
      phone,
      currentStatus,
      college,
      introText,
      aboutBio,
      socials,
      stats
    } = req.body;

    let info = await prisma.personalInfo.findFirst();

    const dataToSave = {
      name: name ?? undefined,
      professionalTitles: professionalTitles ? JSON.stringify(professionalTitles) : undefined,
      typingTitles: typingTitles ? JSON.stringify(typingTitles) : undefined,
      location: location ?? undefined,
      careerGoal: careerGoal ?? undefined,
      email: email ?? undefined,
      phone: phone ?? undefined,
      currentStatus: currentStatus ?? undefined,
      college: college ?? undefined,
      introText: introText ?? undefined,
      aboutBio: aboutBio ? JSON.stringify(aboutBio) : undefined,
      github: socials?.github ?? undefined,
      linkedin: socials?.linkedin ?? undefined,
      emailSocial: socials?.email ?? undefined
    };

    if (info) {
      const targetId = info.id;
      await prisma.personalInfo.update({
        where: { id: targetId },
        data: dataToSave
      });

      if (Array.isArray(stats)) {
        // Replace stats
        await prisma.personalStat.deleteMany({ where: { personalInfoId: targetId } });
        await prisma.personalStat.createMany({
          data: stats.map((s: any, idx: number) => ({
            personalInfoId: targetId,
            label: s.label,
            value: s.value,
            sublabel: s.sublabel,
            iconName: s.iconName,
            orderIndex: idx
          }))
        });
      }
    } else {
      info = await prisma.personalInfo.create({
        data: {
          name: name || 'Gurram Ganesh',
          professionalTitles: JSON.stringify(professionalTitles || []),
          typingTitles: JSON.stringify(typingTitles || []),
          location: location || '',
          careerGoal: careerGoal || '',
          email: email || '',
          phone: phone || '',
          currentStatus: currentStatus || '',
          college: college || '',
          introText: introText || '',
          aboutBio: JSON.stringify(aboutBio || []),
          github: socials?.github || '',
          linkedin: socials?.linkedin || '',
          emailSocial: socials?.email || '',
          stats: {
            create: (stats || []).map((s: any, idx: number) => ({
              label: s.label,
              value: s.value,
              sublabel: s.sublabel,
              iconName: s.iconName,
              orderIndex: idx
            }))
          }
        }
      });
    }

    return res.json({ success: true, message: 'Personal info updated successfully' });
  } catch (error) {
    console.error('updatePersonalInfo error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update personal info' });
  }
}
