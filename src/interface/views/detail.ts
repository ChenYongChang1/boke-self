interface siddBarInter {
  id: string | number;
  name: string;
  mdId: string | number;
  isdelete?: boolean;
  childrens?: siddBarInter[];
}
interface activeInter {
  id: string | number;
  text: string;
}

interface activeDetailInter {
  id: string | number;
  title: string;
  cover: string;
  createTime: string;
  userId: string;
  lookNum: number;
  userNick:string;
  toTop: true;
  catalog?: siddBarInter[];
}

interface activesCommon {
  id: string | number;
  mdId: string | number;
  text: string;
  createTime: string;
  userId: string | number;
  userNick: string;
  editFlag: boolean;
  childrensShow: boolean;
  childrens?: activesCommon[];
}

export { siddBarInter, activeInter, activeDetailInter, activesCommon };
