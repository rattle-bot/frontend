export const getHashCheckDataString = (initData: string) => {
    const initDataURLSP = new URLSearchParams(initData)
    const hash = initDataURLSP.get('hash') || ''
    initDataURLSP.delete('hash')
    initDataURLSP.sort()
    const checkDataString = initDataURLSP.toString().replaceAll('&', '\n')

    return {
        hash,
        checkDataString,
    }
}
