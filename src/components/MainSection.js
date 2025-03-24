import React, { useEffect, useState } from "react";
import courses from "../data/courses";
import testimonials from "../data/testimonials";
import "../styles/MainSection.css";

const getRandomCourses = (courses, count) => {
  return courses.sort(() => 0.5 - Math.random()).slice(0, count);
};

const MainSection = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [randomTestimonials, setRandomTestimonials] = useState([]);

    useEffect(() => {
      setFeaturedCourses(getRandomCourses(courses, 3));
      setRandomTestimonials(getRandomCourses(testimonials, 2))
      }, []);
   
  return (
        <main className="index">
         
          <section className="about">
            <h2>About LMS</h2>
            <p>The Learning Management System (LMS) helps students and instructors manage courses, quizzes, and track performance efficiently.</p>
          </section>

          <section className="featuredCourses">
            <h2 className="featCoursesHeader">Featured Courses:</h2>
              <div className="coursesList">
                {featuredCourses.map((course) => (
                  <div key={course.id} className="courseDetails">
                    <h3>{course.name}</h3>
                     <p> Instructor: {course.instructor}</p>
                     <p> Description: {course.description}</p>
                     <p> Duration: {course.duration}</p>
                </div>
               ))}
              </div>
            </section>

          <section className="Testimonials">
            <h2 className="TestimonialsHeader"> Testimonials:</h2>
            <div className="TestimonialsList">
            {randomTestimonials.map((testament, index) => (
            <div key={index} className="testament">
              <h4>{testament.studentName} - {testament.courseName}</h4>
              <p>"{testament.review}"</p>
              <p>{'★'.repeat(testament.rating) + '☆'.repeat(5 - testament.rating)}</p>
            </div>
              ))}
            </div>
          </section>
        </main>
    );
  };

export default MainSection;