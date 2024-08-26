const url = "https://api.coincap.io/v2"

function getAssets() {
    return fetch(`${url}/assets?limit=20`)
        .then(res => res.json())
        .then(res => res.data)
}

function getAsset(coin) {
    return fetch(`${url}/assets/${coin}`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            return res.data
        })
        .catch(error => {
            console.error("Error fetching asset:", error);
        });;
}

function getAssetHistory(coin) {
    const now = new Date()
    const end = now.getTime()
    now.setDate(now.getDate() - 1)
    const start = now.getTime()

    return fetch(`${url}/assets/${coin}/history?interval=h1&start=${start}&end=${end}`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            return res.data
        })
        .catch(error => {
            console.error("Error fetching asset history:", error);
        });;
}

function getMarkets(coin) {
    return fetch(`${url}/assets/${coin}/markets?limit=5`)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            return res.data
        })
        .catch(error => {
            console.error("Error fetching asset markets:", error);
        });;
}

function getExchange(id) {
    console.log("Buscando")
    return fetch(`${url}/exchanges/${id}`)
        .then(res => res.json())
        .then(res => {
            console.log("Respuesta: ", res);
            return res.data
        })
        .catch(error => {
            console.error("Error fetching exchanges:", error);
        });;
}

export default {
    getAssets,
    getAsset,
    getAssetHistory,
    getMarkets,
    getExchange
}