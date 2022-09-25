export class User {
    public userId!: number;
    public userFullName: string;
    public userName: string;
    public userPassword: string;
    public userEmail: string;
    public userPhoto: string;

    constructor(userId: number,
        userFullName: string,
        userName: string,
        userPassword: string,
        userEmail: string,
        userPhoto: string) {
        this.userId = userId;
        this.userFullName = userFullName;
        this.userName = userName;
        this.userPassword = userPassword;
        this.userEmail = userEmail;
        this.userPhoto = userPhoto;
    }

}
