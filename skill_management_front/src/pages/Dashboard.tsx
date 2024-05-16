import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

interface User {
  id: number;
  username: string;
  email: string;
  nickname: string | null;
  phone_number: string | null;
  address: string | null;
}

interface UserSkill {
  id: number;
  skill_name: string;
  level: number;
  acquired_date: string;
}

interface LearningLog {
  id: number;
  note: string;
  created_at: string;
}

interface Organization {
  id: number;
  company_name: string;
  position: string;
  start_date: string;
  end_date: string | null;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [skills, setSkills] = useState<UserSkill[]>([]);
  const [learningLogs, setLearningLogs] = useState<LearningLog[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:8000/api/dashboard/',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data); // デバッグ用に取得したデータを確認
        setUser(response.data.user);
        setSkills(response.data.skills);
        setLearningLogs(response.data.learning_logs);
        setOrganizations(response.data.organizations);
      } catch (error) {
        setError('データの取得に失敗しました。');
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
    setEditedUser(user);
  };

  const handleSaveClick = async () => {
    if (editedUser) {
      try {
        const token = localStorage.getItem('token');
        await axios.put(
          `http://localhost:8000/api/users/${editedUser.id}/`,
          editedUser,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(editedUser);
        setEditMode(false);
      } catch (error) {
        setError('データの保存に失敗しました。');
        console.error(error);
      }
    }
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setEditedUser(user);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedUser) {
      setEditedUser({
        ...editedUser,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <h1>
          <i className="fas fa-tachometer-alt"></i> ダッシュボード
        </h1>
      </nav>
      <main className="main-content">
        {error && <p className="error">{error}</p>}
        {user && (
          <section className="welcome-section">
            <div className="card">
              <h2>
                <i className="fas fa-user"></i> ようこそ、
                {user.nickname || user.username}さん！
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
                    <button
                      onClick={handleCancelClick}
                      className="cancel-button"
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p>
                    <i className="fas fa-envelope"></i> メール: {user.email}
                  </p>
                  <p>
                    <i className="fas fa-phone"></i> 電話番号:{' '}
                    {user.phone_number}
                  </p>
                  <p>
                    <i className="fas fa-home"></i> 住所: {user.address}
                  </p>
                  <button onClick={handleEditClick} className="edit-button">
                    <i className="fas fa-edit"></i> 編集
                  </button>
                </div>
              )}
            </div>
          </section>
        )}
        <section className="skills-section">
          <div className="card">
            <h3>
              <i className="fas fa-book"></i> あなたのスキル
            </h3>
            <ul>
              {skills.map((userSkill) => (
                <li key={userSkill.id}>
                  <i className="fas fa-check-circle"></i> {userSkill.skill_name}{' '}
                  - レベル: {userSkill.level} - 習得日:{' '}
                  {userSkill.acquired_date}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="learning-logs-section">
          <div className="card">
            <h3>
              <i className="fas fa-list"></i> 学習ログ
            </h3>
            <ul>
              {learningLogs.map((log) => (
                <li key={log.id}>
                  <i className="fas fa-book-open"></i> {log.note} - 日付:{' '}
                  {new Date(log.created_at).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="organizations-section">
          <div className="card">
            <h3>
              <i className="fas fa-building"></i> 所属組織
            </h3>
            <ul>
              {organizations.map((org) => (
                <li key={org.id}>
                  <i className="fas fa-briefcase"></i> {org.company_name} -
                  ポジション: {org.position} - 期間:{' '}
                  {new Date(org.start_date).toLocaleDateString()} 〜{' '}
                  {org.end_date
                    ? new Date(org.end_date).toLocaleDateString()
                    : '現在'}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
