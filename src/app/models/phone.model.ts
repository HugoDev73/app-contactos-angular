export class Phone{
    public phoneId!:number;
    public phoneValue:string;
    public phoneType:string;
    public icon!:string;

    constructor(phoneId:number, phoneValue:string, phoneType:string, icon:string){
        this.phoneId = phoneId;
        this.phoneValue = phoneValue;
        this.phoneType = phoneType;
        this.icon = icon
    }
}