import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Md3DRotation } from 'react-icons/md';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { Colors } from '../../../types/enums/Colors';
import { ProductIllustrationTypes } from '../../../types/enums/ProductIllustrationTypes';
import { ProductIllustrationConfig } from '../../../types/logic/ProductIllustrationConfig';

import style from './product-illustration.module.scss';

interface Props {
  type: ProductIllustrationTypes;
  productIllustrationConfig: ProductIllustrationConfig;
  banner?: boolean;
  className?: string;
}

const ProductIllustration: FunctionComponent<Props> = ({
  type = ProductIllustrationTypes.MIXED,
  banner = false,
  className = '',
  productIllustrationConfig,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCanvasLoaded, setIsCanvasLoaded] = useState<boolean>(false);
  let firstColor = '#ffffff';
  let secondColor = '#f5f5f5';

  switch (productIllustrationConfig.rarity) {
    case 'common':
      firstColor = '#9BDDB5';
      secondColor = '#82CBC6';
      break;
    case 'rare':
      firstColor = '#A9CCF7';
      secondColor = '#D0A9F7';
      break;
    case 'legendary':
      firstColor = '#F5E592';
      secondColor = '#F9D080';
      break;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const model = productIllustrationConfig.model;

    if (canvas && model && !isCanvasLoaded && productIllustrationConfig.category) {
      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(75, 400 / 255, 0.1, 1000);

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
      });

      renderer.setSize(705.88, 450);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;

      const light = new THREE.PointLight(0xffffff, 3);
      light.position.set(-25, 50, -50);
      scene.add(light);

      const light2 = new THREE.PointLight(0xffffff, 3);
      light2.position.set(25, 50, 50);
      scene.add(light2);

      const loader = new GLTFLoader();

      loader.load(model, gltf => {
        gltf.scene.traverse(function (child) {
          if ((child as THREE.Mesh).isMesh) {
            const m = child as THREE.Mesh;
            m.receiveShadow = true;
            m.castShadow = true;
          }
          if ((child as THREE.Light).isLight) {
            const l = child as THREE.Light;
            l.castShadow = true;
            l.shadow.bias = -0.003;
            l.shadow.mapSize.width = 2048;
            l.shadow.mapSize.height = 2048;
          }
        });
        gltf.scene.applyMatrix4(new THREE.Matrix4().makeTranslation(-0.45, -0.3, -0.5));
        scene.add(gltf.scene);
      });

      camera.position.z = -1;
      camera.position.x = -0.75;
      camera.position.y = 0.25;

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };

      animate();
      setIsCanvasLoaded(true);
    }
  }, [isCanvasLoaded, productIllustrationConfig]);

  return (
    <div className={`${className} ${style.container}`}>
      <div className={style.illustration}>
        {/* image */}
        {(type === ProductIllustrationTypes.IMAGE ||
          type === ProductIllustrationTypes.MIXED ||
          !productIllustrationConfig.model) && (
          <img
            src={productIllustrationConfig.image}
            alt="product Illustration"
            className={`
                      ${style.image}
                      ${
                        type === ProductIllustrationTypes.MIXED && productIllustrationConfig.model
                          ? style.mixedimage
                          : style.staticimage
                      }
                      ${
                        productIllustrationConfig.productsOwned ===
                        productIllustrationConfig.maximum
                          ? style.disabled
                          : ''
                      }
                      `}
          />
        )}

        {/* canvas */}
        {(type === ProductIllustrationTypes.MODEL ||
          (type === ProductIllustrationTypes.MIXED && productIllustrationConfig.model)) && (
          <canvas
            ref={canvasRef}
            className={ProductIllustrationTypes.MIXED ? style.mixedcanvas : ''}
            style={{
              background: `linear-gradient(180deg, ${firstColor} 0%, ${secondColor} 100%)`,
            }}
          />
        )}
      </div>
      {type === ProductIllustrationTypes.MIXED && productIllustrationConfig.model && (
        <Md3DRotation className={style.rotationIcon}></Md3DRotation>
      )}
      {/* banner */}
      {banner &&
        productIllustrationConfig.productsOwned !== 0 &&
        productIllustrationConfig.productsOwned !== null && (
          <div
            className={style.banner}
            style={{
              background:
                productIllustrationConfig.maximum === productIllustrationConfig.productsOwned
                  ? Colors.primary
                  : Colors.secondary,
            }}
          >
            {productIllustrationConfig.maximum !== -1 && (
              <span>
                Déjà possédé: {productIllustrationConfig.productsOwned}/
                {productIllustrationConfig.maximum}
              </span>
            )}
            {productIllustrationConfig.maximum === -1 && (
              <span>Déjà possédé: {productIllustrationConfig.productsOwned}</span>
            )}
          </div>
        )}
    </div>
  );
};

export { ProductIllustration };
