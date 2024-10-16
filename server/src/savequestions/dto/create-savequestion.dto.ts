import { IsEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateSavequestionDto {
    @IsEmpty({message: "You cannot pass reader Id"})
    readonly question_id:mongoose.Schema.Types.ObjectId
}
