# Sprites del juego

Esta carpeta contiene las hojas de sprites del combate de Ben contra Vilgax.

## Ubicación y rutas

Archivos dentro de `react/public/juego/Sprites/` se cargan en el navegador usando rutas como:

`/juego/Sprites/fuego_idle.png`

Mantén los nombres de archivo consistentes, sin espacios y con extensión en minúscula.

## Nombres sugeridos

- `fuego_idle.png`
- `fuego_run.png`
- `fuego_jump.png`
- `fuego_attack_ranged.png`
- `fuego_attack_melee.png`
- `cuatro-brazos_idle.png`
- `cuatro-brazos_run.png`
- `cuatro-brazos_jump.png`
- `cuatro-brazos_attack_melee.png`
- `cuatro-brazos_attack_ranged.png`
- `vilgax_idle.png`
- `vilgax_run.png`
- `vilgax_jump.png`
- `vilgax_attack.png`
- `vilgax_hurt.png`
- `proyectil_fuego.png`
- `proyectil_roca.png`

## Exportación recomendada

- PNG con transparencia para personajes y proyectiles.
- Hoja horizontal con una celda por fotograma, sin espacio entre celdas.
- Mantén cada fotograma de la misma animación con dimensiones idénticas y los pies alineados.
- Todas las animaciones mirando a la derecha; el juego las reflejará cuando haga falta.
- Documenta en el pull request cuántos fotogramas hay por fila y las dimensiones de cada celda.

Por ahora el juego sigue dibujando personajes provisionales mediante Canvas. Esta carpeta prepara la ubicación de los recursos; aún no carga sprites automáticamente.
