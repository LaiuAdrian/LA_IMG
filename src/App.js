import 'bootstrap/dist/css/bootstrap.min.css';
import { Container} from 'react-bootstrap';
import React, { useState } from 'react';
import './styles.css';
import Picker from 'emoji-picker-react';
import Draggable from 'react-draggable';
import ImageUploading from 'react-images-uploading';
import red  from "./img/color/red.png"
import {
  FaSearchMinus,
  FaSearchPlus,
  

  } from "react-icons/fa";
const  App =()=>{

  const [activeDrags,setactiveDrags]=useState(0)

    const onStart = () => {
      setactiveDrags(activeDrags + activeDrags);
    };

    const onStop = () => {
      setactiveDrags(activeDrags - activeDrags);
    };
    
    const dragHandlers = {onStart: onStart, onStop:onStop};
    
    const [title ,setTitle ]= useState('');
    
    const [color ,setColor ]= useState("00000");
    const [fontsize,setFontSize]=useState(35)
    const [fontFamily ,setfontFamily ]= useState("");
    
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [emoji,setEmojy]=useState(false)
     console.log(emoji)
    const onEmojiClick = (event, emojiObject) => {
      setChosenEmoji(emojiObject);
    };
    console.log(fontFamily)
  
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
      setbgIMG(imageList2[0]?.data_url);
    };
    return (
    <>
         {/* <Draggable  {...dragHandlers}>
              <img src={red} width="100px" height=""  className="supreme"/>
         </Draggable> */}

         <Container fluid className="top_container">
              <div className="top_box">
            
                    <form className="top_box_form">
                    <p className="top_text">
                        Create Text
                   </p>
                        <input className="mt-4 ml-3"
                          value={value}
                          onChange={handleChange}
                          onKeyPress={handleKeypress}
                        />
                        <div className="emoji_box">
                            {chosenEmoji ? (
                              <p className="top_text"> You chose: {chosenEmoji.emoji}</p>
                            ) : (
                              <p className="top_text">No Emoji</p>
                            )}
                            {emoji === true ? ( 
                               <div>
                                 <div className="box_cancel_emoji">
                                 <button
                                     className="cancel_emoji"
                                      onClick={()=>{
                                        setEmojy(!emoji)
                                      }}
                                      >Cancel Emoji
                                    </button> 
                                </div>
                                    
                                   <Picker pickerStyle={{ width: '300',height:'250px'}} onEmojiClick={onEmojiClick} />
                               </div>
                               )
                            :null}
                          
                        </div>
                 
                      
                        <button onClick={handleSubmit} className="buton_send" type="submit">
                          Submit
                        </button>
                    </form> 
                            <button
                            className="btn_emoji"
                              onClick={()=>{
                                setEmojy(!emoji)
                              }}
                              >Add Emoji
                             </button>  
                              <div className="select_box">
                                  <p className="top_text">Change Color</p>
                                  <label>
                                          <select 
                                              value={color}
                                              onChange={e => setColor(e.target.value)} 
                                              required 
                                              className="select"
                                          >
                                              <option className="black" value="00000">black</option>
                                              <option className="red" value="ff0000">red</option>
                                              <option className="white" value="ffffff">white</option>
                                              <option className="blue" value="0033cc">blue</option>
                                              <option className="green" value="003300">green</option>
                                              <option className="yellow" value="ffff00">yellow</option>
                                              <option className="pink" value="e50081">pink</option>
                                          </select>
                                      </label>
                              </div>
                              <div className="select_box">
                                  <p className="top_text">Select Font:</p>
                                  <label>
                                          <select 
                                              value={fontFamily}
                                              onChange={e => setfontFamily(e.target.value)} 
                                              required 
                                              className="select"
                                          >
                                              <option className="font_option" value="none">none</option>
                                              <option className="font_option" value="fantasy">fantasy</option>
                                              <option className="font_option" value="auto">auto</option>
                                              <option className="font_option" value="cursive">cursive</option>
                                              <option className="font_option" value="serif">serif</option>
                                          </select>
                                      </label>
                              </div>
                               <div className="select_box">
                                <p  className="top_text">Font size</p>
                                    <div className="center_icon mt-4">
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
                       </div>
        </Container>

        <Container className="all_container">
            <div style={{ 
            backgroundImage: `url(${bgIMG})` 
          }} className="Img_Box ">
         
        
       
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
                                 <Draggable  {...dragHandlers}>
                                    <div key={index} className="image-item">
                                      <img 
                                          className="img_on_table" 
                                        
                                          src={image['data_url']}
                                          alt="nik" />
                                    </div>
                              </Draggable>
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
                
                <Draggable {...dragHandlers}>
                 <div>
                      <p 
                      style={{
                        fontSize:fontsize,   
                        color:`#${color}`,
                        zIndex:255,
                        position:'relative',
                        cursor:'all-scroll',
                        fontFamily:`${fontFamily}`
                              }}>
                      {title}
                    </p>
                 </div>
           </Draggable>
              </div>      
        </Container>

         
    </>
    );
  
}

export default App ;