const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({ log: [{emit: 'event', level: 'query'}]})
prisma.$on('query', e => {
  console.log('Query: ' + e.query + ' ' + e.params)
})

async function main() {
  console.log('start insertion');
  try {
    await prisma.userWallet.create({
      data: {
        id: '' + Math.random(),
        user_id: 'a string test with \n character or other special char "!@#$%^&*() ',
      },
    });
  } catch (e) { console.log('Error: ', e); }
  console.log('end insertion');
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })