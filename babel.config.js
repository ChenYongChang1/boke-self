// module.exports = {
//   presets: ["@vue/cli-plugin-babel/preset"],
//   plugins: [
//     [
//       "import",
      
//     ] // `style: true` 会加载 less 文件
//   ]
// };
module.exports = {
  "presets": [
    "@vue/app"
  ],
  "plugins": [
    [
      "component",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: false },
      "syntax-dynamic-import"
    ]
  ]
}