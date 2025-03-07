'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import classes from './image-picker.module.css';

function ImagePicker({ label, name }) {
  const [pickedimage, setPickedImage] = useState();
  const imageInput = useRef();

  function handlePickClick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if(!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedimage && <p>No image picked yet.</p>}
          {pickedimage && 
            <Image 
              src={pickedimage}
              alt='The image selected by the user.'
              fill
            />
          }
        </div>
        <input 
          className={classes.input}
          type='file' 
          id={name}
          accept='image/png, image/jpeg'
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <button 
          className={classes.button} 
          type='button'
          onClick={handlePickClick}
        >
          Pick an image
        </button>
      </div>
    </div>
  )
}

export default ImagePicker