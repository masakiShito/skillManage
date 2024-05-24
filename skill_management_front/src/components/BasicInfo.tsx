import React from 'react';
import '../styles/BasicInfo.css';

interface User {
  id: number;
  username: string;
  email: string;
  nickname: string | null;
  phone_number: string | null;
  address: string | null;
}

interface BasicInfoProps {
  user: User | null;
  editMode: boolean;
  editedUser: User | null;
  handleEditClick: () => void;
  handleSaveClick: () => void;
  handleCancelClick: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BasicInfo: React.FC<BasicInfoProps> = ({
  user,
  editMode,
  editedUser,
  handleEditClick,
  handleSaveClick,
  handleCancelClick,
  handleChange,
}) => {
  return (
    <section className="welcome-section">
      <div className="card">
        <h2>
          <i className="fas fa-user"></i> ようこそ、
          {user?.nickname || user?.username}さん！
        </h2>
        {editMode ? (
          <div>
            <div className="input-group">
              <label>メール:</label>
              <input
                type="text"
                name="email"
                value={editedUser?.email || ''}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>電話番号:</label>
              <input
                type="text"
                name="phone_number"
                value={editedUser?.phone_number || ''}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label>住所:</label>
              <input
                type="text"
                name="address"
                value={editedUser?.address || ''}
                onChange={handleChange}
              />
            </div>
            <div className="button-container">
              <button onClick={handleSaveClick} className="save-button">
                保存
              </button>
              <button onClick={handleCancelClick} className="cancel-button">
                キャンセル
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p>
              <i className="fas fa-envelope"></i> メール: {user?.email}
            </p>
            <p>
              <i className="fas fa-phone"></i> 電話番号: {user?.phone_number}
            </p>
            <p>
              <i className="fas fa-home"></i> 住所: {user?.address}
            </p>
            <button onClick={handleEditClick} className="edit-button">
              <i className="fas fa-edit"></i> 編集
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BasicInfo;
