import { Account, Models } from "appwrite";

export abstract class IUserBrokerService
{
    abstract getCurrentLoggedInUserIdAsync():Promise<string>
    abstract getCurrentLoggedInUserAccountAsync():Promise<Models.Preferences | void>
}