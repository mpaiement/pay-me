import { Controller, Get ,Post , Delete , Put} from "@nestjs/common";
import { TransactionService } from "./transaction.service";

@Controller("transaction")
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Get("getTransaction")
    getTransaction():string
    {
        return this.transactionService.getTransaction()
    }

    @Post("postTransaction")
    createTransaction(): string {
    return this.transactionService.createTransaction()
  }
    @Delete("deleteTransaction")
    deleteTransaction(): string {
        return this.transactionService.deleteTransaction()
    }
    @Put("putTransaction")
    upDateTransaction(): string {
        return this.transactionService.upDateTransaction()
    }
  
}
