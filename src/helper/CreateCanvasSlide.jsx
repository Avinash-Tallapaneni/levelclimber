const CreateCanvasSlide = (text, width, height) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  //2dcontext and style

  const context = canvas.getContext("2d");
  context.fillStyle = "#a2a0c732";
  context.fillRect(0, 0, width, height);

  const [topText, bottomText] = text.split("\n");

  //text and style

  const textHeightOffset = 48;

  context.font = "48px sans-serif";
  context.fillStyle = "#0b0935f0";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(topText, width / 2, height / 2 - textHeightOffset);

  context.font = "48px sans-serif ";
  context.fillStyle = "#0b0935f0";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(bottomText, width / 2, height / 2 + textHeightOffset);

  const dataURL = canvas.toDataURL();

  return dataURL;
};

export default CreateCanvasSlide;
