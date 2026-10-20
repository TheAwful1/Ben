# Sprites del juego

Esta carpeta está preparada para los recursos del combate de Ben contra Vilgax. Como cada acción tendrá **una sola ilustración**, no dibujes hojas de sprites ni varios fotogramas por archivo.

## Cantidad total: 24 imágenes PNG

### Fuego — 7 imágenes

1. `fuego_idle.png` — pose de reposo, de pie y listo para pelear.
2. `fuego_run.png` — pose dinámica de carrera, torso inclinado y una pierna adelantada.
3. `fuego_jump.png` — pose en el aire, piernas recogidas y brazos equilibrando el salto.
4. `fuego_attack_ranged.png` — pose de lanzar fuego con un brazo extendido; se usa con el ataque básico (J).
5. `fuego_attack_melee.png` — pose de golpe cercano rodeado de llamas; se usa con el ataque especial (K).
6. `fuego_hurt.png` — cuerpo echado hacia atrás por un impacto.
7. `fuego_defeat.png` — pose de derrota, caído o arrodillado.

### Cuatro Brazos — 7 imágenes

1. `cuatro-brazos_idle.png` — pose firme, cuatro brazos claramente visibles.
2. `cuatro-brazos_run.png` — pose de carrera pesada, torso inclinado y brazos en movimiento.
3. `cuatro-brazos_jump.png` — pose en el aire, rodillas flexionadas.
4. `cuatro-brazos_attack_melee.png` — puñetazo potente hacia delante; ataque básico (J).
5. `cuatro-brazos_attack_ranged.png` — pose de arrojar una roca hacia delante; ataque especial (K).
6. `cuatro-brazos_hurt.png` — pose reaccionando a un golpe.
7. `cuatro-brazos_defeat.png` — pose de derrota.

### Vilgax — 7 imágenes

1. `vilgax_idle.png` — pose amenazante de reposo.
2. `vilgax_run.png` — zancada pesada para perseguir al jugador.
3. `vilgax_jump.png` — pose de salto.
4. `vilgax_attack_melee.png` — golpe físico cercano.
5. `vilgax_attack_ranged.png` — pose de disparar energía a distancia.
6. `vilgax_hurt.png` — pose de retroceso por impacto.
7. `vilgax_defeat.png` — pose de derrota.

### Proyectiles — 3 imágenes

- `proyectil_fuego.png` — bola de fuego de Fuego.
- `proyectil_roca.png` — roca lanzada por Cuatro Brazos.
- `proyectil_vilgax.png` — disparo de energía roja de Vilgax.

## Reglas de dibujo y exportación

- **Un archivo PNG por pose/acción**, con fondo transparente (canal alfa).
- **Lienzo de 256 × 256 píxeles por imagen** para todas las poses de personajes.
- Personajes de cuerpo completo, sin cortar llamas, manos, pies, armas ni extremidades.
- Vista lateral de juego de plataformas 2D; dibuja a los tres personajes mirando hacia la **derecha**. El juego los reflejará para que miren a la izquierda.
- Mantén el tamaño visual coherente entre poses del mismo personaje. Centra horizontalmente el cuerpo y deja un margen transparente alrededor.
- Mantén los pies aproximadamente sobre la misma línea, cerca de la parte inferior del lienzo (aprox. y = 238). En salto/derrota la pose puede separarse de esa línea de forma intencional.
- Para proyectiles puedes usar un lienzo transparente de 128 × 128 píxeles; dibuja la forma centrada y con margen.
- Exporta en PNG, en sRGB y sin fondo, texto, sombra exterior de fondo ni cuadrícula de transparencia.
- Usa nombres exactamente como aparecen arriba, incluyendo minúsculas y guiones.
- Cada archivo contiene una sola pose, no una tira horizontal ni un atlas.

## Cómo simularemos la animación de correr

Con una única pose de carrera por personaje no se pueden animar de verdad las piernas cuadro a cuadro. Para ajustarnos a ese límite, el código animará el sprite de carrera con un leve rebote vertical, pequeña inclinación/escala, polvo o trazos de velocidad y desplazamiento horizontal. Eso dará sensación de movimiento sin pedirte dibujos adicionales. Será una animación limitada, no tan fluida como una carrera de 4–6 fotogramas.

Si en algún momento quieres una carrera más fluida, bastará con dibujar fotogramas adicionales de carrera; el resto de las acciones puede seguir usando una sola imagen.

## Rutas de archivos en React/Vite

Guarda los archivos en `react/public/juego/Sprites/`. Por ejemplo:

`react/public/juego/Sprites/fuego_idle.png`

Vite los servirá con esta ruta desde el navegador:

`/juego/Sprites/fuego_idle.png`

**Importante:** esta lista documenta los recursos que vamos a integrar. Los personajes todavía se dibujan mediante formas de Canvas; los PNG se conectarán en un cambio posterior cuando estén subidos.
