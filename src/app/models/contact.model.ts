import { Email } from "./email.model";
import { Phone } from "./phone.model";
import { Tag } from "./tag.model";

export class Contact {
    public contactId!: number;
    public contactFirstName: string;
    public contactLastName: string;
    public contactCompany: string;
    public contactBirthday: string;
    public contactNotes: string;
    public contactAlias: string;
    public contactPhoto: string;
    public contactEmails: Email[];
    public contactTags: Tag[];
    public contactPhones: Phone[];

    constructor(contactId: number, contactFirstName: string, contactLastName: string, contactCompany: string, contactBirthday: string, contactNotes: string, contactAlias: string, contactPhoto: string, contactEmails: Email[], contactTags: Tag[], contactPhones: Phone[]) {
        this.contactId = contactId;
        this.contactFirstName = contactFirstName;
        this.contactLastName = contactLastName;
        this.contactCompany = contactCompany;
        this.contactBirthday = contactBirthday;
        this.contactNotes = contactNotes;
        this.contactAlias = contactAlias;
        this.contactPhoto = contactPhoto;
        this.contactEmails = contactEmails;
        this.contactTags = contactTags;
        this.contactPhones = contactPhones;
    }


}