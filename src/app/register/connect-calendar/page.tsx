"use client";
import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Header } from "../styles";
import { ArrowRight, Check } from "phosphor-react";
import { AuthError, ConnectBox, ConnectItem } from "./styles";
import { useSession, signIn, signOut } from "next-auth/react"
import { useSearchParams } from "next/navigation"

export default function Register() {
    const session = useSession()
    const searchParams = useSearchParams()
    const hasAuthError = !!searchParams.get('error')

    const isSignedIn = session.status === 'authenticated'

    async function handleSignIn() {
        await signIn("google")
    }

    return (
        <Container>
            <Header>
                <Heading as="strong">Conecte sua agenda!</Heading>
                <Text>
                Conecte o seu calendário para verificar automaticamente as horas ocupadas e os novos eventos à medida em que são agendados.
                </Text>

                <MultiStep size={4} currentStep={2}/>
            </Header>
            <ConnectBox>
                <ConnectItem>
                    <Text>Google Calendar</Text>
             {
                isSignedIn ? 
                (
                    <Button  size="sm" disabled>
                        Conectado
                        <Check/>
                    </Button>         
                ):(
                    <Button variant="secondary" size="sm" onClick={handleSignIn}>
                        Conectar
                        <ArrowRight/>
                    </Button>
                )
             }
                </ConnectItem>

                {hasAuthError && (
                    <AuthError size="sm">
                        Falha ao se conectar ao Google, verifique se você habilitou as permissões de acesso ao Google Calendar.
                    </AuthError>
                )}
                <Button type="submit" disabled={!isSignedIn}>
                    Próximo passo
                    <ArrowRight/>
                </Button>
            </ConnectBox>
            
        </Container>
    )
}