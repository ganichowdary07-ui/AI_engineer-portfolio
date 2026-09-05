import { Request, Response } from 'express';
import { prisma } from '../config/db.js';

export async function submitContact(req: Request, res: Response) {
  try {
    const { name, email, subject, message } = req.body;

    const ipAddress = 
      (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
      req.socket.remoteAddress || 
      null;

    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
        status: 'unread',
        ipAddress
      }
    });

    console.log(`[Contact Form] New submission received from ${name} (${email}): "${subject}"`);

    return res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Your message has been received successfully.',
      data: {
        id: contactMessage.id,
        createdAt: contactMessage.createdAt
      }
    });
  } catch (error) {
    console.error('submitContact error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to save contact message. Please try again later.'
    });
  }
}

export async function getContactMessages(req: Request, res: Response) {
  try {
    const { status } = req.query;
    const where: any = {};
    if (status && typeof status === 'string') {
      where.status = status;
    }

    const messages = await prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return res.json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    console.error('getContactMessages error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve contact messages'
    });
  }
}

export async function updateMessageStatus(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['unread', 'read', 'replied', 'archived'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value. Must be unread, read, replied, or archived.'
      });
    }

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { status }
    });

    return res.json({
      success: true,
      message: 'Message status updated',
      data: updated
    });
  } catch (error) {
    console.error('updateMessageStatus error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update message status'
    });
  }
}

export async function deleteMessage(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await prisma.contactMessage.delete({ where: { id } });
    return res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.error('deleteMessage error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete message'
    });
  }
}
