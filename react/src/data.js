// =====================================================================
//  Todo el contenido de la app vive aquí. Las páginas solo lo dibujan.
//  "wiki" = título de la página en https://ben10.fandom.com (de ahí se
//  saca la imagen con la API; ver wiki.js). Si la imagen no carga, la
//  app muestra un recuadro con la inicial, así que nunca se rompe.
//
//  Imagen propia (recomendado, también funciona sin internet): guarda el
//  archivo en public/img/ y agrega a ese elemento  imagen: '/img/heatblast.png'
//  Si existe 'imagen', se usa esa; si no, se pide a la wiki.
// =====================================================================

export const serie = {
  titulo: 'Ben 10',
  lema: 'Un reloj. Diez aliens. Un verano que cambia todo.',
  descripcion:
    'Ben Tennyson es un niño de 10 años que, durante un verano de viaje en casa rodante con su abuelo Max y su prima Gwen, encuentra el Omnitrix: un aparato parecido a un reloj que le permite transformarse en distintos alienígenas, cada uno con poderes únicos. Con ese poder, Ben aprende que ser héroe no es solo divertirse, sino proteger a los demás.',
  creadores: 'Man of Action (Duncan Rouleau, Joe Casey, Joe Kelly y Steven T. Seagle)',
  canal: 'Cartoon Network',
  estreno: '27 de diciembre de 2005',
  temporadas: '4 temporadas (serie original, 52 episodios)',
  continuaciones: [
    'Ben 10: Alien Force (2008)',
    'Ben 10: Ultimate Alien (2010)',
    'Ben 10: Omniverse (2012)',
    'Ben 10 (reinicio de 2016)',
  ],
}

// Los 10 aliens originales del Omnitrix
export const aliens = [
  {
    id: 'heatblast',//Tuve que traducir los nombres de los aliens al español, ya que en la wiki están en inglés y no se veían bien en la app.
    nombre: 'Fuego',
    wiki: 'Heatblast',
    imagen: '/img/Heatblast_OS.webp',
    especie: 'Pyronite',
    planeta: 'Pyros',
    poder: 'Controla y lanza fuego',
    descripcion:
      'Un ser hecho de magma y llamas que dispara bolas de fuego. En el primer episodio es el primer alien en el que Ben se transforma.',
    color: '#ff6a00',
  },
  {
    id: 'wildmutt',
    nombre: 'Bestia',
    wiki: 'Wildmutt',
    imagen: '/img/Wildmutt_OS.webp',
    especie: 'Vulpimancer',
    planeta: 'Vulpin',
    poder: 'Agilidad, fuerza y sentidos muy agudos',
    descripcion:
      'Una bestia sin ojos que se guía por el olfato y el oído. Es ágil, fuerte y muy salvaje.',
    color: '#c9742a',
  },
  {
    id: 'diamondhead',
    nombre: 'Diamante',
    wiki: 'Diamondhead',
    imagen: '/img/Diamondhead_OS.webp',
    especie: 'Petrosapien',
    planeta: 'Petropia',
    poder: 'Lanza y moldea cristales',
    descripcion:
      'Su cuerpo es de cristal, duro como el diamante. Dispara afilados cristales y los usa para crear escudos y armas.',
    color: '#7fe5ff',
  },
  {
    id: 'xlr8',
    nombre: 'XLR8',
    wiki: 'XLR8',
    imagen: '/img/XLR8OS.webp',
    especie: 'Kineceleran',
    planeta: 'Kinet',
    poder: 'Súper velocidad',
    descripcion:
      'Un velocista con garras y cola que corre a velocidades increíbles y puede subir por las paredes.',
    color: '#4aa3ff',
  },
  {
    id: 'greymatter',
    nombre: 'Materia Gris',
    wiki: 'Grey Matter',
    imagen: '/img/Grey_Matter_OS.webp',
    especie: 'Galvan',
    planeta: 'Galvan Prime',
    poder: 'Inteligencia genial y tamaño diminuto',
    descripcion:
      'Es el más pequeño, pero también el más inteligente. Resuelve los problemas donde la fuerza no sirve.',
    color: '#8fa3b8',
  },
  {
    id: 'fourarms',
    nombre: 'Cuatro Brazos',
    wiki: 'Four Arms',
    imagen: '/img/ANDREW_ROBINSON_FOURARMS.webp',
    especie: 'Tetramand',
    planeta: 'Khoros',
    poder: 'Súper fuerza',
    descripcion:
      'Un gigante rojo de cuatro brazos y fuerza descomunal. El favorito de Ben para los combates cuerpo a cuerpo.',
    color: '#ff3b3b',
  },
  {
    id: 'stinkfly',
    nombre: 'Insectoide',
    wiki: 'Stinkfly',
    imagen: '/img/Stinkfly_os_render.webp',
    especie: 'Lepidopterran',
    planeta: 'Lepidopterra',
    poder: 'Vuelo y disparos de baba',
    descripcion:
      'Un insecto volador que dispara baba pegajosa. Ideal para atacar desde el aire.',
    color: '#a8d84a',
  },
  {
    id: 'ripjaws',
    nombre: 'Acuatico',
    wiki: 'Ripjaws',
    imagen: '/img/Ripjaws_OS.webp',
    especie: 'Piscciss Volann',
    planeta: 'Piscciss',
    poder: 'Respira bajo el agua y muerde con fuerza',
    descripcion:
      'Un depredador acuático con una mordida feroz. Es el alien que Ben usa cuando la pelea es bajo el agua.',
    color: '#2ec4b6',
  },
  {
    id: 'upgrade',
    nombre: 'Ultra-T',
    wiki: 'Upgrade',
    imagen: '/img/Upgrade_Model.webp',
    especie: 'Galvanic Mechamorph',
    planeta: 'Galvan B',
    poder: 'Se fusiona con las máquinas y las controla',
    descripcion:
      'Una masa de materia que se mete dentro de la tecnología, la mejora y toma el control de ella.',
    color: '#39ff14',
  },
  {
    id: 'ghostfreak',
    nombre: 'Fantasmatico',
    wiki: 'Ghostfreak',
    imagen: '/img/GhostfreakPose2.webp',
    especie: 'Ectonurite',
    planeta: 'Anur Phaetos',
    poder: 'Intangibilidad e invisibilidad',
    descripcion:
      'Un fantasma que atraviesa paredes y se vuelve invisible. Más adelante en la serie logra escapar del Omnitrix.',
    color: '#b07cff',
  },
]

export const personajes = [
  {
    id: 'ben',
    nombre: 'Ben Tennyson',
    wiki: 'Ben Tennyson',
    imagen: '/img/Ben_Tennyson_29_Original_Series_Pose_1.webp',
    rol: 'Protagonista',
    descripcion:
      'Un niño de 10 años, bromista e impulsivo, que encuentra el Omnitrix durante un viaje de verano y se convierte en héroe.',
    datos: [
      'Edad: 10 años (serie original)',
      'Poder: se transforma en aliens con el Omnitrix',
      'Aliados: Gwen y el Abuelo Max',
    ],
  },
  {
    id: 'gwen',
    nombre: 'Gwen Tennyson',
    wiki: 'Gwen Tennyson',
    imagen: '/img/Gwen_Tennyson_29_Original_Series_Pose_1.webp',
    rol: 'Prima de Ben',
    descripcion:
      'Lista, curiosa y con respuesta para todo. Acompaña a Ben en el viaje y muchas veces es quien lo saca de los problemas.',
    datos: ['Edad: 10 años', 'Relación: prima de Ben', 'Rol: la cabeza pensante del equipo'],
  },
  {
    id: 'max',
    nombre: 'Abuelo Max',
    wiki: 'Max Tennyson',
    imagen: '/img/Max_tenyson_poses_29.webp',
    rol: 'Guía del viaje',
    descripcion:
      'El abuelo de Ben y Gwen. Maneja la casa rodante del viaje y esconde un pasado como Plomero, una organización que protege la Tierra de amenazas alienígenas.',
    datos: ['Rol: mentor de Ben', 'Vehículo: la casa rodante', 'Secreto: fue Plomero'],
  },
  {
    id: 'vilgax',
    nombre: 'Vilgax',
    wiki: 'Vilgax',
    imagen: '/img/Vilgax_Serie_Original.webp',
    rol: 'Villano principal',
    descripcion:
      'Un conquistador alienígena que quiere el Omnitrix a cualquier precio. Envía cazarrecompensas para quitárselo a Ben.',
    datos: ['Objetivo: conseguir el Omnitrix', 'Método: cazarrecompensas y robots', 'Es el enemigo más temido de Ben'],
  },
  {
    id: 'kevin',
    nombre: 'Kevin Levin',
    wiki: 'Kevin Levin',
    imagen: '/img/Kevin_Levin_OS_Render.webp',
    rol: 'Rival de Ben',
    descripcion:
      'Un chico que absorbe energía y copia poderes. Empieza como enemigo de Ben y su relación cambia a lo largo de la serie.',
    datos: ['Poder: absorbe energía', 'Primera aparición: como rival', 'Apodo: Kevin 11'],
  },
]

// ⚠️ ESTOS TRES MOMENTOS SON DE EJEMPLO: cámbialos por TUS favoritos.
//   - video: el código de YouTube (lo que va después de "v=" en el enlace)
//   - archivo: o una ruta dentro de /public, por ejemplo "/video/momento1.mp4"
//   - wiki: título de una página de la wiki para sacar la foto (opcional)
export const momentos = [
  {
    id: 'm1',
    titulo: 'Ben encuentra el Omnitrix',
    wiki: 'And Then There Were 10',
    detalle:
      'El inicio de todo: durante su viaje de verano, Ben encuentra un extraño aparato parecido a un reloj que se pega a su muñeca. En el primer episodio, "And Then There Were 10", descubre que puede convertirse en diez aliens distintos.',
    video: 'iyxSQNEi3os',
    archivo: '',
  },
  {
    id: 'm2',
    titulo: 'Ben 10 vs Vilgax',
    wiki: 'Hunted',
    detalle:
      'Ben enfrenta uno de sus mayores retos: Vilgax!!.',
    video: '',
    archivo: '',
  },
  {
    id: 'm3',
    titulo: 'Ben conoce a Kevin 11',
    wiki: 'Kevin 11 (episode)',
    detalle:
      'Tras una discusión con el Abuelo Max, Ben se va solo a la ciudad y se encuentra con un chico que absorbe energía. Nace una de las rivalidades más recordadas de la serie.',
    video: '',
    archivo: '',
  },
]

// ⚠️ DATOS DE EJEMPLO: pon los tuyos. Tu foto: guárdala en /public/yo.jpg
export const contacto = {
  nombre: 'Edwin Felipe De La Cruz Montero',
  titulo: 'Desarrollador/a de aplicaciones móviles',
  foto: '/img/WhatsApp Image 2026-10-19 at 10.49.42 PM.jpeg',
  bio: 'Soy estudiante de desarrollo de software. Si te gustó este proyecto, ¡hablemos!',
  email: 'feliudd04@gmail.com',
  telefono: '+1 809 923 4136',
  github: 'https://github.com/TheAwful1',
}
