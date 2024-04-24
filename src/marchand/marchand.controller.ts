import { Controller, Get ,Post , Delete , Put} from "@nestjs/common";
import { MarchandService } from "./marchand.service";

@Controller("marchand")
export class MarchandController {
    constructor(private readonly marchandService: MarchandService) {}

    @Get("getMarchand")
    getMarchand():string
    {
        return this.marchandService.getMarchand()
    }

    @Post("postMarchand")
    createMarchand(): string {
    return this.marchandService.createMarchand()
  }
    @Delete("deleteMarchand")
    deleteMarchand(): string {
        return this.marchandService.deleteMarchand()
    }
    @Put("putMarchand")
    upDateMarchand(): string {
        return this.marchandService.upDateMarchand()
    }
  
}

