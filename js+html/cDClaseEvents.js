//libreria de eventos
class Events {
  constructor(named, descrip, dateInit, dateEnd, ubiCity, address, owner) {
    this.id = gereneraID();
    this.named = named;
    this.descrip = descrip;
    this.dateInit = acomodaFecha(dateInit);
    this.dateEnd = acomodaFecha(dateEnd);
    this.ubiCity = ubiCity.toLowerCase();
    this.address = address;
    this.owner = owner;
    this.request = [];
    this.users = [];
  }
}
