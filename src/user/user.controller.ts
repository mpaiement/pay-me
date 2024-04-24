import { Controller, Get ,Post , Delete , Put} from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("login")
    getUser():string
    {
        return this.userService.getUser()
    }

    @Post("postuser")
    createUser(): string {
    return this.userService.createUser()
  }
    @Delete("deleteUser")
    deleteUser(): string {
        return this.userService.deleteUser()
    }
    @Put("putUser")
    upDateUser(): string {
        return this.userService.upDateUser()
    }
  
}

