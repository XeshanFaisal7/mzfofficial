import { Suspense, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import gsap from "gsap";
import * as THREE from "three";
import { useHeroExperience } from "@/context/HeroExperienceContext";

export type CyberWorkspaceProps = {
  bloom?: boolean;
  particles?: number;
  stars?: number;
};

function WorkspaceParticles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [count]);

  useFrame((_s, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.035;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.042}
        color="#6ee7d8"
        transparent
        opacity={0.48}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function HologramPanel({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t * 0.8 + position[0]) * 0.08;
    ref.current.rotation.z = Math.sin(t * 0.35) * 0.04;
    const m = ref.current.material as THREE.MeshBasicMaterial;
    m.opacity = 0.07 + Math.sin(t * 2.4) * 0.04;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <planeGeometry args={[0.85, 1.15]} />
      <meshBasicMaterial color={color} transparent opacity={0.12} depthWrite={false} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
    </mesh>
  );
}

function Monitor({
  position,
  rotation,
  emissive,
  size,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  emissive: string;
  size: [number, number];
}) {
  const screen = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (screen.current) {
      const mat = screen.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.05 + Math.sin(t * 3.1) * 0.22 + Math.sin(t * 17.5) * 0.06;
    }
  });

  return (
    <group position={position} rotation={rotation ?? [0, 0, 0]}>
      <mesh castShadow receiveShadow={false}>
        <boxGeometry args={[size[0] + 0.08, size[1] + 0.08, 0.05]} />
        <meshStandardMaterial color="#0b1224" metalness={0.7} roughness={0.45} />
      </mesh>
      <mesh ref={screen} position={[0, 0, 0.03]}>
        <planeGeometry args={[size[0], size[1]]} />
        <meshStandardMaterial
          color="#020817"
          emissive={emissive}
          emissiveIntensity={1.1}
          metalness={0.2}
          roughness={0.35}
        />
      </mesh>
    </group>
  );
}

/** Stylized cinematic developer + workspace (no cheap cartoon — premium silhouettes). */
export function CyberDeveloperWorkspace({ bloom = true, particles = 900, stars = 1400 }: CyberWorkspaceProps) {
  const { scrollPhase } = useHeroExperience();
  const phaseRef = useRef(scrollPhase);
  useEffect(() => {
    phaseRef.current = scrollPhase;
  }, [scrollPhase]);

  const sceneRoot = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const eyesRef = useRef<THREE.Group>(null);
  /** World-space focal point for the seated developer (scene offset + character group). */
  const focusRef = useRef(new THREE.Vector3(0.72, -0.42, 1.52));
  const camTarget = useRef(new THREE.Vector3(0.35, 0.08, 5.15));
  const lookTarget = useRef(new THREE.Vector3(0.72, -0.42, 1.52));
  const blinkAtRef = useRef(2.8);
  const spotRef = useRef<THREE.SpotLight>(null);
  const keyRef = useRef<THREE.PointLight>(null);
  const rimRef = useRef<THREE.PointLight>(null);
  const deskRef = useRef<THREE.PointLight>(null);

  useLayoutEffect(() => {
    if (!sceneRoot.current) return;
    const g = sceneRoot.current;
    g.scale.setScalar(0.96);
    gsap.to(g.scale, {
      x: 0.98,
      y: 0.98,
      z: 0.98,
      duration: 2.35,
      ease: "power3.out",
      delay: 0.06,
    });
  }, []);

  useFrame(({ camera, clock, scene, pointer, size }) => {
    const t = clock.elapsedTime;
    const phase = phaseRef.current;
    const aspect = size.width / Math.max(size.height, 1);
    const narrow = aspect < 1;
    const wide = aspect > 1.55;

    const focusX = narrow ? 0.52 : wide ? 0.78 : 0.68;
    const focusY = narrow ? -0.38 : -0.44;
    const focusZ = 1.52;
    focusRef.current.set(focusX, focusY, focusZ);

    const baseCamX = narrow ? 0.12 : 0.32;
    const baseCamY = narrow ? 0.1 : 0.06;
    const baseCamZ = narrow ? 6.35 : wide ? 5.45 : 5.15;
    const baseFov = narrow ? 52 : wide ? 44 : 47;

    const tx = THREE.MathUtils.lerp(baseCamX, baseCamX + 0.12, phase) + pointer.x * 0.08;
    const ty = THREE.MathUtils.lerp(baseCamY, baseCamY - 0.06, phase) + pointer.y * 0.06;
    const tz = THREE.MathUtils.lerp(baseCamZ, baseCamZ + 0.35, phase);
    camTarget.current.set(tx, ty, tz);
    camera.position.lerp(camTarget.current, 0.055);

    lookTarget.current.set(
      focusX + pointer.x * 0.06,
      focusY + pointer.y * 0.04 + phase * -0.04,
      focusZ + phase * 0.06
    );
    camera.lookAt(lookTarget.current);

    if (camera instanceof THREE.PerspectiveCamera && Math.abs(camera.fov - baseFov) > 0.01) {
      camera.fov = baseFov;
      camera.updateProjectionMatrix();
    }

    if (scene.fog instanceof THREE.Fog) {
      scene.fog.near = THREE.MathUtils.lerp(4.85, 4.05, phase);
      scene.fog.far = THREE.MathUtils.lerp(19.5, 22.5, phase);
    }

    if (spotRef.current) spotRef.current.intensity = 2.4 * (0.74 + phase * 0.42);
    if (keyRef.current) keyRef.current.intensity = 1.75 + phase * 0.72;
    if (rimRef.current) rimRef.current.intensity = 0.95 + phase * 0.55;
    if (deskRef.current) deskRef.current.intensity = phase * 1.05;

    if (headRef.current) {
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, pointer.x * 0.62, 0.072);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -pointer.y * 0.2, 0.068);
    }

    if (eyesRef.current) {
      if (t > blinkAtRef.current) {
        blinkAtRef.current = t + 2.2 + Math.random() * 2.7;
        eyesRef.current.scale.y = 0.06;
      }
      eyesRef.current.scale.y = THREE.MathUtils.lerp(eyesRef.current.scale.y, 1, 0.2);
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0.32, 0.08, 5.15]} fov={47} />

      <color attach="background" args={["#05060c"]} />
      <fog attach="fog" args={["#03040a", 4.8, 19.5]} />

      <ambientLight intensity={0.12} />

      <spotLight
        ref={spotRef}
        position={[4.2, 5.2, 5.6]}
        angle={0.38}
        penumbra={0.85}
        intensity={2.05}
        color="#b8fff0"
      />
      <pointLight ref={keyRef} position={[2.6, 1.2, 4.2]} intensity={1.75} color="#5eead4" distance={18} decay={2} />
      <pointLight ref={rimRef} position={[-3.4, 0.4, 2.4]} intensity={0.95} color="#c4b5fd" distance={22} decay={2} />
      <pointLight ref={deskRef} position={[0.2, -1.95, 3.95]} intensity={0} color="#38bdf8" distance={14} decay={2} />

      <Stars radius={72} depth={54} count={stars} factor={4} saturation={0.14} fade speed={0.9} />

      <WorkspaceParticles count={particles} />

      <group ref={sceneRoot} position={[0.68, 0, 0]}>
        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.02, 1.35]} receiveShadow={false}>
          <planeGeometry args={[24, 18]} />
          <meshStandardMaterial color="#050816" roughness={0.92} metalness={0.08} envMapIntensity={0.2} />
        </mesh>

        {/* Desk cluster */}
        <group position={[0, -1.46, 1.42]} rotation={[0, -0.05, 0]}>
          <mesh position={[0, -0.22, 0]}>
            <boxGeometry args={[2.95, 0.11, 1.15]} />
            <meshStandardMaterial color="#111c3a" metalness={0.65} roughness={0.38} />
          </mesh>
          <mesh position={[0, -0.58, 0]}>
            <boxGeometry args={[2.7, 0.65, 0.88]} />
            <meshStandardMaterial color="#0a1024" metalness={0.5} roughness={0.55} />
          </mesh>

          <Monitor position={[-0.82, 0.58, -0.18]} rotation={[-0.06, 0.16, 0]} emissive="#14b8a6" size={[0.88, 0.5]} />
          <Monitor position={[0.52, 0.62, 0.06]} rotation={[-0.04, -0.1, 0]} emissive="#22d3ee" size={[1.08, 0.62]} />
          <Monitor position={[1.28, 0.48, -0.12]} rotation={[0.02, -0.28, 0]} emissive="#a78bfa" size={[0.42, 0.56]} />

          <mesh position={[0.35, -0.02, 0.55]} rotation={[1.52, 0, 0.05]}>
            <boxGeometry args={[1.08, 0.06, 0.38]} />
            <meshStandardMaterial color="#1e293b" metalness={0.82} roughness={0.3} />
          </mesh>

          <mesh position={[-0.55, -0.01, 0.58]}>
            <boxGeometry args={[0.09, 0.05, 0.13]} />
            <meshStandardMaterial color="#475569" emissive="#475569" emissiveIntensity={0.18} />
          </mesh>
        </group>

        {/* Chair */}
        <group position={[0.16, -1.86, 0.95]}>
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.52, 0.48, 0.12, 28]} />
            <meshStandardMaterial color="#172033" roughness={0.55} metalness={0.35} />
          </mesh>
          <mesh position={[0, 0.22, -0.14]} rotation={[-0.16, 0, 0]}>
            <boxGeometry args={[0.42, 0.92, 0.1]} />
            <meshStandardMaterial color="#1a243f" roughness={0.45} metalness={0.25} />
          </mesh>
        </group>

        {/* Stylized seated developer — kept in frame on all viewports */}
        <group position={[0, -1.18, 1.52]} rotation={[0, -0.12, 0]} scale={0.96}>
          <mesh position={[0, -0.55, -0.12]}>
            <capsuleGeometry args={[0.36, 0.85, 6, 12]} />
            <meshStandardMaterial color="#082f37" roughness={0.42} metalness={0.18} emissive="#134e4a" emissiveIntensity={0.14} />
          </mesh>

          <mesh position={[0, 0.18, 0.05]} scale={[1.08, 1.02, 1.05]}>
            <sphereGeometry args={[0.39, 16, 16]} />
            <meshStandardMaterial color="#0c2b32" roughness={0.35} metalness={0.22} emissive="#115e59" emissiveIntensity={0.1} />
          </mesh>

          <group ref={headRef} position={[0, 0.94, 0.08]}>
            <mesh>
              <sphereGeometry args={[0.23, 16, 16]} />
              <meshStandardMaterial color="#fcd9e2" roughness={0.55} metalness={0.08} envMapIntensity={0.35} />
            </mesh>
            <mesh position={[0, 0.04, 0.19]} rotation={[1.54, 0, 0]}>
              <torusGeometry args={[0.185, 0.028, 6, 16]} />
              <meshStandardMaterial color="#022c22" roughness={0.25} metalness={0.35} emissive="#2dd4bf" emissiveIntensity={1.95} toneMapped />
            </mesh>
            <group ref={eyesRef} position={[0, 0.02, 0.18]}>
              <mesh position={[-0.07, 0, 0]}>
                <sphereGeometry args={[0.028, 10, 10]} />
                <meshStandardMaterial color="#0f172a" roughness={0.2} emissive="#e2e8f0" emissiveIntensity={0.35} />
              </mesh>
              <mesh position={[0.07, 0, 0]}>
                <sphereGeometry args={[0.028, 10, 10]} />
                <meshStandardMaterial color="#0f172a" roughness={0.2} emissive="#e2e8f0" emissiveIntensity={0.35} />
              </mesh>
            </group>
          </group>

          <TypingArms />

          {/* Laptop on desk in front of developer */}
          <group position={[0.08, -0.02, 0.38]} rotation={[-1.48, 0, 0]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[1.05, 0.04, 0.72]} />
              <meshStandardMaterial color="#1e293b" metalness={0.75} roughness={0.35} />
            </mesh>
            <mesh position={[0, 0.28, -0.18]} rotation={[-0.72, 0, 0]}>
              <boxGeometry args={[1.02, 0.62, 0.04]} />
              <meshStandardMaterial color="#020817" emissive="#14b8a6" emissiveIntensity={0.85} metalness={0.15} roughness={0.4} />
            </mesh>
          </group>
        </group>

        <Float rotationIntensity={0.35} floatIntensity={0.55} speed={1.2}>
          <HologramPanel position={[-1.62, -0.2, 2.08]} color="#67f5dd" scale={1.08} />
        </Float>
        <Float rotationIntensity={0.28} floatIntensity={0.48} speed={1.05}>
          <HologramPanel position={[1.52, -0.85, 2.72]} color="#38bdf8" />
        </Float>
      </group>

      <PostFX enabled={bloom} />
    </>
  );
}

/** Cheap typing motion on forearms — read from clock inside useFrame. */
function TypingArms() {
  const left = useRef<THREE.Mesh>(null);
  const right = useRef<THREE.Mesh>(null);
  const mouseArm = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const k = clock.elapsedTime * 10.5;
    if (left.current) left.current.rotation.x = 0.28 + Math.sin(k) * 0.11;
    if (right.current) right.current.rotation.x = 0.22 + Math.sin(k + 1.1) * 0.12;
    if (mouseArm.current) mouseArm.current.rotation.y = Math.sin(clock.elapsedTime * 1.6) * 0.05;
  });

  return (
    <>
      <mesh ref={left} position={[-0.52, 0.18, 0.22]} rotation={[0.35, 0, -0.15]}>
        <capsuleGeometry args={[0.09, 0.38, 4, 8]} />
        <meshStandardMaterial color="#0f2d35" roughness={0.45} />
      </mesh>
      <group ref={mouseArm} position={[0.48, 0.12, 0.18]}>
        <mesh rotation={[0.38, 0, 0.12]}>
          <capsuleGeometry args={[0.085, 0.4, 4, 8]} />
          <meshStandardMaterial color="#0f2d35" roughness={0.45} />
        </mesh>
      </group>
      <mesh ref={right} position={[0.55, 0.16, 0.24]} rotation={[0.32, 0, 0.18]}>
        <capsuleGeometry args={[0.09, 0.36, 4, 8]} />
        <meshStandardMaterial color="#0f2d35" roughness={0.45} />
      </mesh>
    </>
  );
}

function PostFX({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;
  return (
    <Suspense fallback={null}>
      <EffectComposer multisampling={0} enableNormalPass={false}>
        <Bloom luminanceThreshold={0.32} luminanceSmoothing={0.9} intensity={0.65} radius={0.45} />
        <Vignette eskil offset={0.32} darkness={0.72} />
      </EffectComposer>
    </Suspense>
  );
}
