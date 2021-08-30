import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container,Row} from 'react-bootstrap';
import React, { useState } from 'react';
import './styles.css';
import Picker from 'emoji-picker-react';
import {
   FaSearchMinus,
   FaSearchPlus,
   FaArrowAltCircleUp,
   FaArrowAltCircleLeft,
   FaArrowCircleDown,
   FaArrowAltCircleRight,
   FaArrowUp,
   FaArrowLeft,
   FaArrowRight,
   FaArrowDown
   } from "react-icons/fa";
// import table from './img/table.jpg'
import ImageUploading from 'react-images-uploading';

const App =()=> {

  const [title ,setTitle ]= useState('');
  const [left ,setLeft ]= useState(25);
  const [top ,setTop ]= useState(25);
  const [color ,setColor ]= useState("00000");
  const [fontsize,setFontSize]=useState(35)
  const [leftImg ,setLeftImg ]= useState(50);
  const [topImg ,setTopImg ]= useState(150);
  const [chosenEmoji, setChosenEmoji] = useState(null);
   
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };
  console.log(color)

  const [value, setValue] = useState("");
 
  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if(chosenEmoji == null){
      setTitle(value)
    }
      else{
        setTitle(value + chosenEmoji.emoji)
      }
    
  
  };

  const handleKeypress = e => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  const [images, setImages] =useState([]);
  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const [bgIMG,setbgIMG]=useState([])
  
  const ChangeBG = (imageList2, addUpdateIndex2) => {
    console.log(imageList2, addUpdateIndex2);
    setbgIMG(imageList2[0].data_url);
  };
  return (
    <>
    <Container className="all_container">
      <div style={{ 
      backgroundImage: `url(${bgIMG})` 
    }} className="Img_Box ">
       <p style={{
          fontSize:fontsize,
          position:'absolute',
          left:`${left}%`,
          top:`${top}%`,
          color:`#${color}`,
                }}>
         {title}
        </p>
        <div className="Box_buttons">
            <ImageUploading
                  multiple
                  value={images}
                  onChange={onChange}
                  maxNumber={maxNumber}
                  dataURLKey="data_url"
                >
                {({
                   imageList,
                   onImageUpload,
                   onImageRemoveAll,
                   isDragging,
                   dragProps,
                  }) => ( 
                    <div className="upload__image-wrapper">
                        <button
                          style={isDragging ? { color: 'red' } : undefined}
                          onClick={onImageUpload}
                          {...dragProps}
                         >
                           Click or Drop here
                        </button>
                        &nbsp;
                        <button 
                        onClick={onImageRemoveAll}>
                           Remove all images
                       </button>
                        {imageList.map((image, index) => (
                          <div key={index} className="image-item">
                            <img 
                                className="img_on_table" 
                                style={{
                                left:`${leftImg}px`,
                                top:`${topImg}%`
                                      }} 
                                src={image['data_url']}
                                alt="nik" />
                          </div>
                        ))}
                    </div>
                  )}
                </ImageUploading>
                <ImageUploading
                  multiple
                  value={bgIMG}
                  onChange={ChangeBG}
                  maxNumber={maxNumber}
                  dataURLKey="data_url"
                >
                  {({
                    imageList2,
                    onImageUpload,
                    onImageRemoveAll,
                    isDragging,
                    dragProps,
                  }) => (
          
                    <div className="upload__image-wrapper">
                      <button
                              style={isDragging ? { color: 'red' } : undefined}
                              onClick={onImageUpload}
                              {...dragProps}
                            >
                            Create bg img
                          </button>
                           <button onClick={onImageRemoveAll}>Remove all BGimages</button>
                    </div>
                  )}
                </ImageUploading>
            </div>
          </div>      
    </Container>
    <Container className="my-4">
      <Row>
        <Col sm={12} md={4}>
          <h2>
                Create Text
          </h2>
            <form>
                <input
                  value={value}
                  onChange={handleChange}
                  onKeyPress={handleKeypress}
                />
                <div>
                    {chosenEmoji ? (
                      <span>You chose: {chosenEmoji.emoji}</span>
                    ) : (
                      <span>Chose Emoji</span>
                    )}
                    <Picker onEmojiClick={onEmojiClick} />
                </div>
                <button onClick={handleSubmit} type="submit">
                  Submit
                </button>
            </form>   
        </Col>
        <Col>
          <h2>
                Move Text
          </h2>
          <div className="control_text_position">
                  <div className="center_icon">
                  <FaArrowUp  
                    onClick={()=>{
                    setTop(top-5)
                  }} 
                  className="icon" />
                  </div>
                  <div className="space_icon">
                  <FaArrowLeft 
                      onClick={()=>{
                        setLeft(left-5)
                      }}        
                    className="icon" />
                  <FaArrowRight 
                    onClick={()=>{
                      setLeft(left+5)
                    }}         
                  className="icon" />
                  </div>
                  <div className="center_icon">
                  <FaArrowDown 
                      onClick={()=>{
                        setTop(top+5)
                      }} 
                  className="icon" />
                  </div>
            </div>
            <div className="font_size_box my-2">
              <p  className="text-center_p">Font size</p>
                  <div className="center_icon">
                    <FaSearchMinus className="icon" 
                    onClick={()=>{
                      setFontSize( fontsize-5)
                    }}
                    />
                    <p className="info_fontsize">{fontsize}</p>
                    <FaSearchPlus  className="icon" 
                    onClick={()=>{
                      setFontSize( fontsize+5)
                    }}     
                    />
                  </div>
              </div>
              <div className="color_box">
                    <p  className="text-center_p">Color (whitout #)</p>           
                      <input
                        value={color}
                        type="text"
                        name="name" 
                        onChange={e => setColor(e.target.value)} 
                        required 
                      />
                </div>
        </Col>
        <Col sm={12} md={4}>
              <h2>
                Move IMG
              </h2>
              <div className="center_icon">
              <FaArrowAltCircleUp  
                  onClick={()=>{
                    setTopImg(topImg-20)
                  }} 
                  className="icon" 
              />
              </div>
              <div className="space_icon">
              <FaArrowAltCircleLeft 
                  onClick={()=>{
                    setLeftImg(leftImg-20)
                  }} 
                className="icon" />
              <FaArrowAltCircleRight 
                onClick={()=>{
                  setLeftImg(leftImg+20)
                }}         
              className="icon" />
              </div>
              <div className="center_icon">
              <FaArrowCircleDown 
                  onClick={()=>{
                    setTopImg(topImg+20)
                  }} 
              className="icon" />
              </div>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default App;
