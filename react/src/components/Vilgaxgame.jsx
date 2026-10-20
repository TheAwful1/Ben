import { useEffect, useRef, useState } from "react";
import "./Vilgaxgame.css";

const WIDTH = 960;
const HEIGHT = 540;
const GROUND = 430;

const createGame = () => ({
  form: "fire",
  player: {
    x: 130, y: GROUND - 72, w: 42, h: 72,
    vx: 0, vy: 0, hp: 100, face: 1,
    onGround: true, invuln: 0,
    attackCooldown: 0, specialCooldown: 0,
    attackAnim: 0, specialAnim: 0,
  },
  boss: {
    x: 735, y: GROUND - 105, w: 76, h: 105,
    hp: 180, face: -1, attackCooldown: 0,
    stun: 0, vy: 0, onGround: true, jumpCooldown: 1.4, rangedCooldown: 1.2,
  },
  projectiles: [],
  controls: { left: false, right: false, jump: false, attack: false, special: false },
  jumpLocked: false,
});

function drawHealthBar(ctx, x, y, width, hp, maxHp, color, label) {
  ctx.fillStyle = "#141820";
  ctx.fillRect(x, y, width, 19);
  ctx.fillStyle = "#3c4149";
  ctx.fillRect(x + 2, y + 2, width - 4, 15);
  ctx.fillStyle = color;
  ctx.fillRect(x + 2, y + 2, (width - 4) * Math.max(0, hp / maxHp), 15);
  ctx.strokeStyle = "#e4e7eb";
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, width, 19);
  ctx.fillStyle = "white";
  ctx.font = "bold 15px sans-serif";
  ctx.fillText(`${label}  ${Math.max(0, Math.ceil(hp))}/${maxHp}`, x, y - 7);
}

function drawBackground(ctx) {
  const sky = ctx.createLinearGradient(0, 0, 0, GROUND);
  sky.addColorStop(0, "#142d36");
  sky.addColorStop(1, "#426b50");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Montañas y vegetación lejana
  ctx.fillStyle = "#294b40";
  ctx.beginPath();
  ctx.moveTo(0, 330);
  ctx.lineTo(150, 195);
  ctx.lineTo(280, 330);
  ctx.lineTo(420, 215);
  ctx.lineTo(590, 335);
  ctx.lineTo(760, 200);
  ctx.lineTo(960, 330);
  ctx.lineTo(960, GROUND);
  ctx.lineTo(0, GROUND);
  ctx.fill();

  // Árboles de la jungla
  for (let i = 0; i < 10; i++) {
    const x = i * 112 - 20;
    ctx.fillStyle = "#26392c";
    ctx.fillRect(x + 27, 255, 19, 180);
    ctx.fillStyle = i % 2 ? "#355c3c" : "#3e6942";
    ctx.beginPath();
    ctx.arc(x + 35, 255, 62, 0, Math.PI * 2);
    ctx.arc(x, 290, 43, 0, Math.PI * 2);
    ctx.arc(x + 72, 292, 45, 0, Math.PI * 2);
    ctx.fill();
  }

  // Ruinas y pilares
  ctx.fillStyle = "#62675c";
  ctx.fillRect(75, 337, 48, 93);
  ctx.fillRect(64, 329, 70, 12);
  ctx.fillRect(815, 315, 53, 115);
  ctx.fillRect(805, 307, 72, 13);
  ctx.fillStyle = "#444d46";
  ctx.fillRect(92, 348, 5, 70);
  ctx.fillRect(834, 328, 6, 90);

  // Suelo
  ctx.fillStyle = "#51442f";
  ctx.fillRect(0, GROUND, WIDTH, HEIGHT - GROUND);
  ctx.fillStyle = "#648448";
  ctx.fillRect(0, GROUND, WIDTH, 9);

  ctx.fillStyle = "#796340";
  for (let i = 0; i < 34; i++) {
    const x = (i * 83 + 21) % WIDTH;
    const y = GROUND + 20 + (i * 17) % 95;
    ctx.fillRect(x, y, 8 + (i % 3) * 4, 3);
  }
}

function drawPlayer(ctx, p, form) {
  if (p.invuln > 0 && Math.floor(Date.now() / 85) % 2 === 0) {
    return;
  }

  const x = p.x;
  const y = p.y;
  const fire = form === "fire";

  // Llamas decorativas
  if (fire) {
    ctx.fillStyle = "#ffb52c";
    ctx.beginPath();
    ctx.moveTo(x + 7, y + 23);
    ctx.lineTo(x + 4, y + 3);
    ctx.lineTo(x + 18, y + 15);
    ctx.lineTo(x + 24, y - 10);
    ctx.lineTo(x + 31, y + 15);
    ctx.lineTo(x + 41, y + 2);
    ctx.lineTo(x + 38, y + 28);
    ctx.fill();
  }

  const skin = fire ? "#e45b27" : "#ba383f";
  const outfit = fire ? "#252c35" : "#303b35";

  // Piernas
  ctx.fillStyle = outfit;
  ctx.fillRect(x + 7, y + 47, 12, 25);
  ctx.fillRect(x + 24, y + 47, 12, 25);

  // Torso
  ctx.fillStyle = skin;
  ctx.fillRect(x + 5, y + 22, 32, 30);

  // Ropa y cinturón
  ctx.fillStyle = outfit;
  ctx.fillRect(x + 8, y + 36, 26, 15);
  ctx.fillStyle = "#a7ad56";
  ctx.fillRect(x + 9, y + 35, 24, 5);

  // Cabeza
  ctx.fillStyle = skin;
  ctx.fillRect(x + 11, y + 5, 22, 22);
  ctx.fillStyle = "#171e22";
  ctx.fillRect(x + 11, y + 5, 22, 6);

  // Brazos
  ctx.fillStyle = skin;
  ctx.fillRect(x - 3, y + 24, 10, 26);
  ctx.fillRect(x + 35, y + 24, 10, 26);

  if (!fire) {
    // Segundo par de brazos de Cuatro Brazos
    ctx.fillRect(x - 10, y + 29, 10, 20);
    ctx.fillRect(x + 42, y + 29, 10, 20);
    ctx.fillStyle = "#292f30";
    ctx.fillRect(x + 7, y + 17, 28, 8);
  }

  // Indicador de dirección
  ctx.fillStyle = "#f8edc1";
  const eyeX = p.face > 0 ? x + 27 : x + 13;
  ctx.fillRect(eyeX, y + 14, 5, 4);

  // Indicador visual para los ataques físicos de ambas formas.
  if (p.attackAnim > 0) {
    ctx.strokeStyle = fire ? "#ffb52c" : "#ffe6a0";
    ctx.lineWidth = fire ? 7 : 5;
    ctx.beginPath();
    const side = p.face;
    ctx.arc(
      x + 21 + side * 25,
      y + 31,
      fire ? 30 : 25,
      side > 0 ? -0.9 : Math.PI - 0.9,
      side > 0 ? 0.9 : Math.PI + 0.9
    );
    ctx.stroke();
  }

  if (fire && p.specialAnim > 0) {
    ctx.fillStyle = "rgba(255, 133, 30, 0.28)";
    ctx.beginPath();
    ctx.ellipse(x + 21 + p.face * 22, y + 35, 35, 24, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawVilgax(ctx, b) {
  const x = b.x;
  const y = b.y;

  // Piernas y armadura
  ctx.fillStyle = "#242c30";
  ctx.fillRect(x + 10, y + 68, 21, 37);
  ctx.fillRect(x + 45, y + 68, 21, 37);

  // Cuerpo
  ctx.fillStyle = "#842f36";
  ctx.fillRect(x + 7, y + 29, 62, 48);
  ctx.fillStyle = "#363e43";
  ctx.fillRect(x + 13, y + 47, 50, 30);

  // Hombros
  ctx.fillStyle = "#a83f3b";
  ctx.fillRect(x - 2, y + 31, 24, 24);
  ctx.fillRect(x + 54, y + 31, 24, 24);

  // Cabeza y piel
  ctx.fillStyle = "#476a55";
  ctx.fillRect(x + 17, y + 2, 44, 35);
  ctx.fillStyle = "#1a2025";
  ctx.fillRect(x + 14, y, 49, 11);

  // Ojos
  ctx.fillStyle = "#ff392f";
  ctx.fillRect(x + 23, y + 17, 9, 5);
  ctx.fillRect(x + 47, y + 17, 9, 5);

  // Puños
  ctx.fillStyle = "#566b5a";
  ctx.fillRect(x - 5, y + 52, 18, 17);
  ctx.fillRect(x + 63, y + 52, 18, 17);
}

export default function VilgaxGame() {
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const controlsRef = useRef({
    left: false, right: false, jump: false, attack: false, special: false,
  });

  useEffect(() => {
    if (!started) return undefined;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const g = createGame();
    gameRef.current = g;
    let raf = 0;
    let lastTime = 0;

    const keys = new Set();

    const onKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if ([" ", "arrowleft", "arrowright", "arrowup"].includes(key)) {
        e.preventDefault();
      }
      keys.add(key);

      if (key === "1") g.form = "fire";
      if (key === "2") g.form = "fourarms";
    };

    const onKeyUp = (e) => keys.delete(e.key.toLowerCase());

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    function update(dt) {
      const p = g.player;
      const b = g.boss;
      const c = controlsRef.current;

      if (p.hp <= 0 || b.hp <= 0) return;

      const left = c.left || keys.has("a") || keys.has("arrowleft");
      const right = c.right || keys.has("d") || keys.has("arrowright");
      const jump = c.jump || keys.has("w") || keys.has("arrowup") || keys.has(" ");
      const attacking = c.attack || keys.has("j");
      const specialing = c.special || keys.has("k");

      p.vx = 0;
      if (left) p.vx = -220;
      if (right) p.vx = 220;

      if (jump && p.onGround && !g.jumpLocked) {
        // Ben salta un poco más alto que Vilgax.
        p.vy = -540;
        p.onGround = false;
        g.jumpLocked = true;
      }
      if (!jump) g.jumpLocked = false;

      p.x += p.vx * dt;
      p.vy += 1250 * dt;
      p.y += p.vy * dt;

      if (p.y + p.h >= GROUND) {
        p.y = GROUND - p.h;
        p.vy = 0;
        p.onGround = true;
      }

      p.x = Math.max(8, Math.min(WIDTH - p.w - 8, p.x));

      p.invuln = Math.max(0, p.invuln - dt);
      p.attackCooldown = Math.max(0, p.attackCooldown - dt);
      p.specialCooldown = Math.max(0, p.specialCooldown - dt);
      p.attackAnim = Math.max(0, p.attackAnim - dt);
      p.specialAnim = Math.max(0, p.specialAnim - dt);
      b.attackCooldown = Math.max(0, b.attackCooldown - dt);
      b.jumpCooldown = Math.max(0, b.jumpCooldown - dt);
      b.rangedCooldown = Math.max(0, b.rangedCooldown - dt);
      b.stun = Math.max(0, b.stun - dt);

      let playerCenter = p.x + p.w / 2;
      let bossCenter = b.x + b.w / 2;
      let distance = playerCenter - bossCenter;

      // Vilgax también puede saltar, pero no alcanza la altura de Ben.
      if (b.onGround && b.jumpCooldown <= 0 && Math.abs(distance) < 250) {
        b.vy = -430;
        b.onGround = false;
        b.jumpCooldown = 2.8;
      }
      b.vy += 1250 * dt;
      b.y += b.vy * dt;
      if (b.y + b.h >= GROUND) {
        b.y = GROUND - b.h;
        b.vy = 0;
        b.onGround = true;
      }

      // Vilgax persigue horizontalmente al jugador.
      if (Math.abs(distance) > 92 && b.stun <= 0) {
        b.x += Math.sign(distance) * 105 * dt;
      }
      b.x = Math.max(8, Math.min(WIDTH - b.w - 8, b.x));

      // Ambos personajes siempre miran hacia su oponente, no hacia el último movimiento.
      playerCenter = p.x + p.w / 2;
      bossCenter = b.x + b.w / 2;
      distance = playerCenter - bossCenter;
      p.face = playerCenter < bossCenter ? 1 : -1;
      b.face = playerCenter < bossCenter ? -1 : 1;

      // A distancia, Vilgax dispara una descarga de energía hacia Ben.
      if (Math.abs(distance) > 175 && b.rangedCooldown <= 0) {
        g.projectiles.push({
          type: "vilgax",
          owner: "boss",
          x: bossCenter + b.face * 35,
          y: b.y + 45,
          vx: b.face * 285,
          life: 2.5,
          damage: 12,
        });
        b.rangedCooldown = 2.4;
      }

      // Vilgax solo golpea si está cerca y comparte altura con el jugador.
      const verticalOverlap = p.y < b.y + b.h && p.y + p.h > b.y;
      if (Math.abs(distance) <= 104 && b.attackCooldown <= 0) {
        if (verticalOverlap && p.invuln <= 0) {
          p.hp = Math.max(0, p.hp - 13);
          p.invuln = 0.9;
        }
        b.attackCooldown = 1.15;
      }

      // J / botón ATAQUE: Fuego dispara; Cuatro Brazos golpea cuerpo a cuerpo.
      if (attacking && p.attackCooldown <= 0) {
        p.attackCooldown = g.form === "fire" ? 0.5 : 0.68;

        if (g.form === "fire") {
          g.projectiles.push({
            type: "fire",
            owner: "player",
            x: playerCenter + p.face * 25,
            y: p.y + 32,
            vx: p.face * 440,
            life: 1.6,
            damage: 18,
          });
        } else {
          p.attackAnim = 0.24;
          if (Math.abs(distance) < 132) {
            b.hp = Math.max(0, b.hp - 24);
            b.stun = 0.22;
            b.x += p.face * 10;
          }
        }
      }

      // K / botón ESPECIAL: Fuego da un golpe cercano; Cuatro Brazos lanza una roca.
      if (specialing && p.specialCooldown <= 0) {
        p.specialCooldown = g.form === "fire" ? 0.82 : 1.05;
        p.specialAnim = 0.28;

        if (g.form === "fire") {
          p.attackAnim = 0.25;
          if (Math.abs(distance) < 100) {
            b.hp = Math.max(0, b.hp - 27);
            b.stun = 0.28;
            b.x += p.face * 12;
          }
        } else {
          g.projectiles.push({
            type: "rock",
            owner: "player",
            x: playerCenter + p.face * 30,
            y: p.y + 40,
            vx: p.face * 360,
            life: 2,
            damage: 16,
          });
        }
      }

      for (const projectile of g.projectiles) {
        projectile.x += projectile.vx * dt;
        projectile.life -= dt;

        if (
          projectile.life > 0 &&
          projectile.owner === "player" &&
          projectile.x >= b.x - 10 &&
          projectile.x <= b.x + b.w + 10 &&
          projectile.y >= b.y &&
          projectile.y <= b.y + b.h
        ) {
          b.hp = Math.max(0, b.hp - projectile.damage);
          b.stun = 0.16;
          projectile.life = 0;
        } else if (
          projectile.life > 0 &&
          projectile.owner === "boss" &&
          projectile.x >= p.x - 10 &&
          projectile.x <= p.x + p.w + 10 &&
          projectile.y >= p.y &&
          projectile.y <= p.y + p.h
        ) {
          if (p.invuln <= 0) {
            p.hp = Math.max(0, p.hp - projectile.damage);
            p.invuln = 0.75;
          }
          projectile.life = 0;
        }
      }

      g.projectiles = g.projectiles.filter(
        (projectile) =>
          projectile.life > 0 &&
          projectile.x > -30 &&
          projectile.x < WIDTH + 30
      );
    }

    function draw() {
      drawBackground(ctx);

      // Barras de salud
      drawHealthBar(ctx, 28, 35, 300, g.player.hp, 100, "#36c96a", "BEN");
      drawHealthBar(ctx, 630, 35, 300, g.boss.hp, 180, "#dc4545", "VILGAX");

      // Identificador de transformación
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 17px sans-serif";
      ctx.fillText(
        g.form === "fire" ? "FUEGO" : "CUATRO BRAZOS",
        28,
        83
      );

      // Proyectiles de fuego y rocas lanzadas por Cuatro Brazos.
      for (const projectile of g.projectiles) {
        if (projectile.type === "vilgax") {
          ctx.fillStyle = "#df334a";
          ctx.beginPath();
          ctx.arc(projectile.x, projectile.y, 13, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#ffb4bd";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(projectile.x, projectile.y, 7, 0, Math.PI * 2);
          ctx.stroke();
        } else if (projectile.type === "rock") {
          ctx.save();
          ctx.translate(projectile.x, projectile.y);
          ctx.rotate(projectile.x * 0.015);
          ctx.fillStyle = "#7f8580";
          ctx.beginPath();
          ctx.moveTo(-10, -7);
          ctx.lineTo(1, -12);
          ctx.lineTo(12, -4);
          ctx.lineTo(8, 9);
          ctx.lineTo(-5, 11);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = "#c4c7bc";
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
        } else {
          ctx.fillStyle = "#ff8c24";
          ctx.beginPath();
          ctx.arc(projectile.x, projectile.y, 11, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#fff2ac";
          ctx.beginPath();
          ctx.arc(projectile.x, projectile.y, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      drawPlayer(ctx, g.player, g.form);
      drawVilgax(ctx, g.boss);

      if (g.player.hp <= 0 || g.boss.hp <= 0) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.font = "bold 42px sans-serif";
        ctx.fillText(
          g.boss.hp <= 0 ? "¡VILGAX DERROTADO!" : "HAS SIDO DERROTADO",
          WIDTH / 2,
          HEIGHT / 2
        );
        ctx.font = "20px sans-serif";
        ctx.fillText("Vuelve al menú para intentarlo de nuevo", WIDTH / 2, HEIGHT / 2 + 42);
        ctx.textAlign = "left";
      }
    }

    function frame(time) {
      const dt = Math.min((time - lastTime) / 1000 || 0, 0.033);
      lastTime = time;
      update(dt);
      draw();
      if ((g.player.hp <= 0 || g.boss.hp <= 0) && !g.gameOverReported) {
        g.gameOverReported = true;
        setGameOver(true);
      }
      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      gameRef.current = null;
    };
  }, [started]);

  function setControl(name, value) {
    controlsRef.current[name] = value;
  }

  function startGame() {
    controlsRef.current = { left: false, right: false, jump: false, attack: false, special: false };
    setGameOver(false);
    setStarted(true);
  }

  function returnToMenu() {
    controlsRef.current = { left: false, right: false, jump: false, attack: false, special: false };
    setGameOver(false);
    setStarted(false);
  }

  function chooseForm(form) {
    if (gameRef.current) gameRef.current.form = form;
  }

  function HoldButton({ label, control, className = "" }) {
    return (
      <button
        type="button"
        className={`game-control ${className}`}
        aria-label={label}
        onPointerDown={(e) => {
          e.preventDefault();
          setControl(control, true);
          e.currentTarget.setPointerCapture?.(e.pointerId);
        }}
        onPointerUp={() => setControl(control, false)}
        onPointerCancel={() => setControl(control, false)}
        onLostPointerCapture={() => setControl(control, false)}
        onContextMenu={(e) => e.preventDefault()}
      >
        {label}
      </button>
    );
  }


  if (!started) {
    return (
      <section className="vilgax-game">
        <div
          className="vilgax-game__menu"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(3, 14, 8, 0.9), rgba(3, 14, 8, 0.4)), url('/img/ben-vs-vilgax.webp')",
          }}
        >
          <div className="vilgax-game__menu-content">
            <p className="vilgax-game__eyebrow">UNA BATALLA POR LA TIERRA</p>
            <h1 className="vilgax-game__title">BEN 10</h1>
            <h2 className="vilgax-game__subtitle">SAVAGE PURSUIT</h2>
            <p className="vilgax-game__tagline">Enfréntate a Vilgax en la jungla.</p>
            <button type="button" className="game-control vilgax-game__start" onClick={startGame}>
              INICIAR
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="vilgax-game">
      <div className="vilgax-game__screen">
        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          aria-label="Juego de lucha contra Vilgax"
        />
      </div>

      <div className="vilgax-game__forms">
        <button
          type="button"
          className="game-control form-control"
          onClick={() => chooseForm("fire")}
        >
          🔥 Fuego <small>1</small>
        </button>
        <button
          type="button"
          className="game-control form-control"
          onClick={() => chooseForm("fourarms")}
        >
          💪 Cuatro Brazos <small>2</small>
        </button>
      </div>

      <div className="vilgax-game__controls">
        <div className="movement-controls" aria-label="Movimiento">
          <HoldButton label="◀" control="left" className="direction-control" />
          <HoldButton label="▶" control="right" className="direction-control" />
          <HoldButton label="SALTAR" control="jump" className="jump-control" />
        </div>
        <div className="action-controls" aria-label="Ataques">
          <HoldButton
            label="ATAQUE · J"
            control="attack"
            className="attack-control"
          />
          <HoldButton
            label="ESPECIAL · K"
            control="special"
            className="special-control"
          />
        </div>
      </div>

      <p className="vilgax-game__help">
        <strong>Controles</strong>
        <span> Mover: A/D o ←/→</span>
        <span> Saltar: W o Espacio</span>
        <span> Ataque: J</span>
        <span> Especial: K</span>
        <span> Cambiar forma: 1 / 2</span>
        <span className="mobile-hint">En móvil, mantén pulsados los botones de movimiento y usa ATAQUE o ESPECIAL.</span>
      </p>
      {gameOver && (
        <button type="button" className="game-control vilgax-game__return" onClick={returnToMenu}>
          VOLVER AL MENÚ
        </button>
      )}
    </section>
  );
}
