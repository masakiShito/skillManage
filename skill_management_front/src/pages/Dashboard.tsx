import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';
import BasicInfo from '../components/BasicInfo';
import Skills from '../components/Skills';
import LearningLogs from '../components/LearningLogs';
import Organizations from '../components/Organizations';

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
  skill: Skill;
  level: number;
  acquired_date: string;
}

interface Skill {
  id: number;
  name: string;
  category: Category;
}

interface Category {
  id: number;
  name: string;
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

  const addSkill = (newSkill: UserSkill) => {
    setSkills([...skills, newSkill]);
  };

  const updateSkill = (updatedSkill: UserSkill) => {
    setSkills(
      skills.map((skill) =>
        skill.id === updatedSkill.id ? updatedSkill : skill
      )
    );
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
          <BasicInfo
            user={user}
            editMode={editMode}
            editedUser={editedUser}
            handleEditClick={handleEditClick}
            handleSaveClick={handleSaveClick}
            handleCancelClick={handleCancelClick}
            handleChange={handleChange}
          />
        )}
        <Skills skills={skills} addSkill={addSkill} updateSkill={updateSkill} />
        <LearningLogs learningLogs={learningLogs} />
        <Organizations organizations={organizations} />
      </main>
    </div>
  );
};

export default Dashboard;
