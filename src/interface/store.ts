interface userInfoInter {
  id: string | number;
  userNick: string;
  userName?: string;
  password?: string;
  createTime: string;
  activeNum: number;
  canEdit?: boolean;
  canCommon?: true;
  userAgent?: string;
  adminUser?: boolean;
}

interface adminUserInfoInter {
  id: string | number;
  userNick: string;
  userName?: string;
  password?: string;
  createTime: string;
  activeNum: number;
  canEdit?: boolean;
  canCommon?: true;
  userAgent?: string;
  adminUser?: boolean;
  cover?:string
}
interface userStore {
  userInfo: userInfoInter;
  token: string;
}
interface stateinter {
  userStore: userStore;
}

export {
  stateinter,
  userStore,
  adminUserInfoInter
};
