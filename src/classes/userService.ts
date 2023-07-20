import {PrismaClient} from "prisma/prisma-client/scripts/default-index";

class UserService implements IUserService<PrismaClient, User> {
    db: PrismaClient

    isAdmin(user: User) {
        if (user.role !== Roles.ADMIN) {
            throw new Error('You are not a admin')
        }
    }

    createUser(username: string, email: string, user: User, role?: Roles): User {
        this.isAdmin(user)
        return this.db.user.create({
            data: {
                username: username,
                email: email,
                role: role
            }
        })
    }

    deleteUser(user_id: number, user: User): void {
        this.isAdmin(user)
        this.db.user.delete({
            where: {
                id: user_id
            }
        })
    }

    getAllUsers(): User[] {
        return this.db.user.findMany()
    }

    updateUser(user_id: number, updated_data: object, user: User): User {
        this.isAdmin(user)
        return this.db.user.update({
            where: {
                id: user_id
            },
            data: updated_data
        })
    }

    addToFavorite(user: User, item: Book): void {
        this.db.userFavorite.create({
            data: {
                userId: user.id,
                itemId: item.id
            }
        })
    }
}