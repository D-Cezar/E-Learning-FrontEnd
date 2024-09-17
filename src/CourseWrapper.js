import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import { getToken } from './Authentification/HandleToken';
import { getUserInfo } from './Authentification/HandleUserInfo';
import CourseContent from './Course Components/CourseContent';
import CourseAdminContent from './Course Components/CourseAdminContent';

const CourseWrapper = () => {
  const { id } = useParams();
  const token = getToken();
  const user = getUserInfo();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    const fetchCourse = async () => {
      try {
        const response = await axios.get(`https://localhost:7143/Courses/id/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCourse(response.data);
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };

    fetchCourse();
  }, [id, token]);

  if (!token) return <Navigate to="/login" />;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!course) return <div>No course data available</div>;
  console.log(course);
  return user && user.role === "Teacher" ? <CourseAdminContent course={course} /> : <CourseContent course={course} />;
};

export default CourseWrapper;
