class Ticket {
  constructor (origin,
    originName,
    destination,
    destinationName,
    price,
    flightNumber,
    transfers,
    airline,
    airlineName,
    airlineLogo,
    airlineLogoSmall,
    departureAt,
    returnAt
  ) {
    this.origin = origin
    this.originName = originName
    this.destination = destination
    this.destinationName = destinationName
    this.price = price
    this.flightNumber = flightNumber
    this.transfers = transfers
    this.airline = airline
    this.airlineName = airlineName
    this.airlineLogo = airlineLogo
    this.airlineLogoSmall = airlineLogoSmall
    this.departureAt = departureAt
    this.returnAt = returnAt
  }
}

export default Ticket
