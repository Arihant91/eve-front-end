export const queries = {
    getMarketDetails : `
    query GetMarketDetails {
        getMarketDetails
    }
    `,
    getRegions : `
    query GetRegions {
        getRegions {
            category
            id
            name
        }
    }
    `,
    getMarketData :`
    
    `
}

export const restQuery = {
    getMarketItem: 'markets/'
}

export const restVersion = {
    latest: 'latest/'
}

export const endpoints = {
    eveBackend : 'http://localhost:8080/graphql',
    eveTech : 'https://esi.evetech.net/'
}

export const dateFormat = 'YYYY-MM-DD HH:mm';
