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
    `
}

export const endpoints = {
    eveBackend : 'http://localhost:8080/graphql'
}

