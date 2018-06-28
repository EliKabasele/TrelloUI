export namespace Trello {

  export interface TotalPerMember {
    status: string;
    disableAt: number;
    warnAt: number;
  }

  export interface Boards {
    id: string;
    name: string;
    totalPerMember: TotalPerMember;
  }

  export interface TotalPerMember2 {
    status: string;
    disableAt: number;
    warnAt: number;
  }

  export interface Cards {
    id: string;
    name: string;
    badges: object;
    dueComplete: boolean;
    due?: string;
    desc?: string;
    idMembers?: object;
    idBoard?: string;
    idList?: string;
  }

  export interface Lists {
    id: string;
    name: string;
    idBoard: string;
  }

  export interface Orgs {
    totalPerMember: TotalPerMember2;
  }

  export interface Limits {
    boards: Boards;
    orgs: Orgs;
  }

  export interface MarketingOptIn {
    optedIn: boolean;
    date: Date;
  }

  export interface Prefs {
    sendSummaries: boolean;
    minutesBetweenSummaries: number;
    minutesBeforeDeadlineToNotify: number;
    colorBlind: boolean;
    locale: string;
  }

  export interface User {
    id: string;
    avatarHash: string;
    avatarUrl: string;
    bio: string;
    bioData?: any;
    confirmed: boolean;
    fullName: string;
    idEnterprisesDeactivated: any[];
    idPremOrgsAdmin: any[];
    initials: string;
    memberType: string;
    products: any[];
    status: string;
    url: string;
    username: string;
    avatarSource: string;
    email?: any;
    gravatarHash: string;
    idBoards: string[];
    idEnterprise?: any;
    idOrganizations: any[];
    idEnterprisesAdmin: any[];
    limits: Limits;
    loginTypes?: any;
    marketingOptIn: MarketingOptIn;
    messagesDismissed: any[];
    oneTimeMessagesDismissed: string[];
    prefs: Prefs;
    trophies: any[];
    uploadedAvatarHash: string;
    uploadedAvatarUrl: string;
    premiumFeatures: any[];
    idBoardsPinned?: any;
  }

}
