import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService{
    getUser(){
        return "Route de login"
    }
    createUser(){
        return "nom du username"
    
        }
    deleteUser(){
        return " le user est supprimé"
       }
    upDateUser(){
        return "modification du username"
       }
    
}
   


