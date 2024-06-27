export const queries = {
    getOrdersMeanInRegion :` 
    query getOrdersMeanInRegion {
        getOrdersMeanInRegion(regionId: $regionId, typeId: $typeId, startDate: $startDate, endDate: $endDate,isBuyOrder: $isBuyOrder) {
            regionId
            typeId
            timeOfScraping
            isBuyOrders
            avgPrice
            volumeRemain
            locationId
            highestPrice
            lowestPrice
            orderCount
        }
    }
    `,
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
    eveBackend : 'http://localhost:8060/graphql',
    eveTech : 'https://esi.evetech.net/'
}

export const dateFormat = 'YYYY-MM-DD HH:mm';
