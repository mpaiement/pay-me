import { Injectable } from "@nestjs/common";

@Injectable()
export class MarchandService{
    getMarchand(){
        return "Route de get du Marchand"
    }
    createMarchand(){
        return "nom du Marchand"
    
        }
    deleteMarchand(){
        return " le Marchand est supprimé"
       }
    upDateMarchand(){
        return "modifier les Marchand"
       }
    
}
   


