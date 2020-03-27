interface siddBarInter {
  id: string | number;
  name: string;
  children?: siddBarInter[];
}
interface activeInter {
  id: string | number;
  text: string;
  createTime: string,
  userId: string | number
}
export { siddBarInter, activeInter }