import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import courses from '../data/courses';
import '../styles/CoursesPage.css';

// CourseItem Component
function CourseItem({ course, onEnroll }) {
  const [showDescription, setShowDescription] = useState(false);
  
  return (
    <div 
      className="course-item"
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
    >
      <img 
        src={course.image} 
        alt={course.name} 
        className="course-image"
      />
      <h3 className="course-title">{course.name}</h3>
      <p className="course-instructor">Instructor: {course.instructor}</p>
      <p className="course-credit-hours">Credit Hours: {course.creditHours}</p>
      
      {showDescription && (
        <div className="course-description">
          <p>{course.description}</p>
        </div>
      )}
      
      <button 
        onClick={() => onEnroll(course)}
        className="enroll-button"
      >
        Enroll Now
      </button>
    </div>
  );
}

// EnrollmentList Component
function EnrollmentList({ enrollments, onDrop }) {
  const totalCreditHours = Object.keys(enrollments).reduce((sum, courseId) => {
    const course = courses.find(c => c.id === parseInt(courseId));
    return sum + (course ? course.creditHours * enrollments[courseId] : 0);
  }, 0);
  
  return (
    <div className="enrollment-list">
      <h2 className="enrollment-title">Enrolled Courses</h2>
      {Object.keys(enrollments).length === 0 ? (
        <p className="no-enrollment">No courses enrolled.</p>
      ) : (
        <ul className="enrollment-items">
          {Object.keys(enrollments).map(courseId => {
            const course = courses.find(c => c.id === parseInt(courseId));
            return (
              <li key={courseId} className="enrollment-item">
                <span>{course.name} ({course.creditHours} hrs)</span>
                <button 
                  className="drop-button"
                  onClick={() => onDrop(courseId)}
                >
                  Drop
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <p className="total-credit-hours">Total Credit Hours: {totalCreditHours}</p>
    </div>
  );
}

// CourseCatalog Component
function CourseCatalog({ onEnroll }) {
  return (
    <div className="course-catalog">
      <h2 className="catalog-title">Available Courses</h2>
      <div className="grid">
        {courses.map(course => (
          <CourseItem 
            key={course.id} 
            course={course} 
            onEnroll={onEnroll} 
          />
        ))}
      </div>
    </div>
  );
}

// Main CoursesPage Component
function CoursesPage() {
  const [enrollments, setEnrollments] = useState({});
  
  useEffect(() => {
    const savedEnrollments = localStorage.getItem('enrollments');
    if (savedEnrollments) {
      setEnrollments(JSON.parse(savedEnrollments));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('enrollments', JSON.stringify(enrollments));
  }, [enrollments]);
  
  const handleEnrollCourse = (course) => {
    setEnrollments(prevEnrollments => {
      if (prevEnrollments[course.id]) {
        return prevEnrollments; // Prevent duplicate enrollment
      }
      return { ...prevEnrollments, [course.id]: 1 };
    });
  };  

  const handleDropCourse = (courseId) => {
    setEnrollments(prevEnrollments => {
      const updatedEnrollments = { ...prevEnrollments };
      if (updatedEnrollments[courseId] > 1) {
        updatedEnrollments[courseId] -= 1;
      } else {
        delete updatedEnrollments[courseId];
      }
      return updatedEnrollments;
    });
  };
  
  return (
    <div className="courses-page">
      <Header />
      <div className="content">
        <CourseCatalog onEnroll={handleEnrollCourse} />
        <EnrollmentList enrollments={enrollments} onDrop={handleDropCourse} />
      </div>
      <Footer />
    </div>
  );
}

export default CoursesPage;