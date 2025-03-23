
function CoursesPage() {
    return 
    (
        <div className="courses-page">
            <Header />
            <div className="content">
                <CourseCatalog />
                <EnrollmentList />
            </div>
            <Footer />
        </div>
    )
}
export default CoursesPage;

function CourseCatalog() {
    // components inside the coursespage.js file
}