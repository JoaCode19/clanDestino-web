/**
 BIENVENIDO A CLAN DESTINO
 */

/**-----------------------------------FUNCIONES -------------------------------------- */
// const gereneraID = () => {
//   const number = Math.floor(Math.random() * 100000000);

//   const albs = [...`abcdefghijklmnopqrstuvwxyz`];

//   let stringRand = ` `;
//   for (let i = 0; i < 10; i++) {
//     const index = randomIndex(10);

//     stringRand += albs[index];
//   }

//   const id = stringRand + number;

//   return id;
// };

// const randomIndex = (maxNumber) => {
//   return Math.floor(Math.random() * maxNumber);
// };

const cleanOldEvents = () => {
  allEvents = allEvents.filter((elem) => {
    return elem.dateEnd > hoy.toISO();
  });
};

const mensajeSweetAlert = (titular, texto, icono, textoBoton) => {
  swal({
    title: titular,
    text: texto,
    icon: icono,
    button: textoBoton,
  });
};

const createUser = (nickname, email, phone, instagram, password) =>
  allUsers.push(new Users(nickname, email, phone, instagram, password));

const createEvent = (
  named,
  descrip,
  dateInit,
  dateEnd,
  ubiCity,
  address,
  owner
) =>
  allEvents.push(
    new Events(named, descrip, dateInit, dateEnd, ubiCity, address, owner)
  );

/**-------------------------------FUNCIONES DE VALIDACIÓN----------------------------- */

const validCliente = (nick) => {
  let set = false;
  for (const Users of allUsers) {
    if (Users.nickname === nick) {
      userLog = Users;
      set = true;
    }
  }
  return set;
};

const validNombre = (nombre) => {
  const valida = allUsers.find((user) => {
    return user.nickname === nombre;
  });
  if (valida !== undefined) {
    return false;
  }
  return true;
};

const validEmail = (email) => {
  const valida = allUsers.find((user) => {
    return user.email === email;
  });
  if (valida !== undefined) {
    return false;
  }
  return true;
};

/*--------------------------------*VARIABLES GLOBALES ---------------------------------*/

let allUsers = JSON.parse(localStorage.getItem("Users")) || []; //va a contener todos los usuarios que se registren
// console.log(allUsers);
let allEvents = JSON.parse(localStorage.getItem("Events")) || []; //va a contener todos los evetos que cree
let userLog = {}; //usuario logeado
let lastubi = "";
//control del tiempo
let hoy = dt.now();
const hoyMin = `${hoy.year}-${hoy.month}-${hoy.day}T${hoy.hour}:${hoy.minute}`;
let w = 0;

// console.log(hoyMin);

/**-----------------------------------------DOM--------------------------------------- */

const contenedor = document.getElementById("contenedor");
const formLogin = document.getElementById("formulario- login");
const btnLogin = document.getElementById("btnlog");
const inputUser = document.getElementById("user");
const inputPass = document.getElementById("pass");
const btnRegis = document.getElementById("btnreg");

const menu = document.getElementById("menu");
const contenedor2 = document.getElementById("contenedor2");
const iconoMenu = document.getElementById("icono-menu");
const op1 = document.getElementById("a1");
const op2 = document.getElementById("a2");
const op3 = document.getElementById("a3");
const op4 = document.getElementById("a4");
const op5 = document.getElementById("a5");

const grilla = document.getElementById("grilla");

const audio = document.getElementById("audio");
const foot = document.getElementById("foot");

const eventC = "click";
const eventS = "submit";

/**----------------------------------------INICIO -------------------------------------*/

cleanOldEvents();

// console.log(allEvents);

formLogin.addEventListener(eventS, (e) => {
  e.preventDefault();
  allUsers = JSON.parse(localStorage.getItem("Users")); //traigo usuarios por primera vez para que llegue a cargar la promesa del data entry antes de las validaciones.(N)

  let nickUser = inputUser.value;
  let passUser = inputPass.value;
  if (!validCliente(nickUser)) {
    mensajeSweetAlert("", "Wrong User", "error", "ok");
  } else {
    if (passUser !== userLog.password) {
      mensajeSweetAlert("", "Wrong Password", "error", "ok");
    } else {
      foot.innerHTML = "";
      audio.pause();
      mensajeSweetAlert(
        "Welcome to clanDestino",
        "use the menu on the left-top to begining the experience",
        "success",
        "ok"
      );
      contenedor.innerHTML = "";
      contenedor.className = "oculto";
      contenedor2.className = "icono-menu";
      menu.className = "cont-menu active";

      iconoMenu.addEventListener("click", (e) => {
        e.preventDefault();
        // Alternamos estilos para el menú y body
        menu.classList.toggle("active");
        document.body.classList.toggle("opacity");

        // Alternamos su atributo 'src' para el ícono del menú
        const target = e.target.getAttribute("src");

        if (target == "../img/open-menu.png") {
          e.target.setAttribute("src", "../img&audio/open-menu2.png");
        } else {
          e.target.setAttribute("src", "../img&audio/open-menu.png");
        }

        op1.addEventListener(eventC, (e) => {
          e.preventDefault();
          return crea();
        });
        op2.addEventListener(eventC, bus);
        op3.addEventListener(eventC, myEvent);
        op4.addEventListener(eventC, request);
        op5.addEventListener(eventC, () => {
          location.reload();
        });
      });
    }
  }
});

/**-------------------------------------------------REGISTRO-------------------------- */
btnRegis.addEventListener(eventC, () => {
  allUsers = JSON.parse(localStorage.getItem("Users")); //traigo usuarios por primera vez para que llegue a cargar la promesa del data entry antes de las validaciones. (N)

  contenedor.innerHTML = "";
  contenedor.className = "regis-box";
  const h1 = document.createElement("h1");
  h1.innerText = "New User";
  const formResgis = document.createElement("form");

  const nombre = document.createElement("input");
  const email = document.createElement("input");
  const tel = document.createElement("input");
  const ig = document.createElement("input");
  const newpass = document.createElement("input");
  const newUser = document.createElement("input");
  const salir = document.createElement("a");

  nombre.setAttribute("type", "text");
  email.setAttribute("type", "text");
  tel.setAttribute("type", "text");
  ig.setAttribute("type", "text");
  newpass.setAttribute("type", "text");
  newUser.setAttribute("type", "submit");
  salir.setAttribute("href", "#");

  nombre.setAttribute("placeholder", "Nickname");
  email.setAttribute("placeholder", "E-mail");
  tel.setAttribute("placeholder", "Phone");
  ig.setAttribute("placeholder", "Instagram");
  newpass.setAttribute("placeholder", "Password");
  newUser.setAttribute("value", "Create");
  salir.innerText = "Quit";

  contenedor.append(h1, formResgis);
  formResgis.append(nombre, email, tel, ig, newpass, newUser, salir);

  formResgis.addEventListener(eventS, () => {
    let i = 0;
    for (const input of formResgis) {
      if (input.value !== "") {
        i++;
      }
    }

    if (i !== 6) {
      mensajeSweetAlert("", "Some input is empty", "error", "ok");
    } else {
      if (validNombre(nombre.value)) {
        if (validEmail(email.value)) {
          createUser(
            nombre.value.trim(),
            email.value.trim(),
            tel.value.trim(),
            ig.value.trim(),
            newpass.value.trim()
          );

          localStorage.setItem("Users", JSON.stringify(allUsers));

          mensajeSweetAlert("", "Creation succefull", "success", "ok");

          setTimeout(() => {
            window.history.back();
          }, 3000);
        } else {
          mensajeSweetAlert("", "E-mail is already in use", "error", "ok");
        }
      } else {
        mensajeSweetAlert("", "Nickname is already in use", "error", "ok");
      }
    }
  });
  salir.addEventListener(eventC, () => {
    location.reload();
  });
});

/**--------------------------------------------CREAR EVENTO --------------------------*/
const crea = () => {
  menu.classList.toggle("active");
  document.body.classList.toggle("opacity");
  grilla.innerHTML = "";
  contenedor.innerHTML = "";
  contenedor.className = "regis-box";
  const h1 = document.createElement("h1");
  h1.innerText = "New Event";
  const formEvent = document.createElement("form");

  const nombre = document.createElement("input");
  const descrip = document.createElement("input");
  const datei = document.createElement("input");
  const datee = document.createElement("input");
  const ubication = document.createElement("input");
  const addres = document.createElement("input");
  const newEvent = document.createElement("input");
  const salir = document.createElement("a");

  nombre.setAttribute("type", "text");
  descrip.setAttribute("type", "text");
  datei.setAttribute("type", "datetime-local");
  datei.setAttribute("min", hoyMin);
  datee.setAttribute("type", "datetime-local");
  ubication.setAttribute("type", "text");
  addres.setAttribute("type", "text");
  newEvent.setAttribute("type", "submit");
  salir.setAttribute("href", "#");

  nombre.setAttribute("placeholder", "Event name");
  descrip.setAttribute("placeholder", "Description");
  descrip.setAttribute("maxlength", "70");
  ubication.setAttribute("placeholder", "City");
  addres.setAttribute("placeholder", "Address");
  newEvent.setAttribute("value", "Create");
  salir.innerText = "Quit";

  contenedor.append(h1, formEvent);

  formEvent.append(
    nombre,
    descrip,
    datei,
    datee,
    ubication,
    addres,
    newEvent,
    salir
  );

  formEvent.addEventListener(eventS, () => {
    let j = 0;
    for (const input of formEvent) {
      if (input.value !== "") {
        j++;
      }
    }

    if (j !== 7) {
      mensajeSweetAlert("", "Some input is empty", "error", "ok");
      menu.classList.toggle("active");
      document.body.classList.toggle("opacity");
      contenedor.innerHTML = "";
      contenedor.className = "oculto";
    } else {
      if (datei.value > datee.value || datei.value < hoyMin) {
        mensajeSweetAlert("", "Ivalid Date", "error", "ok");
        menu.classList.toggle("active");
        document.body.classList.toggle("opacity");
        contenedor.innerHTML = "";
        contenedor.className = "oculto";
      } else {
        createEvent(
          nombre.value.trim(),
          descrip.value.trim(),
          datei.value,
          datee.value,
          ubication.value.trim(),
          addres.value.trim(),
          userLog
        );

        localStorage.setItem("Events", JSON.stringify(allEvents));

        mensajeSweetAlert("", "Creation succefull", "success", "ok");

        menu.classList.toggle("active");
        document.body.classList.toggle("opacity");
        contenedor.innerHTML = "";
        contenedor.className = "oculto";
      }
    }
  });
  salir.addEventListener(eventC, () => {
    location.reload();
  });
};

/**--------------------------------------------BUSCA EVENTO----------------------------*/
const bus = () => {
  grilla.innerHTML = "";
  contenedor.innerHTML = "";
  contenedor.className = "mini";

  const formBus = document.createElement("form");
  const getUbi = document.createElement("input");
  const serch = document.createElement("input");
  getUbi.setAttribute("type", "text");
  getUbi.setAttribute("placeholder", "Set Ubication");
  serch.setAttribute("type", "submit");
  serch.setAttribute("value", "Serch");

  contenedor.append(formBus);
  formBus.append(getUbi, serch);

  formBus.addEventListener(eventS, (e) => {
    e.preventDefault();

    let ubicación = getUbi.value.toLowerCase();
    lastubi = ubicación;
    let ubiEventos = allEvents.filter((evento) => {
      return evento.ubiCity === ubicación;
    });
    ubiEventos = ubiEventos.filter((evento) => {
      return evento.owner.nickname !== userLog.nickname;
    });

    console.log(ubiEventos);

    if (ubiEventos.length === 0) {
      mensajeSweetAlert("", "No events found", "info", "ok");
    }
    // console.log(ubiEventos);

    //eventos encontrados
    grilla.className = "grilla";
    contenedor.className = "oculto";
    for (const party of ubiEventos) {
      const card = document.createElement("div");
      card.className = "cards";
      const ul = document.createElement("ul");
      const li = document.createElement("li");
      const p1 = document.createElement("p");
      p1.innerHTML = `<strong>Nombre</strong> ${party.named}`;
      const p2 = document.createElement("p");
      p2.innerHTML = `<strong>Descripción:</strong> ${party.descrip}`;
      const p3 = document.createElement("p");
      const owner = party.owner;
      const nick = owner.nickname;
      p3.innerHTML = `<strong>Anfitrión:</strong> ${nick}`;

      const boton = document.createElement("button");
      boton.innerHTML = "<strong>Request</strong>";
      grilla.append(card);
      card.append(ul, boton);
      ul.append(li);
      li.append(p1, p2, p3);

      // evento patrocinado
      if (party.named === "Pokefest") {
        const p4 = document.createElement("p");
        p4.innerHTML = `<strong style="color:pink">EVENTO PATROCINADO</strong> `;
        const boton2 = document.createElement("button");
        boton2.innerHTML = `<strong >Extra Info</strong>`;
        li.append(p4);
        card.append(boton2);

        boton2.addEventListener(eventC, () => {
          grilla.innerHTML = "";
          contenedor.innerHTML = "";
          contenedor.className = "regis-box";
          const h1 = document.createElement("h1");
          h1.innerText = "DISFRAZES YA UTILIZADOS";
          const ul = document.createElement("ul");
          contenedor.append(h1, ul);

          fetch(`https://pokeapi.co/api/v2/pokemon`)
            .then((response) => {
              return response.json();
            })
            .then((respokemones) => {
              const pokemones = respokemones.results;

              for (const pokemon of pokemones) {
                const li = document.createElement("li");
                li.innerHTML = `<strong>Disfraz de:</strong>${pokemon.name}`;
                ul.append(li);
              }
            });
        });
      }

      //envio request
      boton.addEventListener(eventC, () => {
        const eventReq = allEvents.find((element) => element.id == party.id);
        // console.log(eventReq);
        let sol = eventReq.users;
        let req = eventReq.request;

        if (
          !sol.some((elem) => {
            return elem.nickname === userLog.nickname;
          }) &&
          !req.some((elem) => {
            return elem.nickname === userLog.nickname;
          })
        ) {
          req.push(userLog);

          //grabo el requerimiento
          localStorage.setItem("Events", JSON.stringify(allEvents));

          mensajeSweetAlert("", "Request sent", "success", "ok");

          grilla.innerHTML = "";
          grilla.className = "oculto";
        } else {
          mensajeSweetAlert(
            "Failed request",
            "You are already invited to the party or you have previously sent a request",
            "error",
            "ok"
          );
        }
      });
    }
  });

  menu.classList.toggle("active");
  document.body.classList.toggle("opacity");
};

/**----------------------------------------------MIS EVENTOS-------------------------- */

const myEvent = () => {
  grilla.innerHTML = "";
  contenedor.innerHTML = "";
  contenedor.className = "oculto";
  menu.classList.toggle("active");
  document.body.classList.toggle("opacity");

  //eventos propios
  let eventOwn = allEvents.filter((element) => {
    return element.owner.nickname === userLog.nickname;
  });

  //eventos como invitado
  let eventGuest = [];
  let eventG = allEvents.filter((elem) => {
    return elem.users.length !== 0;
  });
  for (const eve of eventG) {
    let eveusr = eve.users;
    if (
      eveusr.some((elem) => {
        return elem.nickname === userLog.nickname;
      })
    ) {
      eventGuest.push(eve);
    }
  }
  for (const party of eventOwn) {
    const card = document.createElement("div");
    card.className = "cards";
    const ul = document.createElement("ul");
    const li = document.createElement("li");
    const p1 = document.createElement("p");
    p1.innerHTML = `<strong>Nombre</strong> ${party.named}`;

    const p2 = document.createElement("p");
    p2.innerHTML = `<strong>Descripción:</strong> ${party.descrip}`;

    const p3 = document.createElement("p");
    p3.innerHTML = `<strong>Number of Guests:</strong>${party.users.length} `;

    const p4 = document.createElement("p");
    p4.className = "owner";
    p4.innerHTML = `<strong>Like:</strong> Owner`;

    grilla.append(card);

    card.append(ul);

    ul.append(li);

    li.append(p1, p2, p3, p4);
  }
  for (const party of eventGuest) {
    const card = document.createElement("div");
    card.className = "cards";
    const ul = document.createElement("ul");
    const li = document.createElement("li");
    const p1 = document.createElement("p");
    p1.innerHTML = `<strong>Nombre</strong> ${party.named}`;

    const p2 = document.createElement("p");
    p2.innerHTML = `<strong>Descripción:</strong> ${party.descrip}`;

    const p3 = document.createElement("p");
    p3.innerHTML = `<strong>Number of Guests:</strong> ${party.users.length} `;

    const p4 = document.createElement("p");
    p4.className = "guest";
    p4.innerHTML = `<strong>Like:</strong> Guest`;

    grilla.append(card);

    card.append(ul);

    ul.append(li);

    li.append(p1, p2, p3, p4);
  }
};

/**-------------------------------------------------SOLICITUDES------------------------*/
const request = () => {
  grilla.innerHTML = "";
  contenedor.innerHTML = "";
  contenedor.className = "oculto";
  menu.classList.toggle("active");
  document.body.classList.toggle("opacity");

  //muestro los eventos de los que soy owner
  const eventAct = allEvents.filter((elem) => {
    return elem.owner.nickname === userLog.nickname;
  });

  // console.log(eventAct);

  for (const evento of eventAct) {
    const card = document.createElement("div");
    card.className = "cards";
    const ul = document.createElement("ul");
    const li = document.createElement("li");
    const p1 = document.createElement("p");
    p1.innerHTML = `<strong>Nombre</strong> ${evento.named}`;
    const p2 = document.createElement("p");
    p2.innerHTML = `<strong>Descripción:</strong> ${evento.descrip}`;

    const boton = document.createElement("button");
    boton.className = "butlager";
    boton.innerHTML = "<strong>View Requests</strong>";
    grilla.append(card);
    card.append(ul, boton);
    ul.append(li);
    li.append(p1, p2);

    boton.addEventListener(eventC, () => {
      grilla.innerHTML = "";
      if (evento.request.length !== 0) {
        for (const request of evento.request) {
          const card = document.createElement("div");
          card.className = "cards";
          const ul = document.createElement("ul");
          const li = document.createElement("li");
          const p1 = document.createElement("p");
          p1.innerHTML = `<strong>Nombre</strong> ${request.nickname}`;
          const p2 = document.createElement("p");
          p2.innerHTML = `<strong>Instagram:</strong> ${request.instagram}`;
          const p3 = document.createElement("p");
          p3.innerHTML = `<strong>Phone:</strong> ${request.phone}`;
          const p4 = document.createElement("p");
          p4.innerHTML = `<strong>Email:</strong> ${request.email}`;

          const boton1 = document.createElement("button");
          boton1.innerHTML = "<strong>Accept</strong>";
          boton1.className = "twobut";
          const boton2 = document.createElement("button");
          boton2.className = "twobut";
          boton2.innerHTML = "<strong>Decline</strong>";

          grilla.append(card);
          card.append(ul, boton1, boton2);
          ul.append(li);
          li.append(p1, p2, p3, p4);

          boton1.addEventListener(eventC, () => {
            let arrReq = evento.request;
            evento.request = arrReq.filter((usr) => {
              return usr.nickname !== request.nickname;
            });
            let arrUsers = evento.users;
            arrUsers.push(request);

            //grabo el invitado
            localStorage.setItem("Events", JSON.stringify(allEvents));

            mensajeSweetAlert("", "Succefull", "success", "ok");

            grilla.innerHTML = "";
            grilla.className = "oculto";
          });

          boton2.addEventListener(eventC, () => {
            let arrReq = evento.request;
            evento.request = arrReq.filter((usr) => {
              return usr.nickname !== request.nickname;
            });
            // console.log(evento.request);

            //solicitud rechazada
            localStorage.setItem("Events", JSON.stringify(allEvents));

            mensajeSweetAlert("", "Succefull", "success", "ok");

            grilla.innerHTML = "";
            grilla.className = "oculto";
          });
        }
      } else {
        mensajeSweetAlert("", "You ve not request", "info", "ok");
      }
    });
  }
};

// localStorage.clear();
