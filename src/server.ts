import Fastify from 'fastify'
import cors from '@fastify/cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['query']
})
async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    })
     
    await fastify.register(cors, {
        origin: true,
    })

    fastify.get('/services', async () => {
        const services = await prisma.service.findMany()
        // for (const service.id of services) {
        //     console.log ("Block statement execution no." + i);
        // }
        
        return { services }        
    })

    fastify.get('/clients', async () => {
        const clients = await prisma.client.findMany()
        // for (const client of clients) { 
        //     client.id,                
        // }

        // const client = [clients[0].lastName,]
        return { clients }        
    })    

    fastify.get('/expenses', async () => {
        const expenses = await prisma.expense.findMany()

        return { expenses }        
    })

    fastify.get('/users', async () => {
        const users = await prisma.user.findMany()

        return { users }        
    })    
    await fastify.listen({ port: 4343 });
}

bootstrap()