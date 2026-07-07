export type ModuleData = {
  number: string;
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  ascii: string;
};

export const modules: ModuleData[] = [
  {
    number: "01", slug: "kernel-systems", title: "Kernel & Systems", subtitle:
      "Exploring the foundational layer where hardware meets software.", tag: "RING 0", ascii: String.raw`
┌──────────────────────── USER SPACE ────────────────────────┐
│   [ shell ]    [ editor ]    [ daemon ]    [ services ]     │
│        │            │            │              │           │
│        └────────────┴─────┬──────┴──────────────┘           │
│                           ▼  syscall                        │
├═══════════════════════════════════════════════════════════─┤
│                       KERNEL SPACE                          │
│  ┌─────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │ sched   │  │  vm/mmu  │  │  vfs     │  │  net stack   │  │
│  └────┬────┘  └────┬─────┘  └────┬─────┘  └──────┬───────┘  │
│       └────────────┴────────┬────┴───────────────┘          │
│                             ▼                               │
│                  [ device drivers ]                         │
├─────────────────────────────────────────────────────────────┤
│  HARDWARE   ◇ CPU   ◇ RAM   ◇ DISK   ◇ NIC   ◇ TIMER        │
└─────────────────────────────────────────────────────────────┘`, }, {
    number: "02", slug: "network-topologies", title: "Network Topologies", subtitle:
      "Mapping the invisible infrastructure that connects billions of nodes.", tag: "MESH", ascii: String.raw`
            (A)───────────(B)
           / │ \         / │
          /  │  \       /  │
        (H)  │   \     /  (C)
          \  │    \   /   / │
           \ │     \ /   /  │
            (G)────(◉)──(D)
             │     / \    │
             │    /   \   │
            (F)──/     \─(E)
       ─────────────────────────────
        nodes: 8   links: 14   ø rtt: 12ms
        routing: OSPF   state: CONVERGED [OK]`, }, {
    number: "03", slug: "distributed-ledger", title: "Distributed Ledger", subtitle: "Decentralized systems where trust is computed, not assumed.", tag: "CHAIN", ascii: String.raw`
 ┌───────────┐    ┌───────────┐    ┌───────────┐
 │ BLOCK #41 │───▶│ BLOCK #42 │───▶│ BLOCK #43 │
 ├───────────┤    ├───────────┤    ├───────────┤
 │ prev 0x9f │    │ prev 0xa3 │    │ prev 0xc7 │
 │ root 0xa3 │    │ root 0xc7 │    │ root 0xe1 │
 │ nonce 8821│    │ nonce 4410│    │ nonce 9032│
 │ tx    128 │    │ tx     96 │    │ tx    142 │
 └───────────┘    └───────────┘    └───────────┘
   hash 0xa3..      hash 0xc7..      hash 0xe1..
 ───────────────────────────────────────────────
  consensus: PoW   difficulty: 0x1d00ffff   [VALID]`, }, {
    number: "04", slug: "compiler-design", title: "Compiler Design", subtitle: "The art of translating human intent into machine execution.", tag: "LLVM", ascii: String.raw`
  source.c
     │
     ▼
 ┌────────┐   ┌────────┐   ┌──────┐   ┌──────┐   ┌──────┐
 │ LEXER  │──▶│ PARSER │──▶│ SEMA │──▶│  IR  │──▶│ CODE │
 └────────┘   └────────┘   └──────┘   └──────┘   └──────┘
   tokens        AST        types     ssa/opt      asm
     │             │           │         │           │
   id,num       expr·stmt   typecheck  passes    x86-64
     └─────────────┴───────────┴─────────┴───────────┘
                          ▼
                     a.out  [LINKED]`, }, {
    number: "05", slug: "graphics-pipelines", title: "Graphics Pipelines", subtitle:
      "From vertices to pixels, the graphics pipeline transforms math into light.", tag: "GPU", ascii: String.raw`
  [VBO] ▶ ┌──────────────┐ ▶ ┌──────────────┐ ▶ ┌──────────┐
  verts   │ VERTEX SHADER│   │  RASTERIZER  │   │ FRAGMENT │
          └──────────────┘   └──────────────┘   └────┬─────┘
              clip·mvp           fragments            │ shade
                                                      ▼
          ┌──────────────┐ ◀ ┌──────────────┐ ◀ ┌──────────┐
          │  FRAMEBUFFER │   │  BLEND/DEPTH │   │  TEXTURE │
          └──────────────┘   └──────────────┘   └──────────┘
  ─────────────────────────────────────────────────────────
   draw calls: 1            triangles: 1.2M    fps: 144 [OK]`, }, {
    number: "06", slug: "logic-synthesis", title: "Logic Synthesis", subtitle: "Where Boolean algebra meets silicon.", tag: "RTL", ascii: String.raw`
   A ───┐
        │   ┌─────┐
        ├──▶│ AND │──┐
   B ───┘   └─────┘  │   ┌─────┐
                     ├──▶│ XOR │──── SUM
   C ───────────────┐│   └─────┘
                    ││
        ┌─────┐     ││   ┌─────┐
   A ──▶│ OR  │─────┴┴──▶│ AND │──── CARRY
   B ──▶│     │          └─────┘
        └─────┘
   ──────────────────────────────────
    gates: 4   depth: 2   1-bit FULL ADDER`, }, {
    number: "07", slug: "concurrency-models", title: "Concurrency Models", subtitle: "Managing simultaneous execution paths without chaos.", tag: "ASYNC", ascii: String.raw`
  T0 │████████░░░░████░░░░░░░░████████│  cpu-bound
  T1 │░░░░████████░░░░░░██████░░░░░░░░│  io-wait
  T2 │██░░░░░░████████████░░░░██░░░░██│  mixed
  T3 │░░██████░░░░░░░░████░░████████░░│  io-wait
     └──────────────────────────────-┘
      0ms          time ▶          250ms
   ────────────────────────────────────────
    ████ running   ░░░░ blocked   locks: 0 [SAFE]`, }, {
    number: "08", slug: "hardware-abstraction", title: "Hardware Abstraction", subtitle:
      "The invisible translators between software intent and hardware reality.", tag: "HAL", ascii: String.raw`
 ┌──────────────────────────────────────────────┐  L4
 │              APPLICATION LOGIC                 │
 ├──────────────────────────────────────────────┤  L3
 │                  FRAMEWORK                     │
 ├──────────────────────────────────────────────┤  L2
 │            HAL, driver interface              │
 ├──────────────────────────────────────────────┤  L1
 │           REGISTERS, 0x40021000               │
 ├──────────────────────────────────────────────┤  L0
 │        SILICON, gpio, timer, uart           │
 └──────────────────────────────────────────────┘
   reg GPIOA->MODER = 0x0000_0055    [WRITE OK]`, }, ];
