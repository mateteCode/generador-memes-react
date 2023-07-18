import React, { useState } from "react";
import "./App.css";
import html2canvas from "html2canvas";

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
  const [fontSize, setFontSize] = useState(32);
  const [nodes, setNodes] = useState([]);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleUploadBtn = (e) => {
    const file = e.target.files[0];
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
    setPosition({ top: 0, left: 0 });
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
            <div className="controls__group">
              <label className="controls__label">Imagen de Fondo</label>
              <div className="controls__upload">
                <input
                  className="controls__upload-file"
                  type="file"
                  hidden
                  id="upload-btn"
                  onChange={handleUploadBtn}
                />
                <label className="controls__upload-btn" htmlFor="upload-btn">
                  Subir imagen
                </label>
              </div>
            </div>
            <div className="controls__group">
              <label className="controls__label">Color de Fondo</label>
              <input
                type="color"
                onChange={(e) => setBackgroundColor(e.target.value)}
                defaultValue={backgroundColor}
              />
            </div>
            <div className="controls__group">
              <label className="controls__label">Efecto de Fondo</label>
              <select
                name=""
                id=""
                className="controls__select"
                defaultValue={0}
                onChange={(e) => setBlendMode(blendModes[e.target.value])}
              >
                {blendModes.map((mode, idx) => (
                  <option key={idx} value={idx}>
                    {mode}
                  </option>
                ))}
              </select>
            </div>
            <div className="controls__group">
              <label htmlFor="" className="controls__label">
                Texto
              </label>
              <input
                type="text"
                className="controls__text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className="controls__group">
              <label htmlFor="" className="controls__label">
                Tamaño de Fuente
              </label>
              <input
                type="number"
                className="controls__fontsize"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
              />
            </div>
            <div className="controls__group">
              <label className="controls__label">Color de Texto</label>
              <input
                type="color"
                onChange={(e) => setTextColor(e.target.value)}
                defaultValue={textColor}
              />
            </div>
            <div className="controls__group">
              <label className="controls__label">Color de Fondo de Texto</label>
              <input
                type="color"
                onChange={(e) => setTextBackgroundColor(e.target.value)}
                defaultValue={textBackgroundColor}
              />
            </div>
            <div className="controls__group">
              <div className="controls__label">Posición</div>
              <div className="controls__group">
                <button
                  className="controls__position-btn"
                  onClick={() =>
                    setPosition({ ...position, left: position.left - 10 })
                  }
                >
                  ◀
                </button>
                <button
                  className="controls__position-btn"
                  onClick={() =>
                    setPosition({ ...position, top: position.top - 10 })
                  }
                >
                  ▲
                </button>
                <button
                  className="controls__position-btn"
                  onClick={() =>
                    setPosition({ ...position, top: position.top + 10 })
                  }
                >
                  ▼
                </button>
                <button
                  className="controls__position-btn"
                  onClick={() =>
                    setPosition({ ...position, left: position.left + 10 })
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
            <div className="controls__group">
              <button
                className="controls__button"
                onClick={handleDownloadMemeBtn}
              >
                Descarga meme
              </button>
            </div>
          </div>
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
                  backgroundColor: `${textBackgroundColor}`,
                  fontSize: `${fontSize}px`,
                }}
                hidden={text === ""}
              >
                {text}
              </p>
              {nodes}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
