import React,{useState} from 'react';
import { useEffect } from 'react';

const TextInputs =({setTextInputs})=>{
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    
    useEffect(()=>{
        setTextInputs({title:title,description:description,source_link:url})
    },[title,description,url,setTextInputs])

    return (
        <div className='text-inputs'>
    <hr className="grey-line" />
    <div className='title-input'>
      <label htmlFor="title" className='title-text'>Title</label>
      <input
        type="text"
        id="title"
        name="title"
        className='title-value'
        placeholder='Enter title'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
    <hr className="grey-line" />
    <div className='desc-input'>
      <label htmlFor="description" className='desc-text'>Description</label>
      <textarea
        id="description"
        name="description"
        className='desc-value'
        placeholder='Enter description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
    </div>
    <hr className="grey-line" />
    <div className='url-input'>
      <label htmlFor="url" className='url-text'>URL</label>
      <input
        type="URL"
        id="url"
        name="url"
        className='url-value'
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
    </div>
  </div>
    );
}

export default TextInputs;