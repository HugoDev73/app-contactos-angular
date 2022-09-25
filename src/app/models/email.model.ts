export class Email {
    public emailId?:number;
    public emailValue: string;
 
    constructor(emailValue:string, emailId:number) {
        this.emailId = emailId;
        this.emailValue = emailValue;
    }

}

export interface InputEmail{
    data: any
    emailOutput:any
}