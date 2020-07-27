export interface FolderStructure {
    errMessage: string;
    filePathsByPath: {
        createdOn: Date;
        description: string;
        responseMessage: string;
        fileType: string;
        id: string;
        path: string;
        name: string;
        validityFrom: string;
        validityTo: Date;
        versionable: boolean;
        responseStatus: string;
    };
    responseStatus: string;
}
