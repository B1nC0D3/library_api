import {PrismaClient, User, Item, Role} from '@prisma/client';
import {UserService} from './classes/userService';
import {BookService} from "./classes/bookService";


const prisma = new PrismaClient()
const userService = new UserService(prisma)
const bookService = new BookService(prisma)


async function main() {
    // const adminUser: User = await createFirstUser()
    // const testUser = await userService.createUser(
    //     'Eric',
    //     'eric@email.com',
    //     adminUser)
    // console.log(testUser)
    const testUser = await userService.getUser(2)
    if (testUser){
        const hasNoPermissionUser = await userService.createUser(
            'Mark',
            'mark@email.com',
            testUser
        )
        console.log(hasNoPermissionUser)
    }


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


async function createFirstUser(): Promise<User> {
    return prisma.user.create({
        data: {
            username: 'admin',
            email: 'adm@adm.com',
            role: Role.ADMIN
        }
    })
}