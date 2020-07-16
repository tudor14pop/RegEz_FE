export interface FolderStructure {
    errMessage: string;
    filePathsByPath: {
        createdOn: Date;
        description: string;
        errorMessage: string;
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
