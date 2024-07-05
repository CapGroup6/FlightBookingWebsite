import React, { useState } from 'react';
import Header from '../components/Common/Header';
import SearchForm from '../components/Common/SearchForm';
import BackgroundPicture from '../components/Common/BackgroundPicture';
import DateExpansion from '../components/Result/DateExpansion';
import ResultCard from '../components/Result/ResultsCard';
import styles from '../styles/Home.module.css'; 
import ResultRightLogic from '../components/Result/ResultRightLogic';



function test() {
  
  const matchingItineraries = [
    {
        "type": "flight-offer",
        "id": "1",
        "source": "GDS",
        "instantTicketingRequired": false,
        "nonHomogeneous": false,
        "oneWay": false,
        "lastTicketingDate": "2024-07-06",
        "numberOfBookableSeats": 7,
        "itineraries": [
            {
                "duration": "PT20H27M",
                "segments": [
                    {
                        "departure": {
                            "iataCode": "SDY",
                            "at": "2024-12-01T17:13:00",
                            "cityName": "SIDNEY"
                        },
                        "arrival": {
                            "iataCode": "BIL",
                            "at": "2024-12-01T19:05:00",
                            "cityName": "BILBAO"
                        },
                        "number": "1776",
                        "aircraft": {
                            "code": "T12"
                        },
                        "duration": "PT1H52M",
                        "id": "1",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "CAPE AIR"
                    },
                    {
                        "departure": {
                            "iataCode": "BIL",
                            "at": "2024-12-02T07:00:00",
                            "cityName": "BILBAO"
                        },
                        "arrival": {
                            "iataCode": "DEN",
                            "at": "2024-12-02T08:43:00",
                            "cityName": "DENVER"
                        },
                        "number": "671",
                        "aircraft": {
                            "code": "739"
                        },
                        "duration": "PT1H43M",
                        "id": "2",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "UNITED AIRLINES"
                    },
                    {
                        "departure": {
                            "iataCode": "DEN",
                            "at": "2024-12-02T11:16:00",
                            "cityName": "DENVER"
                        },
                        "arrival": {
                            "iataCode": "ONT",
                            "terminal": "2",
                            "at": "2024-12-02T12:40:00",
                            "cityName": "LOS ANGELES"
                        },
                        "number": "430",
                        "aircraft": {
                            "code": "738"
                        },
                        "duration": "PT2H24M",
                        "id": "3",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "UNITED AIRLINES"
                    }
                ]
            },
            {
                "duration": "PT18H13M",
                "segments": [
                    {
                        "departure": {
                            "iataCode": "ONT",
                            "terminal": "2",
                            "at": "2024-12-10T13:42:00",
                            "cityName": "LOS ANGELES"
                        },
                        "arrival": {
                            "iataCode": "DEN",
                            "at": "2024-12-10T17:02:00",
                            "cityName": "DENVER"
                        },
                        "number": "745",
                        "aircraft": {
                            "code": "319"
                        },
                        "duration": "PT2H20M",
                        "id": "4",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "UNITED AIRLINES"
                    },
                    {
                        "departure": {
                            "iataCode": "DEN",
                            "at": "2024-12-10T19:20:00",
                            "cityName": "DENVER"
                        },
                        "arrival": {
                            "iataCode": "BIL",
                            "at": "2024-12-10T20:55:00",
                            "cityName": "BILBAO"
                        },
                        "number": "1884",
                        "aircraft": {
                            "code": "739"
                        },
                        "duration": "PT1H35M",
                        "id": "5",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "UNITED AIRLINES"
                    },
                    {
                        "departure": {
                            "iataCode": "BIL",
                            "at": "2024-12-11T07:12:00",
                            "cityName": "BILBAO"
                        },
                        "arrival": {
                            "iataCode": "SDY",
                            "at": "2024-12-11T08:55:00",
                            "cityName": "SIDNEY"
                        },
                        "number": "1775",
                        "aircraft": {
                            "code": "T12"
                        },
                        "duration": "PT1H43M",
                        "id": "6",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "CAPE AIR"
                    }
                ]
            }
        ],
        "price": {
            "currency": "EUR",
            "total": 1164.94,
            "base": 998,
            "fees": [
                {
                    "amount": 0,
                    "type": "SUPPLIER"
                },
                {
                    "amount": 0,
                    "type": "TICKETING"
                }
            ],
            "grandTotal": 1164.94
        },
        "pricingOptions": {
            "includedCheckedBagsOnly": false,
            "fareType": [
                "PUBLISHED"
            ],
            "refundableFare": false,
            "noRestrictionFare": false,
            "noPenaltyFare": false
        },
        "validatingAirlineCodes": [
            "UA"
        ],
        "travelerPricings": [
            {
                "travelerId": "1",
                "fareOption": "STANDARD",
                "travelerType": "ADULT",
                "price": {
                    "currency": "EUR",
                    "total": 582.47,
                    "base": 499,
                    "grandTotal": 0
                },
                "fareDetailsBySegment": [
                    {
                        "segmentId": "1",
                        "cabin": "ECONOMY",
                        "fareBasis": "VCIP",
                        "class": "V",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "2",
                        "cabin": "ECONOMY",
                        "fareBasis": "QAA7AFEN",
                        "class": "Q",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "3",
                        "cabin": "ECONOMY",
                        "fareBasis": "QAA7AFEN",
                        "class": "Q",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "4",
                        "cabin": "ECONOMY",
                        "fareBasis": "LAA2PFDN",
                        "class": "L",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "5",
                        "cabin": "ECONOMY",
                        "fareBasis": "LAA2PFDN",
                        "class": "L",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "6",
                        "cabin": "ECONOMY",
                        "fareBasis": "VCIP",
                        "class": "V",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    }
                ]
            },
            {
                "travelerId": "2",
                "fareOption": "STANDARD",
                "travelerType": "ADULT",
                "price": {
                    "currency": "EUR",
                    "total": 582.47,
                    "base": 499,
                    "grandTotal": 0
                },
                "fareDetailsBySegment": [
                    {
                        "segmentId": "1",
                        "cabin": "ECONOMY",
                        "fareBasis": "VCIP",
                        "class": "V",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "2",
                        "cabin": "ECONOMY",
                        "fareBasis": "QAA7AFEN",
                        "class": "Q",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "3",
                        "cabin": "ECONOMY",
                        "fareBasis": "QAA7AFEN",
                        "class": "Q",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "4",
                        "cabin": "ECONOMY",
                        "fareBasis": "LAA2PFDN",
                        "class": "L",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "5",
                        "cabin": "ECONOMY",
                        "fareBasis": "LAA2PFDN",
                        "class": "L",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "6",
                        "cabin": "ECONOMY",
                        "fareBasis": "VCIP",
                        "class": "V",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    }
                ]
            }
        ]
    },
    {
        "type": "flight-offer",
        "id": "2",
        "source": "GDS",
        "instantTicketingRequired": false,
        "nonHomogeneous": false,
        "oneWay": false,
        "lastTicketingDate": "2024-07-06",
        "numberOfBookableSeats": 7,
        "itineraries": [
            {
                "duration": "PT20H27M",
                "segments": [
                    {
                        "departure": {
                            "iataCode": "SDY",
                            "at": "2024-12-01T17:13:00",
                            "cityName": "SIDNEY"
                        },
                        "arrival": {
                            "iataCode": "BIL",
                            "at": "2024-12-01T19:05:00",
                            "cityName": "BILBAO"
                        },
                        "number": "1776",
                        "aircraft": {
                            "code": "T12"
                        },
                        "duration": "PT1H52M",
                        "id": "1",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "CAPE AIR"
                    },
                    {
                        "departure": {
                            "iataCode": "BIL",
                            "at": "2024-12-02T07:00:00",
                            "cityName": "BILBAO"
                        },
                        "arrival": {
                            "iataCode": "DEN",
                            "at": "2024-12-02T08:43:00",
                            "cityName": "DENVER"
                        },
                        "number": "671",
                        "aircraft": {
                            "code": "739"
                        },
                        "duration": "PT1H43M",
                        "id": "2",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "UNITED AIRLINES"
                    },
                    {
                        "departure": {
                            "iataCode": "DEN",
                            "at": "2024-12-02T11:16:00",
                            "cityName": "DENVER"
                        },
                        "arrival": {
                            "iataCode": "ONT",
                            "terminal": "2",
                            "at": "2024-12-02T12:40:00",
                            "cityName": "LOS ANGELES"
                        },
                        "number": "430",
                        "aircraft": {
                            "code": "738"
                        },
                        "duration": "PT2H24M",
                        "id": "3",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "UNITED AIRLINES"
                    }
                ]
            },
            {
                "duration": "PT8H48M",
                "segments": [
                    {
                        "departure": {
                            "iataCode": "LAX",
                            "terminal": "7",
                            "at": "2024-12-10T07:00:00",
                            "cityName": "LOS ANGELES"
                        },
                        "arrival": {
                            "iataCode": "DEN",
                            "at": "2024-12-10T10:29:00",
                            "cityName": "DENVER"
                        },
                        "number": "1001",
                        "aircraft": {
                            "code": "739"
                        },
                        "duration": "PT2H29M",
                        "id": "13",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "UNITED AIRLINES"
                    },
                    {
                        "departure": {
                            "iataCode": "DEN",
                            "at": "2024-12-10T11:45:00",
                            "cityName": "DENVER"
                        },
                        "arrival": {
                            "iataCode": "BIL",
                            "at": "2024-12-10T13:20:00",
                            "cityName": "BILBAO"
                        },
                        "number": "703",
                        "aircraft": {
                            "code": "738"
                        },
                        "duration": "PT1H35M",
                        "id": "14",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "UNITED AIRLINES"
                    },
                    {
                        "departure": {
                            "iataCode": "BIL",
                            "at": "2024-12-10T15:03:00",
                            "cityName": "BILBAO"
                        },
                        "arrival": {
                            "iataCode": "SDY",
                            "at": "2024-12-10T16:48:00",
                            "cityName": "SIDNEY"
                        },
                        "number": "1789",
                        "aircraft": {
                            "code": "T12"
                        },
                        "duration": "PT1H45M",
                        "id": "15",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "CAPE AIR"
                    }
                ]
            }
        ],
        "price": {
            "currency": "EUR",
            "total": 1201.48,
            "base": 1032,
            "fees": [
                {
                    "amount": 0,
                    "type": "SUPPLIER"
                },
                {
                    "amount": 0,
                    "type": "TICKETING"
                }
            ],
            "grandTotal": 1201.48
        },
        "pricingOptions": {
            "includedCheckedBagsOnly": false,
            "fareType": [
                "PUBLISHED"
            ],
            "refundableFare": false,
            "noRestrictionFare": false,
            "noPenaltyFare": false
        },
        "validatingAirlineCodes": [
            "UA"
        ],
        "travelerPricings": [
            {
                "travelerId": "1",
                "fareOption": "STANDARD",
                "travelerType": "ADULT",
                "price": {
                    "currency": "EUR",
                    "total": 600.74,
                    "base": 516,
                    "grandTotal": 0
                },
                "fareDetailsBySegment": [
                    {
                        "segmentId": "1",
                        "cabin": "ECONOMY",
                        "fareBasis": "VCIP",
                        "class": "V",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "2",
                        "cabin": "ECONOMY",
                        "fareBasis": "QAA7AFEN",
                        "class": "Q",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "3",
                        "cabin": "ECONOMY",
                        "fareBasis": "QAA7AFEN",
                        "class": "Q",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "13",
                        "cabin": "ECONOMY",
                        "fareBasis": "TAA2PFDN",
                        "class": "T",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "14",
                        "cabin": "ECONOMY",
                        "fareBasis": "TAA2PFDN",
                        "class": "T",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "15",
                        "cabin": "ECONOMY",
                        "fareBasis": "VCIP",
                        "class": "V",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    }
                ]
            },
            {
                "travelerId": "2",
                "fareOption": "STANDARD",
                "travelerType": "ADULT",
                "price": {
                    "currency": "EUR",
                    "total": 600.74,
                    "base": 516,
                    "grandTotal": 0
                },
                "fareDetailsBySegment": [
                    {
                        "segmentId": "1",
                        "cabin": "ECONOMY",
                        "fareBasis": "VCIP",
                        "class": "V",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "2",
                        "cabin": "ECONOMY",
                        "fareBasis": "QAA7AFEN",
                        "class": "Q",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "3",
                        "cabin": "ECONOMY",
                        "fareBasis": "QAA7AFEN",
                        "class": "Q",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "13",
                        "cabin": "ECONOMY",
                        "fareBasis": "TAA2PFDN",
                        "class": "T",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "14",
                        "cabin": "ECONOMY",
                        "fareBasis": "TAA2PFDN",
                        "class": "T",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "15",
                        "cabin": "ECONOMY",
                        "fareBasis": "VCIP",
                        "class": "V",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    }
                ]
            }
        ]
    },
    {
        "type": "flight-offer",
        "id": "3",
        "source": "GDS",
        "instantTicketingRequired": false,
        "nonHomogeneous": false,
        "oneWay": false,
        "lastTicketingDate": "2024-07-06",
        "numberOfBookableSeats": 7,
        "itineraries": [
            {
                "duration": "PT20H27M",
                "segments": [
                    {
                        "departure": {
                            "iataCode": "SDY",
                            "at": "2024-12-01T17:13:00",
                            "cityName": "SIDNEY"
                        },
                        "arrival": {
                            "iataCode": "BIL",
                            "at": "2024-12-01T19:05:00",
                            "cityName": "BILBAO"
                        },
                        "number": "1776",
                        "aircraft": {
                            "code": "T12"
                        },
                        "duration": "PT1H52M",
                        "id": "1",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "CAPE AIR"
                    },
                    {
                        "departure": {
                            "iataCode": "BIL",
                            "at": "2024-12-02T07:00:00",
                            "cityName": "BILBAO"
                        },
                        "arrival": {
                            "iataCode": "DEN",
                            "at": "2024-12-02T08:43:00",
                            "cityName": "DENVER"
                        },
                        "number": "671",
                        "aircraft": {
                            "code": "739"
                        },
                        "duration": "PT1H43M",
                        "id": "2",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "UNITED AIRLINES"
                    },
                    {
                        "departure": {
                            "iataCode": "DEN",
                            "at": "2024-12-02T11:16:00",
                            "cityName": "DENVER"
                        },
                        "arrival": {
                            "iataCode": "ONT",
                            "terminal": "2",
                            "at": "2024-12-02T12:40:00",
                            "cityName": "LOS ANGELES"
                        },
                        "number": "430",
                        "aircraft": {
                            "code": "738"
                        },
                        "duration": "PT2H24M",
                        "id": "3",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "UNITED AIRLINES"
                    }
                ]
            },
            {
                "duration": "PT10H48M",
                "segments": [
                    {
                        "departure": {
                            "iataCode": "LAX",
                            "terminal": "7",
                            "at": "2024-12-10T05:00:00",
                            "cityName": "LOS ANGELES"
                        },
                        "arrival": {
                            "iataCode": "DEN",
                            "at": "2024-12-10T08:25:00",
                            "cityName": "DENVER"
                        },
                        "number": "1339",
                        "aircraft": {
                            "code": "7M9"
                        },
                        "duration": "PT2H25M",
                        "id": "19",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "UNITED AIRLINES"
                    },
                    {
                        "departure": {
                            "iataCode": "DEN",
                            "at": "2024-12-10T11:45:00",
                            "cityName": "DENVER"
                        },
                        "arrival": {
                            "iataCode": "BIL",
                            "at": "2024-12-10T13:20:00",
                            "cityName": "BILBAO"
                        },
                        "number": "703",
                        "aircraft": {
                            "code": "738"
                        },
                        "duration": "PT1H35M",
                        "id": "20",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "UNITED AIRLINES"
                    },
                    {
                        "departure": {
                            "iataCode": "BIL",
                            "at": "2024-12-10T15:03:00",
                            "cityName": "BILBAO"
                        },
                        "arrival": {
                            "iataCode": "SDY",
                            "at": "2024-12-10T16:48:00",
                            "cityName": "SIDNEY"
                        },
                        "number": "1789",
                        "aircraft": {
                            "code": "T12"
                        },
                        "duration": "PT1H45M",
                        "id": "21",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "CAPE AIR"
                    }
                ]
            }
        ],
        "price": {
            "currency": "EUR",
            "total": 1201.48,
            "base": 1032,
            "fees": [
                {
                    "amount": 0,
                    "type": "SUPPLIER"
                },
                {
                    "amount": 0,
                    "type": "TICKETING"
                }
            ],
            "grandTotal": 1201.48
        },
        "pricingOptions": {
            "includedCheckedBagsOnly": false,
            "fareType": [
                "PUBLISHED"
            ],
            "refundableFare": false,
            "noRestrictionFare": false,
            "noPenaltyFare": false
        },
        "validatingAirlineCodes": [
            "UA"
        ],
        "travelerPricings": [
            {
                "travelerId": "1",
                "fareOption": "STANDARD",
                "travelerType": "ADULT",
                "price": {
                    "currency": "EUR",
                    "total": 600.74,
                    "base": 516,
                    "grandTotal": 0
                },
                "fareDetailsBySegment": [
                    {
                        "segmentId": "1",
                        "cabin": "ECONOMY",
                        "fareBasis": "VCIP",
                        "class": "V",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "2",
                        "cabin": "ECONOMY",
                        "fareBasis": "QAA7AFEN",
                        "class": "Q",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "3",
                        "cabin": "ECONOMY",
                        "fareBasis": "QAA7AFEN",
                        "class": "Q",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "19",
                        "cabin": "ECONOMY",
                        "fareBasis": "TAA2PFDN",
                        "class": "T",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "20",
                        "cabin": "ECONOMY",
                        "fareBasis": "TAA2PFDN",
                        "class": "T",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "21",
                        "cabin": "ECONOMY",
                        "fareBasis": "VCIP",
                        "class": "V",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    }
                ]
            },
            {
                "travelerId": "2",
                "fareOption": "STANDARD",
                "travelerType": "ADULT",
                "price": {
                    "currency": "EUR",
                    "total": 600.74,
                    "base": 516,
                    "grandTotal": 0
                },
                "fareDetailsBySegment": [
                    {
                        "segmentId": "1",
                        "cabin": "ECONOMY",
                        "fareBasis": "VCIP",
                        "class": "V",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "2",
                        "cabin": "ECONOMY",
                        "fareBasis": "QAA7AFEN",
                        "class": "Q",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "3",
                        "cabin": "ECONOMY",
                        "fareBasis": "QAA7AFEN",
                        "class": "Q",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "19",
                        "cabin": "ECONOMY",
                        "fareBasis": "TAA2PFDN",
                        "class": "T",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "20",
                        "cabin": "ECONOMY",
                        "fareBasis": "TAA2PFDN",
                        "class": "T",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "21",
                        "cabin": "ECONOMY",
                        "fareBasis": "VCIP",
                        "class": "V",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    }
                ]
            }
        ]
    },
    {
        "type": "flight-offer",
        "id": "4",
        "source": "GDS",
        "instantTicketingRequired": false,
        "nonHomogeneous": false,
        "oneWay": false,
        "lastTicketingDate": "2024-07-06",
        "numberOfBookableSeats": 7,
        "itineraries": [
            {
                "duration": "PT20H27M",
                "segments": [
                    {
                        "departure": {
                            "iataCode": "SDY",
                            "at": "2024-12-01T17:13:00",
                            "cityName": "SIDNEY"
                        },
                        "arrival": {
                            "iataCode": "BIL",
                            "at": "2024-12-01T19:05:00",
                            "cityName": "BILBAO"
                        },
                        "number": "1776",
                        "aircraft": {
                            "code": "T12"
                        },
                        "duration": "PT1H52M",
                        "id": "1",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "CAPE AIR"
                    },
                    {
                        "departure": {
                            "iataCode": "BIL",
                            "at": "2024-12-02T07:00:00",
                            "cityName": "BILBAO"
                        },
                        "arrival": {
                            "iataCode": "DEN",
                            "at": "2024-12-02T08:43:00",
                            "cityName": "DENVER"
                        },
                        "number": "671",
                        "aircraft": {
                            "code": "739"
                        },
                        "duration": "PT1H43M",
                        "id": "2",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "UNITED AIRLINES"
                    },
                    {
                        "departure": {
                            "iataCode": "DEN",
                            "at": "2024-12-02T11:16:00",
                            "cityName": "DENVER"
                        },
                        "arrival": {
                            "iataCode": "ONT",
                            "terminal": "2",
                            "at": "2024-12-02T12:40:00",
                            "cityName": "LOS ANGELES"
                        },
                        "number": "430",
                        "aircraft": {
                            "code": "738"
                        },
                        "duration": "PT2H24M",
                        "id": "3",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "UNITED AIRLINES"
                    }
                ]
            },
            {
                "duration": "PT9H48M",
                "segments": [
                    {
                        "departure": {
                            "iataCode": "LAX",
                            "terminal": "6",
                            "at": "2024-12-10T06:00:00",
                            "cityName": "LOS ANGELES"
                        },
                        "arrival": {
                            "iataCode": "PDX",
                            "at": "2024-12-10T08:35:00",
                            "cityName": "PORTLAND"
                        },
                        "number": "1124",
                        "aircraft": {
                            "code": "73J"
                        },
                        "duration": "PT2H35M",
                        "id": "16",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "ALASKA AIRLINES"
                    },
                    {
                        "departure": {
                            "iataCode": "PDX",
                            "at": "2024-12-10T10:00:00",
                            "cityName": "PORTLAND"
                        },
                        "arrival": {
                            "iataCode": "BIL",
                            "at": "2024-12-10T13:02:00",
                            "cityName": "BILBAO"
                        },
                        "number": "2222",
                        "aircraft": {
                            "code": "E75"
                        },
                        "duration": "PT2H2M",
                        "id": "17",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "ALASKA AIRLINES"
                    },
                    {
                        "departure": {
                            "iataCode": "BIL",
                            "at": "2024-12-10T15:03:00",
                            "cityName": "BILBAO"
                        },
                        "arrival": {
                            "iataCode": "SDY",
                            "at": "2024-12-10T16:48:00",
                            "cityName": "SIDNEY"
                        },
                        "number": "1789",
                        "aircraft": {
                            "code": "T12"
                        },
                        "duration": "PT1H45M",
                        "id": "18",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "CAPE AIR"
                    }
                ]
            }
        ],
        "price": {
            "currency": "EUR",
            "total": 1201.48,
            "base": 1032,
            "fees": [
                {
                    "amount": 0,
                    "type": "SUPPLIER"
                },
                {
                    "amount": 0,
                    "type": "TICKETING"
                }
            ],
            "grandTotal": 1201.48
        },
        "pricingOptions": {
            "includedCheckedBagsOnly": false,
            "fareType": [
                "PUBLISHED"
            ],
            "refundableFare": false,
            "noRestrictionFare": false,
            "noPenaltyFare": false
        },
        "validatingAirlineCodes": [
            "UA"
        ],
        "travelerPricings": [
            {
                "travelerId": "1",
                "fareOption": "STANDARD",
                "travelerType": "ADULT",
                "price": {
                    "currency": "EUR",
                    "total": 600.74,
                    "base": 516,
                    "grandTotal": 0
                },
                "fareDetailsBySegment": [
                    {
                        "segmentId": "1",
                        "cabin": "ECONOMY",
                        "fareBasis": "VCIP",
                        "class": "V",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "2",
                        "cabin": "ECONOMY",
                        "fareBasis": "QAA7AFEN",
                        "class": "Q",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "3",
                        "cabin": "ECONOMY",
                        "fareBasis": "QAA7AFEN",
                        "class": "Q",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "16",
                        "cabin": "ECONOMY",
                        "fareBasis": "OH2OAJMN",
                        "class": "O",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "17",
                        "cabin": "ECONOMY",
                        "fareBasis": "OH2OAJMN",
                        "class": "O",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "18",
                        "cabin": "ECONOMY",
                        "fareBasis": "VCIP",
                        "class": "V",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    }
                ]
            },
            {
                "travelerId": "2",
                "fareOption": "STANDARD",
                "travelerType": "ADULT",
                "price": {
                    "currency": "EUR",
                    "total": 600.74,
                    "base": 516,
                    "grandTotal": 0
                },
                "fareDetailsBySegment": [
                    {
                        "segmentId": "1",
                        "cabin": "ECONOMY",
                        "fareBasis": "VCIP",
                        "class": "V",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "2",
                        "cabin": "ECONOMY",
                        "fareBasis": "QAA7AFEN",
                        "class": "Q",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "3",
                        "cabin": "ECONOMY",
                        "fareBasis": "QAA7AFEN",
                        "class": "Q",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "16",
                        "cabin": "ECONOMY",
                        "fareBasis": "OH2OAJMN",
                        "class": "O",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "17",
                        "cabin": "ECONOMY",
                        "fareBasis": "OH2OAJMN",
                        "class": "O",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "18",
                        "cabin": "ECONOMY",
                        "fareBasis": "VCIP",
                        "class": "V",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    }
                ]
            }
        ]
    },
    {
        "type": "flight-offer",
        "id": "5",
        "source": "GDS",
        "instantTicketingRequired": false,
        "nonHomogeneous": false,
        "oneWay": false,
        "lastTicketingDate": "2024-07-06",
        "numberOfBookableSeats": 7,
        "itineraries": [
            {
                "duration": "PT20H27M",
                "segments": [
                    {
                        "departure": {
                            "iataCode": "SDY",
                            "at": "2024-12-01T17:13:00",
                            "cityName": "SIDNEY"
                        },
                        "arrival": {
                            "iataCode": "BIL",
                            "at": "2024-12-01T19:05:00",
                            "cityName": "BILBAO"
                        },
                        "number": "1776",
                        "aircraft": {
                            "code": "T12"
                        },
                        "duration": "PT1H52M",
                        "id": "1",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "CAPE AIR"
                    },
                    {
                        "departure": {
                            "iataCode": "BIL",
                            "at": "2024-12-02T07:00:00",
                            "cityName": "BILBAO"
                        },
                        "arrival": {
                            "iataCode": "DEN",
                            "at": "2024-12-02T08:43:00",
                            "cityName": "DENVER"
                        },
                        "number": "671",
                        "aircraft": {
                            "code": "739"
                        },
                        "duration": "PT1H43M",
                        "id": "2",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "UNITED AIRLINES"
                    },
                    {
                        "departure": {
                            "iataCode": "DEN",
                            "at": "2024-12-02T11:16:00",
                            "cityName": "DENVER"
                        },
                        "arrival": {
                            "iataCode": "ONT",
                            "terminal": "2",
                            "at": "2024-12-02T12:40:00",
                            "cityName": "LOS ANGELES"
                        },
                        "number": "430",
                        "aircraft": {
                            "code": "738"
                        },
                        "duration": "PT2H24M",
                        "id": "3",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "UNITED AIRLINES"
                    }
                ]
            },
            {
                "duration": "PT12H33M",
                "segments": [
                    {
                        "departure": {
                            "iataCode": "LAX",
                            "terminal": "6",
                            "at": "2024-12-10T06:00:00",
                            "cityName": "LOS ANGELES"
                        },
                        "arrival": {
                            "iataCode": "PDX",
                            "at": "2024-12-10T08:35:00",
                            "cityName": "PORTLAND"
                        },
                        "number": "1124",
                        "aircraft": {
                            "code": "73J"
                        },
                        "duration": "PT2H35M",
                        "id": "7",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "ALASKA AIRLINES"
                    },
                    {
                        "departure": {
                            "iataCode": "PDX",
                            "at": "2024-12-10T10:00:00",
                            "cityName": "PORTLAND"
                        },
                        "arrival": {
                            "iataCode": "BIL",
                            "at": "2024-12-10T13:02:00",
                            "cityName": "BILBAO"
                        },
                        "number": "2222",
                        "aircraft": {
                            "code": "E75"
                        },
                        "duration": "PT2H2M",
                        "id": "8",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "ALASKA AIRLINES"
                    },
                    {
                        "departure": {
                            "iataCode": "BIL",
                            "at": "2024-12-10T17:49:00",
                            "cityName": "BILBAO"
                        },
                        "arrival": {
                            "iataCode": "SDY",
                            "at": "2024-12-10T19:33:00",
                            "cityName": "SIDNEY"
                        },
                        "number": "1785",
                        "aircraft": {
                            "code": "T12"
                        },
                        "duration": "PT1H44M",
                        "id": "9",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "CAPE AIR"
                    }
                ]
            }
        ],
        "price": {
            "currency": "EUR",
            "total": 1201.48,
            "base": 1032,
            "fees": [
                {
                    "amount": 0,
                    "type": "SUPPLIER"
                },
                {
                    "amount": 0,
                    "type": "TICKETING"
                }
            ],
            "grandTotal": 1201.48
        },
        "pricingOptions": {
            "includedCheckedBagsOnly": false,
            "fareType": [
                "PUBLISHED"
            ],
            "refundableFare": false,
            "noRestrictionFare": false,
            "noPenaltyFare": false
        },
        "validatingAirlineCodes": [
            "UA"
        ],
        "travelerPricings": [
            {
                "travelerId": "1",
                "fareOption": "STANDARD",
                "travelerType": "ADULT",
                "price": {
                    "currency": "EUR",
                    "total": 600.74,
                    "base": 516,
                    "grandTotal": 0
                },
                "fareDetailsBySegment": [
                    {
                        "segmentId": "1",
                        "cabin": "ECONOMY",
                        "fareBasis": "VCIP",
                        "class": "V",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "2",
                        "cabin": "ECONOMY",
                        "fareBasis": "QAA7AFEN",
                        "class": "Q",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "3",
                        "cabin": "ECONOMY",
                        "fareBasis": "QAA7AFEN",
                        "class": "Q",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "7",
                        "cabin": "ECONOMY",
                        "fareBasis": "OH2OAJMN",
                        "class": "O",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "8",
                        "cabin": "ECONOMY",
                        "fareBasis": "OH2OAJMN",
                        "class": "O",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "9",
                        "cabin": "ECONOMY",
                        "fareBasis": "VCIP",
                        "class": "V",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    }
                ]
            },
            {
                "travelerId": "2",
                "fareOption": "STANDARD",
                "travelerType": "ADULT",
                "price": {
                    "currency": "EUR",
                    "total": 600.74,
                    "base": 516,
                    "grandTotal": 0
                },
                "fareDetailsBySegment": [
                    {
                        "segmentId": "1",
                        "cabin": "ECONOMY",
                        "fareBasis": "VCIP",
                        "class": "V",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "2",
                        "cabin": "ECONOMY",
                        "fareBasis": "QAA7AFEN",
                        "class": "Q",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "3",
                        "cabin": "ECONOMY",
                        "fareBasis": "QAA7AFEN",
                        "class": "Q",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "7",
                        "cabin": "ECONOMY",
                        "fareBasis": "OH2OAJMN",
                        "class": "O",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "8",
                        "cabin": "ECONOMY",
                        "fareBasis": "OH2OAJMN",
                        "class": "O",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "9",
                        "cabin": "ECONOMY",
                        "fareBasis": "VCIP",
                        "class": "V",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    }
                ]
            }
        ]
    },
    {
        "type": "flight-offer",
        "id": "6",
        "source": "GDS",
        "instantTicketingRequired": false,
        "nonHomogeneous": false,
        "oneWay": false,
        "lastTicketingDate": "2024-07-06",
        "numberOfBookableSeats": 7,
        "itineraries": [
            {
                "duration": "PT20H27M",
                "segments": [
                    {
                        "departure": {
                            "iataCode": "SDY",
                            "at": "2024-12-01T17:13:00",
                            "cityName": "SIDNEY"
                        },
                        "arrival": {
                            "iataCode": "BIL",
                            "at": "2024-12-01T19:05:00",
                            "cityName": "BILBAO"
                        },
                        "number": "1776",
                        "aircraft": {
                            "code": "T12"
                        },
                        "duration": "PT1H52M",
                        "id": "1",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "CAPE AIR"
                    },
                    {
                        "departure": {
                            "iataCode": "BIL",
                            "at": "2024-12-02T07:00:00",
                            "cityName": "BILBAO"
                        },
                        "arrival": {
                            "iataCode": "DEN",
                            "at": "2024-12-02T08:43:00",
                            "cityName": "DENVER"
                        },
                        "number": "671",
                        "aircraft": {
                            "code": "739"
                        },
                        "duration": "PT1H43M",
                        "id": "2",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "UNITED AIRLINES"
                    },
                    {
                        "departure": {
                            "iataCode": "DEN",
                            "at": "2024-12-02T11:16:00",
                            "cityName": "DENVER"
                        },
                        "arrival": {
                            "iataCode": "ONT",
                            "terminal": "2",
                            "at": "2024-12-02T12:40:00",
                            "cityName": "LOS ANGELES"
                        },
                        "number": "430",
                        "aircraft": {
                            "code": "738"
                        },
                        "duration": "PT2H24M",
                        "id": "3",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "UNITED AIRLINES"
                    }
                ]
            },
            {
                "duration": "PT16H40M",
                "segments": [
                    {
                        "departure": {
                            "iataCode": "LAX",
                            "terminal": "6",
                            "at": "2024-12-10T15:15:00",
                            "cityName": "LOS ANGELES"
                        },
                        "arrival": {
                            "iataCode": "SEA",
                            "at": "2024-12-10T18:11:00",
                            "cityName": "SEATTLE"
                        },
                        "number": "1147",
                        "aircraft": {
                            "code": "73J"
                        },
                        "duration": "PT2H56M",
                        "id": "10",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "ALASKA AIRLINES"
                    },
                    {
                        "departure": {
                            "iataCode": "SEA",
                            "at": "2024-12-10T20:00:00",
                            "cityName": "SEATTLE"
                        },
                        "arrival": {
                            "iataCode": "BIL",
                            "at": "2024-12-10T22:48:00",
                            "cityName": "BILBAO"
                        },
                        "number": "2457",
                        "aircraft": {
                            "code": "E75"
                        },
                        "duration": "PT1H48M",
                        "id": "11",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "ALASKA AIRLINES"
                    },
                    {
                        "departure": {
                            "iataCode": "BIL",
                            "at": "2024-12-11T07:12:00",
                            "cityName": "BILBAO"
                        },
                        "arrival": {
                            "iataCode": "SDY",
                            "at": "2024-12-11T08:55:00",
                            "cityName": "SIDNEY"
                        },
                        "number": "1775",
                        "aircraft": {
                            "code": "T12"
                        },
                        "duration": "PT1H43M",
                        "id": "12",
                        "numberOfStops": 0,
                        "blacklistedInEU": false,
                        "airlineName": "CAPE AIR"
                    }
                ]
            }
        ],
        "price": {
            "currency": "EUR",
            "total": 1201.48,
            "base": 1032,
            "fees": [
                {
                    "amount": 0,
                    "type": "SUPPLIER"
                },
                {
                    "amount": 0,
                    "type": "TICKETING"
                }
            ],
            "grandTotal": 1201.48
        },
        "pricingOptions": {
            "includedCheckedBagsOnly": false,
            "fareType": [
                "PUBLISHED"
            ],
            "refundableFare": false,
            "noRestrictionFare": false,
            "noPenaltyFare": false
        },
        "validatingAirlineCodes": [
            "UA"
        ],
        "travelerPricings": [
            {
                "travelerId": "1",
                "fareOption": "STANDARD",
                "travelerType": "ADULT",
                "price": {
                    "currency": "EUR",
                    "total": 600.74,
                    "base": 516,
                    "grandTotal": 0
                },
                "fareDetailsBySegment": [
                    {
                        "segmentId": "1",
                        "cabin": "ECONOMY",
                        "fareBasis": "VCIP",
                        "class": "V",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "2",
                        "cabin": "ECONOMY",
                        "fareBasis": "QAA7AFEN",
                        "class": "Q",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "3",
                        "cabin": "ECONOMY",
                        "fareBasis": "QAA7AFEN",
                        "class": "Q",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "10",
                        "cabin": "ECONOMY",
                        "fareBasis": "OH2OAJMN",
                        "class": "O",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "11",
                        "cabin": "ECONOMY",
                        "fareBasis": "OH2OAJMN",
                        "class": "O",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "12",
                        "cabin": "ECONOMY",
                        "fareBasis": "VCIP",
                        "class": "V",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    }
                ]
            },
            {
                "travelerId": "2",
                "fareOption": "STANDARD",
                "travelerType": "ADULT",
                "price": {
                    "currency": "EUR",
                    "total": 600.74,
                    "base": 516,
                    "grandTotal": 0
                },
                "fareDetailsBySegment": [
                    {
                        "segmentId": "1",
                        "cabin": "ECONOMY",
                        "fareBasis": "VCIP",
                        "class": "V",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "2",
                        "cabin": "ECONOMY",
                        "fareBasis": "QAA7AFEN",
                        "class": "Q",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "3",
                        "cabin": "ECONOMY",
                        "fareBasis": "QAA7AFEN",
                        "class": "Q",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "10",
                        "cabin": "ECONOMY",
                        "fareBasis": "OH2OAJMN",
                        "class": "O",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "11",
                        "cabin": "ECONOMY",
                        "fareBasis": "OH2OAJMN",
                        "class": "O",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    },
                    {
                        "segmentId": "12",
                        "cabin": "ECONOMY",
                        "fareBasis": "VCIP",
                        "class": "V",
                        "includedCheckedBags": {
                            "weight": 0
                        }
                    }
                ]
            }
        ]
    }
]

  return (
    <div className={styles.container}>
        <ResultRightLogic
              matchingItineraries={matchingItineraries}
            />
    </div>
  );
}

export default test;
