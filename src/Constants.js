export const queries = {
    getOrdersStatsByRegion :` 
    query getOrdersStatsByRegion {
        getOrdersStatsByRegion(regionId: $regionId, typeId: $typeId, startDate: $startDate, endDate: $endDate,isBuyOrder: $isBuyOrder) {
            regionId
            typeId
            timeOfScraping
            isBuyOrders
            avgPrice
            volumeRemain
            highestPrice
            lowestPrice
            orderCount
            medianPrice
            stdDeviation
        }
    }
    `,getStructuresByRegion:
        `query GetStructuresByRegion {
            getStructuresByRegion(regionId: $regionId) {
                regionId
                structures {
                    id
                        name
                    }
            }
        }`
,
    getMarketDetails : `
    query GetMarketDetails {
        getMarketDetails {
        parentGroupId
        marketGroupId
        name
        marketItems {
            name
            groupId
            marketGroupId
            typeId
        }
        childGroups {
            parentGroupId
            marketGroupId
            name
            marketItems {
                name
                groupId
                marketGroupId
                typeId
            }
            childGroups {
                parentGroupId
                marketGroupId
                name
                marketItems {
                    name
                    groupId
                    marketGroupId
                    typeId
                }
                childGroups {
                    parentGroupId
                    marketGroupId
                    name
                    marketItems {
                        name
                        groupId
                        marketGroupId
                        typeId
                    }
                    childGroups {
                        parentGroupId
                        marketGroupId
                        name
                        marketItems {
                            name
                            groupId
                            marketGroupId
                            typeId
                        }
                        childGroups {
                            parentGroupId
                            marketGroupId
                            name
                            marketItems {
                                name
                                groupId
                                marketGroupId
                                typeId
                            }
                            childGroups {
                                parentGroupId
                                marketGroupId
                                name
                            }
                        }
                    }
                }
            }
        }
    }
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
    getAllItems : `
    query GetAllItems {
        getAllItems {
            key
            items {
                name
                id
            }
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
