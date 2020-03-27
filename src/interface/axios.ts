interface configInter {
  assToken?: string;
}
interface userLoginResponse {
  data:{
    assToken: string
  }
}


export {
  configInter,
  userLoginResponse
};
