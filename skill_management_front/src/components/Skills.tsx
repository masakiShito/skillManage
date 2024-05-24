import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Skills.css'; // Import the CSS file

interface Category {
  id: number;
  name: string;
}

interface Skill {
  id: number;
  name: string;
  category: Category;
}

interface UserSkill {
  id: number;
  skill: Skill;
  level: number;
  acquired_date: string;
}

interface SkillsProps {
  skills: UserSkill[];
  addSkill: (newSkill: UserSkill) => void;
  updateSkill: (updatedSkill: UserSkill) => void;
}

const Skills: React.FC<SkillsProps> = ({ skills, addSkill, updateSkill }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState({
    skill_id: '',
    level: 0,
    acquired_date: '',
  });
  const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({});
  const [editedSkill, setEditedSkill] = useState<UserSkill | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false); // State to control form visibility
  const [currentUser, setCurrentUser] = useState<number | null>(null); // Add state for current user

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const categoriesResponse = await axios.get(
          'http://localhost:8000/api/categories/',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(categoriesResponse.data);

        const skillsResponse = await axios.get(
          'http://localhost:8000/api/skills/',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAllSkills(skillsResponse.data);

        // Fetch current user
        const userResponse = await axios.get(
          'http://localhost:8000/api/users/me/', // Adjust the endpoint as needed
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCurrentUser(userResponse.data.id);
      } catch (error) {
        setError('データの取得に失敗しました。');
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSkillChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setNewSkill({
      ...newSkill,
      [e.target.name]: e.target.value,
    });
  };

  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser === null) {
      setError('ユーザー情報の取得に失敗しました。');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8000/api/user-skills/',
        {
          ...newSkill,
          user: currentUser,
          created_by: currentUser,
          updated_by: currentUser,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      addSkill(response.data);
      setNewSkill({ skill_id: '', level: 0, acquired_date: '' });
      setShowForm(false); // Hide the form after submission
    } catch (error) {
      setError('スキルの登録に失敗しました。');
      console.error(error);
    }
  };

  const handleEditClick = (id: number) => {
    setEditMode({ ...editMode, [id]: true });
    setEditedSkill(skills.find((skill) => skill.id === id) || null);
  };

  const handleSaveClick = async (id: number) => {
    if (editedSkill) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.put(
          `http://localhost:8000/api/user-skills/${id}/`,
          editedSkill,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        updateSkill(response.data);
        setEditMode({ ...editMode, [id]: false });
        setEditedSkill(null);
      } catch (error) {
        setError('スキルの更新に失敗しました。');
        console.error(error);
      }
    }
  };

  const handleCancelClick = (id: number) => {
    setEditMode({ ...editMode, [id]: false });
    setEditedSkill(null);
  };

  const handleEditSkillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedSkill) {
      setEditedSkill({
        ...editedSkill,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <section className="skills-section">
      <div className="card">
        <h3>
          <i className="fas fa-book"></i> あなたのスキル
        </h3>
        {error && <p className="error">{error}</p>}
        <ul className="skills-list">
          {skills.map((userSkill) => (
            <li key={userSkill.id} className="skill-item">
              {editMode[userSkill.id] ? (
                <div className="edit-skill">
                  <input
                    type="number"
                    name="level"
                    value={editedSkill?.level || ''}
                    onChange={handleEditSkillChange}
                  />
                  <button
                    onClick={() => handleSaveClick(userSkill.id)}
                    className="save-button"
                  >
                    保存
                  </button>
                  <button
                    onClick={() => handleCancelClick(userSkill.id)}
                    className="cancel-button"
                  >
                    キャンセル
                  </button>
                </div>
              ) : (
                <div className="skill-info">
                  <i className="fas fa-check-circle"></i>{' '}
                  {userSkill.skill?.name || '未定義のスキル'} - レベル:{' '}
                  {userSkill.level} - カテゴリー:{' '}
                  {userSkill.skill?.category?.name || '未定義のカテゴリー'}
                  <div className="button-container">
                    <button
                      onClick={() => handleEditClick(userSkill.id)}
                      className="edit-button"
                    >
                      <i className="fas fa-edit"></i> 編集
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        <button onClick={() => setShowForm(!showForm)} className="add-button">
          {showForm ? '追加フォームを閉じる' : '新しいスキルを追加'}
        </button>
        {showForm && (
          <form onSubmit={handleSkillSubmit} className="add-skill-form">
            <div className="input-group">
              <label>スキル名:</label>
              <select
                name="skill_id"
                value={newSkill.skill_id}
                onChange={handleSkillChange}
                required
              >
                <option value="">選択してください</option>
                {allSkills.map((skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label>レベル:</label>
              <input
                type="number"
                name="level"
                value={newSkill.level}
                onChange={handleSkillChange}
                required
              />
            </div>
            <div className="input-group">
              <label>習得日:</label>
              <input
                type="date"
                name="acquired_date"
                value={newSkill.acquired_date}
                onChange={handleSkillChange}
                required
              />
            </div>
            <button type="submit" className="save-button">
              登録
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Skills;
