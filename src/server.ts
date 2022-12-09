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

    // Get all users
    fastify.get('/users', async () => {
        const users = await prisma.user.findMany()
        return { users }
    })

    // Get a specific user
    fastify.get('/users/:id', async (request, reply) => {
        // Read the user with the specified ID
        const { id } = request.params
        const user = await prisma.user.findOne({ where: { id: Number(id) } })

        return { user }
        // Read the user with the specified ID
    })

    // Create a new user
    fastify.post('/users', async (request, reply) => {
        // Create a new user using the data from the request body
    })

    // Update an existing user
    fastify.post('/users/:id/update', async (request, reply) => {
        // Update the user with the specified ID using the data from the request body
    })

    // Delete an existing user
    fastify.post('/users/:id/delete', async (request, reply) => {
        // Delete the user with the specified ID
    })

    // Get all clients
    fastify.get('/clients', async () => {
        const clients = await prisma.client.findMany()
        return { clients }
    })

    // Get a specific client
    fastify.get('/clients/:id', async (request, reply) => {
    // Read the client with the specified ID
        const { id } = request.params
        const client = await prisma.client.findMany({ where: { id: Number(id) } })

        return { client }
    })

    // Create a new client
    fastify.post('/clients', async (request, reply) => {
        // Read the client data from the request body
        const { name, lastName, phone, email, address, notes } = request.body

        // Create a new client using the data from the request body
        const client = await prisma.client.create({
            data: {
            name,
            lastName,
            phone,
            email,
            address,
            notes,
            },
        })

        return { client }
    })

    // Update an existing client
    fastify.put('/clients/:id', async (request, reply) => {
        // Read the client data from the request body
        const { name, lastName, phone, email, address, notes } = request.body

        // Update the client with the specified ID
        const { id } = request.params
        const updatedClient = await prisma.client.update({
            where: { id: Number(id) },
            data: {
            name,
            lastName,
            phone,
            email,
            address,
            notes,
            },
        })

        return { client: updatedClient }
    })
    fastify.delete('/clients/:id', async (request, reply) => {
        // Delete the client with the specified ID
        const { id } = request.params
        const deletedClient = await prisma.client.delete({ where: { id: Number(id) } })
    })
    // Get all services
    fastify.get('/services', async () => {
        const services = await prisma.service.findMany()
        return { services }
    })

    // Get a specific service
    fastify.get('/services/:id', async (request, reply) => {
        // Read the service with the specified ID

    })

    // Create a new service
    fastify.post('/services', async (request, reply) => {
        // Create a new service using the data from the request body
            const { appointmentDate, value, payType, serviceAddress, isPaid, description, serviceClientId } = request.body;

        // Convert appointmentDate and value to correct data types
        const appointmentDateNum = new Date(appointmentDate);
        const valueNum = parseInt(value, 10);
        const serviceClientIdNum = parseInt(serviceClientId, 10);

        // Create an empty data object
        const data = {};

        // If the serviceClient property exists in the request body, create a new client with the given id
        if (serviceClientId) {
            const serviceClientIdNum = parseInt(serviceClientId, 10);
            // Send a GET request to the /clients route with the serviceClient.id property
            // This will retrieve the client with the given id

            // const response = await fetch(`http://127.0.0.1:4343/clients/${serviceClient.id}`);
            // const client = await response.json();

            // Add the retrieved client to the data object
            data.serviceClient = {
                connect: { id: serviceClientIdNum }
            };
        } else {
            const serviceClientIdNum = parseInt(serviceClientId, 10);
        // If the serviceClientId property does not exist, create a new client for the new service
            data.serviceClient = {
                create: {}
            };
    }

        // Add the other properties to the data object
        data.appointmentDate = appointmentDateNum;
        data.value = valueNum;
        data.payType = payType;
        data.serviceAddress = serviceAddress;
        data.isPaid = isPaid;
        data.description = description;

        // Create a new service
        const newService = await prisma.service.create({
            data: data,
        });

        return { service: newService };
    });





    // Update an existing service
    fastify.post('/services/:id/update', async (request, reply) => {
        // Update the service with the specified ID using the data from the request body
    })

    // Delete an existing service
    fastify.post('/services/:id/delete', async (request, reply) => {
        // Delete the service with the specified ID
    })

    // Get all events
    // fastify.get('/events', async () => {
    //     const events = await prisma.event.findMany()
    //     return { events }
    // })

    // Get a specific event
    fastify.get('/events/:id', async (request, reply) => {
        // Read the event with the specified ID
    })

    // Create a new event
    fastify.post('/events', async (request, reply) => {
        // Create a new event using the data from the request body
    })

    // Update an existing event
    fastify.post('/events/:id/update', async (request, reply) => {
        // Update the event with the specified ID using the data from the request body
    })

    // Delete an existing event
    fastify.post('/events/:id/delete', async (request, reply) => {
        // Delete the event with the specified ID
    })

    // Get all expenses
    fastify.get('/expenses', async () => {
        const expenses = await prisma.expense.findMany()

        return { expenses }
    })

    // Get a specific expense
    fastify.get('/expenses/:id', async (request, reply) => {
        // Read the expense with the specified ID
        const { id } = request.params
        const expense = await prisma.expense.findOne({ where: { id: Number(id) } })

        return { expense }
    })

    // Create a new expense
    fastify.post('/expenses', async (request, reply) => {
        // Read the expense data from the request body
        const { value, category, dateOfPay, payType, isPaid, notes } = request.body

        // Create the new expense
        const expense = await prisma.expense.create({
            data: {
                value,
                category,
                dateOfPay,
                payType,
                isPaid,
                notes,
            },
        })

        return { expense }
    })

    // Update an existing expense
    fastify.put('/expenses/:id', async (request, reply) => {
        // Read the expense data from the request body
        const { value, category, dateOfPay, payType, isPaid, notes } = request.body

        // Update the expense with the specified ID
        const { id } = request.params
        const updatedExpense = await prisma.expense.update({
            where: { id: Number(id) },
            data: {
                value,
                category,
                dateOfPay,
                payType,
                isPaid,
                notes,
            },
        })

        return { expense: updatedExpense }
    })

    // Delete an existing expense
    fastify.delete('/expenses/:id', async (request, reply) => {
        // Delete the expense with the specified ID
        const { id } = request.params
        await prisma.expense.delete({ where: { id: Number(id) } })

        return { success: true }
    })

    fastify.listen(4343, (err) => {
    if (err) throw err
    console.log('Server listening on http://localhost:4343')
    })
}

bootstrap()