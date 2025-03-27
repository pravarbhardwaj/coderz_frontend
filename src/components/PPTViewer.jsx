import React, { useState, useRef, useEffect } from "react";
import screenfull from "screenfull";
import { SketchPicker } from "react-color";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { Presentation, Slide, Text } from "react-pptx";


const slides = [
  { id: 1, type: "image", src: "https://w0.peakpx.com/wallpaper/410/412/HD-wallpaper-plain-black-black.jpg", audio: "audio1.mp3" },
  { id: 2, type: "video", src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", audio: "audio2.mp3" },
];


const PowerPointEmbed = ({data}) => {
  return (
    <iframe
      src={data.ppt_file}
      width="100%"
      height="600px"
    />
  );
};


const PPTViewer = ({data}) => {
  console.log("waaa - ", data)
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState("#FF0000");
    const audioRef = useRef(null);
    const videoRef = useRef(null);
    const [paths, setPaths] = useState([]);
  
    useEffect(() => {
      setPaths([]);
    }, [currentSlide]);
  
    const goToSlide = (index) => {
      setCurrentSlide(index);
    };
  
    const toggleFullScreen = () => {
      if (screenfull.isEnabled) {
        screenfull.toggle();
      }
    };
  
    const handleMute = () => {
      setIsMuted(!isMuted);
      if (audioRef.current) audioRef.current.muted = !isMuted;
      if (videoRef.current) videoRef.current.muted = !isMuted;
    };
  
    const handleVolumeChange = (e) => {
      setVolume(e.target.value);
      if (audioRef.current) audioRef.current.volume = e.target.value;
      if (videoRef.current) videoRef.current.volume = e.target.value;
    };
  
    return (
      <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
        <div className="relative w-full max-w-3xl bg-white shadow-lg rounded-lg p-4 z-0">
          {/* {
          slides[currentSlide].type === "image" ? (
            <img src={slides[currentSlide].src} alt="Slide" className="w-full rounded-md" onDragStart={(event)=> event.preventDefault()}/>
          ) : (
            <video ref={videoRef} src={slides[currentSlide].src} controls className="w-full mt-2 rounded-md"></video>
          )} */}

            <PowerPointEmbed data={data}/>
          <audio ref={audioRef} src={slides[currentSlide].audio} autoPlay hidden></audio>
          {isDrawing && (
            <ReactSketchCanvas
            canvasColor="rgba(0,0,0,0)"
              className="absolute inset-0 z-10"
              strokeWidth={4}
              strokeColor={color}
              onChange={(updatedPaths) => setPaths(updatedPaths)}
              paths={paths}
                
            />
          )}
        </div>
  
        <div className="flex gap-4 mt-4">
          <button onClick={() => setCurrentSlide((prev) => Math.max(prev - 1, 0))} className="bg-gray-300 px-4 py-2 rounded-md">Back</button>
          <button onClick={() => setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1))} className="bg-blue-500 text-white px-4 py-2 rounded-md">Next</button>
    
          <button onClick={toggleFullScreen} className="bg-gray-600 text-white px-4 py-2 rounded-md">Full Screen</button>
          <button onClick={handleMute} className="bg-gray-500 text-white px-4 py-2 rounded-md">{isMuted ? "Unmute" : "Mute"}</button>
          <input type="range" min="0" max="1" step="0.1" value={volume} onChange={handleVolumeChange} className="w-24" />
     
          <button onClick={() => document.getElementById("slideSelector").showModal()} className="bg-gray-400 text-white px-4 py-2 rounded-md">Select Slide</button>
        </div>
  
        <dialog id="slideSelector" className="p-6 bg-white rounded-md shadow-lg">
          <h2 className="text-lg font-semibold">Select Slide</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {slides.map((slide, index) => (
              <button key={slide.id} onClick={() => goToSlide(index)} className="border p-2 rounded-md">
                Slide {slide.id}
              </button>
            ))}
          </div>
          <button onClick={() => document.getElementById("slideSelector").close()} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md">Close</button>
        </dialog>
  
        <div className="mt-4 flex gap-4">
          <button onClick={() => setIsDrawing(!isDrawing)} className="bg-green-500 text-white px-4 py-2 rounded-md">{isDrawing ? "Disable Drawing" : "Enable Drawing"}</button>
          {isDrawing && (
            <SketchPicker color={color} onChangeComplete={(color) => setColor(color.hex)} />
          )}
        </div>
      </div>
    );
  };
  
  export default PPTViewer;
  