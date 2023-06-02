import { GroupEntity, GroupModel } from "src/app/Models/GroupModel";
import { ApiResponseModel } from "src/app/Models/ResultModel";

export abstract class IGroupBrokerService
{
    abstract createGroupForUserAsync(groupModel:GroupModel):Promise<ApiResponseModel<GroupModel>>;

    abstract getGroupByUserIdAsync(userId:string):Promise<ApiResponseModel<GroupModel>>;

    abstract getGroupListByUserIdAsync(userId:string):Promise<ApiResponseModel<GroupModel[]>>;

    abstract getGroupByRecordIdAsync(recordId:string):Promise<ApiResponseModel<GroupModel>>;

    abstract deleteGroupByRecordIdAsync(recordId:string):Promise<ApiResponseModel<boolean>>;


}