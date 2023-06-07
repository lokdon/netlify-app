import { Models } from 'appwrite';
import { UserFilesModel } from 'src/app/Models/UserFilesModel';

export abstract class IStorageBrokerService {
  abstract uploadUserFilesInBucketAsync(
    userId: string,
    bucketId: string,
    file: File
  ): Promise<boolean>;

  abstract getAllFilesOfUserByUserId(userId: string): Promise<UserFilesModel[]>;

  abstract getFileByFileIdAsync(fileId: string): Promise<Models.File>;
}
