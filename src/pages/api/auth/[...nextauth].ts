
import { PrismaAdapter } from "@/lib/auth/prisma-adapter";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { Account, NextAuthOptions } from "next-auth"
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google"

export function buildNextAuthOption(
    req: NextApiRequest,
    res: NextApiResponse
): NextAuthOptions{
  return {
    adapter: PrismaAdapter(req, res),
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        authorization:{
            params:{
            scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar',
            }
        },
        profile(profile: GoogleProfile){
          /* mapeia os campos internos do next-auth com perfil retornado do google*/
          return {
            id: profile.sub,
            name: profile.name,
            username: '',
            email: profile.email,
            avatar_url: profile.picture,
          }
        }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,

    callbacks:{
        async signIn({ account }: { account: Account | null }){
          if (!account || !account.scope?.includes('https://www.googleapis.com/auth/calendar')) {
              return '/register/connect-calendar/?error=permissions';
          }

          return true;
        },
        async session({session, user}){
          return {
            ...session,
            user,
          }
        }
    }
  }
}


export default async function auth(req: NextApiRequest, res: NextApiResponse){
  return await NextAuth(req, res, buildNextAuthOption(req, res))
}

