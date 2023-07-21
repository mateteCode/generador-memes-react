import React, { useState } from "react";
import "./App.css";
import html2canvas from "html2canvas";

import Checkbox from "./components/form/Checkbox/Checkbox";
import FileInput from "./components/form/FileInput/FileInput";
import ColorInput from "./components/form/ColorInput/ColorInput";
import Select from "./components/form/Select/Select";
import NumberInput from "./components/form/NumberInput/NumberInput";
import TextInput from "./components/form/TextInput/TextInput";
import TitleContainer from "./components/containers/TitleContainer";

const blendModes = [
  "normal",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "color-dodge",
  "color-burn",
  "color-burn",
  "hard-light",
  "soft-light",
  "difference",
  "exclusion",
  "hue",
  "saturation",
  "color",
  "luminosity",
];

function App() {
  const [image, setImage] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [blendMode, setBlendMode] = useState(blendModes[0]);
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [text, setText] = useState("");
  const [textBackgroundColor, setTextBackgroundColor] = useState("#000000");
  const [transparent, setTransparent] = useState(false);
  const [fontSize, setFontSize] = useState(32);
  const [nodes, setNodes] = useState([]);
  const [position, setPosition] = useState({ top: 2, left: 2 });

  const handleUploadBtn = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleAddTextBtn = (e) => {
    const nodeToCopy = (
      <p
        className="meme__line"
        style={{
          top: `${position.top}%`,
          left: `${position.left}%`,
          color: `${textColor}`,
          backgroundColor: `${textBackgroundColor}`,
          fontSize: `${fontSize}px`,
        }}
      >
        {text}
      </p>
    );
    const newNode = React.cloneElement(nodeToCopy, { key: Date.now() });
    setNodes([...nodes, newNode]);
    setText("");
    setPosition({ top: 2, left: 2 });
  };

  const handleDownloadMemeBtn = () => {
    html2canvas(document.querySelector("#meme")).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "meme.png";
      link.click();
    });
  };

  return (
    <>
      <h1>Generador de Memes</h1>
      <main>
        <div className="panel">
          <div className="controls">
            <div className="controls__block">
              <span className="controls__title">Fondo</span>
              <FileInput
                label="Imagen de Fondo"
                labelBtn="Subir imagen"
                onChange={handleUploadBtn}
              />
              <ColorInput
                label="Color de fondo"
                onChange={setBackgroundColor}
              />
              <Select
                label="Efecto de Fondo"
                onChange={setBlendMode}
                data={blendModes}
              />
            </div>
            <div className="controls__block">
              <span className="controls__title">Capas de Texto</span>
              <TextInput
                label="Capa de Texto"
                onChange={setText}
                placeholder="Ingrese un texto"
                state={text}
              />
              <NumberInput
                label="Tamaño de Fuente"
                onChange={setFontSize}
                defaultValue={32}
              />
              <ColorInput
                label="Color de Texto"
                onChange={setTextColor}
                defaultValue={textColor}
              />
              <div className="inline-container">
                <ColorInput
                  label="Color de Fondo de Texto"
                  onChange={setTextBackgroundColor}
                  disabled={transparent}
                />
                <Checkbox
                  className="transparent-checkbox"
                  label="Transparente"
                  onChange={setTransparent}
                />
              </div>

              <div className="controls__group">
                <div className="controls__label">Posición</div>
                <div className="controls__group">
                  <button
                    className="controls__position-btn"
                    onClick={() =>
                      setPosition({ ...position, left: position.left - 5 })
                    }
                  >
                    ◀
                  </button>
                  <button
                    className="controls__position-btn"
                    onClick={() =>
                      setPosition({ ...position, top: position.top - 5 })
                    }
                  >
                    ▲
                  </button>
                  <button
                    className="controls__position-btn"
                    onClick={() =>
                      setPosition({ ...position, top: position.top + 5 })
                    }
                  >
                    ▼
                  </button>
                  <button
                    className="controls__position-btn"
                    onClick={() =>
                      setPosition({ ...position, left: position.left + 5 })
                    }
                  >
                    ▶
                  </button>
                </div>
              </div>
              <div className="controls__group">
                <label htmlFor="" className="controls__label">
                  Capas de texto: {nodes.length + (text !== "" ? 1 : 0)}
                </label>
                <button className="controls__button" onClick={handleAddTextBtn}>
                  Agregar
                </button>
              </div>
            </div>

            <div className="controls__group controls__button-download">
              <button
                className="controls__button"
                onClick={handleDownloadMemeBtn}
              >
                Descarga meme
              </button>
            </div>
          </div>
          <TitleContainer title="meme">
            <div className="meme" id="meme">
              <figure
                className="meme__figure"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundColor: `${backgroundColor}`,
                  backgroundBlendMode: `${blendMode}`,
                }}
              >
                <img
                  src={image}
                  alt=""
                  className="meme__img"
                  style={{ visibility: "hidden" }}
                />
              </figure>
              <div>
                <p
                  className="meme__line"
                  style={{
                    top: `${position.top}%`,
                    left: `${position.left}%`,
                    color: `${textColor}`,
                    backgroundColor: transparent
                      ? null
                      : `${textBackgroundColor}`,
                    fontSize: `${fontSize}px`,
                  }}
                  hidden={text === ""}
                >
                  {text}
                </p>
                {nodes}
              </div>
            </div>
          </TitleContainer>
        </div>
      </main>
    </>
  );
}

export default App;
