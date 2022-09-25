export interface ResponseContact {
    succeed:         boolean;
    statusCode:      number;
    code:            number;
    result:          Result;
    message:         string;
    friendlyMessage: string[];
    error:           string;
    created:         string;
}

 interface Result {
    list:  List[];
    count: number;
}

 interface List {
    contactId:        number;
    contactFirstName: string;
    contactLastName:  string;
    contactCompany:   string;
    contactBirthday:  Date;
    contactNotes:     string;
    contactAlias:     string;
    contactPhoto:     string;
    contactEmails:    ContactEmail[];
    contactTags:      ContactTag[];
    contactPhones:    ContactPhone[];
}

 interface ContactEmail {
    emailId:    number;
    emailValue: string;
}

 interface ContactPhone {
    phoneId:    number;
    phoneValue: string;
    phoneType:  PhoneType;
}

 enum PhoneType {
    Mobile = "mobile",
    Phone = "phone",
    Whatsapp = "whatsapp",
}

 interface ContactTag {
    tagId:    number;
    tagValue: string;
}
