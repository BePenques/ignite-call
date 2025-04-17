// app/api/users/route.ts

import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

interface UserData {
  name: string;
  username: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
   
    const { name, username } = body as UserData;

    const user = await prisma.user.create({
      data:{
        name,
        username
      }
    })

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao registrar usuário' }, { status: 500 });
  }
}
