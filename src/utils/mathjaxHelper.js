const renderOption = {
  em: 16,
  ex: 8,
  containerWidth: 579,
  display: true,
  scale: 1,
  lineWidth: 1000000,
}
export const getSvgElementFromLatex = (value) => {
  //MATHJAX LOAD FROM LIB FILE
  const element = MathJax?.tex2svg(value, renderOption)
  return element?.firstElementChild
}
