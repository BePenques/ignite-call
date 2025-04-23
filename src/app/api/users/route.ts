// app/api/users/route.ts

import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { setCookie } from 'nookies';

interface UserData {
  name: string;
  username: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
   
    const { name, username } = body as UserData;

    const userExist = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    if(userExist){
      return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
    }

    const user = await prisma.user.create({
      data:{
        name,
        username
      }
    })
    const response = NextResponse.json(user, { status: 201 });

    response.cookies.set('@ignitecall:userId', user.id, {
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao registrar usuário' }, { status: 500 });
  }
}
