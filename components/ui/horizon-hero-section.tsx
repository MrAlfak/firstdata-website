"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

gsap.registerPlugin(ScrollTrigger);

export type HorizonHeroCopy = {
  title?: string;
  subtitleLine1?: string;
  subtitleLine2?: string;
  menuLabel?: string;
  scrollLabel?: string;
};

export type HorizonBeat = "enter" | "cross" | "awaken" | "ready";

export type HorizonHeroCeremony = {
  enabled: boolean;
  durationMs?: number;
  brand?: string;
  status?: string;
  ready?: string;
  beat?: string;
  awaken?: string;
  /** Render the scene only — the host draws its own legible copy above the chrome. */
  hideCopy?: boolean;
  onProgress?: (progress: number) => void;
  onBeat?: (beat: HorizonBeat) => void;
  onReady?: () => void;
  onClimax?: () => void;
  /** Last beat — the scene has arrived and starts blooming into the new world. */
  onFinale?: () => void;
  onDone?: () => void;
  /** Live camera/scene numbers for the host HUD. */
  onTelemetry?: (data: HorizonTelemetry) => void;
};

export type HorizonTelemetry = {
  alt: number;
  dist: number;
  fov: number;
  dawn: number;
};

type Props = {
  copy?: HorizonHeroCopy;
  ceremony?: HorizonHeroCeremony;
  className?: string;
};

type ThreeBag = {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  composer: EffectComposer | null;
  bloom: UnrealBloomPass | null;
  stars: THREE.Points[];
  nebula: THREE.Mesh | null;
  mountains: THREE.Mesh[];
  atmosphere: THREE.Mesh | null;
  sun: THREE.Mesh | null;
  sunGlow: THREE.Sprite | null;
  sunRays: THREE.Mesh | null;
  rimGlow: THREE.Sprite | null;
  lensFlare: THREE.Group | null;
  meteors: THREE.Line[];
  dust: THREE.Points | null;
  signalGrid: THREE.Mesh | null;
  handshakeTunnel: THREE.Mesh | null;
  packetStreams: THREE.Points | null;
  animationId: number | null;
  locations: number[];
  targetCameraX: number;
  targetCameraY: number;
  targetCameraZ: number;
  targetFov: number;
  lookAtY: number;
  dawnProgress: number;
  /** 0 = dial-up CRT world, 1 = AI dawn world */
  eraProgress: number;
  /** Connect-impact shake (0–1), decays in animate */
  shake: number;
  /** Unix-ish time to force a meteor volley on climax */
  meteorBurstAt: number;
};

const DEFAULT_COPY: Required<HorizonHeroCopy> = {
  title: "HORIZON",
  subtitleLine1: "Where vision meets reality,",
  subtitleLine2: "we shape the future of tomorrow",
  menuLabel: "SPACE",
  scrollLabel: "SCROLL",
};

const SECTION_TITLES = ["HORIZON", "COSMOS", "INFINITY"] as const;
const SECTION_SUBTITLES = [
  {
    line1: "Where vision meets reality,",
    line2: "we shape the future of tomorrow",
  },
  {
    line1: "Beyond the boundaries of imagination,",
    line2: "lies the universe of possibilities",
  },
  {
    line1: "In the space between thought and creation,",
    line2: "we find the essence of true innovation",
  },
] as const;

const CAMERA_POSITIONS = [
  { x: 0, y: 30, z: 300 },
  { x: 0, y: 40, z: -50 },
  { x: 0, y: 50, z: -700 },
] as const;

/** Cinematic ceremony rail — dial hold → handshake crest → uplink glide → AI settle */
const CEREMONY_KEYS = [
  { t: 0, x: 0, y: 6, z: 560, fov: 84, lookY: 4 },
  { t: 0.14, x: 1, y: 10, z: 440, fov: 79, lookY: 7 },
  { t: 0.28, x: 5, y: 22, z: 260, fov: 72, lookY: 12 },
  // Handshake crest — slight dive + FOV punch into the conduit
  { t: 0.4, x: 8, y: 32, z: 90, fov: 66, lookY: 15 },
  { t: 0.52, x: 3, y: 40, z: -20, fov: 60, lookY: 18 },
  { t: 0.68, x: -5, y: 48, z: -180, fov: 57, lookY: 19 },
  { t: 0.84, x: -2, y: 52, z: -340, fov: 55, lookY: 16 },
  // Final stretch decelerates almost to a hold so the cut never lands mid-move
  { t: 1, x: 0, y: 54, z: -410, fov: 53, lookY: 14 },
] as const;

/** Extra beat after the rail ends — lets the arrival settle before the dissolve. */
const FINALE_HOLD_MS = 400;

function easeInOutSine(t: number) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

function sampleCeremony(progress: number) {
  const p = easeInOutSine(Math.min(Math.max(progress, 0), 1));
  let i = 0;
  while (i < CEREMONY_KEYS.length - 1 && CEREMONY_KEYS[i + 1]!.t < p) i++;
  const a = CEREMONY_KEYS[i]!;
  const b = CEREMONY_KEYS[Math.min(i + 1, CEREMONY_KEYS.length - 1)]!;
  const span = Math.max(b.t - a.t, 0.0001);
  const u = (p - a.t) / span;
  const s = u * u * (3 - 2 * u);
  return {
    x: a.x + (b.x - a.x) * s,
    y: a.y + (b.y - a.y) * s,
    z: a.z + (b.z - a.z) * s,
    fov: a.fov + (b.fov - a.fov) * s,
    lookY: a.lookY + (b.lookY - a.lookY) * s,
  };
}

function splitTitle(text: string) {
  return text.split("").map((char, i) => (
    <span key={`${char}-${i}`} className="title-char">
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}

type BeatPhase = HorizonBeat;

/**
 * 21st Horizon Hero — Three.js + GSAP.
 * Ceremony mode = enter-AI cinematic flythrough.
 */
export function Component({ copy, ceremony, className = "" }: Props) {
  const c = { ...DEFAULT_COPY, ...copy };
  const isCeremony = Boolean(ceremony?.enabled);
  const hideCopy = isCeremony && Boolean(ceremony?.hideCopy);
  const durationMs = ceremony?.durationMs ?? 6400;

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [beatPhase, setBeatPhase] = useState<BeatPhase>("enter");
  const totalSections = 2;

  const threeRefs = useRef<ThreeBag>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    bloom: null,
    stars: [],
    nebula: null,
    mountains: [],
    atmosphere: null,
    sun: null,
    sunGlow: null,
    sunRays: null,
    rimGlow: null,
    lensFlare: null,
    meteors: [],
    dust: null,
    signalGrid: null,
    handshakeTunnel: null,
    packetStreams: null,
    animationId: null,
    locations: [],
    targetCameraX: 0,
    targetCameraY: 30,
    targetCameraZ: 100,
    targetFov: 75,
    lookAtY: 10,
    dawnProgress: 0,
    eraProgress: 0,
    shake: 0,
    meteorBurstAt: 0,
  });

  const ceremonyCb = useRef(ceremony);
  const readyFired = useRef(false);
  const climaxFired = useRef(false);
  const finaleFired = useRef(false);
  const doneFired = useRef(false);
  const connectShakeFired = useRef(false);
  const lastBeat = useRef<BeatPhase | null>(null);

  useEffect(() => {
    ceremonyCb.current = ceremony;
  }, [ceremony]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const refs = threeRefs.current;
    let cancelled = false;

    const createStarField = () => {
      const starCount = isCeremony ? 6500 : 5000;

      for (let i = 0; i < 3; i++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        for (let j = 0; j < starCount; j++) {
          const radius = 200 + Math.random() * 800;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);

          positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[j * 3 + 2] = radius * Math.cos(phi);

          // Dial-up CRT phosphors early; warm/cool starlight late (AI dawn)
          const color = new THREE.Color();
          if (isCeremony) {
            const roll = Math.random();
            if (roll < 0.55) {
              color.setHSL(0.38, 0.85, 0.55 + Math.random() * 0.3); // phosphor green
            } else if (roll < 0.78) {
              color.setHSL(0.12, 0.7, 0.55 + Math.random() * 0.25); // amber CRT
            } else {
              color.setHSL(0.55, 0.35, 0.75); // faint cool uplink
            }
          } else {
            const colorChoice = Math.random();
            if (colorChoice < 0.68) {
              color.setHSL(0, 0, 0.78 + Math.random() * 0.22);
            } else if (colorChoice < 0.86) {
              color.setHSL(0.09, 0.35, 0.82);
            } else if (colorChoice < 0.96) {
              color.setHSL(0.58, 0.28, 0.86);
            } else {
              color.setHSL(0.03, 0.45, 0.78);
            }
          }

          colors[j * 3] = color.r;
          colors[j * 3 + 1] = color.g;
          colors[j * 3 + 2] = color.b;
          sizes[j] = Math.random() * (isCeremony ? 2.2 : 2) + 0.45;
        }

        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            depth: { value: i },
            dawn: { value: 0 },
            era: { value: isCeremony ? 0 : 1 },
          },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            uniform float depth;
            uniform float dawn;
            uniform float era;
            void main() {
              // Dial-up pixels stay green/amber; AI dawn bleaches toward white starlight
              vec3 phosphor = vec3(0.25, 0.95, 0.48);
              vColor = mix(mix(phosphor, color, 0.45), color, era);
              vec3 pos = position;
              float angle = time * 0.05 * (1.0 - depth * 0.3);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xy = rot * pos.xy;
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              // CRT dots feel chunkier early; AI stars are finer
              float sizeMul = mix(1.35, 0.35, dawn) * mix(1.25, 1.0, era);
              gl_PointSize = size * sizeMul * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            uniform float dawn;
            uniform float era;
            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              // Soft round stars late; harder CRT pixels early
              float edge = mix(0.42, 0.5, era);
              if (dist > edge) discard;
              float opacity = 1.0 - smoothstep(0.0, edge, dist);
              opacity *= mix(1.0, 0.08, dawn);
              // Mild scanline flicker on dial-up phosphors
              opacity *= mix(0.82 + 0.18 * step(0.5, fract(gl_FragCoord.y * 0.25)), 1.0, era);
              gl_FragColor = vec4(vColor, opacity);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });

        const stars = new THREE.Points(geometry, material);
        refs.scene!.add(stars);
        refs.stars.push(stars);
      }
    };

    const createNebula = () => {
      const geometry = new THREE.PlaneGeometry(8000, 4000, 100, 100);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          // Starts as CRT phosphor fog, morphs to indigo→amber AI dawn
          color1: {
            value: new THREE.Color(isCeremony ? 0x06301a : 0x0033ff),
          },
          color2: {
            value: new THREE.Color(isCeremony ? 0x1a4a28 : 0xff0066),
          },
          opacity: { value: isCeremony ? 0.38 : 0.3 },
          era: { value: isCeremony ? 0 : 1 },
        },
        vertexShader: `
          varying vec2 vUv;
          varying float vElevation;
          uniform float time;
          void main() {
            vUv = uv;
            vec3 pos = position;
            float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
            pos.z += elevation;
            vElevation = elevation;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;
          uniform float era;
          varying vec2 vUv;
          varying float vElevation;
          void main() {
            float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
            vec3 dial = mix(vec3(0.05, 0.35, 0.16), vec3(0.2, 0.55, 0.28), mixFactor * 0.5 + 0.5);
            vec3 ai = mix(color1, color2, mixFactor * 0.5 + 0.5);
            vec3 color = mix(dial, ai, era);
            float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
            alpha *= 1.0 + vElevation * 0.01;
            // Modem static bands early
            float bands = 0.75 + 0.25 * step(0.5, fract(vUv.y * 40.0 + time * 2.0));
            alpha *= mix(bands, 1.0, era);
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const nebula = new THREE.Mesh(geometry, material);
      nebula.position.z = -1050;
      refs.scene!.add(nebula);
      refs.nebula = nebula;
    };

    const createMountains = () => {
      // Dawn-lit ridges: near layers stay cold slate, far layers pick up warm haze
      const layers = isCeremony
        ? // Opaque layers only — stacked translucent silhouettes expose their side edges
          [
            { distance: -50, height: 60, color: 0x090d16, opacity: 1 },
            { distance: -100, height: 80, color: 0x121a28, opacity: 1 },
            { distance: -150, height: 100, color: 0x1d2233, opacity: 1 },
            { distance: -200, height: 120, color: 0x2b2a3b, opacity: 1 },
          ]
        : [
            { distance: -50, height: 60, color: 0x1a1a2e, opacity: 1 },
            { distance: -100, height: 80, color: 0x16213e, opacity: 0.8 },
            { distance: -150, height: 100, color: 0x0f3460, opacity: 0.6 },
            { distance: -200, height: 120, color: 0x0a4668, opacity: 0.4 },
          ];

      layers.forEach((layer) => {
        const points: THREE.Vector2[] = [];
        const segments = isCeremony ? 140 : 50;
        const span = isCeremony ? 14000 : 1000;

        for (let i = 0; i <= segments; i++) {
          const x = (i / segments - 0.5) * span;
          // Multi-octave ridge — more natural silhouette than a single sine
          const n =
            Math.sin(i * 0.085) * 1.0 +
            Math.sin(i * 0.21 + 1.7) * 0.45 +
            Math.sin(i * 0.47 + 0.4) * 0.18 +
            Math.cos(i * 0.033) * 0.35;
          const y = n * layer.height - 100 + (Math.random() - 0.5) * layer.height * 0.08;
          points.push(new THREE.Vector2(x, y));
        }

        // Close the silhouette straight down past the frame so no cut-out edge shows
        points.push(new THREE.Vector2(span / 2, -6000));
        points.push(new THREE.Vector2(-span / 2, -6000));

        const shape = new THREE.Shape(points);
        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity,
          side: THREE.DoubleSide,
        });

        const mountain = new THREE.Mesh(geometry, material);
        mountain.position.z = layer.distance;
        mountain.position.y = layer.distance;
        mountain.userData = { baseZ: layer.distance };
        refs.scene!.add(mountain);
        refs.mountains.push(mountain);
      });

      refs.locations = refs.mountains.map((m) => m.position.z);
    };

    const createAtmosphere = () => {
      const geometry = new THREE.SphereGeometry(600, 32, 32);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          warm: { value: isCeremony ? 0 : 1 },
          era: { value: isCeremony ? 0 : 1 },
        },
        vertexShader: `
          varying vec3 vWorld;
          void main() {
            vWorld = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec3 vWorld;
          uniform float time;
          uniform float warm;
          uniform float era;
          void main() {
            float h = clamp(vWorld.y / 600.0 * 0.5 + 0.5, 0.0, 1.0);

            // Dial-up CRT tube glow (green) → AI dawn sky (amber/indigo)
            vec3 dialLow = vec3(0.12, 0.55, 0.28);
            vec3 dialHigh = vec3(0.02, 0.08, 0.05);
            vec3 lowSky = mix(dialLow, vec3(0.98, 0.64, 0.38), era);
            vec3 highSky = mix(dialHigh, vec3(0.20, 0.31, 0.62), era);
            vec3 sky = mix(lowSky, highSky, smoothstep(0.44, 0.82, h));
            sky = mix(highSky, sky, warm);

            float haze = smoothstep(0.92, 0.5, h) * smoothstep(0.16, 0.46, h);
            float pulse = sin(time * mix(3.2, 0.9, era)) * mix(0.12, 0.05, era) + 0.95;

            gl_FragColor = vec4(sky * haze * pulse, haze * mix(0.72, 0.55, era));
          }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
      });

      const atmosphere = new THREE.Mesh(geometry, material);
      refs.scene!.add(atmosphere);
      refs.atmosphere = atmosphere;
    };

    /** Infinite modem grid underfoot — dial-up plane that dissolves into AI void. */
    const createSignalGrid = () => {
      if (!isCeremony) return;
      const geo = new THREE.PlaneGeometry(2400, 2400, 1, 1);
      const mat = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          era: { value: 0 },
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vPos;
          void main() {
            vUv = uv;
            vPos = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          varying vec3 vPos;
          uniform float time;
          uniform float era;
          void main() {
            vec2 uv = (vUv - 0.5) * 48.0;
            vec2 g = abs(fract(uv) - 0.5);
            float line = 1.0 - smoothstep(0.0, 0.04, min(g.x, g.y));
            // Packet pulses racing along the grid (handshake feel)
            float packet = step(0.92, fract(uv.x * 0.15 - time * 1.8 + uv.y * 0.05));
            // Concentric carrier rings — modem radar
            float dist = length(uv) * 0.08;
            float rings = 1.0 - smoothstep(0.0, 0.06, abs(fract(dist - time * 0.35) - 0.5));
            // Vertical data columns (terminal scroll feel)
            float cols = step(0.88, fract(uv.x * 0.35 + time * 0.9)) *
              (0.4 + 0.6 * fract(uv.y * 0.5 - time * 2.2));
            vec3 phosphor = vec3(0.2, 0.95, 0.45);
            vec3 uplink = vec3(0.55, 0.78, 1.0);
            vec3 amber = vec3(1.0, 0.72, 0.28);
            vec3 col = mix(mix(phosphor, amber, rings * 0.35), uplink, era);
            float fade = 1.0 - smoothstep(0.15, 0.95, length(vUv - 0.5) * 2.0);
            float alpha = (line * 0.5 + packet * 0.65 + rings * 0.35 + cols * 0.4)
              * fade * (1.0 - era);
            gl_FragColor = vec4(col, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const grid = new THREE.Mesh(geo, mat);
      grid.rotation.x = -Math.PI / 2;
      grid.position.set(0, -70, 80);
      refs.scene!.add(grid);
      refs.signalGrid = grid;
    };

    /**
     * Handshake light tunnel — camera flies through a phosphor→amber conduit
     * at the crest of the crossing (the “modem connect” moment).
     */
    const createHandshakeTunnel = () => {
      if (!isCeremony) return;
      const geo = new THREE.CylinderGeometry(90, 140, 1600, 48, 1, true);
      const mat = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          intensity: { value: 0 },
          era: { value: 0 },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform float time;
          uniform float intensity;
          uniform float era;
          void main() {
            float along = vUv.y;
            float ring = abs(fract(along * 18.0 - time * 1.4) - 0.5);
            float bands = 1.0 - smoothstep(0.0, 0.08, ring);
            float ribs = pow(abs(sin(vUv.x * 3.14159 * 12.0)), 6.0);
            vec3 phosphor = vec3(0.15, 0.95, 0.42);
            vec3 amber = vec3(1.0, 0.7, 0.28);
            vec3 cool = vec3(0.45, 0.72, 1.0);
            vec3 col = mix(phosphor, mix(amber, cool, era), smoothstep(0.2, 0.85, along));
            float alpha = (bands * 0.55 + ribs * 0.35) * intensity;
            // Soft falloff at both mouths of the tunnel
            alpha *= smoothstep(0.0, 0.12, along) * (1.0 - smoothstep(0.88, 1.0, along));
            gl_FragColor = vec4(col, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.BackSide,
      });
      const tunnel = new THREE.Mesh(geo, mat);
      tunnel.rotation.x = Math.PI / 2;
      tunnel.position.set(0, 20, -80);
      refs.scene!.add(tunnel);
      refs.handshakeTunnel = tunnel;
    };

    /** Streaming data packets — dial-up “upload” that becomes star-like late. */
    const createPacketStreams = () => {
      if (!isCeremony) return;
      const count = 900;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const speed = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 20 + Math.random() * 110;
        pos[i * 3] = Math.cos(angle) * radius;
        pos[i * 3 + 1] = (Math.random() - 0.35) * 80;
        pos[i * 3 + 2] = -200 - Math.random() * 900;
        speed[i] = 40 + Math.random() * 120;
      }
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("speed", new THREE.BufferAttribute(speed, 1));
      const mat = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          era: { value: 0 },
          opacity: { value: 0.7 },
        },
        vertexShader: `
          attribute float speed;
          uniform float time;
          uniform float era;
          varying float vFade;
          void main() {
            vec3 p = position;
            float travel = mod(time * speed * 0.35 + (-position.z), 1100.0);
            p.z = -200.0 - travel;
            // Packets tighten into a beam during handshake, then scatter as stars
            float tighten = mix(1.0, 0.35, smoothstep(0.15, 0.55, era));
            p.xy *= tighten;
            vFade = 1.0 - smoothstep(0.0, 1100.0, travel);
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = mix(2.8, 1.2, era) * (220.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          uniform float era;
          uniform float opacity;
          varying float vFade;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            vec3 phosphor = vec3(0.35, 1.0, 0.55);
            vec3 ai = vec3(1.0, 0.9, 0.75);
            vec3 col = mix(phosphor, ai, era);
            float a = (1.0 - smoothstep(0.0, 0.5, d)) * opacity * vFade;
            a *= mix(1.0, 0.25, era);
            gl_FragColor = vec4(col, a);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const streams = new THREE.Points(geo, mat);
      refs.scene!.add(streams);
      refs.packetStreams = streams;
    };

    const createSun = () => {
      if (!isCeremony) return;

      // Warm ivory disc — reads as a real sun, not a green orb
      const sunGeo = new THREE.SphereGeometry(120, 48, 48);
      const sunMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xfff4e0),
        transparent: true,
        opacity: 0.92,
      });
      const sun = new THREE.Mesh(sunGeo, sunMat);
      // Sits beyond the far end of the camera rail so it never blows past the lens
      sun.position.set(260, -190, -900);
      refs.scene!.add(sun);
      refs.sun = sun;

      // Billboard glow: a sphere would show its inner edge once the camera is inside it
      const glowCanvas = document.createElement("canvas");
      glowCanvas.width = 256;
      glowCanvas.height = 256;
      const ctx = glowCanvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
        grad.addColorStop(0, "rgba(255, 238, 214, 0.95)");
        grad.addColorStop(0.28, "rgba(244, 176, 116, 0.45)");
        grad.addColorStop(0.62, "rgba(196, 132, 110, 0.14)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 256, 256);
      }
      const glowMat = new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(glowCanvas),
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false,
      });
      const glow = new THREE.Sprite(glowMat);
      glow.scale.set(900, 900, 1);
      glow.position.copy(sun.position);
      refs.scene!.add(glow);
      refs.sunGlow = glow;

      const light = new THREE.PointLight(0xffd2a1, 2.1, 1100);
      light.position.copy(sun.position);
      sun.add(light);
    };

    /** Soft volumetric shafts — cone from behind the sun toward the camera. */
    const createSunRays = () => {
      if (!isCeremony) return;
      const geo = new THREE.CylinderGeometry(18, 280, 1100, 28, 1, true);
      const mat = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          intensity: { value: 0 },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform float time;
          uniform float intensity;
          void main() {
            float radial = 1.0 - abs(vUv.x - 0.5) * 2.0;
            float along = smoothstep(0.0, 0.2, vUv.y) * (1.0 - smoothstep(0.55, 1.0, vUv.y));
            float bands = 0.55 + 0.45 * sin(vUv.x * 28.0 + time * 0.6);
            float alpha = radial * radial * along * bands * intensity;
            vec3 col = mix(vec3(1.0, 0.86, 0.62), vec3(0.75, 0.88, 1.0), vUv.y);
            gl_FragColor = vec4(col, alpha * 0.22);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const rays = new THREE.Mesh(geo, mat);
      rays.rotation.x = Math.PI / 2;
      rays.position.set(260, -40, -350);
      refs.scene!.add(rays);
      refs.sunRays = rays;
    };

    /** Warm rim light sitting on the ridge crest. */
    const createRimGlow = () => {
      if (!isCeremony) return;
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const g = ctx.createLinearGradient(0, 0, 512, 0);
        g.addColorStop(0, "rgba(255, 200, 140, 0)");
        g.addColorStop(0.35, "rgba(255, 214, 160, 0.55)");
        g.addColorStop(0.5, "rgba(255, 240, 210, 0.95)");
        g.addColorStop(0.65, "rgba(255, 214, 160, 0.55)");
        g.addColorStop(1, "rgba(255, 200, 140, 0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 512, 64);
        const vg = ctx.createLinearGradient(0, 0, 0, 64);
        vg.addColorStop(0, "rgba(0,0,0,0)");
        vg.addColorStop(0.45, "rgba(255,255,255,1)");
        vg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.globalCompositeOperation = "destination-in";
        ctx.fillStyle = vg;
        ctx.fillRect(0, 0, 512, 64);
      }
      const mat = new THREE.SpriteMaterial({
        map: new THREE.CanvasTexture(canvas),
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false,
      });
      const rim = new THREE.Sprite(mat);
      rim.scale.set(2200, 90, 1);
      rim.position.set(80, -20, -180);
      refs.scene!.add(rim);
      refs.rimGlow = rim;
    };

    /** Anamorphic streak + a few ghost orbs along the sun→center axis. */
    const createLensFlare = () => {
      if (!isCeremony) return;
      const group = new THREE.Group();

      const makeDisc = (size: number, color: string, opacity: number) => {
        const c = document.createElement("canvas");
        c.width = 128;
        c.height = 128;
        const cx = c.getContext("2d");
        if (cx) {
          const g = cx.createRadialGradient(64, 64, 0, 64, 64, 64);
          g.addColorStop(0, color);
          g.addColorStop(1, "rgba(0,0,0,0)");
          cx.fillStyle = g;
          cx.fillRect(0, 0, 128, 128);
        }
        const spr = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: new THREE.CanvasTexture(c),
            transparent: true,
            opacity,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            depthTest: false,
          }),
        );
        spr.scale.set(size, size, 1);
        return spr;
      };

      // Horizontal anamorphic streak
      const streakCanvas = document.createElement("canvas");
      streakCanvas.width = 512;
      streakCanvas.height = 32;
      const sctx = streakCanvas.getContext("2d");
      if (sctx) {
        const g = sctx.createLinearGradient(0, 0, 512, 0);
        g.addColorStop(0, "rgba(255, 210, 160, 0)");
        g.addColorStop(0.5, "rgba(255, 235, 200, 0.9)");
        g.addColorStop(1, "rgba(180, 210, 255, 0)");
        sctx.fillStyle = g;
        sctx.fillRect(0, 0, 512, 32);
      }
      const streak = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: new THREE.CanvasTexture(streakCanvas),
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          depthTest: false,
        }),
      );
      streak.scale.set(1400, 28, 1);
      streak.name = "streak";
      group.add(streak);

      const ghosts = [
        { t: 0.22, size: 70, color: "rgba(255,180,120,0.55)", opacity: 0.35 },
        { t: 0.4, size: 110, color: "rgba(160,190,255,0.45)", opacity: 0.28 },
        { t: 0.62, size: 48, color: "rgba(255,220,180,0.5)", opacity: 0.3 },
        { t: 0.82, size: 160, color: "rgba(120,160,220,0.35)", opacity: 0.22 },
      ];
      ghosts.forEach((g, i) => {
        const spr = makeDisc(g.size, g.color, 0);
        spr.userData = { t: g.t, baseOpacity: g.opacity };
        spr.name = `ghost-${i}`;
        group.add(spr);
      });

      refs.scene!.add(group);
      refs.lensFlare = group;
    };

    /** Occasional shooting stars during the approach. */
    const createMeteors = () => {
      if (!isCeremony) return;
      for (let i = 0; i < 4; i++) {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(6);
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const mat = new THREE.LineBasicMaterial({
          color: new THREE.Color(0xffe8c8),
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        const line = new THREE.Line(geo, mat);
        line.userData = {
          active: false,
          progress: 0,
          speed: 0.012 + Math.random() * 0.01,
          delay: 0.8 + i * 1.1 + Math.random() * 0.6,
          start: new THREE.Vector3(
            -400 + Math.random() * 200,
            180 + Math.random() * 120,
            -500 - Math.random() * 200,
          ),
          dir: new THREE.Vector3(1.2 + Math.random() * 0.4, -0.55, 0.15).normalize(),
          length: 90 + Math.random() * 60,
        };
        refs.scene!.add(line);
        refs.meteors.push(line);
      }
    };

    /** Fine dust motes drifting in the near field. */
    const createDust = () => {
      if (!isCeremony) return;
      const count = 280;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 500;
        pos[i * 3 + 1] = Math.random() * 180 - 20;
        pos[i * 3 + 2] = -200 + Math.random() * 600;
        sizes[i] = 0.6 + Math.random() * 1.8;
      }
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
      const mat = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, opacity: { value: 0.35 } },
        vertexShader: `
          attribute float size;
          uniform float time;
          void main() {
            vec3 p = position;
            p.x += sin(time * 0.2 + position.y * 0.05) * 4.0;
            p.y += cos(time * 0.15 + position.x * 0.04) * 2.0;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_PointSize = size * (180.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          uniform float opacity;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            float a = (1.0 - smoothstep(0.0, 0.5, d)) * opacity;
            gl_FragColor = vec4(1.0, 0.92, 0.82, a);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const dust = new THREE.Points(geo, mat);
      refs.scene!.add(dust);
      refs.dust = dust;
    };

    const animate = () => {
      if (cancelled) return;
      refs.animationId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      refs.stars.forEach((starField) => {
        const mat = starField.material as THREE.ShaderMaterial;
        if (mat.uniforms?.time) mat.uniforms.time.value = time;
        if (mat.uniforms?.dawn) {
          mat.uniforms.dawn.value +=
            (refs.dawnProgress - mat.uniforms.dawn.value) * 0.04;
        }
        if (mat.uniforms?.era) {
          mat.uniforms.era.value +=
            (refs.eraProgress - mat.uniforms.era.value) * 0.04;
        }
      });

      if (refs.nebula) {
        const mat = refs.nebula.material as THREE.ShaderMaterial;
        if (mat.uniforms?.time) mat.uniforms.time.value = time * 0.5;
        if (mat.uniforms?.era) {
          mat.uniforms.era.value +=
            (refs.eraProgress - mat.uniforms.era.value) * 0.04;
        }
        // Morph nebula tint: CRT green → handshake amber → indigo AI
        if (mat.uniforms?.color1 && mat.uniforms?.color2) {
          const e = refs.eraProgress;
          // Soft amber bump mid-era (era ≈ 0.35–0.55) without fighting the AI indigo
          const amber = Math.sin(Math.min(Math.max((e - 0.12) / 0.45, 0), 1) * Math.PI) * (1 - e);
          mat.uniforms.color1.value.setRGB(
            0.04 + e * 0.1 + amber * 0.12,
            0.19 + e * 0.05 + amber * 0.04,
            0.1 + e * 0.22 - amber * 0.06,
          );
          mat.uniforms.color2.value.setRGB(
            0.1 + e * 0.75 + amber * 0.35,
            0.35 + e * 0.2 + amber * 0.15,
            0.16 + e * 0.2 - amber * 0.08,
          );
        }
      }

      if (refs.atmosphere) {
        const mat = refs.atmosphere.material as THREE.ShaderMaterial;
        if (mat.uniforms?.time) mat.uniforms.time.value = time;
        if (mat.uniforms?.era) {
          mat.uniforms.era.value +=
            (refs.eraProgress - mat.uniforms.era.value) * 0.04;
        }
      }

      if (refs.signalGrid) {
        const mat = refs.signalGrid.material as THREE.ShaderMaterial;
        if (mat.uniforms?.time) mat.uniforms.time.value = time;
        if (mat.uniforms?.era) {
          mat.uniforms.era.value +=
            (refs.eraProgress - mat.uniforms.era.value) * 0.05;
        }
        // Grid rides under the camera during the dial-up approach
        if (refs.camera) {
          refs.signalGrid.position.z = refs.camera.position.z - 120;
          refs.signalGrid.position.y = -70 + refs.eraProgress * 40;
        }
      }

      if (refs.handshakeTunnel && refs.camera) {
        const mat = refs.handshakeTunnel.material as THREE.ShaderMaterial;
        if (mat.uniforms?.time) mat.uniforms.time.value = time;
        if (mat.uniforms?.era) {
          mat.uniforms.era.value +=
            (refs.eraProgress - mat.uniforms.era.value) * 0.05;
        }
        // Tunnel stays ahead of the camera through the crest
        refs.handshakeTunnel.position.z = refs.camera.position.z - 420;
        refs.handshakeTunnel.position.y = refs.camera.position.y * 0.35 + 8;
      }

      if (refs.packetStreams) {
        const mat = refs.packetStreams.material as THREE.ShaderMaterial;
        if (mat.uniforms?.time) mat.uniforms.time.value = time;
        if (mat.uniforms?.era) {
          mat.uniforms.era.value +=
            (refs.eraProgress - mat.uniforms.era.value) * 0.04;
        }
        if (refs.camera) {
          refs.packetStreams.position.z = refs.camera.position.z;
        }
      }

      if (refs.sunRays) {
        const mat = refs.sunRays.material as THREE.ShaderMaterial;
        if (mat.uniforms?.time) mat.uniforms.time.value = time;
        if (refs.sun && refs.camera) {
          refs.sunRays.position.set(
            refs.sun.position.x * 0.55,
            refs.sun.position.y * 0.4 + 40,
            (refs.sun.position.z + refs.camera.position.z) * 0.5,
          );
          refs.sunRays.lookAt(refs.camera.position);
        }
      }

      if (refs.dust) {
        const mat = refs.dust.material as THREE.ShaderMaterial;
        if (mat.uniforms?.time) mat.uniforms.time.value = time;
      }

      // Meteor streaks
      refs.meteors.forEach((line) => {
        const u = line.userData as {
          active: boolean;
          progress: number;
          speed: number;
          delay: number;
          start: THREE.Vector3;
          dir: THREE.Vector3;
          length: number;
        };
        // Climax volley — fire dormant streaks immediately
        if (refs.meteorBurstAt > 0 && !u.active && time >= refs.meteorBurstAt) {
          u.active = true;
          u.progress = 0;
          u.delay = 0;
        }
        // Fire once during the early approach, then stay dormant
        if (!u.active && refs.dawnProgress < 0.35 && time > u.delay) {
          u.active = true;
          u.progress = 0;
        }
        if (!u.active) return;
        u.progress += u.speed;
        const head = u.start.clone().addScaledVector(u.dir, u.progress * 420);
        const tail = head.clone().addScaledVector(u.dir, -u.length);
        const pos = line.geometry.attributes.position as THREE.BufferAttribute;
        pos.setXYZ(0, head.x, head.y, head.z);
        pos.setXYZ(1, tail.x, tail.y, tail.z);
        pos.needsUpdate = true;
        const mat = line.material as THREE.LineBasicMaterial;
        const life = Math.min(u.progress, 1);
        mat.opacity = life < 0.15 ? life / 0.15 : Math.max(0, 1 - (life - 0.15) / 0.85);
        if (u.progress >= 1) {
          u.active = false;
          mat.opacity = 0;
          // Reschedule a second pass later if still dark enough
          u.delay = time + 2.4 + Math.random() * 2;
        }
      });
      if (refs.meteorBurstAt > 0 && time > refs.meteorBurstAt + 0.05) {
        refs.meteorBurstAt = 0;
      }

      if (refs.sun) {
        const pulse = 1 + Math.sin(time * 2.2) * 0.04;
        refs.sun.scale.setScalar(pulse * (0.85 + refs.dawnProgress * 0.3));
        if (refs.sunGlow) {
          const finaleScale = Number(refs.sunGlow.userData.finaleScale ?? 1);
          const size = 900 * pulse * finaleScale;
          refs.sunGlow.position.copy(refs.sun.position);
          refs.sunGlow.scale.set(size, size, 1);
        }
      }

      if (refs.camera) {
        const smoothingFactor = isCeremony ? 0.045 : 0.05;
        smoothCameraPos.current.x +=
          (refs.targetCameraX - smoothCameraPos.current.x) * smoothingFactor;
        smoothCameraPos.current.y +=
          (refs.targetCameraY - smoothCameraPos.current.y) * smoothingFactor;
        smoothCameraPos.current.z +=
          (refs.targetCameraZ - smoothCameraPos.current.z) * smoothingFactor;

        const floatAmp = isCeremony ? 0.55 : 2;
        const floatX = Math.sin(time * 0.08) * floatAmp;
        const floatY = Math.cos(time * 0.11) * (floatAmp * 0.5);
        // Micro breath — almost imperceptible handheld feel
        const breath = isCeremony
          ? Math.sin(time * 1.4) * 0.18 + Math.cos(time * 2.1) * 0.08
          : 0;

        // CONNECT impact shake — decays each frame
        if (refs.shake > 0.001) {
          refs.shake *= 0.88;
        } else {
          refs.shake = 0;
        }
        const shakeX = refs.shake * (Math.sin(time * 48) * 1.8 + Math.cos(time * 37) * 0.9);
        const shakeY = refs.shake * (Math.cos(time * 41) * 1.2);

        refs.camera.position.x =
          smoothCameraPos.current.x + floatX + breath * 0.4 + shakeX;
        refs.camera.position.y =
          smoothCameraPos.current.y + floatY + breath * 0.25 + shakeY;
        refs.camera.position.z = smoothCameraPos.current.z;
        refs.camera.lookAt(0, refs.lookAtY + shakeY * 0.15, -600);

        if (Math.abs(refs.camera.fov - refs.targetFov) > 0.03) {
          refs.camera.fov += (refs.targetFov - refs.camera.fov) * 0.045;
          refs.camera.updateProjectionMatrix();
        }

        // Lens flare tracks the sun through NDC
        if (refs.lensFlare && refs.sun && isCeremony) {
          const ndc = refs.sun.position.clone().project(refs.camera);
          const onScreen =
            ndc.z < 1 && Math.abs(ndc.x) < 1.4 && Math.abs(ndc.y) < 1.4;
          const flareStrength = onScreen
            ? Math.max(0, refs.dawnProgress - 0.18) * 0.9
            : 0;
          const cam = refs.camera.position;
          const sunPos = refs.sun.position;
          const axis = new THREE.Vector3().subVectors(cam, sunPos);

          refs.lensFlare.children.forEach((child) => {
            const spr = child as THREE.Sprite;
            const mat = spr.material as THREE.SpriteMaterial;
            if (spr.name === "streak") {
              spr.position.copy(sunPos);
              mat.opacity = flareStrength * 0.55;
            } else {
              const t = Number(spr.userData.t ?? 0.5);
              spr.position.copy(sunPos).addScaledVector(axis, t);
              mat.opacity =
                flareStrength * Number(spr.userData.baseOpacity ?? 0.3);
            }
          });
        }
      }

      refs.mountains.forEach((mountain, i) => {
        const parallaxFactor = 1 + i * 0.5;
        mountain.position.x = Math.sin(time * 0.1) * 2 * parallaxFactor;
        if (!isCeremony) {
          mountain.position.y = 50 + Math.cos(time * 0.15) * 1 * parallaxFactor;
        }
      });

      refs.composer?.render();
    };

    refs.scene = new THREE.Scene();
    refs.scene.fog = new THREE.FogExp2(
      isCeremony ? 0x030a06 : 0x000000,
      isCeremony ? 0.00022 : 0.00025,
    );

    const startFov = isCeremony ? 82 : 75;
    refs.camera = new THREE.PerspectiveCamera(
      startFov,
      window.innerWidth / window.innerHeight,
      0.1,
      2000,
    );
    if (isCeremony) {
      refs.camera.position.set(0, 8, 540);
      smoothCameraPos.current = { x: 0, y: 8, z: 540 };
      refs.targetCameraX = 0;
      refs.targetCameraY = 8;
      refs.targetCameraZ = 540;
      refs.targetFov = 82;
      refs.lookAtY = 5;
    } else {
      refs.camera.position.z = 100;
      refs.camera.position.y = 20;
    }

    refs.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    refs.renderer.setSize(window.innerWidth, window.innerHeight);
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    refs.renderer.toneMappingExposure = isCeremony ? 0.22 : 0.5;

    refs.composer = new EffectComposer(refs.renderer);
    refs.composer.addPass(new RenderPass(refs.scene, refs.camera));
    const bloom = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      isCeremony ? 0.85 : 0.8,
      isCeremony ? 0.62 : 0.4,
      isCeremony ? 0.8 : 0.85,
    );
    refs.composer.addPass(bloom);
    refs.bloom = bloom;

    createStarField();
    createNebula();
    createMountains();
    createAtmosphere();
    createSun();
    createSunRays();
    createRimGlow();
    createLensFlare();
    createMeteors();
    createDust();
    createSignalGrid();
    createHandshakeTunnel();
    createPacketStreams();
    animate();
    setIsReady(true);

    const handleResize = () => {
      if (!refs.camera || !refs.renderer || !refs.composer) return;
      refs.camera.aspect = window.innerWidth / window.innerHeight;
      refs.camera.updateProjectionMatrix();
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.composer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      window.removeEventListener("resize", handleResize);

      refs.stars.forEach((starField) => {
        starField.geometry.dispose();
        (starField.material as THREE.Material).dispose();
      });
      refs.mountains.forEach((mountain) => {
        mountain.geometry.dispose();
        (mountain.material as THREE.Material).dispose();
      });
      if (refs.nebula) {
        refs.nebula.geometry.dispose();
        (refs.nebula.material as THREE.Material).dispose();
      }
      if (refs.atmosphere) {
        refs.atmosphere.geometry.dispose();
        (refs.atmosphere.material as THREE.Material).dispose();
      }
      if (refs.sun) {
        refs.sun.geometry.dispose();
        (refs.sun.material as THREE.Material).dispose();
      }
      if (refs.sunGlow) {
        const glowMat = refs.sunGlow.material as THREE.SpriteMaterial;
        glowMat.map?.dispose();
        glowMat.dispose();
      }
      if (refs.sunRays) {
        refs.sunRays.geometry.dispose();
        (refs.sunRays.material as THREE.Material).dispose();
      }
      if (refs.rimGlow) {
        const rimMat = refs.rimGlow.material as THREE.SpriteMaterial;
        rimMat.map?.dispose();
        rimMat.dispose();
      }
      if (refs.lensFlare) {
        refs.lensFlare.children.forEach((child) => {
          const spr = child as THREE.Sprite;
          const mat = spr.material as THREE.SpriteMaterial;
          mat.map?.dispose();
          mat.dispose();
        });
      }
      refs.meteors.forEach((line) => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
      if (refs.dust) {
        refs.dust.geometry.dispose();
        (refs.dust.material as THREE.Material).dispose();
      }
      if (refs.signalGrid) {
        refs.signalGrid.geometry.dispose();
        (refs.signalGrid.material as THREE.Material).dispose();
      }
      if (refs.handshakeTunnel) {
        refs.handshakeTunnel.geometry.dispose();
        (refs.handshakeTunnel.material as THREE.Material).dispose();
      }
      if (refs.packetStreams) {
        refs.packetStreams.geometry.dispose();
        (refs.packetStreams.material as THREE.Material).dispose();
      }
      refs.renderer?.dispose();
      refs.stars = [];
      refs.mountains = [];
      refs.meteors = [];
      refs.nebula = null;
      refs.atmosphere = null;
      refs.sun = null;
      refs.sunGlow = null;
      refs.sunRays = null;
      refs.rimGlow = null;
      refs.lensFlare = null;
      refs.dust = null;
      refs.signalGrid = null;
      refs.handshakeTunnel = null;
      refs.packetStreams = null;
      refs.bloom = null;
      refs.composer = null;
      refs.scene = null;
      refs.camera = null;
      refs.renderer = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // GSAP intro
  useEffect(() => {
    if (!isReady || hideCopy) return;

    const targets = [
      menuRef.current,
      titleRef.current,
      subtitleRef.current,
      scrollProgressRef.current,
      eyebrowRef.current,
    ].filter(Boolean);

    gsap.set(targets, { visibility: "visible" });

    const tl = gsap.timeline();

    if (eyebrowRef.current && isCeremony) {
      tl.from(eyebrowRef.current, {
        opacity: 0,
        y: 20,
        letterSpacing: "0.6em",
        duration: 1.1,
        ease: "power3.out",
      });
    }

    if (menuRef.current && !isCeremony) {
      tl.from(menuRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    }

    if (titleRef.current) {
      const titleChars = titleRef.current.querySelectorAll(".title-char");
      tl.from(
        titleChars,
        {
          y: isCeremony ? 90 : 200,
          opacity: 0,
          rotateX: isCeremony ? -32 : 0,
          filter: isCeremony ? "blur(9px)" : "blur(0px)",
          duration: isCeremony ? 1.8 : 1.2,
          stagger: isCeremony ? 0.05 : 0.04,
          ease: isCeremony ? "power2.out" : "power4.out",
        },
        isCeremony ? "-=0.5" : "-=0.5",
      );
      if (isCeremony) {
        tl.to(
          titleRef.current,
          {
            textShadow:
              "0 0 32px rgba(255, 214, 170, 0.4), 0 0 80px rgba(120, 170, 200, 0.22)",
            duration: 1.8,
            ease: "sine.out",
          },
          "-=1.2",
        );
      }
    }

    if (subtitleRef.current) {
      const subtitleLines = subtitleRef.current.querySelectorAll(".subtitle-line");
      tl.from(
        subtitleLines,
        {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.18,
          ease: "power3.out",
        },
        "-=0.75",
      );
    }

    if (scrollProgressRef.current) {
      tl.from(
        scrollProgressRef.current,
        { opacity: 0, y: 30, duration: 0.9, ease: "power2.out" },
        "-=0.5",
      );
    }

    return () => {
      tl.kill();
    };
  }, [isReady, isCeremony, hideCopy]);

  // Page scroll camera
  useEffect(() => {
    if (isCeremony) return;

    const applyProgress = (progress: number) => {
      const clamped = Math.min(Math.max(progress, 0), 1);
      setScrollProgress(clamped);
      const newSection = Math.min(
        Math.floor(clamped * totalSections),
        totalSections - 1,
      );
      setCurrentSection(newSection);

      const refs = threeRefs.current;
      const totalProgress = clamped * totalSections;
      const sectionProgress = totalProgress % 1;
      const currentPos = CAMERA_POSITIONS[newSection] ?? CAMERA_POSITIONS[0];
      const nextPos = CAMERA_POSITIONS[newSection + 1] ?? currentPos;

      refs.targetCameraX =
        currentPos.x + (nextPos.x - currentPos.x) * sectionProgress;
      refs.targetCameraY =
        currentPos.y + (nextPos.y - currentPos.y) * sectionProgress;
      refs.targetCameraZ =
        currentPos.z + (nextPos.z - currentPos.z) * sectionProgress;

      refs.mountains.forEach((mountain, i) => {
        const speed = 1 + i * 0.9;
        const baseZ = Number(mountain.userData.baseZ ?? refs.locations[i] ?? 0);
        if (clamped > 0.7) {
          mountain.position.z = 600000;
        } else {
          mountain.position.z = baseZ + window.scrollY * speed * 0.5;
        }
      });

      if (refs.nebula && refs.mountains[3]) {
        refs.nebula.position.z = refs.mountains[3].position.z;
      }
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const maxScroll = Math.max(documentHeight - windowHeight, 1);
      applyProgress(scrollY / maxScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isCeremony, totalSections]);

  // Ceremony flythrough
  useEffect(() => {
    if (!isCeremony || !isReady) return;

    readyFired.current = false;
    climaxFired.current = false;
    finaleFired.current = false;
    doneFired.current = false;
    connectShakeFired.current = false;
    lastBeat.current = null;

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      if (!hideCopy) setScrollProgress(progress);

      const sample = sampleCeremony(progress);
      const refs = threeRefs.current;
      refs.targetCameraX = sample.x;
      refs.targetCameraY = sample.y;
      refs.targetCameraZ = sample.z;
      refs.targetFov = sample.fov;
      refs.lookAtY = sample.lookY;

      // Sunrise + dial-up→AI era morph
      const dawn = easeInOutSine(Math.min(progress / 0.66, 1));
      const era = easeInOutSine(Math.min(Math.max((progress - 0.18) / 0.55, 0), 1));
      refs.dawnProgress = dawn;
      refs.eraProgress = era;
      if (refs.sun) {
        // Sun stays buried during dial-up; rises as the AI world opens
        const sunReveal = easeInOutSine(Math.min(Math.max((progress - 0.28) / 0.5, 0), 1));
        refs.sun.position.x = 260;
        refs.sun.position.y = -190 + sunReveal * 250;
        refs.sun.position.z = -900;
        (refs.sun.material as THREE.MeshBasicMaterial).opacity = 0.15 + sunReveal * 0.77;
        if (refs.sunGlow) {
          refs.sunGlow.position.copy(refs.sun.position);
          (refs.sunGlow.material as THREE.SpriteMaterial).opacity =
            sunReveal * (0.3 + dawn * 0.45);
        }
      }

      // Handshake envelope: peaks mid-crossing, dies before AI dawn
      const handshake = Math.sin(
        Math.min(Math.max((progress - 0.18) / 0.48, 0), 1) * Math.PI,
      );
      const handshakeEase = easeInOutSine(handshake);

      // God-ray intensity peaks as the sun clears the crest (AI era)
      if (refs.sunRays) {
        const mat = refs.sunRays.material as THREE.ShaderMaterial;
        const crest = Math.sin(Math.min(Math.max((dawn - 0.25) / 0.55, 0), 1) * Math.PI);
        if (mat.uniforms?.intensity) {
          mat.uniforms.intensity.value +=
            (crest * era * 1.15 - mat.uniforms.intensity.value) * 0.06;
        }
      }

      // Light tunnel: phosphor conduit during handshake → vanishes in AI
      if (refs.handshakeTunnel) {
        const mat = refs.handshakeTunnel.material as THREE.ShaderMaterial;
        if (mat.uniforms?.intensity) {
          const target = handshakeEase * (1 - era * 0.85) * 0.95;
          mat.uniforms.intensity.value +=
            (target - mat.uniforms.intensity.value) * 0.07;
        }
      }

      // Packet stream density: dense during dial/handshake, sparse as stars
      if (refs.packetStreams) {
        const mat = refs.packetStreams.material as THREE.ShaderMaterial;
        if (mat.uniforms?.opacity) {
          const target =
            (0.85 * (1 - era) + 0.18 * era) * (0.35 + handshakeEase * 0.65);
          mat.uniforms.opacity.value +=
            (target - mat.uniforms.opacity.value) * 0.06;
        }
      }

      // Rim light blooms along the mountain crest
      if (refs.rimGlow) {
        const mat = refs.rimGlow.material as THREE.SpriteMaterial;
        const rim = Math.min(Math.max((dawn - 0.2) / 0.5, 0), 1);
        mat.opacity =
          easeInOutSine(rim) * era * 0.85 * (1 - Math.max(0, (progress - 0.72) / 0.28));
        refs.rimGlow.position.y = -28 + dawn * 18;
      }

      // Dust: static-heavy dial-up → cleaner AI air
      if (refs.dust) {
        const mat = refs.dust.material as THREE.ShaderMaterial;
        if (mat.uniforms?.opacity) {
          mat.uniforms.opacity.value =
            (0.55 * (1 - era) + 0.12 * era) * (1 - dawn * 0.5);
        }
      }

      // Sky: CRT cool → handshake amber swell → AI warm dawn
      if (refs.atmosphere) {
        const mat = refs.atmosphere.material as THREE.ShaderMaterial;
        if (mat.uniforms?.warm) {
          const warmTarget = dawn * era + handshakeEase * 0.35 * (1 - era);
          mat.uniforms.warm.value += (warmTarget - mat.uniforms.warm.value) * 0.05;
        }
      }
      if (refs.scene?.fog instanceof THREE.FogExp2) {
        // Mid-phase amber carrier fog, then cool AI indigo
        const fogTarget = new THREE.Color().setRGB(
          0.012 + handshakeEase * 0.045 * (1 - era) + era * 0.03,
          0.04 + handshakeEase * 0.02 * (1 - era) + era * 0.03,
          0.024 + era * 0.1 - handshakeEase * 0.012 * (1 - era),
        );
        refs.scene.fog.color.lerp(fogTarget, 0.04);
        refs.scene.fog.density =
          0.00028 - era * 0.00012 - dawn * 0.00004 + handshakeEase * 0.00004 * (1 - era);
      }

      // Mountain ridges: phosphor → amber handshake → dusk AI
      refs.mountains.forEach((mountain, i) => {
        const mat = mountain.material as THREE.MeshBasicMaterial;
        const dial = [0x05140c, 0x0a1f14, 0x122a1c, 0x1a3324][i] ?? 0x0a1f14;
        const amber = [0x1a1408, 0x241c0c, 0x2e2414, 0x3a2e1a][i] ?? 0x241c0c;
        const ai = [0x090d16, 0x121a28, 0x1d2233, 0x2b2a3b][i] ?? 0x121a28;
        const mid = new THREE.Color().lerpColors(
          new THREE.Color(dial),
          new THREE.Color(amber),
          handshakeEase * (1 - era),
        );
        mat.color.lerpColors(mid, new THREE.Color(ai), era);
      });

      // Exposure/bloom: harsh CRT → amber handshake punch → soft film late
      const finale = Math.min(Math.max((progress - 0.78) / 0.22, 0), 1);
      const finaleEase = easeInOutSine(finale);
      if (refs.renderer) {
        const swell = Math.sin(Math.min(Math.max((progress - 0.4) / 0.4, 0), 1) * Math.PI);
        const targetExp =
          0.22 +
          era * 0.12 +
          handshakeEase * 0.1 * (1 - era) +
          swell * 0.18 * era +
          finaleEase * 0.55;
        refs.renderer.toneMappingExposure +=
          (targetExp - refs.renderer.toneMappingExposure) * 0.04;
      }
      if (refs.bloom) {
        const swell = Math.sin(Math.min(Math.max((progress - 0.42) / 0.42, 0), 1) * Math.PI);
        const target =
          0.55 +
          (1 - era) * 0.55 +
          handshakeEase * 0.35 * (1 - era) +
          swell * 0.4 * era +
          finaleEase * 0.7;
        refs.bloom.strength += (target - refs.bloom.strength) * 0.045;
        refs.bloom.threshold = 0.55 + era * 0.25 - handshakeEase * 0.08 * (1 - era) - finaleEase * 0.15;
      }
      if (refs.sunGlow) {
        // Crest swell — sun blooms into the landing wash
        refs.sunGlow.userData.finaleScale = 1 + finaleEase * 1.35;
      }

      // Landing settle: damp camera float + hold look
      if (finaleEase > 0.15) {
        refs.targetFov += (50 - refs.targetFov) * 0.028 * finaleEase;
      }

      // Warm fog fills the frame as we land in the AI world
      if (refs.scene?.fog instanceof THREE.FogExp2 && finaleEase > 0) {
        const landFog = new THREE.Color().setRGB(
          0.04 + finaleEase * 0.12,
          0.05 + finaleEase * 0.08,
          0.08 + finaleEase * 0.1,
        );
        refs.scene.fog.color.lerp(landFog, 0.06 * finaleEase);
        refs.scene.fog.density =
          0.00028 - era * 0.00012 - dawn * 0.00004 + handshakeEase * 0.00004 * (1 - era) + finaleEase * 0.0001;
      }

      // Hide dial-up conduits fully before dissolve
      if (refs.handshakeTunnel && finaleEase > 0) {
        const mat = refs.handshakeTunnel.material as THREE.ShaderMaterial;
        if (mat.uniforms?.intensity) {
          mat.uniforms.intensity.value *= 1 - finaleEase * 0.12;
        }
      }
      if (refs.packetStreams && finaleEase > 0) {
        const mat = refs.packetStreams.material as THREE.ShaderMaterial;
        if (mat.uniforms?.opacity) {
          mat.uniforms.opacity.value *= 1 - finaleEase * 0.1;
        }
      }

      // Ridges dissolve into haze instead of snapping away
      refs.mountains.forEach((mountain, i) => {
        const baseZ = Number(mountain.userData.baseZ ?? refs.locations[i] ?? 0);
        const fade = Math.min(Math.max((progress - 0.44) / 0.24, 0), 1);
        const mat = mountain.material as THREE.MeshBasicMaterial;
        mat.opacity = 1 - easeInOutSine(fade);
        mountain.position.z = baseZ - fade * 260;
        mountain.position.y = baseZ + progress * 10;
      });

      if (progress >= 0.48 && !connectShakeFired.current) {
        connectShakeFired.current = true;
        // Soft crest punch — keep the camera cinematic, not cockpit-jolt
        refs.shake = Math.max(refs.shake, 0.28);
        refs.targetFov = Math.min(refs.targetFov + 2.5, 68);
      }

      ceremonyCb.current?.onTelemetry?.({
        alt: Math.round(sample.y),
        dist: Math.round(sample.z),
        fov: Math.round(sample.fov),
        dawn: Math.round(era * 100),
      });

      if (elapsed >= 380 && !readyFired.current) {
        readyFired.current = true;
        ceremonyCb.current?.onReady?.();
      }

      ceremonyCb.current?.onProgress?.(progress);

      const nextBeat: BeatPhase =
        progress < 0.24
          ? "enter"
          : progress < 0.5
            ? "cross"
            : progress < 0.76
              ? "awaken"
              : "ready";
      if (nextBeat !== lastBeat.current) {
        lastBeat.current = nextBeat;
        ceremonyCb.current?.onBeat?.(nextBeat);
        if (!hideCopy) setBeatPhase(nextBeat);
      }

      if (progress >= 0.62 && !climaxFired.current) {
        climaxFired.current = true;
        refs.shake = Math.max(refs.shake, 0.18);
        refs.meteorBurstAt = Date.now() * 0.001;
        ceremonyCb.current?.onClimax?.();
      }

      if (progress >= 0.78 && !finaleFired.current) {
        finaleFired.current = true;
        ceremonyCb.current?.onFinale?.();
      }

      // Hold the arrival frame so the reveal copy can land before the dissolve
      if (elapsed < durationMs + FINALE_HOLD_MS) {
        raf = requestAnimationFrame(tick);
      } else if (!doneFired.current) {
        doneFired.current = true;
        ceremonyCb.current?.onDone?.();
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isCeremony, isReady, durationMs, hideCopy]);

  const displayTitle =
    isCeremony && ceremony?.brand
      ? ceremony.brand
      : SECTION_TITLES[currentSection] ?? c.title;

  const ceremonyLine = (() => {
    if (!isCeremony) return null;
    if (beatPhase === "ready") return ceremony?.ready ?? "";
    if (beatPhase === "awaken") return ceremony?.awaken ?? ceremony?.status ?? "";
    if (beatPhase === "cross") return ceremony?.beat ?? ceremony?.status ?? "";
    return ceremony?.status ?? "";
  })();

  const subtitle = isCeremony
    ? { line1: ceremonyLine ?? "", line2: "" }
    : SECTION_SUBTITLES[currentSection] ?? {
        line1: c.subtitleLine1,
        line2: c.subtitleLine2,
      };

  const eyebrow =
    isCeremony && beatPhase === "ready"
      ? "AI WORLD"
      : isCeremony
        ? "HORIZON CROSSING"
        : null;

  return (
    <div
      ref={containerRef}
      className={`hero-container cosmos-style ${isCeremony ? "cosmos-ceremony cosmos-ceremony-cinematic" : ""} ${isCeremony && beatPhase === "ready" ? "is-arrived" : ""} ${className}`.trim()}
    >
      <canvas ref={canvasRef} className="hero-canvas" />

      {!isCeremony ? (
        <div ref={menuRef} className="side-menu" style={{ visibility: "hidden" }}>
          <div className="menu-icon" aria-hidden>
            <span />
            <span />
            <span />
          </div>
          <div className="vertical-text">{c.menuLabel}</div>
        </div>
      ) : null}

      {hideCopy ? null : (
      <div className="hero-content cosmos-content">
        {eyebrow ? (
          <p
            ref={eyebrowRef}
            className="cosmos-eyebrow"
            style={{ visibility: "hidden" }}
          >
            {eyebrow}
          </p>
        ) : null}

        <h1
          ref={titleRef}
          className={`hero-title ${isCeremony ? "hero-title-cinematic" : ""}`}
        >
          {splitTitle(displayTitle)}
        </h1>

        <div ref={subtitleRef} className="hero-subtitle cosmos-subtitle">
          {subtitle.line1 ? (
            <p key={subtitle.line1} className="subtitle-line subtitle-line-live">
              {subtitle.line1}
            </p>
          ) : null}
          {subtitle.line2 ? <p className="subtitle-line">{subtitle.line2}</p> : null}
        </div>
      </div>
      )}

      {hideCopy ? null : !isCeremony ? (
        <>
          <div
            ref={scrollProgressRef}
            className="scroll-progress"
            style={{ visibility: "hidden" }}
          >
            <div className="scroll-text">{c.scrollLabel}</div>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
            <div className="section-counter">
              {String(currentSection + 1).padStart(2, "0")} /{" "}
              {String(totalSections).padStart(2, "0")}
            </div>
          </div>

          <div className="scroll-sections" aria-hidden>
            {[0, 1].map((i) => (
              <section key={i} className="content-section" />
            ))}
          </div>
        </>
      ) : (
        <div
          ref={scrollProgressRef}
          className={`scroll-progress cosmos-ceremony-progress ${beatPhase === "ready" ? "is-complete" : ""}`}
          aria-hidden
        >
          <div className="progress-track">
            <div
              className="progress-fill progress-fill-cinematic"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Component;

export function HorizonHeroSection(props: Props) {
  return <Component {...props} />;
}
