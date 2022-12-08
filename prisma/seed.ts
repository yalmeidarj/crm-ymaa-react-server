import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {
    const client = await prisma.Client.create({
        data: {
            // id: 434,
            name: 'Fulano',
            lastName: 'De Tal',
            phone: '123456789',
            email: 'testdfadfasd@email.com',
            address: 'Rua dos testes 185, Botafogo - 95021456',
            notes: 'testando notes and other studff adhjajsldjkfa lksdjfal;jds flakjdsl;falkjsdfaljsd',
            // services: [],
        }
    })
    const service = await prisma.Service.create({
        data: {
            id: 343,
            appointmentDate: "2022-11-28T15:22:41.040Z",
            value: 1500,
            payType:'Cash',
            serviceAddress:'Rua do Rio de Janeiro 455, ',
            isPaid:'True',
            description:'testando notes and other studff adhjajsldjkfa lksdjfal;jds flakjdsl;falkjsdfaljsd',
            // serviceClient: client,
            serviceClientId: client.id,
        }
    })
}

main()

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  // Define the seed data
  const seedData = [
    {
      username: 'admin',
      password: 'password',
    },
    {
      name: 'John',
      lastName: 'Doe',
      phone: '123-456-7890',
      email: 'john.doe@example.com',
      address: '123 Main St',
      notes: 'Some notes about John Doe',
    },
    {
      appointmentDate: new Date('2022-01-01'),
      value: 100,
      payType: 'cash',
      serviceAddress: '123 Main St',
      isPaid: true,
      description: 'Some description of the service',
      serviceClient: {
        connect: {
          email: 'john.doe@example.com',
        },
      },
    },
    {
      value: 50,
      category: 'Groceries',
      dateOfPay: new Date('2022-02-01'),
      payType: 'credit',
      isPaid: true,
      notes: 'Some notes about the expense',
    },
  ]
}

seed().finally(async () => {
  await prisma.disconnect()
})
