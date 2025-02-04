import React, { useState, useRef } from 'react';
import './Card.scss';

const Card = ({ onSave }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB限制
        alert('图片大小不能超过5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert('请输入标题');
      return;
    }
    if (!category) {
      alert('请选择分类');
      return;
    }
    if (!image) {
      alert('请上传图片');
      return;
    }

    const cardData = {
      title: title.trim(),
      category,
      description: description.trim(),
      image
    };

    onSave?.(cardData);
    setIsEditing(false);
  };

  return (
    <div className="content-card">
      <div 
        className="card-image-container"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {image ? (
          <div className="image-wrapper">
            <img src={image} alt={title} className="card-image" />
            {isEditing && (
              <button 
                className="change-image-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                更换图片
              </button>
            )}
          </div>
        ) : (
          <div className="image-upload">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="image-upload"
              className="image-input"
            />
            <label htmlFor="image-upload" className="upload-label">
              <i className="upload-icon">+</i>
              <span>点击或拖拽上传图片</span>
              <span className="upload-hint">支持 jpg、png 格式，最大5MB</span>
            </label>
          </div>
        )}
      </div>

      <div className="card-content">
        {isEditing ? (
          <>
            <input
              type="text"
              placeholder="添加标题"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="card-title"
              maxLength={50}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="card-category"
            >
              <option value="">选择分类</option>
              <option value="book">书籍</option>
              <option value="movie">电影</option>
              <option value="game">游戏</option>
            </select>
            <textarea
              placeholder="添加描述（选填）"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="card-description"
              maxLength={200}
            />
            <div className="card-actions">
              <button 
                className="save-btn"
                onClick={handleSave}
              >
                保存
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="card-title-display">{title}</h3>
            <div className="card-category-display">{category}</div>
            {description && (
              <p className="card-description-display">{description}</p>
            )}
            <button 
              className="edit-btn"
              onClick={() => setIsEditing(true)}
            >
              编辑
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Card; 