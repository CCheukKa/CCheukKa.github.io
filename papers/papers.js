fetchConfig('/papers/papersConfig.jsonc').then(config => listConstructor(config.courses));
//

function listConstructor(courses) {
    console.log(courses);
    courses.forEach(course => {
        course.papers.forEach(paper => {
            const p = {
                courseCode: course.courseCode,
                courseName: course.courseName,
                pdfName: paper.pdfName,
                commentedPDFName: paper.commentedPDFName,
                topic: paper.topic,
                date: paper.date,
            }
            //
            const topicElementContainer = document.createElement('div');
            topicElementContainer.classList.add('list-item');
            listElement.appendChild(topicElementContainer);
            //
            const topicElement = document.createElement('a');
            topicElement.innerHTML = p.topic;
            topicElement.href = `/papers/pdfs/${p.pdfName}.pdf`;
            topicElement.target = '_blank';
            topicElementContainer.appendChild(topicElement);
            //
            const commentElement = document.createElement('a');
            if (p.commentedPDFName) {
                commentElement.innerHTML = '💬';
                commentElement.href = `/papers/pdfs/${p.commentedPDFName}.pdf`;
                commentElement.target = '_blank';
            }
            topicElementContainer.appendChild(commentElement);
            //
            const courseInfoElement = document.createElement('span');
            courseInfoElement.classList.add('list-item');
            courseInfoElement.innerHTML = `${p.courseCode}: ${p.courseName}`;
            listElement.appendChild(courseInfoElement);

            //
            const dateElement = document.createElement('span');
            dateElement.classList.add('list-item');
            dateElement.innerHTML = p.date;
            listElement.appendChild(dateElement);
            //
        });
    });
}