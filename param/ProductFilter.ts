type category = 'women' | 'men' | 'kids';
type wSubCat = 'dress' | 'tops' | 'saree';
type mSubCat = 'tshirt' | 'jeans';
type kSubCat = 'dress' | 'tops';
type brands = 'polo' | 'hnm' | 'madame' | 'mast' | 'babyhug' | 'allen' | 'kookie' | 'biba';
export const mainCat: Record<category, RegExp> = {
    women: /Women/,
    men: /Men/,
    kids: /Kids/
}
export const wCat: Record<wSubCat, RegExp> = {
    dress: /Dress/,
    tops: /Tops/,
    saree: /Saree/
}
export const mCat: Record<mSubCat, RegExp> = {
    tshirt: /Tshirts/,
    jeans: /Jeans/
}
export const kCat: Record<kSubCat, RegExp> = {
    dress: /Dress/,
    tops: /Tops & Shirts/
}
export const brand: Record<brands, string> = {
    polo: 'Polo',
    hnm: 'H&M',
    madame: 'Madame',
    mast: 'Mast & Harbour',
    babyhug: 'Babyhug',
    allen: 'Allen Solly Junior',
    kookie: 'Kookie Kids',
    biba: 'Biba'
}
