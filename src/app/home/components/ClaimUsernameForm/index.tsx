"use client";
import { Button, TextInput, Text } from "@ignite-ui/react";
import { Form } from "./styles";
import {ArrowRight} from  'phosphor-react'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormAnnotation } from "../../styles";

import { useRouter } from 'next/navigation';

const claimUsernameFormSchema = z.object({
    username: z
    .string()
    .min(3, { message: 'O usuário precisa ter no minimo 3 letras'})
    .regex(/^([a-z\\-]+)$/i, {message: 'Apenas letras e hifens são permitidos'})
    .transform(username => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>;

export function ClaimUsernameForm(){

    const {register, handleSubmit, formState: { errors, isSubmitting }} = useForm<ClaimUsernameFormData>({
        resolver: zodResolver(claimUsernameFormSchema),
    });

    const router = useRouter()

    async function handleClaimUsername(data: ClaimUsernameFormData){
        const { username } = data;

        await router.push(`/register?username=${username}`)
    }

    return (
        <>
            <Form as="form" onSubmit={handleSubmit(handleClaimUsername)}>
                <TextInput
                    size="sm"
                    prefix="ignite.com/"
                    placeholder="seu-usuario"
                    {...register('username')}    
                />
                <Button size="sm" type="submit" disabled={isSubmitting}>
                    Reservar
                    <ArrowRight />
                </Button>
            </Form>
            <FormAnnotation>
                <Text size="sm">
                    {errors.username ? errors.username.message : 'Digite o nome de usuário desejado'}
                </Text>
            </FormAnnotation>
        </>
    )
}