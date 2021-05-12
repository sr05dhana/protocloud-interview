const loadData = async () => {
    let userDetail = window.sessionStorage.getItem('userDetail');
    if (!!userDetail) {
        userDetail = JSON.parse(userDetail);
        try {
            const response = await fetch('http://18.133.180.192:5000/enrollments/' + userDetail.username);
            const myJson = await response.json();
            var userCourse = myJson;
        } catch (err) {
            console.log(err);
        }
        try {
            const response = await fetch('http://18.133.180.192:5000/courses');
            const myJson = await response.json();
            var allCourses = myJson.courses;
        } catch (err) {
            console.log(err);
        }
        let courseName = '';
        if (!!allCourses.length && !!userCourse) {
            courseName = allCourses.find(c => c.courseid === userCourse.courseid).coursename;
        }
        if (!!userCourse) {
            addRow(userCourse, courseName);
        }
        if (userDetail.role === 'instructor') {
            addCouresRows(allCourses);
        } else {
            let el = document.getElementById('buttonDiv');
            el.style.display = "none";
        }
        swapTable(true);
    } else {
        window.location.href = "../index.html";
    }
}

function addRow(userCourse, courseName) {
    let newRow = document.getElementById('userCourse');
    var newCell = newRow.insertCell();
    var newText = document.createTextNode(userCourse.courseid);
    newCell.appendChild(newText);

    var newCell1 = newRow.insertCell();
    var newText1 = document.createTextNode(courseName);
    newCell1.appendChild(newText1);

    var newCell2 = newRow.insertCell();
    var newText2 = document.createTextNode(userCourse.enrollmentid);
    newCell2.appendChild(newText2);
}

function addCouresRows(allCourses) {
    var tbodyRef = document.getElementById('allCourses');

    const n = allCourses.length;
    for (let i = 0; i < n; i++) {
        let newRow = tbodyRef.insertRow();
        let newCell = newRow.insertCell();
        let newText = document.createTextNode(allCourses[i].courseid);
        newCell.appendChild(newText);

        let newCell1 = newRow.insertCell();
        let newText1 = document.createTextNode(allCourses[i].coursename);
        newCell1.appendChild(newText1);

        let newCell2 = newRow.insertCell();
        let newText2 = document.createTextNode(allCourses[i].duration);
        newCell2.appendChild(newText2);
    }
}

function swapTable(isCourseTable) {
    let el1 = document.getElementById('userTable');
    let el2 = document.getElementById('courseTable');
    if (isCourseTable) {
        el1.style.display = "block";
        el2.style.display = "none";
    } else {
        el2.style.display = "block";
        el1.style.display = "none";
    }
}

function logout() {
    window.sessionStorage.removeItem('userDetail');
    window.location.href = "../index.html";
}
