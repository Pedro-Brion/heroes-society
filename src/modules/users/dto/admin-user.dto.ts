import { Equals, IsNotEmpty } from "class-validator";


export class ToggleUserAdminDTO {
  @IsNotEmpty()
  secret:string
}
