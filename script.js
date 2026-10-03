document.addEventListener("DOMContentLoaded", () => {
    // 1. ნავიგაციის ლოგიკა (SPA ტიპის გადართვა)
    const links = document.querySelectorAll("#nav-list a");
    const sections = document.querySelectorAll(".page-section");

    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            
            // წავშალოთ active კლასი ყველა ლინკიდან და სექციიდან
            links.forEach(l => l.classList.remove("active"));
            sections.forEach(s => s.classList.remove("active"));

            // მივანიჭოთ active კლასი დაკლიკულ ლინკს და შესაბამის სექციას
            link.classList.add("active");
            const targetId = link.getAttribute("data-target");
            document.getElementById(targetId).classList.add("active");
            
            // მობილურზე სქროლი ზევით
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // 2. მასწავლებლების ფილტრაცია (სექცია 4)
    const subjectFilter = document.getElementById("subject-filter");
    if (subjectFilter) {
        subjectFilter.addEventListener("change", (e) => {
            const selectedSubject = e.target.value;
            const teachers = document.querySelectorAll(".teacher-card");

            teachers.forEach(teacher => {
                if (selectedSubject === "all" || teacher.getAttribute("data-subject") === selectedSubject) {
                    teacher.style.display = "block";
                } else {
                    teacher.style.display = "none";
                }
            });
        });
    }

    // 3. ბიბლიოთეკის ძიება (სექცია 5)
    const bookSearch = document.getElementById("book-search");
    if (bookSearch) {
        bookSearch.addEventListener("keyup", (e) => {
            const term = e.target.value.toLowerCase();
            const books = document.querySelectorAll(".book-card");

            books.forEach(book => {
                const text = book.innerText.toLowerCase();
                if (text.includes(term)) {
                    book.style.display = "block";
                } else {
                    book.style.display = "none";
                }
            });
        });
    }
});
