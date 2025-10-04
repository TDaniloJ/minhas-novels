import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';

const prisma = new PrismaClient();

// Schema de validação para registro
const registerSchema = z.object({
  username: z.string().min(3, 'Username deve ter no mínimo 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

// Schema de validação para login
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export const register = async (req, res) => {
  try {
    // Validar dados
    const validatedData = registerSchema.parse(req.body);

    // Verificar se email já existe
    const existingEmail = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingEmail) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Verificar se username já existe
    const existingUsername = await prisma.user.findUnique({
      where: { username: validatedData.username },
    });

    if (existingUsername) {
      return res.status(400).json({ error: 'Username já cadastrado' });
    }

    // Hash da senha
    const hashedPassword = await hashPassword(validatedData.password);

    // Criar usuário
    const user = await prisma.user.create({
      data: {
        username: validatedData.username,
        email: validatedData.email,
        password: hashedPassword,
        role: 'USER', // Primeiro usuário pode ser ADMIN manualmente no banco
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        avatar: true,
        createdAt: true,
      },
    });

    // Gerar token
    const token = generateToken(user.id, user.role);

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      user,
      token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Dados inválidos', 
        details: error.errors 
      });
    }
    console.error('Erro no registro:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

export const login = async (req, res) => {
  try {
    // Validar dados
    const validatedData = loginSchema.parse(req.body);

    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    // Verificar senha
    const isPasswordValid = await comparePassword(
      validatedData.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }

    // Gerar token
    const token = generateToken(user.id, user.role);

    // Remover senha da resposta
    const { password, ...userWithoutPassword } = user;

    res.json({
      message: 'Login realizado com sucesso',
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Dados inválidos', 
        details: error.errors 
      });
    }
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        avatar: true,
        createdAt: true,
      },
    });

    res.json(user);
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({ error: 'Erro ao buscar perfil' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { username, avatar } = req.body;

    const updateData = {};
    if (username) updateData.username = username;
    if (avatar) updateData.avatar = avatar;

    // Verificar se username já existe (se estiver sendo alterado)
    if (username && username !== req.user.username) {
      const existingUsername = await prisma.user.findUnique({
        where: { username },
      });

      if (existingUsername) {
        return res.status(400).json({ error: 'Username já em uso' });
      }
    }

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        avatar: true,
        createdAt: true,
      },
    });

    res.json({
      message: 'Perfil atualizado com sucesso',
      user,
    });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ error: 'Erro ao atualizar perfil' });
  }
};

export const updateProfileWithAvatar = async (req, res) => {
  try {
    const { username } = req.body;

    const updateData = {};
    if (username) updateData.username = username;
    if (req.file) {
      updateData.avatar = `/uploads/avatars/${req.file.filename}`;
    }

    // Verificar se username já existe
    if (username && username !== req.user.username) {
      const existingUsername = await prisma.user.findUnique({
        where: { username },
      });

      if (existingUsername) {
        return res.status(400).json({ error: 'Username já em uso' });
      }
    }

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        avatar: true,
        createdAt: true,
      },
    });

    res.json({
      message: 'Perfil atualizado com sucesso',
      user,
    });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ error: 'Erro ao atualizar perfil' });
  }
};