/**DATA ENTRY */

//**--------------------FUNCIONES NECESARIAS PARA CREAR USUARIOS---------------------- */

//control time
const dt = luxon.DateTime;
const acomodaFecha = (date) => {
  let horalux = dt.fromISO(date);
  return horalux.toISO();
};
//ID para eventos
const gereneraID = () => {
  const number = Math.floor(Math.random() * 100000000);

  const albs = [...`abcdefghijklmnopqrstuvwxyz`];

  let stringRand = ` `;
  for (let i = 0; i < 10; i++) {
    const index = randomIndex(10);

    stringRand += albs[index];
  }

  const id = stringRand + number;

  return id;
};

const randomIndex = (maxNumber) => {
  return Math.floor(Math.random() * maxNumber);
};

//funcion data entry sin promesas
let getEventDataEntry = () => {
  let evn = localStorage.getItem("Events");
  if (evn === null) {
    localStorage.setItem("Events", JSON.stringify(eventsDE));
  }
};

//users con promesa desde JSON
let usersDE = [];

async function getUsersDataEntry() {
  const response = await fetch(`usersDE.json`); //el await devuelve lo que resuleve la promesa

  usersDE = await response.json(); //devuelve usuarios
  let usr = localStorage.getItem("Users");

  if (usr === null) {
    localStorage.setItem("Users", JSON.stringify(usersDE));
  }
}

getUsersDataEntry();

const eventsDE = [];

eventsDE.push(
  new Events(
    "Pokefest",
    "fiesta de disfraces pokemon",
    acomodaFecha("2022-12-15T13:30"),
    acomodaFecha("2022-12-15T17:30"),
    "Buenos Aires",
    "bolivar 368",
    {
      nickname: "joa1219",
      email: "joaquinbidart19@gmail.com",
      phone: 223562555,
      instagram: "Joacobid",
      password: "asd",
    }
  )
);
eventsDE.push(
  new Events(
    "Fabulosa",
    "70s fest",
    acomodaFecha("2022-11-20T17:00"),
    acomodaFecha("2022-11-21T00:30"),
    "Ayacucho",
    "Dindart 759",
    {
      nickname: "bbcita59",
      email: "locurascontigo@gmail.com",
      phone: 1150987654,
      instagram: "rombaioficial",
      password: "bbsuela",
    }
  )
);
eventsDE.push(
  new Events(
    "Tecno Brinda",
    "punchi y mas",
    acomodaFecha("2023-02-03T23:30"),
    acomodaFecha("2023-02-04T05:30"),
    "Carlos Casares",
    "Yerbal 2100",
    {
      nickname: "joa1219",
      email: "joaquinbidart19@gmail.com",
      phone: 223562555,
      instagram: "Joacobid",
      password: "asd",
    }
  )
);

getEventDataEntry();
