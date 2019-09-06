const Student = {};
const baseUrl = 'http://localhost:4000/api';
Student.updateStudentByStatus = (student) => {
  const url = `${baseUrl}/student/${student.id}`;
  console.log(url)
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({student: student})
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.student;
    });
  });
};
Student.getAllStudentsByStatus = () => {
  const url = `${baseUrl}/allstudents`;
  console.log(url)
  return fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse;
    });
  });
};
Student.getStudentsByStatus = (status, limit, offset) => {
  const url = `${baseUrl}/students/${status}?_limit=${limit}&_offset=${offset}`;
  console.log(url)
  return fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse;
    });
  });
};
Student.getStudentById = studentId => {
  const url = `${baseUrl}/student/${studentId}`;
  return fetch(url).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.student;
    });
  });
};
Student.createStudent = student => {
    const url = `${baseUrl}/students`;
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({student: student})
    };
    return fetch(url, fetchOptions).then(response => {
      if (!response.ok) {
        return new Promise(resolve => resolve(null));
      }
      return response.json().then(jsonResponse => {
        return jsonResponse.student;
      });
    });
  };
 
Student.updateStudent = student => {
  const url = `${baseUrl}/students/${student.id}`;
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({student: student})
  };
  return fetch(url, fetchOptions).then(response => {
    if (!response.ok) {
      return new Promise(resolve => resolve(null));
    }
    return response.json().then(jsonResponse => {
      return jsonResponse.student;
    });
  });
};
  export default Student;