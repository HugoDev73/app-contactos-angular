export class Tag {
    public tagId?:number;
    public tagValue: string;
 
    constructor(tagId:number, tagValue:string) {
        this.tagId = tagId;
        this.tagValue = tagValue;
    }

}