interface catalogInter {
  id: string | number;
  name: string;
  mdId: string | number;
  childrens?: catalogInter[];
}

interface activeInter {
  id: string | number;
  title: string;
  cover: string;
  createTime: string;
  userId: string;
  lookNum: number;
  toTop: true;
  describe?: string;
  catalog?: catalogInter[];
}
interface screenTimeInter {
  id: number;
  name: string;
}
export { activeInter, screenTimeInter };
