import { Client, Models } from "appwrite";
import { LoginModel, LoginResponseModel, RegisterUserModel } from "src/app/Models/AccountModel";
import { ApiResponseModel } from "src/app/Models/ResultModel";

export abstract class IUSerAccountService
{

    abstract loginUserAsync(loginModel:LoginModel):Promise<ApiResponseModel<LoginResponseModel>>

    abstract logOutUserAsync():Promise<boolean>;

    abstract generateJwtTokenAsync():Promise<Models.Jwt>

    abstract registerUserAsync(model:RegisterUserModel):Promise<ApiResponseModel<boolean>>
}