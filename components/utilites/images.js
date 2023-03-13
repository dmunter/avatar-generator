

const images = {}
const womanStyles ={}
const manStyles = {}

function importAll(r) {
    r.keys().forEach(key => (images[key] = r(key)));
}
function importWomanStyles(r) {
    r.keys().forEach(key => (womanStyles[key] = r(key)));
}
function importManStyles(r) {
    r.keys().forEach(key => (manStyles[key] = r(key)));
}
importAll(require.context('../../public/trainedimages/tara', true, /\.(png|jpe?g|svg)$/));
importWomanStyles(require.context('../../public/woman_styles', true, /\.(png|jpe?g|svg)$/));
importManStyles(require.context('../../public/man_styles', true, /\.(png|jpe?g|svg)$/));

export {images}
export { womanStyles} ;
export { manStyles }